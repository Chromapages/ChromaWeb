"use client";

import {useState} from "react";
import Link from "next/link";
import {ChromaEdge} from "@/components/ui/ChromaEdge";

type HomeStandardData = {
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
};

const standardsData = [
  {
    id: "01",
    numeral: "01",
    name: "Look Premium",
    shortTagline: "Visual authority that reflects real stature",
    outcome: "Make the digital presence reflect the true quality and maturity of the business.",
    requirements: [
      "Custom Plus Jakarta Sans & Inter typographic scale with strict geometric spatial rhythm.",
      "3-layer system elevation (PageStack) with precision Indigo & Teal dual-line accents.",
      "High-contrast 70% light canvas / 30% dark anchor balance that rejects template genericism.",
    ],
    proofBadges: ["WCAG 2.2 AA Contrast", "Next/Font Zero-CLS", "Bespoke Design Tokens"],
    footnote: "Every visual element is bespoke to the firm's commercial tier—no generic page builder templates.",
  },
  {
    id: "02",
    numeral: "02",
    name: "Convert Clearly",
    shortTagline: "Direct pathways to high-value action",
    outcome: "Create an effortless path from first impression to meaningful customer engagement.",
    requirements: [
      "Prominent, uncluttered primary conversion triggers calibrated to buyer intent.",
      "High-intent qualification forms structured around business triggers and working budgets.",
      "Unambiguous partner depth and positioning so buyers understand value before the first call.",
    ],
    proofBadges: ["Zero Buried Actions", "Server-Validated Forms", "High-Intent Qualification"],
    footnote: "Conversion architecture engineered around how sophisticated clients actually make buying decisions.",
  },
  {
    id: "03",
    numeral: "03",
    name: "Load Fast",
    shortTagline: "Sub-second speed that respects attention",
    outcome: "Build a responsive, stable experience that respects the customer's time and device.",
    requirements: [
      "Next.js App Router with server components and static pre-rendering (SSG).",
      "Automated responsive image optimization with modern formats (AVIF/WebP) and priority LCP.",
      "Minimal client JavaScript payloads designed to maintain a CLS < 0.05 target.",
    ],
    proofBadges: ["< 0.8s LCP Target", "CLS < 0.05 Target", "100% Type-Safe SSR"],
    footnote: "Tested against rigorous Core Web Vitals benchmarks across real mobile network conditions.",
  },
  {
    id: "04",
    numeral: "04",
    name: "Launch Clean",
    shortTagline: "Zero-chaos deployment and strict QA",
    outcome: "Control scope, approvals, testing, analytics, and deployment with zero vendor drift.",
    requirements: [
      "28-point pre-flight launch checklist covering SEO, redirects, OpenGraph, and analytics.",
      "WCAG 2.2 AA accessibility target with keyboard navigation, focus states, and screen-reader checks.",
      "Staged deployment protocol on edge CDN infrastructure with zero downtime.",
    ],
    proofBadges: ["28-Point Pre-Flight QA", "WCAG 2.2 AA Target", "Zero-Downtime Edge CDN"],
    footnote: "Zero unverified deployments. Every project launches through structured milestone gates.",
  },
  {
    id: "05",
    numeral: "05",
    name: "Keep Improving",
    shortTagline: "Continuous evolution based on real data",
    outcome: "Use post-launch visitor telemetry to determine what should improve next.",
    requirements: [
      "Privacy-conscious GA4 event telemetry measuring form completions and navigation flow.",
      "Structured content models enabling autonomous client edits without developer tickets.",
      "Dedicated monthly Growth Partnership capacity for continuous conversion and component evolution.",
    ],
    proofBadges: ["Content Autonomy", "Event Telemetry Tagging", "Quarterly Roadmap Review"],
    footnote: "Launch is a milestone, not the end of the partnership. Continuous evolution keeps the site ahead.",
  },
];

const panoramicBenchmarks = [
  {
    metric: "< 0.8s LCP",
    title: "Sub-Second Mobile Speed",
    detail: "Fastest mobile rendering engineered with Next.js App Router and static edge caching.",
    tag: "Core Web Vitals 95+",
  },
  {
    metric: "100% WCAG AA",
    title: "Certified Accessibility",
    detail: "Full screen-reader semantic landmarks, keyboard navigation, and contrast validation.",
    tag: "Inclusive UX Standard",
  },
  {
    metric: "0.00 Layout Shift",
    title: "Zero Content Drift",
    detail: "Absolute layout stability (CLS < 0.05) via explicit asset geometry and minimal client JS.",
    tag: "Visual Precision",
  },
];

export function HomeStandard({section}: {section?: HomeStandardData | null}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStandard = standardsData[activeIndex];

  const headline =
    section?.title ?? "Five operating standards. Zero unverified claims.";
  const bodyText =
    section?.body ??
    "The Chromapages Standard is our operating system. Every engagement is governed by five non-negotiable principles backed by audited technical benchmarks that eliminate risk and deliver enduring authority.";

  return (
    <section className="border-t border-ink/10 bg-canvas text-ink pt-12 pb-20 lg:pt-16 lg:pb-28">
      <div className="mx-auto w-full max-w-main px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              04 / The Standard & Evidence
            </span>
            <span className="h-px w-8 bg-teal/40" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl text-ink text-balance">
            {headline}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-ink/75 sm:text-lg">
            {bodyText}
          </p>
        </div>

        {/* 3 Panoramic Benchmark Indicator Tiles */}
        <div className="mt-12 lg:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {panoramicBenchmarks.map((bench) => (
            <div
              key={bench.title}
              className="rounded-xl border border-ink/15 bg-paper p-6 shadow-xs flex flex-col justify-between transition-colors hover:border-teal/50"
            >
              <div>
                <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                  <span className="rounded bg-teal/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal tracking-wide uppercase">
                    {bench.tag}
                  </span>
                  <span className="text-xs font-semibold text-indigo">Audited</span>
                </div>
                <p className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                  {bench.metric}
                </p>
                <h3 className="mt-1.5 text-sm font-semibold text-ink/90">
                  {bench.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink/65">
                  {bench.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive 5-Pillar Operating Matrix */}
        <div className="mt-12 lg:mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start">
          {/* Left: 5-Pillar Vertical Selector */}
          <div className="space-y-3" role="tablist" aria-label="The Chromapages Standards">
            {standardsData.map((std, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={std.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left rounded-xl p-5 transition-all focus-visible:outline-2 focus-visible:outline-teal ${
                    isActive
                      ? "border-2 border-indigo bg-paper shadow-md translate-x-1"
                      : "border border-ink/15 bg-canvas hover:border-ink/30 hover:bg-paper/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-display text-xs font-semibold tracking-[0.18em] uppercase ${
                        isActive ? "text-teal" : "text-ink/60"
                      }`}
                    >
                      {std.numeral} / Pillar
                    </span>
                    {isActive ? (
                      <span className="size-2 rounded-full bg-teal animate-pulse" />
                    ) : null}
                  </div>
                  <span
                    className={`mt-2 font-display text-lg font-semibold block ${
                      isActive ? "text-ink" : "text-ink/80"
                    }`}
                  >
                    {std.name}
                  </span>
                  <p className="mt-1 text-xs text-ink/60 line-clamp-1">
                    {std.shortTagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Active Operating Blueprint Display Card */}
          <div className="relative rounded-2xl border border-ink/20 bg-paper p-8 sm:p-12 shadow-[0_12px_32px_rgba(15,17,21,0.06)]">
            <ChromaEdge />

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
              <div>
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                  Standard {activeStandard.numeral} In Practice
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {activeStandard.name}
                </h3>
              </div>
              <span className="rounded-full border border-indigo/20 bg-indigo/10 px-3.5 py-1 text-xs font-semibold text-indigo">
                Operating Principle
              </span>
            </div>

            {/* Plain-Language Outcome */}
            <div className="mt-6">
              <p className="font-display text-lg font-medium text-indigo">
                &ldquo;{activeStandard.outcome}&rdquo;
              </p>
            </div>

            {/* Operating Requirements */}
            <div className="mt-8">
              <p className="font-display text-xs font-semibold tracking-[0.18em] text-ink uppercase">
                Operating Requirements & Protocols:
              </p>
              <ul className="mt-4 space-y-3.5">
                {activeStandard.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                    <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-teal/15 text-[10px] font-bold text-teal">
                      ✓
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification Proof Badges */}
            <div className="mt-8 border-t border-ink/10 pt-6">
              <p className="font-display text-xs font-semibold tracking-[0.18em] text-ink/60 uppercase">
                Technical Verification Tags:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeStandard.proofBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md border border-indigo/20 bg-indigo/5 px-3 py-1 text-xs font-medium text-indigo"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Footnote & Link */}
            <div className="mt-8 rounded-lg bg-ink/[0.03] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-l-2 border-teal">
              <p className="text-xs text-ink/70 leading-relaxed max-w-md">
                {activeStandard.footnote}
              </p>
              <Link
                href="/process"
                className="shrink-0 text-xs font-semibold text-teal hover:text-indigo focus-visible:outline-2 focus-visible:outline-teal"
              >
                Read Full Standard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
