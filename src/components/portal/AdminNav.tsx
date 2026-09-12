"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import React, {useState} from "react";

import type {PortalSession} from "@/lib/portal/types";

export const AdminNav: React.FC<{session: PortalSession}> = ({session}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    {href: "/admin", label: "Delivery Queue", exact: true},
    {href: "/admin/clients", label: "Clients & Projects"},
  ];

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {method: "POST"});
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActive = (href: string, exact: boolean = false): boolean => {
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-indigo/20 bg-canvas/95 backdrop-blur-xs">
      <div className="mx-auto max-w-content-wide px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              aria-label="Chromapages Staff Delivery Queue"
              className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-indigo"
              href="/admin"
            >
              <Image
                alt="Chromapages"
                className="h-6 w-auto"
                height={24}
                priority
                src="/brand/chromapages-logo.svg"
                width={120}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo bg-indigo/10 px-2 py-0.5 rounded border border-indigo/20">
                Staff Admin
              </span>
            </Link>

            <nav aria-label="Staff Workspace Navigation" className="hidden sm:flex items-center gap-1 ml-4">
              {navItems.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-indigo ${
                      active
                        ? "bg-indigo text-white font-semibold shadow-xs"
                        : "text-ink/75 hover:text-ink hover:bg-ink/5"
                    }`}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              aria-label="View as Client in Portal"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-teal bg-teal/10 rounded-lg border border-teal/20 hover:bg-teal/20 focus-visible:outline-2 focus-visible:outline-teal"
              href="/portal"
            >
              &larr; Client Portal View
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-ink/15">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-ink leading-tight">
                  {session.displayName}
                </p>
                <p className="text-[10px] text-indigo font-bold uppercase tracking-wider leading-tight">
                  {session.isStudioAdmin ? "Studio Admin" : "Staff"}
                </p>
              </div>

              <button
                aria-label="Sign out of staff workspace"
                className="px-2.5 py-1 text-xs font-medium text-ink/70 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo"
                disabled={isLoggingOut}
                onClick={handleSignOut}
                tabIndex={0}
                type="button"
              >
                {isLoggingOut ? "..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
