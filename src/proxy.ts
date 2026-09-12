import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

import {SESSION_COOKIE_NAME, decodeSessionToken} from "./lib/portal/auth";

export const proxy = (request: NextRequest): NextResponse => {
  const {pathname} = request.nextUrl;

  const isPortal = pathname === "/portal" || pathname.startsWith("/portal/");
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isPortal && !isAdmin) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  if (!sessionCookie?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = decodeSessionToken(sessionCookie.value);
  if (!payload) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing /admin, require staff or studio_admin role
  if (isAdmin && payload.role !== "staff" && payload.role !== "studio_admin") {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  // Apply private caching headers and noindex
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  return response;
};

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
