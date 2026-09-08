"use client";

import {usePathname} from "next/navigation";

import {SiteFooter} from "@/components/SiteFooter";

export function SiteFooterGate({logoUrl}: {logoUrl?: string | null}) {
  const pathname = usePathname();

  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return null;
  }

  return <SiteFooter logoUrl={logoUrl} />;
}
