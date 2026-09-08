"use client";

import Link from "next/link";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

const navigation = [
  {href: "/work", label: "Work"},
  {href: "/services", label: "Services"},
  {href: "/process", label: "Process"},
  {href: "/industries", label: "Industries"},
  {href: "/insights", label: "Insights"},
  {href: "/about", label: "About"},
];

export function SiteHeader({logoUrl}: {logoUrl?: string | null}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeMenu = () => {
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-ink/15 bg-canvas lg:h-[72px]" ref={headerRef}>
      <nav aria-label="Primary navigation" className="relative mx-auto grid h-full w-full max-w-main grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 px-3 sm:px-6 lg:grid-cols-[minmax(10rem,1fr)_auto_minmax(10rem,1fr)] lg:px-10">
        <Link aria-label="Chromapages home" className="w-24 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal sm:w-28 lg:w-40" href="/">
          <Image alt="Chromapages logo" className="block h-auto w-full" height={50} priority src={logoUrl || "/brand/chromapages-logo.svg"} width={375} />
        </Link>

        <ul className="col-start-2 hidden items-center gap-6 text-sm font-medium lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link className="text-ink underline-offset-4 hover:text-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link className="col-start-2 inline-flex h-8 items-center justify-center rounded-lg bg-teal px-3 text-[11px] font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo lg:col-start-3 lg:justify-self-end lg:h-10 lg:px-5 lg:text-sm" href="/contact" onClick={closeMenu}>
          <span className="hidden sm:inline">Plan Your Digital Upgrade →</span>
          <span className="sm:hidden">Project Fit →</span>
        </Link>

        <button aria-controls="compact-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} className="col-start-3 inline-grid size-8 place-items-center rounded-sm border border-ink/25 text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal lg:hidden" onClick={() => setIsMenuOpen((isOpen) => !isOpen)} ref={menuButtonRef} type="button">
          <span aria-hidden="true" className="grid gap-1.5">
            <span className="block h-px w-4 bg-current" />
            <span className="block h-px w-4 bg-current" />
            <span className="block h-px w-4 bg-current" />
          </span>
        </button>

        {isMenuOpen ? (
          <div className="absolute inset-x-0 top-full border-b border-ink/15 bg-canvas shadow-[0_12px_24px_rgba(15,17,21,0.08)] lg:hidden" id="compact-navigation">
            <ul className="mx-auto grid max-w-main gap-1 px-3 py-4 sm:px-6">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className="block rounded-sm px-3 py-3 text-base font-medium text-ink hover:bg-ink/5 hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
