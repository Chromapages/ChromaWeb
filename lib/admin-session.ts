// In-memory admin session token store.
//
// LIMITATION: This is a per-process Set. If the Next.js app runs as multiple
// workers/instances (e.g. on Vercel behind a load balancer, or with multiple
// Node processes), a token issued by one instance will not validate on another.
// For v1 (single-process / single-region deploys) this is acceptable. To go
// multi-process, replace the Set with a shared store (Redis, KV, etc.).

import { randomBytes } from "node:crypto";

const SESSION_COOKIE_NAME = "chromaweb_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const validTokens = new Set<string>();

export const createSessionToken = (): string => {
  // 32 random bytes → 64 hex chars. randomBytes is available in Node 16+.
  const token = randomBytes(32).toString("hex");
  validTokens.add(token);
  return token;
};

export const isValidSessionToken = (token: string | undefined | null): boolean => {
  if (!token) return false;
  return validTokens.has(token);
};

export const revokeSessionToken = (token: string | undefined | null): boolean => {
  if (!token) return false;
  return validTokens.delete(token);
};

export const SESSION_COOKIE = SESSION_COOKIE_NAME;
export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
