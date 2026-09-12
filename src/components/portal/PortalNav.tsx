"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import React, {useState} from "react";

import type {PortalSession} from "@/lib/portal/types";

export const PortalNav: React.FC<{session: PortalSession}> = ({session}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {href: "/portal", label: "Overview", exact: true},
    {href: "/portal/requests", label: "Requests"},
    {href: "/portal/projects", label: "Projects"},
    {href: "/portal/approvals", label: "Approvals"},
    ...(session.role === "client_owner" || session.isStudioAdmin
      ? [{href: "/portal/team", label: "Team"}]
      : []),
    {href: "/portal/settings", label: "Settings"},
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
    <header className="sticky top-0 z-30 border-b border-ink/15 bg-canvas/95 backdrop-blur-xs">
      <div className="mx-auto max-w-content-wide px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand & Organization */}
          <div className="flex items-center gap-4">
            <Link
              aria-label="Chromapages Portal Overview"
              className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-teal"
              href="/portal"
            >
              <Image
                alt="Chromapages"
                className="h-6 w-auto"
                height={24}
                priority
                src="/brand/chromapages-logo.svg"
                width={120}
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-teal border-l border-ink/20 pl-2">
                Portal
              </span>
            </Link>

            <span
              aria-label={`Current organization: ${session.organizationName}`}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ink/5 border border-ink/10 text-xs font-medium text-ink/80"
              tabIndex={0}
            >
              <span className="size-2 rounded-full bg-teal" />
              {session.organizationName}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav aria-label="Portal Navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-teal ${
                    active
                      ? "bg-ink text-canvas font-semibold shadow-xs"
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

          {/* Right Actions: New Request + User / Logout */}
          <div className="flex items-center gap-3">
            {session.isStaff ? (
              <Link
                aria-label="Switch to Staff Admin Workspace"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo bg-indigo/10 rounded-md border border-indigo/20 hover:bg-indigo/20 focus-visible:outline-2 focus-visible:outline-indigo"
                href="/admin"
              >
                Staff Queue &rarr;
              </Link>
            ) : null}

            <Link
              aria-label="Create New Request"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal text-xs sm:text-sm font-semibold text-white hover:bg-indigo transition-colors focus-visible:outline-2 focus-visible:outline-teal"
              href="/portal/requests/new"
            >
              <span>+</span>
              <span>New Request</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-ink/15">
              <div className="text-right">
                <p className="text-xs font-semibold text-ink leading-tight">
                  {session.displayName}
                </p>
                <p className="text-[10px] text-ink/60 capitalize leading-tight">
                  {session.role.replace("_", " ")}
                </p>
              </div>

              <button
                aria-label="Sign out of customer portal"
                className="px-2.5 py-1 text-xs font-medium text-ink/70 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-teal"
                disabled={isLoggingOut}
                onClick={handleSignOut}
                tabIndex={0}
                type="button"
              >
                {isLoggingOut ? "..." : "Sign Out"}
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              aria-controls="portal-mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Portal Navigation Menu"
              className="lg:hidden p-2 rounded-lg border border-ink/20 text-ink focus-visible:outline-2 focus-visible:outline-teal"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              type="button"
            >
              <span className="block w-4 h-0.5 bg-current mb-1" />
              <span className="block w-4 h-0.5 bg-current mb-1" />
              <span className="block w-4 h-0.5 bg-current" />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen ? (
          <div className="lg:hidden border-t border-ink/10 py-3 space-y-1" id="portal-mobile-menu">
            <div className="px-3 py-1 mb-2 text-xs font-semibold text-ink/60">
              Org: {session.organizationName}
            </div>
            {navItems.map((item) => (
              <Link
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.href, item.exact)
                    ? "bg-ink text-canvas"
                    : "text-ink hover:bg-ink/5"
                }`}
                href={item.href}
                key={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {session.isStaff ? (
              <Link
                className="block px-3 py-2 text-sm font-semibold text-indigo hover:bg-indigo/10 rounded-md"
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Go to Staff Admin &rarr;
              </Link>
            ) : null}
            <div className="pt-3 mt-2 border-t border-ink/10 px-3 flex items-center justify-between">
              <span className="text-xs text-ink/70">{session.displayName}</span>
              <button
                className="text-xs font-semibold text-red-600 hover:underline"
                onClick={handleSignOut}
                type="button"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};
