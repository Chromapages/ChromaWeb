"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navigation as staticNavigation, site } from "@/lib/site";

type HeaderProps = {
  items?: typeof staticNavigation;
};

export default function Header({ items = staticNavigation }: HeaderProps) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const links = items.filter((item) => item.href !== site.bookingHref);

  const closeMenu = () => {
    const disclosure = menu.current;
    if (disclosure?.open) {
      disclosure.querySelector("summary")?.focus();
      disclosure.open = false;
    }
  };

  function navigationLinks(mobile = false) {
    return links.map(({ href, label }) => {
      const current = pathname === href;
      const active = current || pathname.startsWith(`${href}/`);

      return (
        <Link
          key={href}
          href={href}
          aria-current={current ? "page" : undefined}
          onNavigate={mobile ? closeMenu : undefined}
          className={cn(
            "inline-flex min-h-11 items-center rounded-functional text-sm font-semibold text-ink underline-offset-4 hover:underline",
            active && "text-primary underline",
          )}
        >
          {label}
        </Link>
      );
    });
  }

  return (
    <header className="border-b border-outline bg-bg text-ink">
      <div className="cp-container flex min-h-20 flex-wrap items-center justify-between gap-x-5 gap-y-3 py-4">
        <Link href="/" className="inline-flex min-h-11 items-center font-display text-xl font-bold tracking-tight text-primary">
          <span><span className="text-accent">Chroma</span>pages</span>
        </Link>

        <nav aria-label="Primary" className="hidden flex-wrap items-center gap-x-6 lg:flex">
          {navigationLinks()}
        </nav>

        <Button
          href={site.bookingHref}
          analyticsLabel={site.bookingLabel}
          analyticsLocation="header"
          aria-current={pathname === site.bookingHref ? "page" : undefined}
          className="hidden lg:inline-flex"
        >
          {site.bookingLabel}
        </Button>

        <details ref={menu} className="ms-auto open:basis-full lg:hidden">
          <summary className="ms-auto min-h-11 w-fit cursor-pointer rounded-functional border border-control px-4 py-2 text-sm font-semibold">
            Menu
          </summary>
          <nav aria-label="Primary" className="flex flex-col gap-2 pt-4">
            {navigationLinks(true)}
            <Button
              href={site.bookingHref}
              analyticsLabel={site.bookingLabel}
              analyticsLocation="mobile-menu"
              aria-current={pathname === site.bookingHref ? "page" : undefined}
              onClick={(event) => {
                if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                  closeMenu();
                }
              }}
              className="self-start"
            >
              {site.bookingLabel}
            </Button>
          </nav>
        </details>
      </div>
    </header>
  );
}
