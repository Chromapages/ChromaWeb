import { NextResponse } from "next/server";
import { z } from "zod";

const intakeSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  requestType: z.enum(["prospect", "client", "question"]),
  projectType: z.string().optional().or(z.literal("")),
  budgetRange: z.string().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please add a brief message."),
  honeypot: z.string().optional().or(z.literal("")),
});

export const POST = async (request: Request) => {
  const payload = await request.json().catch(() => null);
  const parsed = intakeSchema.safeParse(payload);

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

  if (!workerUrl || !pathSecret) {
    console.error("Intake Worker environment variables are not configured.");
    return NextResponse.json(
      {
        success: false,
        message: "Server configuration error. Please try again later.",
      },
      { status: 500 },
    );
  }

  // Build the intake worker URL: workerUrl/pathSecret
  const targetUrl = `${workerUrl.replace(/\/$/, "")}/${pathSecret}`;

  // Build the payload for the Cloudflare Worker. We structure it so it passes
  // through the worker's normalization seamlessly. requestType is forwarded so
  // the local cmd/intake dispatcher can route by intent (prospect/client/question).
  // We also include "cmd/intake" in the labels array so the dispatcher picks
  // the issue up on its next tick even when DEFAULT_LABELS isn't set on the
  // Worker side.
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
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Intake Worker returned error status ${response.status}:`, errorText);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to forward request to dispatch queue.",
        },
        { status: 502 },
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      message: "Request received successfully.",
      issueIdentifier: data.issueIdentifier,
      issueUrl: data.issueUrl,
    });
  } catch (error) {
    console.error("Error forwarding request to Intake Worker:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit request due to a network error.",
      },
      { status: 500 },
    );
  }
};
