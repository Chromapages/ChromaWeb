const statuses = new Set(["new", "active", "in_review", "done"]);
const requestTypes = new Set(["prospect", "client", "question"]);
const intakeFields = new Set(["requestType", "name", "email", "company", "projectType", "budgetRange", "message"]);
const patchFields = new Set(["status", "notes"]);
const emailPattern = /^(?!\.)(?!.*\.\.)[A-Za-z0-9_'+.\-]*[A-Za-z0-9_+\-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const columns = `id, reference, status, request_type AS requestType, name, email, company,
  project_type AS projectType, budget_range AS budgetRange, message, notes,
  created_at AS createdAt, updated_at AS updatedAt`;
const encoder = new TextEncoder();
const maxBodyBytes = 32 * 1024;

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function fail(error, status) {
  return json({ ok: false, error }, status);
}

function log(event) {
  console.log(JSON.stringify({ event }));
}

async function hasValidBearer(request, secret) {
  const token = /^Bearer +([^\s,]+)$/i.exec(request.headers.get("Authorization") ?? "")?.[1];
  if (!token) return false;
  const [provided, expected] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(token)),
    crypto.subtle.digest("SHA-256", encoder.encode(secret)),
  ]);
  return crypto.subtle.timingSafeEqual(provided, expected);
}

async function readObject(request, allowed) {
  if (Number(request.headers.get("content-length")) > maxBodyBytes) {
    return fail("payload_too_large", 413);
  }
  let body;
  try {
    const reader = request.body?.getReader();
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";
    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBodyBytes) {
        void reader.cancel().catch(() => {});
        return fail("payload_too_large", 413);
      }
      text += decoder.decode(value, { stream: true });
    }
    body = JSON.parse(text + decoder.decode());
  } catch {
    return fail("invalid_request", 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body) ||
      Object.keys(body).some((key) => !allowed.has(key))) return fail("invalid_request", 400);
  return body;
}

async function create(request, db) {
  const body = await readObject(request, intakeFields);
  if (body instanceof Response) return body;
  const { requestType, name, email, company = "", projectType = "", budgetRange = "", message } = body;
  if (!requestTypes.has(requestType) || typeof name !== "string" || name.length > 120 || name.trim().length < 2 ||
      typeof email !== "string" || email.length > 254 || !emailPattern.test(email.trim()) ||
      typeof company !== "string" || company.length > 120 ||
      typeof projectType !== "string" || projectType.length > 120 ||
      typeof budgetRange !== "string" || budgetRange.length > 120 ||
      typeof message !== "string" || message.length > 10000 || message.trim().length < 10) {
    return fail("invalid_request", 400);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  // The UUID reference satisfies NOT NULL and cannot escape the transaction.
  const [, { results: [{ reference }] }] = await db.batch([
    db.prepare(`INSERT INTO intake_requests
      (id, reference, request_type, name, email, company, project_type, budget_range, message, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING seq`)
      .bind(id, id, requestType, name.trim(), email.trim(), company.trim(), projectType, budgetRange, message, createdAt, createdAt),
    db.prepare(`UPDATE intake_requests SET reference = printf('REQ-%04d', seq)
      WHERE seq = (SELECT seq FROM intake_requests WHERE id = ?) RETURNING reference`).bind(id),
  ]);
  log("intake.request_created");
  return json({ ok: true, id, reference, createdAt }, 201);
}

async function list(params, db) {
  for (const [key] of params) {
    if (key !== "status" && key !== "limit") return fail("invalid_query", 400);
  }
  if (params.getAll("status").length > 1 || params.getAll("limit").length > 1) {
    return fail("invalid_query", 400);
  }
  const status = params.get("status");
  const rawLimit = params.get("limit");
  const limit = rawLimit === null ? 50 : Number(rawLimit);
  if ((status !== null && !statuses.has(status)) ||
      (rawLimit !== null && (!/^\d+$/.test(rawLimit) || limit < 1 || limit > 100))) {
    return fail("invalid_query", 400);
  }
  const order = "ORDER BY created_at DESC, seq DESC LIMIT ?";
  const { results } = await (status === null
    ? db.prepare(`SELECT ${columns} FROM intake_requests ${order}`).bind(limit)
    : db.prepare(`SELECT ${columns} FROM intake_requests WHERE status = ? ${order}`).bind(status, limit)
  ).all();
  log("intake.requests_listed");
  return json({ ok: true, requests: results });
}

async function patch(request, id, db) {
  const body = await readObject(request, patchFields);
  if (body instanceof Response) return body;
  const { status, notes } = body;
  if ((status === undefined && notes === undefined) ||
      (status !== undefined && !statuses.has(status)) ||
      (notes !== undefined && (typeof notes !== "string" || notes.length > 5000))) {
    return fail("invalid_request", 400);
  }
  const updated = await db.prepare(`UPDATE intake_requests
    SET status = COALESCE(?, status), notes = COALESCE(?, notes), updated_at = ?
    WHERE id = ? RETURNING ${columns}`)
    .bind(status ?? null, notes ?? null, new Date().toISOString(), id).first();
  if (!updated) return fail("not_found", 404);
  log("intake.request_updated");
  return json({ ok: true, request: updated });
}

async function remove(id, db) {
  const deleted = await db.prepare("DELETE FROM intake_requests WHERE id = ? RETURNING id").bind(id).first();
  if (!deleted) return fail("not_found", 404);
  log("intake.request_deleted");
  return json({ ok: true, deleted: true });
}

export default {
  async fetch(request, env) {
    const { pathname, searchParams } = new URL(request.url);
    const { method } = request;
    if (method === "GET" && pathname === "/health") return json({ ok: true, service: "chromaweb-intake" });

    const { INTAKE_SECRET: secret, DB: db } = env;
    if (typeof secret !== "string" || !secret.trim() || !db) {
      console.error(JSON.stringify({ event: "intake.error" }));
      return fail("service_unavailable", 503);
    }
    try {
      if (!(await hasValidBearer(request, secret))) {
        log("intake.unauthorized");
        return fail("unauthorized", 401);
      }
      if (pathname === "/requests") {
        if (method === "POST") return await create(request, db);
        if (method === "GET") return await list(searchParams, db);
      }
      const item = /^\/requests\/([^/]+)$/.exec(pathname);
      if (item && (method === "PATCH" || method === "DELETE")) {
        if (!uuidPattern.test(item[1])) return fail("invalid_id", 400);
        const id = item[1].toLowerCase();
        return method === "PATCH" ? await patch(request, id, db) : await remove(id, db);
      }
      return fail("not_found", 404);
    } catch {
      console.error(JSON.stringify({ event: "intake.error" }));
      return fail("internal_error", 500);
    }
  },
};
