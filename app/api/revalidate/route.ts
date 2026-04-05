import { revalidatePath } from "next/cache";

type RevalidateBody = {
  secret?: string;
  path?: string;
  paths?: string[];
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RevalidateBody | null;

  if (!body || body.secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const paths = [
    ...(body.path ? [body.path] : []),
    ...(Array.isArray(body.paths) ? body.paths : []),
  ];

  for (const path of paths) {
    revalidatePath(path);
  }

  return Response.json({
    success: true,
    revalidated: paths,
  });
}
