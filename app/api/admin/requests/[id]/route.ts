import { cookies } from "next/headers";
import { z } from "zod";
import { isValidSessionToken, SESSION_COOKIE } from "@/lib/admin-session";
import { fetchIntakeWorker, intakeRequestSchema, intakeWorkerErrorStatus } from "@/lib/intake-worker";
import { updateRequestSchema } from "@/lib/validation/request";

const updatedSchema = z.object({ ok: z.literal(true), request: intakeRequestSchema });
const noStore = { "Cache-Control": "no-store" };

export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const session = (await cookies()).get(SESSION_COOKIE);
  if (!(await isValidSessionToken(session?.value))) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401, headers: noStore });
  }

  const id = z.uuid().safeParse((await params).id);
  const update = updateRequestSchema.safeParse(await request.json().catch(() => null));
  if (!id.success || !update.success) {
    return Response.json({ success: false, message: "Invalid request update." }, { status: 400, headers: noStore });
  }

  const canonicalId = id.data.trim().toLowerCase();
  try {
    const upstream = await fetchIntakeWorker(`/requests/${encodeURIComponent(canonicalId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update.data),
    });
    if (upstream.status === 404) {
      return Response.json({ success: false, message: "Request not found." }, { status: 404, headers: noStore });
    }
    if (upstream.ok) {
      const parsed = updatedSchema.safeParse(await upstream.json());
      if (parsed.success && parsed.data.request.id === canonicalId) {
        return Response.json({ success: true, request: parsed.data.request }, { headers: noStore });
      }
    }
  } catch (error) {
    return Response.json({ success: false, message: "Unable to update the request." }, {
      status: intakeWorkerErrorStatus(error), headers: noStore,
    });
  }
  return Response.json({ success: false, message: "Unable to update the request." }, { status: 502, headers: noStore });
};
