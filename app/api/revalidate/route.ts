import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";

const marketingPaths: Record<string, true> = {
  "/": true,
  "/about": true,
  "/contact": true,
  "/pricing": true,
  "/privacy-policy": true,
  "/process": true,
  "/services": true,
  "/sitemap.xml": true,
  "/work": true,
};
const detailPath = /^\/(?:services|work)\/[a-z0-9]+(?:-[a-z0-9]+)*$/;
const maxPaths = 50;

const isAllowedPath = (path: unknown): path is string =>
  typeof path === "string" && path.length <= 1024 && (Object.hasOwn(marketingPaths, path) || detailPath.test(path));

type RevalidateBody = {
  secret?: unknown;
  path?: unknown;
  paths?: unknown;
};

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret?.trim()) {
    return Response.json({ success: false, message: "Revalidation unavailable" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as RevalidateBody | null;
  if (
    typeof body?.secret !== "string" ||
    !timingSafeEqual(createHash("sha256").update(body.secret).digest(), createHash("sha256").update(secret).digest())
  ) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const batch = body.paths === undefined ? [] : body.paths;
  const hasSinglePath = body.path !== undefined;
  const paths: unknown[] | null = Array.isArray(batch) && batch.length + Number(hasSinglePath) <= maxPaths
    ? (hasSinglePath ? [body.path, ...batch] : batch)
    : null;
  if (!paths?.length || !paths.every(isAllowedPath)) {
    return Response.json({ success: false, message: "Invalid revalidation paths" }, { status: 400 });
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return Response.json({
    success: true,
    revalidated: paths,
  });
}
