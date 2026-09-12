"use client";

import {usePathname} from "next/navigation";

import {SiteFooter} from "@/components/SiteFooter";

export function SiteFooterGate({logoUrl}: {logoUrl?: string | null}) {
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

  return <SiteFooter logoUrl={logoUrl} />;
}
