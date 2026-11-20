import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/admin-session";

export const POST = async (request: Request) => {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  const expectedPassword = process.env.ADMIN_PASSWORD;

  // Fail-closed: refuse to authenticate if the server-side secret is unset.
  if (!expectedPassword) {
    return NextResponse.json(
      { success: false, message: "Admin login is temporarily unavailable." },
      { status: 503 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json(
      { success: false, message: "Incorrect password." },
      { status: 403 }
    );
  }

  // Constant-time comparison. Buffers must be the same length for timingSafeEqual,
  // so we hash both sides to a fixed-length digest first (avoids the early-length
  // short-circuit that would otherwise leak the password length).
  const a = createHash("sha256").update(password).digest();
  const b = createHash("sha256").update(expectedPassword).digest();
  const ok = timingSafeEqual(a, b);

  if (!ok) {
    return NextResponse.json(
      { success: false, message: "Incorrect password." },
      { status: 403 }
    );
  }

  // Issue a fresh opaque session token and store it server-side.
  let token: string;
  try {
    token = await createSessionToken();
  } catch {
    return NextResponse.json(
      { success: false, message: "Admin login is temporarily unavailable." },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ success: true, message: "Logged in successfully." });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE, // 7 days
    path: "/",
  });

  return response;
};
