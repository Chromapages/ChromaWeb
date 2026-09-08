"use client";

import {useRef, useState, useEffect} from "react";
import {ChromaEdge} from "@/components/ui/ChromaEdge";

type ProcessStep = {
  title?: string | null;
  description?: string | null;
} | null;

type HomeProcessProps = {
  section?: {
    eyebrow?: string | null;
    title?: string | null;
    body?: string | null;
  } | null;
  steps?: ProcessStep[] | null;
};

const defaultProcessPhases = [
  {
    numeral: "01",
    phaseTag: "Phase 01 / Alignment",
    title: "Strategy & Architecture",
    description:
      "We deconstruct your market positioning, commercial objectives, and technical constraints to establish a rigorous digital architecture and information flow.",
    specs: [
      {label: "Primary Focus", value: "IA Strategy & Flow Mapping"},
      {label: "Key Artifact", value: "Interactive Wireframes & Sitemap"},
      {label: "Milestone Gate", value: "Architectural Sign-off"},
    ],
    telemetry: "Milestone 01 Verified",
  },
  {
    numeral: "02",
    phaseTag: "Phase 02 / Formulation",
    title: "Bespoke UI & Brand Elevation",
    description:
      "Engineering a high-craft visual identity, typographic hierarchy, and responsive component library designed for market authority and commercial conversion.",
    specs: [
      {label: "Primary Focus", value: "Design System & High-Fi Views"},
      {label: "Key Artifact", value: "Figma Tokens & Interaction Spec"},
      {label: "Milestone Gate", value: "Visual Design Freeze"},
    ],
    telemetry: "Milestone 02 Verified",
  },
  {
    numeral: "03",
    phaseTag: "Phase 03 / Construction",
    title: "Next.js App Router & CMS",
    description:
      "Translating approved designs into clean, end-to-end type-safe web code with sub-second performance targets and autonomous content editing.",
    specs: [
      {label: "Primary Focus", value: "Frontend & Content Systems"},
      {label: "Key Artifact", value: "Edge-Ready Codebase & Schemas"},
      {label: "Milestone Gate", value: "Staging Sandbox Review"},
    ],
    telemetry: "Milestone 03 Verified",
  },
  {
    numeral: "04",
    phaseTag: "Phase 04 / Verification",
    title: "28-Point QA & Hand-Off",
    description:
      "Rigorous multi-device audits, WCAG 2.2 AA accessibility verification, Core Web Vitals profiling, DNS cutover, and comprehensive async team documentation.",
    specs: [
      {label: "Primary Focus", value: "LCP & Accessibility Audit"},
      {label: "Key Artifact", value: "Audit Scorecard & Video Docs"},
      {label: "Milestone Gate", value: "Zero-Downtime Go-Live"},
    ],
    telemetry: "Phase 04 Launch Ready",
  },
];

export function HomeProcess({section, steps}: HomeProcessProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const {scrollLeft, scrollWidth, clientWidth} = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const cardWidth = 380;
    const index = Math.round(scrollLeft / cardWidth);
    setActivePhaseIndex(Math.min(Math.max(index, 0), defaultProcessPhases.length - 1));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, {passive: true});
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({left: -400, behavior: "smooth"});
  };

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({left: 400, behavior: "smooth"});
  };

  const headline =
    section?.title ?? "Engineering without ambiguity. The delivery process.";
  const bodyText =
    section?.body ??
    "A four-stage manufacturing pipeline designed to eliminate scope creep, protect delivery timelines, and guarantee sub-second digital performance.";

  const phases = defaultProcessPhases.map((phase, idx) => {
    const cmsStep = steps?.[idx];
    return {
      ...phase,
      title: cmsStep?.title ?? phase.title,
      description: cmsStep?.description ?? phase.description,
    };
  });

  return (
    <section className="border-t border-white/10 bg-ink text-canvas py-20 lg:py-28 relative overflow-hidden">
      {/* Background blueprint grid styling */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#EFEFED_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto w-full max-w-main px-6 lg:px-10 relative">
        {/* Section Header with Horizontal Track Controls */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                07 / Delivery Process
              </span>
              <span className="h-px w-8 bg-teal/40" />
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl text-canvas">
              {headline}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-canvas/75 sm:text-lg">
              {bodyText}
            </p>
          </div>

          {/* Navigation Controls & Active Phase Indicator */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-canvas/60">
              <span>Phase</span>
              <span className="font-semibold text-teal">0{activePhaseIndex + 1}</span>
              <span>of 0{phases.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollLeft}
                disabled={!canScrollLeft}
                aria-label="Scroll left in process track"
                className="flex size-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-canvas transition-all hover:border-teal hover:bg-white/[0.08] hover:text-teal focus-visible:outline-2 focus-visible:outline-teal disabled:opacity-30 disabled:pointer-events-none active:scale-95"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                disabled={!canScrollRight}
                aria-label="Scroll right in process track"
                className="flex size-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-canvas transition-all hover:border-teal hover:bg-white/[0.08] hover:text-teal focus-visible:outline-2 focus-visible:outline-teal disabled:opacity-30 disabled:pointer-events-none active:scale-95"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Concept 3: The Assembly Line - Horizontal Scrolling Blueprint Cards */}
        <div
          ref={scrollContainerRef}
          className="mt-14 flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory focus-visible:outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Process assembly line steps"
        >
          {phases.map((phase) => (
            <div
              key={phase.numeral}
              className="relative w-[320px] sm:w-[380px] lg:w-[420px] shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xs transition-all hover:border-teal/50 hover:bg-white/[0.04] flex flex-col justify-between overflow-hidden group shadow-lg"
            >
              <ChromaEdge />

              {/* Background Watermark Numeral */}
              <span className="pointer-events-none absolute -right-4 -top-6 font-display text-8xl font-extrabold text-white/[0.03] select-none group-hover:text-teal/[0.06] transition-colors">
                {phase.numeral}
              </span>

              <div>
                {/* Top Phase Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-teal uppercase">
                    {phase.phaseTag}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-canvas/50 uppercase">
                    <span className="size-1.5 rounded-full bg-teal" />
                    Rigorous Gate
                  </span>
                </div>

                {/* Step Title & Narrative */}
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-canvas">
                  {phase.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-canvas/70">
                  {phase.description}
                </p>

                {/* Technical Blueprint Spec Box */}
                <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="space-y-3 text-xs">
                    {phase.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-white/5 pb-2.5 last:border-b-0 last:pb-0">
                        <span className="text-canvas/50">{spec.label}</span>
                        <span className="font-medium text-canvas/90 sm:text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Milestone Telemetry Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-teal/80">
                  {phase.telemetry}
                </span>
                <span className="text-canvas/40 text-[11px]">
                  Phase {phase.numeral} Complete →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Assembly Line Flow Indicator Bar */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-canvas/40">
          <span>Continuous delivery protocol</span>
          <span>Zero-friction stakeholder hand-off</span>
        </div>
      </div>
    </section>
  );
}
