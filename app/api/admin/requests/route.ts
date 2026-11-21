import { cookies } from "next/headers";
import { isValidSessionToken, SESSION_COOKIE } from "@/lib/admin-session";
import { z } from "zod";
import { fetchIntakeWorker, intakeRequestSchema, intakeWorkerErrorStatus } from "@/lib/intake-worker";

const listSchema = z.object({ ok: z.literal(true), requests: z.array(intakeRequestSchema) });
const noStore = { "Cache-Control": "no-store" };
export const GET = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!(await isValidSessionToken(session?.value))) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401, headers: noStore });
  }

  try {
    const upstream = await fetchIntakeWorker("/requests", { method: "GET" });
    if (upstream.ok) {
      const parsed = listSchema.safeParse(await upstream.json());
      if (parsed.success) {
        return Response.json({ success: true, requests: parsed.data.requests }, { headers: noStore });
      }
    }
  } catch (error) {
    return Response.json({ success: false, message: "Unable to load requests." }, {
      status: intakeWorkerErrorStatus(error), headers: noStore,
    });
  }
  return Response.json({ success: false, message: "Unable to load requests." }, { status: 502, headers: noStore });
};
