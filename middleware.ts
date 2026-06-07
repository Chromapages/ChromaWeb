import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("chromaweb_admin_session")?.value;
  const { pathname } = request.nextUrl;

  // Protect /portal-admin routes (except /portal-admin/login)
  if (pathname.startsWith("/portal-admin") && pathname !== "/portal-admin/login") {
    if (session !== "authenticated") {
      return NextResponse.redirect(new URL("/portal-admin/login", request.url));
    }
  }

  // Redirect authenticated users away from /portal-admin/login
  if (pathname === "/portal-admin/login" && session === "authenticated") {
    return NextResponse.redirect(new URL("/portal-admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal-admin/:path*"],
};
