import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeSessionToken, SESSION_COOKIE } from "@/lib/admin-session";

export const POST = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  try {
    await revokeSessionToken(session?.value);
  } catch {
    return NextResponse.json(
      { success: false, message: "Logout could not be confirmed. Please try again." },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ success: true, message: "Logged out successfully." });

  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // expire immediately
    path: "/",
  });

  return response;
};
