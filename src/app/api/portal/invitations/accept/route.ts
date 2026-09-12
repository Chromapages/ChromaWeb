import {cookies} from "next/headers";
import {NextResponse} from "next/server";

import {SESSION_COOKIE_NAME, encodeSessionToken} from "@/lib/portal/auth";
import {acceptInvitation} from "@/lib/portal/dataStore";

export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    const body = (await request.json()) as {
      token?: string;
      displayName?: string;
      password?: string;
    };

    if (!body.token || !body.displayName?.trim() || !body.password) {
      return NextResponse.json(
        {error: "Token, display name, and password are required."},
        {status: 400}
      );
    }

    const {user, membership} = acceptInvitation(
      body.token,
      body.displayName.trim(),
      body.password
    );

    const token = encodeSessionToken({
      uid: user.uid,
      email: user.email,
      orgId: membership.organizationId,
      role: membership.role,
      issuedAt: Date.now(),
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 14 * 24 * 60 * 60,
    });

    return NextResponse.json({success: true, user, membership});
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to accept invitation";
    return NextResponse.json({error: msg}, {status: 400});
  }
};
