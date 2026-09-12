import Link from "next/link";
import Image from "next/image";

import {PrivacySettingsButton} from "@/components/analytics/PrivacySettingsButton";

export function SiteFooter({logoUrl}: {logoUrl?: string | null}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-canvas">
      <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand Column */}
          <div>
            <Link aria-label="Chromapages home" className="inline-block w-36 focus-visible:outline-2 focus-visible:outline-teal" href="/">
              <Image alt="Chromapages logo" className="h-auto w-full brightness-0 invert" height={40} src={logoUrl || "/brand/chromapages-logo.svg"} width={300} />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-canvas/70">
              Premium web design and digital product studio for growth-minded service businesses. Bringing digital presence up to the level of the business.
            </p>
            <div className="mt-8">
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-teal px-5 py-2.5 text-xs font-semibold tracking-wide text-canvas uppercase transition-colors hover:bg-teal-400 hover:text-ink focus-visible:outline-2 focus-visible:outline-teal"
                href="/contact"
              >
                Plan Your Digital Upgrade →
              </Link>
            </div>
          </div>

          {/* Navigation Column 1: Solutions */}
          <div>
            <h3 className="font-display text-xs font-semibold tracking-[0.2em] text-teal-400 uppercase">
              Solutions
            </h3>
            <ul className="mt-4 grid gap-2.5 text-sm text-canvas/80">
              <li>
                <Link className="hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal" href="/services">
                  Solutions Overview
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal" href="/services/signature-website">
                  Signature Website
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal" href="/services/landing-page-sprint">
                  Landing Page Sprint
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal" href="/services/digital-product-build">
                  Digital Product Build
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal" href="/services/growth-partnership">
                  Growth Partnership
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal" href="/services/digital-elevation-audit">
                  Digital Elevation Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Overview & Verticals */}
          <div>
            <h3 className="font-display text-xs font-semibold tracking-[0.2em] text-teal-400 uppercase">
              Explore
            </h3>
            <ul className="mt-4 grid gap-2.5 text-sm text-canvas/80">
              <li>
                <Link className="hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal" href="/work">
                  Work & Proof
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal" href="/process">
                  How We Work
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal" href="/insights">
                  Insights & Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Sub-Brands & Routing */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-display text-xs font-semibold tracking-[0.18em] text-canvas uppercase">
              Specialized Divisions
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-canvas/60">
              Chromapages operates dedicated practice teams for specialized service models:
            </p>
            <div className="mt-4 space-y-3">
              <div className="border-l-2 border-indigo-400 pl-3">
                <span className="block text-xs font-semibold text-canvas">BuiltExpert</span>
                <span className="text-[11px] text-canvas/60">For contractors & trade services</span>
              </div>
              <div className="border-l-2 border-teal-400 pl-3">
                <span className="block text-xs font-semibold text-canvas">ServeStrategy</span>
                <span className="text-[11px] text-canvas/60">For churches & non-profits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-canvas/50 sm:flex-row">
          <p>© {currentYear} Chromapages. All rights reserved. Evidence before adjectives.</p>
          <div className="flex items-center gap-6">
            <PrivacySettingsButton />
            <Link className="hover:text-canvas/80 focus-visible:outline-2 focus-visible:outline-teal" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-canvas/80 focus-visible:outline-2 focus-visible:outline-teal" href="/terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
