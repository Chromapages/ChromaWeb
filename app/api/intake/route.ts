import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchIntakeWorker, intakeWorkerErrorStatus } from "@/lib/intake-worker";
import { requestSchema } from "@/lib/validation/request";

const workerAcceptanceSchema = z.object({
  ok: z.literal(true),
  id: z.uuid(),
  reference: z.string().trim().min(1),
  createdAt: z.iso.datetime(),
});

const maxBodyBytes = 32 * 1024;
const payloadTooLarge = () =>
  NextResponse.json({ success: false, message: "Request body exceeds 32 KiB." }, { status: 413 });

export const POST = async (request: Request) => {
  if (Number(request.headers.get("content-length")) > maxBodyBytes) return payloadTooLarge();

  let payload: unknown = null;
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
        return payloadTooLarge();
      }
      text += decoder.decode(value, { stream: true });
    }
    payload = JSON.parse(text + decoder.decode());
  } catch {
    // Malformed or unreadable JSON is rejected by the schema below.
  }
  const parsed = requestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid form submission.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { honeypot, ...submission } = parsed.data;
  if (honeypot) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid form submission.",
      },
      { status: 400 },
    );
  }

  try {
    const response = await fetchIntakeWorker("/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
    if (response.status !== 201) {
      return NextResponse.json(
        { success: false, message: "The intake service did not confirm acceptance. Please try again later." },
        { status: 502 },
      );
    }

    const accepted = workerAcceptanceSchema.safeParse(await response.json());
    if (!accepted.success) {
      return NextResponse.json(
        { success: false, message: "The intake service did not confirm acceptance. Please try again later." },
        { status: 502 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Request received successfully.",
      reference: accepted.data.reference,
    });
  } catch (error) {
    const status = intakeWorkerErrorStatus(error);
    return NextResponse.json(
      {
        success: false,
        message: status === 503
          ? "The intake service is temporarily unavailable. Please try again later."
          : "Acceptance could not be confirmed. Your information has been kept; please try again later.",
      },
      { status },
    );
  }
};
