import {cookies} from "next/headers";
import {NextResponse} from "next/server";

import {SESSION_COOKIE_NAME} from "@/lib/portal/auth";

export const POST = async (): Promise<NextResponse> => {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({success: true});
};
