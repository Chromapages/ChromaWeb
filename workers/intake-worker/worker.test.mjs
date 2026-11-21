import assert from "node:assert/strict";
import { timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import worker from "./src/worker.js";

if (typeof crypto.subtle.timingSafeEqual !== "function") {
  Object.defineProperty(crypto.subtle, "timingSafeEqual", {
    value: (left, right) => timingSafeEqual(new Uint8Array(left), new Uint8Array(right)),
  });
}

const migration = readFileSync(new URL("./migrations/0001_create_requests.sql", import.meta.url), "utf8");
const testToken = "synthetic-intake-test-token";
const intake = {
  requestType: "prospect",
  name: "Example Person",
  email: "intake-qa@example.test",
  company: "Example Company",
  projectType: "Marketing Website",
  budgetRange: "Under $2,500",
  message: "Synthetic message for intake QA.",
};

function fixture(t) {
  const sqlite = new DatabaseSync(":memory:");
  t.after(() => sqlite.close());
  sqlite.exec(migration);
  const db = {
    prepare(sql) {
      const statement = sqlite.prepare(sql);
      return {
        bind(...values) {
          const execute = () => ({ success: true, results: statement.all(...values) });
          return { execute, all: async () => execute(), first: async () => statement.get(...values) ?? null };
        },
      };
    },
    async batch(statements) {
      sqlite.exec("BEGIN");
      try {
        const results = statements.map((statement) => statement.execute());
        sqlite.exec("COMMIT");
        return results;
      } catch (error) {
        sqlite.exec("ROLLBACK");
        throw error;
      }
    },
  };
  const env = { INTAKE_SECRET: testToken, DB: db };
  async function send(method, path, body, authorization = `Bearer ${testToken}`, bindings = env) {
    const headers = body === undefined ? {} : { "Content-Type": "application/json" };
    if (authorization !== null) headers.Authorization = authorization;
    const response = await worker.fetch(new Request(`https://worker.example.test${path}`, {
      method, headers, body: body === undefined ? undefined : JSON.stringify(body),
    }), bindings);
    return { status: response.status, cacheControl: response.headers.get("Cache-Control"), body: await response.json() };
  }
  async function create(fields = intake) {
    const response = await send("POST", "/requests", fields);
    assert.equal(response.status, 201);
    assert.equal(response.body.ok, true);
    return response.body;
  }
  return { send, create, env, sqlite };
}

function exactMessage(length) {
  const start = " \t\r\nCafé 東京 🎨\n";
  const end = "\r\n  \t";
  return start + "x".repeat(length - start.length - end.length) + end;
}

test("health is open; every request operation fails closed", async (t) => {
  const { send, env } = fixture(t);
  assert.deepEqual(await send("GET", "/health", undefined, null, {}), {
    status: 200, cacheControl: "no-store", body: { ok: true, service: "chromaweb-intake" },
  });
  for (const [verb, path] of [
    ["POST", "/requests"], ["GET", "/requests"],
    ["PATCH", "/requests/00000000-0000-4000-8000-000000000001"],
    ["DELETE", "/requests/00000000-0000-4000-8000-000000000001"],
  ]) {
    for (const authorization of [null, testToken, `Basic ${testToken}`, "Bearer x", `Bearer ${testToken}x`, `Bearer ${testToken}, value`]) {
      assert.equal((await send(verb, path, undefined, authorization)).status, 401);
    }
  }
  for (const secret of [undefined, "", "  \t"]) {
    assert.equal((await send("GET", "/requests", undefined, undefined, { ...env, INTAKE_SECRET: secret })).status, 503);
  }
  assert.equal((await send("GET", "/requests", undefined, undefined, { INTAKE_SECRET: testToken })).status, 503);
  assert.equal((await send("GET", "/requests", undefined, `bearer ${testToken}`)).status, 200);
});

test("creation and listing preserve exact messages and the complete record contract", async (t) => {
  const { send, create, sqlite } = fixture(t);
  for (const [seq, length] of [501, 2000, 10000].entries()) {
    const message = exactMessage(length);
    const fields = { ...intake, message };
    const created = await create(fields);
    assert.match(created.id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    assert.match(created.createdAt, /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/);
    assert.deepEqual(created, { ok: true, id: created.id, reference: `REQ-000${seq + 1}`, createdAt: created.createdAt });
    const response = await send("GET", "/requests?limit=1");
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { ok: true, requests: [{
      ...fields, id: created.id, reference: created.reference, status: "new", notes: "",
      createdAt: created.createdAt, updatedAt: created.createdAt,
    }] });
    assert.equal(sqlite.prepare("SELECT message FROM intake_requests WHERE id = ?").get(created.id).message, message);
  }
});

test("references are unique across concurrent creates, never recycled, and can exceed four digits", async (t) => {
  const { send, create, sqlite } = fixture(t);
  const records = await Promise.all(Array.from({ length: 5 }, () => create()));
  assert.equal(new Set(records.map(({ id }) => id)).size, 5);
  assert.deepEqual(records.map(({ reference }) => reference).sort(), ["REQ-0001", "REQ-0002", "REQ-0003", "REQ-0004", "REQ-0005"]);
  const last = records.find(({ reference }) => reference === "REQ-0005");
  assert.equal((await send("DELETE", `/requests/${last.id}`)).status, 200);
  assert.equal((await create()).reference, "REQ-0006");
  sqlite.exec("UPDATE sqlite_sequence SET seq = 9999 WHERE name = 'intake_requests'");
  assert.equal((await create()).reference, "REQ-10000");
});

test("if the second D1 statement fails, the provisional row and sequence roll back", async (t) => {
  const { send, create, sqlite } = fixture(t);
  const errorLog = t.mock.method(console, "error", () => {});
  sqlite.exec(`CREATE TRIGGER reject_reference BEFORE UPDATE OF reference ON intake_requests
    BEGIN SELECT RAISE(ABORT, 'private-database-diagnostic'); END;`);
  assert.deepEqual(await send("POST", "/requests", intake), {
    status: 500, cacheControl: "no-store", body: { ok: false, error: "internal_error" },
  });
  assert.deepEqual(sqlite.prepare("SELECT seq, reference FROM intake_requests").all(), []);
  assert.deepEqual(errorLog.mock.calls.map(({ arguments: args }) => args), [['{"event":"intake.error"}']]);
  sqlite.exec("DROP TRIGGER reject_reference");
  assert.equal((await create()).reference, "REQ-0001");
});

test("listing honors the default and maximum limits, status filtering, and creation order", async (t) => {
  const { send, sqlite } = fixture(t);
  sqlite.exec(`WITH RECURSIVE numbers(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM numbers WHERE n < 105)
    INSERT INTO intake_requests
      (id, reference, status, request_type, name, email, company, project_type, budget_range, message, created_at, updated_at)
    SELECT printf('00000000-0000-4000-8000-%012x', n), printf('REQ-%04d', n),
      CASE WHEN n % 2 = 0 THEN 'in_review' ELSE 'new' END,
      'question', 'Example Person', 'intake-qa@example.test', '', '', '', 'Synthetic message.',
      CASE WHEN n = 105 THEN '2025-01-01T00:00:00.000Z' ELSE '2026-01-01T00:00:00.000Z' END,
      '2026-01-02T00:00:00.000Z' FROM numbers;`);
  const defaultList = (await send("GET", "/requests")).body.requests;
  assert.equal(defaultList.length, 50);
  assert.equal(defaultList[0].reference, "REQ-0104");
  assert.equal(defaultList.at(-1).reference, "REQ-0055");
  assert.equal((await send("GET", "/requests?limit=100")).body.requests.length, 100);
  const filtered = (await send("GET", "/requests?status=in_review&limit=2")).body.requests;
  assert.deepEqual(filtered.map(({ status, reference }) => [status, reference]), [
    ["in_review", "REQ-0104"], ["in_review", "REQ-0102"],
  ]);
  assert.deepEqual((await send("GET", "/requests?status=done")).body, { ok: true, requests: [] });
});

test("patch updates status and/or notes, delete removes only the identified row", async (t) => {
  const { send, create, sqlite } = fixture(t);
  const created = await create();
  const kept = await create();
  const path = `/requests/${created.id}`;
  assert.equal((await send("GET", path)).status, 404);
  sqlite.prepare("UPDATE intake_requests SET updated_at = ? WHERE id = ?").run("2000-01-01T00:00:00.000Z", created.id);
  const active = await send("PATCH", path, { status: "active" });
  assert.equal(active.status, 200);
  assert.equal(active.body.ok, true);
  assert.equal(active.body.request.status, "active");
  assert.equal(active.body.request.notes, "");
  assert.equal(active.body.request.createdAt, created.createdAt);
  assert.ok(active.body.request.updatedAt >= created.createdAt);
  const notes = exactMessage(5000);
  const noted = await send("PATCH", path, { notes });
  assert.deepEqual(noted.body.request, { ...active.body.request, notes, updatedAt: noted.body.request.updatedAt });
  const done = await send("PATCH", path, { status: "done", notes: "" });
  assert.deepEqual(done.body.request, { ...noted.body.request, status: "done", notes: "", updatedAt: done.body.request.updatedAt });
  assert.deepEqual((await send("DELETE", path)).body, { ok: true, deleted: true });
  assert.equal((await send("DELETE", path)).status, 404);
  assert.equal((await send("PATCH", path, { status: "new" })).status, 404);
  assert.deepEqual((await send("GET", "/requests")).body.requests.map(({ id }) => id), [kept.id]);
});

test("invalid body, query, ID and unknown inputs are rejected without changing records", async (t) => {
  const { send, create, env } = fixture(t);
  const invalidJson = await worker.fetch(new Request("https://worker.example.test/requests", {
    method: "POST", headers: { Authorization: `Bearer ${testToken}` }, body: "{",
  }), env);
  assert.equal(invalidJson.status, 400);
  for (const body of [null, [], "string", {},
    { ...intake, requestType: "other" }, { ...intake, name: "  " }, { ...intake, email: "x@" },
    { ...intake, name: "a".repeat(121) }, { ...intake, email: `${"a".repeat(244)}@example.test` },
    { ...intake, company: "a".repeat(121) }, { ...intake, projectType: {} }, { ...intake, budgetRange: [] },
    { ...intake, projectType: "a".repeat(121) }, { ...intake, budgetRange: "a".repeat(121) },
    { ...intake, message: "  short\n " }, { ...intake, message: 500 },
    { ...intake, message: exactMessage(10001) }, { ...intake, notes: "must not persist" },
  ]) {
    assert.equal((await send("POST", "/requests", body)).status, 400);
  }
  assert.deepEqual((await send("GET", "/requests")).body.requests, []);
  const { id } = await create({ requestType: "client", name: intake.name, email: intake.email, message: intake.message });
  const [record] = (await send("GET", "/requests")).body.requests;
  assert.equal(record.company, "");
  assert.equal(record.projectType, "");
  assert.equal(record.budgetRange, "");
  for (const body of [null, [], {}, { status: "closed" }, { status: null }, { notes: null },
    { notes: "x".repeat(5001) }, { status: "active", name: "cannot change" }]) {
    assert.equal((await send("PATCH", `/requests/${id}`, body)).status, 400);
  }
  for (const query of ["status=", "status=other", "status=new&status=done", "limit=", "limit=0", "limit=-1", "limit=101", "limit=1.5", "limit=1&limit=2", "other=1"]) {
    assert.equal((await send("GET", `/requests?${query}`)).status, 400);
  }
  assert.equal((await send("PATCH", "/requests/not-a-uuid", { status: "active" })).status, 400);
  assert.equal((await send("DELETE", "/requests/not-a-uuid")).status, 400);
  assert.equal((await send("GET", "/unknown")).status, 404);
  assert.equal((await send("PUT", "/requests", intake)).status, 404);
  assert.deepEqual((await send("GET", "/requests")).body.requests, [record]);
});

test("POST rejects over 32 KiB of streamed UTF-8 without inserting a request", async (t) => {
  const { env, send } = fixture(t);
  const json = JSON.stringify({ ...intake, message: "界".repeat(10000) });
  const bytes = new TextEncoder().encode(json + " ".repeat(32769 - Buffer.byteLength(json)));
  let next = 0;
  const body = new ReadableStream({
    pull(controller) {
      if (next >= bytes.length) return controller.close();
      controller.enqueue(bytes.subarray(next, next += 4096));
    },
  });
  const response = await worker.fetch(new Request("https://worker.example.test/requests", {
    method: "POST", body, duplex: "half", headers: { Authorization: `Bearer ${testToken}` },
  }), env);
  assert.equal(response.status, 413);
  assert.deepEqual(await response.json(), { ok: false, error: "payload_too_large" });
  assert.deepEqual((await send("GET", "/requests")).body.requests, []);
});

test("application logs are fixed JSON events, with no token or record data", async (t) => {
  const { send, create } = fixture(t);
  const log = t.mock.method(console, "log", () => {});
  const error = t.mock.method(console, "error", () => {});
  const { id } = await create();
  const path = `/requests/${id}`;
  assert.equal((await send("PATCH", path, { notes: "private QA note" })).status, 200);
  assert.equal((await send("GET", "/requests")).status, 200);
  assert.equal((await send("DELETE", path)).status, 200);
  assert.equal((await send("GET", "/requests?unknown=private-qa-query")).status, 400);
  assert.equal((await send("POST", "/requests", intake, "Bearer private-qa-token")).status, 401);
  assert.equal((await send("GET", "/requests", undefined, undefined, {})).status, 503);
  assert.deepEqual(log.mock.calls.map(({ arguments: args }) => args), [
    ['{"event":"intake.request_created"}'], ['{"event":"intake.request_updated"}'],
    ['{"event":"intake.requests_listed"}'], ['{"event":"intake.request_deleted"}'], ['{"event":"intake.unauthorized"}'],
  ]);
  assert.deepEqual(error.mock.calls.map(({ arguments: args }) => args), [['{"event":"intake.error"}']]);
});
