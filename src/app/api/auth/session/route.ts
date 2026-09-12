import {cookies} from "next/headers";
import {NextResponse} from "next/server";

import {SESSION_COOKIE_NAME, authenticateUser} from "@/lib/portal/auth";

export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    const body = (await request.json()) as {email?: string; password?: string};
    if (!body.email) {
      return NextResponse.json({error: "Email is required."}, {status: 400});
    }

    const result = authenticateUser(body.email, body.password);
    if ("error" in result) {
      return NextResponse.json({error: result.error}, {status: 401});
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 14 * 24 * 60 * 60, // 14 days
    });

    return NextResponse.json({
      success: true,
      session: result.session,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({error: msg}, {status: 500});
  }
};
