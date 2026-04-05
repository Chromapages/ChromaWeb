"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/button";
import MobileMenu from "@/components/global/mobile-menu";
import { cn } from "@/lib/utils";
import { navigation as staticNavigation, site } from "@/lib/site";

type HeaderProps = {
  items?: typeof staticNavigation;
};

export default function Header({ items = staticNavigation }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="glass-surface shadow-ambient">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex items-center gap-3 font-display text-lg text-on-surface">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-functional gradient-primary text-sm font-semibold text-white">
              C
            </span>
            <span>{site.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {items.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition hover:text-primary",
                    active ? "text-primary" : "text-on-surface/72",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button
              href={site.bookingHref}
              analyticsLabel={site.bookingLabel}
              analyticsLocation="header"
            >
              {site.bookingLabel}
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-functional bg-surface-container-low text-on-surface md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        onOpenChange={setOpen}
        links={items}
        ctaHref={site.bookingHref}
        ctaLabel={site.bookingLabel}
      />
    </header>
  );
}
