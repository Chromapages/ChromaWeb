"use client";

import {useState, useEffect, useCallback} from "react";
import Link from "next/link";
import {ChromaEdge} from "@/components/ui/ChromaEdge";

type OfferCard = {
  title?: string | null;
  slug?: string | null;
  summary?: string | null;
  investmentRange?: string | null;
};

type HomeOffersProps = {
  section?: {
    eyebrow?: string | null;
    title?: string | null;
    body?: string | null;
  } | null;
  offers?: OfferCard[] | null;
};

const definedEngagements = [
  {
    numeral: "01",
    tagline: "Flagship Upgrade",
    title: "The Signature Website",
    slug: "signature-website",
    description:
      "A complete digital presence transformation for ambitious service businesses ready to elevate their market tier and match their real-world stature.",
    timeline: "8–12 Weeks Delivery",
    deliverables: [
      "Bespoke information architecture & partner-depth positioning strategy",
      "Custom multi-page visual design system tailored to your commercial tier",
      "High-performance Next.js App Router frontend (< 0.8s LCP target)",
      "Tailored content system for autonomous team editing",
      "28-point pre-flight launch QA, WCAG 2.2 AA audit, and SEO migration",
    ],
    diagramNodes: [
      {label: "Brand Strategy & Positioning", status: "Phase 1"},
      {label: "Information Architecture & UX", status: "Phase 2"},
      {label: "Bespoke Design System", status: "Phase 3"},
      {label: "Next.js App Router Build", status: "Phase 4"},
      {label: "Content System Configuration", status: "Phase 5"},
      {label: "Launch QA & Verified Go-Live", status: "Phase 6"},
    ],
  },
  {
    numeral: "02",
    tagline: "High-Velocity Sprint",
    title: "The Landing Page Sprint",
    slug: "landing-page-sprint",
    description:
      "A focused, high-conversion single-page architecture engineered for paid campaigns, new service rollouts, and high-intent customer acquisition.",
    timeline: "2–3 Weeks Delivery",
    deliverables: [
      "Single-funnel conversion architecture with zero distraction pathways",
      "High-impact visual design emphasizing proof, clarity, and authority",
      "Sub-second load times engineered with static edge rendering",
      "Frictionless qualification intake forms integrated with your CRM",
      "Pre-configured Google Analytics 4 event telemetry and heatmapping",
    ],
    diagramNodes: [
      {label: "Campaign Traffic", status: "Inbound"},
      {label: "High-Authority Hero & Value Prop", status: "Engage"},
      {label: "Social Proof & Diagnostic Matrix", status: "Validate"},
      {label: "Frictionless Qualification Form", status: "Convert"},
      {label: "Automated CRM & Notification Sync", status: "Handoff"},
    ],
  },
  {
    numeral: "03",
    tagline: "Platform & Application Build",
    title: "The Digital Product Build",
    slug: "digital-product-build",
    description:
      "Custom web applications, client portals, and interactive digital products engineered for scale, data security, and exceptional user experience.",
    timeline: "10–16 Weeks Delivery",
    deliverables: [
      "Full-stack technical architecture (React/Next.js + TypeScript + Node/Postgres)",
      "Secure authentication, role-based access control (RBAC), and session security",
      "Intuitive dashboard UI with comprehensive responsive component systems",
      "Type-safe API endpoints, schema validation (Zod), and database indexing",
      "Automated CI/CD pipelines and production-ready cloud deployment",
    ],
    diagramNodes: [
      {label: "Client Dashboard & Web UI", status: "Frontend"},
      {label: "Type-Safe Server Actions & API", status: "Backend"},
      {label: "PostgreSQL & Auth Access Rules", status: "Database"},
      {label: "Automated CI/CD Edge Deployment", status: "Infra"},
    ],
  },
];

const AUTO_ADVANCE_MS = 5000;

export function HomeOffers({section, offers}: HomeOffersProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = definedEngagements.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  // 5-second automatic carousel timer with pause-on-hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [isPaused, handleNext, currentIndex]);

  const headline =
    section?.title ?? "Fixed-scope engagements calibrated to your growth inflection point.";
  const bodyText =
    section?.body ??
    "Every engagement is scoped with explicit deliverables, defined milestones, and fixed working parameters. Choose the engagement built for your business inflection point.";

  const currentEngagement = definedEngagements[currentIndex];
  const cmsOffer = offers?.find((o) => o.slug === currentEngagement.slug);
  const title = cmsOffer?.title ?? currentEngagement.title;
  const description = cmsOffer?.summary ?? currentEngagement.description;

  return (
    <section
      className="border-t border-ink/10 bg-canvas text-ink pt-12 pb-12 lg:pt-16 lg:pb-16 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Defined Engagements"
    >
      <div className="mx-auto w-full max-w-main px-6 lg:px-10">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                03 / Defined Engagements
              </span>
              <span className="h-px w-8 bg-teal/40" />
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl text-ink text-balance">
              {headline}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink/75 sm:text-lg">
              {bodyText}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-medium text-ink/50 mr-2">
              <span className="font-semibold text-ink">0{currentIndex + 1}</span> / 0{totalSlides}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous engagement slide"
              className="flex size-11 items-center justify-center rounded-lg border border-ink/20 bg-paper text-ink transition-all hover:border-teal hover:bg-canvas hover:text-teal focus-visible:outline-2 focus-visible:outline-teal active:scale-95"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next engagement slide"
              className="flex size-11 items-center justify-center rounded-lg border border-ink/20 bg-paper text-ink transition-all hover:border-teal hover:bg-canvas hover:text-teal focus-visible:outline-2 focus-visible:outline-teal active:scale-95"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slide Preview Navigation (In place of simple dots) */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3.5" role="tablist" aria-label="Engagement Slide Previews">
          {definedEngagements.map((eng, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={eng.numeral}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(idx)}
                className={`relative text-left rounded-xl p-4 transition-all focus-visible:outline-2 focus-visible:outline-teal ${
                  isActive
                    ? "border-2 border-indigo bg-paper shadow-md"
                    : "border border-ink/15 bg-paper/50 hover:bg-paper hover:border-ink/30 opacity-75 hover:opacity-100"
                }`}
              >
                {/* 5-second Progress Bar Indicator for Active Slide */}
                {isActive && !isPaused && (
                  <div
                    key={`progress-${currentIndex}`}
                    className="absolute top-0 left-0 right-0 h-1 bg-teal rounded-t-xl animate-[pulse_5s_linear]"
                    style={{
                      animation: `expandWidth ${AUTO_ADVANCE_MS}ms linear forwards`,
                    }}
                  />
                )}
                {isActive && isPaused && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-teal rounded-t-xl" />
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`font-display text-[11px] font-semibold tracking-[0.18em] uppercase ${
                      isActive ? "text-teal" : "text-ink/60"
                    }`}
                  >
                    {eng.numeral} / {eng.tagline}
                  </span>
                  <span className="text-[11px] font-medium text-indigo">
                    {eng.timeline.split(" ")[0]}
                  </span>
                </div>
                <p
                  className={`mt-1.5 font-display text-sm font-semibold truncate ${
                    isActive ? "text-ink" : "text-ink/80"
                  }`}
                >
                  {eng.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Slide Display Card (Split Horizon Showcase) */}
        <div
          key={currentEngagement.numeral}
          className="mt-8 relative rounded-2xl border border-ink/15 bg-paper p-8 lg:p-12 shadow-[0_6px_24px_rgba(15,17,21,0.04)] transition-all overflow-hidden animate-fadeIn"
          role="tabpanel"
          aria-label={title}
        >
          <ChromaEdge />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center">
            {/* Left: Editorial Narrative & Deliverables */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                  {currentEngagement.numeral} / {currentEngagement.tagline}
                </span>
                <span className="rounded-full border border-indigo/20 bg-indigo/5 px-3 py-0.5 text-xs font-semibold text-indigo">
                  {currentEngagement.timeline}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink/75">
                {description}
              </p>

              {/* Deliverables Checklist */}
              <div className="mt-8 border-t border-ink/10 pt-6">
                <p className="font-display text-xs font-semibold tracking-[0.18em] text-ink uppercase">
                  Key Deliverables & Scope:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {currentEngagement.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-ink/80">
                      <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-teal/15 text-[10px] font-bold text-teal">
                        ✓
                      </span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-2">
                <Link
                  href={`/services/${currentEngagement.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo px-6 py-3 font-display text-xs font-semibold tracking-wide text-canvas shadow-sm transition-all hover:bg-indigo/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                >
                  Explore Full Scope & Deliverables →
                </Link>
              </div>
            </div>

            {/* Right: Architectural Structural Node Flow */}
            <div className="rounded-xl border border-ink/10 bg-canvas/80 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                <span className="font-display text-[11px] font-semibold tracking-[0.18em] text-ink/60 uppercase">
                  Delivery Architecture
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-teal">
                  <span className="size-1.5 rounded-full bg-teal animate-pulse" />
                  Phase Roadmap
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {currentEngagement.diagramNodes.map((node, nodeIdx) => (
                  <div
                    key={node.label}
                    className="flex items-center justify-between gap-3 rounded-lg border border-ink/10 bg-paper p-3.5 shadow-xs transition-colors hover:border-teal/40"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded bg-ink/[0.04] font-display text-[11px] font-semibold text-indigo">
                        0{nodeIdx + 1}
                      </span>
                      <span className="truncate text-xs font-medium text-ink/85">
                        {node.label}
                      </span>
                    </div>
                    <span className="shrink-0 rounded bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal uppercase tracking-wider">
                      {node.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-ink/10 pt-4 flex items-center justify-between text-[11px] text-ink/50">
                <span>Fixed milestone gating</span>
                <span>Zero-chaos handoff</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
