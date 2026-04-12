"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import type { NavItem } from "@/lib/site";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: NavItem[];
  ctaHref: string;
  ctaLabel: string;
};

export default function MobileMenu({
  open,
  onOpenChange,
  links,
  ctaHref,
  ctaLabel,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector))
      : [];

    focusables[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange, focusableSelector]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-on-surface/25 backdrop-blur-sm transition duration-300 md:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div
        ref={panelRef}
        id="mobile-menu"
        className={cn(
          "absolute right-0 top-0 h-full w-[min(90vw,24rem)] bg-bg p-8 shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-primary">Menu</span>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-functional bg-surface-2 text-primary"
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="mt-12">
          <ul className="space-y-4">
            {links.slice(0, 4).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => onOpenChange(false)}
                  className="block rounded-functional border border-primary/5 bg-surface-2 px-6 py-5 text-lg font-semibold text-primary transition active:bg-surface-3"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12">
          <Button
            href={ctaHref}
            onClick={() => onOpenChange(false)}
            className="w-full py-4 text-base"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
