import { NextResponse } from "next/server";
import { z } from "zod";
import { requestSchema } from "@/lib/validation/request";

const workerAcceptanceSchema = z.object({
  ok: z.literal(true),
  issueId: z.string().trim().min(1),
  issueIdentifier: z.string().trim().min(1),
  issueUrl: z.string().url(),
});

export const POST = async (request: Request) => {
  const payload = await request.json().catch(() => null);
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

  if (parsed.data.honeypot) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid form submission.",
      },
      { status: 400 },
    );
  }

  const workerUrl = process.env.WORKER_URL;
  const pathSecret = process.env.PATH_SECRET;

  let targetUrl: URL;
  try {
    if (!workerUrl || !pathSecret) throw new Error("Missing configuration");
    targetUrl = new URL(`${workerUrl.replace(/\/$/, "")}/${encodeURIComponent(pathSecret)}`);
    if (targetUrl.protocol !== "https:" || targetUrl.username || targetUrl.password || targetUrl.search || targetUrl.hash) {
      throw new Error("Invalid configuration");
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Server configuration error. Please try again later.",
      },
      { status: 503 },
    );
  }

  // The Worker owner must configure routing; source version 0.1.0 ignores payload labels.
  const workerPayload = {
    formId: "chromaweb-portal",
    formName: "ChromaWeb Request Portal",
    submittedAt: new Date().toISOString(),
    fields: {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || "N/A",
      requestType: parsed.data.requestType,
      projectType: parsed.data.projectType || "N/A",
      budgetRange: parsed.data.budgetRange || "N/A",
      message: parsed.data.message,
    },
    labels: ["intake/web", "cmd/intake"],
  };

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workerPayload),
      signal: AbortSignal.timeout(10_000),
      redirect: "error",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to forward request to dispatch queue.",
        },
        { status: 502 },
      );
    }

    const accepted = workerAcceptanceSchema.safeParse(await response.json().catch(() => null));
    if (!accepted.success) {
      return NextResponse.json(
        { success: false, message: "The intake service did not confirm acceptance. Please try again later." },
        { status: 502 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Request received successfully.",
      issueIdentifier: accepted.data.issueIdentifier,
    });
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    return NextResponse.json(
      {
        success: false,
        message: "Acceptance could not be confirmed. Your information has been kept; please try again later.",
      },
      { status: timedOut ? 504 : 502 },
    );
  }
};
