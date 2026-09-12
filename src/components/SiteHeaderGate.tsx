"use client";

import {usePathname} from "next/navigation";

import {SiteHeader} from "@/components/SiteHeader";

export function SiteHeaderGate({logoUrl}: {logoUrl?: string | null}) {
  const pathname = usePathname();

  if (
    pathname === "/studio" ||
    pathname.startsWith("/studio/") ||
    pathname === "/portal" ||
    pathname.startsWith("/portal/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/invite/") ||
    pathname.startsWith("/reset-password")
  ) {
    return null;
  }

  return <SiteHeader logoUrl={logoUrl} />;
}
