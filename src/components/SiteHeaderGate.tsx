"use client";

import {usePathname} from "next/navigation";

import {SiteHeader} from "@/components/SiteHeader";

export function SiteHeaderGate({logoUrl}: {logoUrl?: string | null}) {
  const pathname = usePathname();

  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return null;
  }

  return <SiteHeader logoUrl={logoUrl} />;
}
