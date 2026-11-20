import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/lib/sanity/client";

export const SESSION_COOKIE = "chromaweb_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const getSessionClient = () => {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) throw new Error("Admin session storage is unavailable.");

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false, timeout: 10_000, maxRetries: 0 });
};

const sessionId = (token: string) =>
  `adminSession.${createHash("sha256").update(token).digest("hex")}`;

const hasTokenFormat = (token: string | undefined | null): token is string =>
  typeof token === "string" && /^[a-f0-9]{64}$/.test(token);

export const createSessionToken = async (): Promise<string> => {
  const token = randomBytes(32).toString("hex");
  await getSessionClient().create(
    {
      _id: sessionId(token),
      _type: "adminSession",
      expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000).toISOString(),
    },
    { visibility: "sync" }
  );
  return token;
};

export const isValidSessionToken = async (token: string | undefined | null): Promise<boolean> => {
  if (!hasTokenFormat(token)) return false;

  try {
    const session = await getSessionClient().fetch<{ expiresAt: string } | null>(
      '*[_id == $id && _type == "adminSession"][0]{expiresAt}',
      { id: sessionId(token) },
      { cache: "no-store" }
    );
    return !!session && Date.parse(session.expiresAt) > Date.now();
  } catch {
    return false;
  }
};

export const revokeSessionToken = async (token: string | undefined | null): Promise<void> => {
  if (!hasTokenFormat(token)) return;
  await getSessionClient().delete(sessionId(token), { visibility: "sync" });
};
