import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSessionToken, SESSION_COOKIE } from "@/lib/admin-session";

export async function proxy(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = await isValidSessionToken(session);
  const { pathname } = request.nextUrl;

  // Protect /portal-admin routes (except /portal-admin/login)
  if (pathname.startsWith("/portal-admin") && pathname !== "/portal-admin/login") {
    if (!authenticated) {
      return NextResponse.redirect(new URL("/portal-admin/login", request.url));
    }
  }

  // Redirect authenticated users away from /portal-admin/login
  if (pathname === "/portal-admin/login" && authenticated) {
    return NextResponse.redirect(new URL("/portal-admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal-admin/:path*"],
};
