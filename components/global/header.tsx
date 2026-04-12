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
    <header className="sticky top-0 z-50">
      <div className="glass-panel border-b border-primary/5 shadow-soft">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent"
            >
              <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.1" />
              <path
                d="M16 8V24M8 16H24M12 12L20 20M20 12L12 20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-display text-xl font-bold tracking-tight text-primary">
              Chromapages
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {items.slice(0, 4).map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "nav-underline text-sm font-semibold transition-colors",
                    active ? "text-accent" : "text-primary/65 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Button
              href={site.bookingHref}
              analyticsLabel={site.bookingLabel}
              analyticsLocation="header"
              className="px-6"
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
