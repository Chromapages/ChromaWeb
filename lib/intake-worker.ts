import "server-only";
import { z } from "zod";
import { intakeRequestTypes, intakeStatuses, type IntakeRequest } from "@/types/intake";

const configurationError = new Error("Invalid intake Worker configuration");

export function fetchIntakeWorker(path: string, init: RequestInit): Promise<Response> {
  const base = process.env.WORKER_URL;
  let url: URL;
  try {
    url = new URL(base ?? "");
  } catch {
    throw configurationError;
  }
  const secret = process.env.WORKER_SECRET;
  if (
    url.protocol !== "https:" || (base !== url.origin && base !== `${url.origin}/`) ||
    !secret || !/^[A-Za-z0-9._~+/-]+=*$/.test(secret)
  ) {
    throw configurationError;
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${secret}`);
  return fetch(`${url.origin}${path}`, {
    ...init,
    headers,
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
}

export function intakeWorkerErrorStatus(error: unknown): 502 | 503 | 504 {
  if (error === configurationError) return 503;
  return error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError") ? 504 : 502;
}

export const intakeRequestSchema = z.object({
  id: z.uuid(),
  reference: z.string().trim().min(1),
  status: z.enum(intakeStatuses),
  requestType: z.enum(intakeRequestTypes),
  name: z.string(),
  email: z.string(),
  company: z.string(),
  projectType: z.string(),
  budgetRange: z.string(),
  message: z.string(),
  notes: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
}) satisfies z.ZodType<IntakeRequest>;
