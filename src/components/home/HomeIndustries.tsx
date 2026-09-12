"use client";

import {useCallback, useRef, useState} from "react";
import Link from "next/link";
import {ChromaEdge} from "@/components/ui/ChromaEdge";

type IndustryCard = {
  title?: string | null;
  slug?: string | null;
};

type HomeIndustriesProps = {
  section?: {
    eyebrow?: string | null;
    title?: string | null;
    body?: string | null;
  } | null;
  industries?: IndustryCard[] | null;
};

type IndustryProfile = {
  id: string;
  numeral: string;
  tabLabel: string;
  badge: string;
  headline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  slug: string;
  ctaText: string;
  challengesSolved: string[];
  capabilities: Array<{
    title: string;
    description: string;
  }>;
};

const industryProfiles: IndustryProfile[] = [
  {
    id: "accounting",
    numeral: "01",
    tabLabel: "Accounting & Tax",
    badge: "High-Trust Advisory",
    headline: "Precision Authority for Accounting & Tax Practices",
    description:
      "Transform your digital presence from a passive firm brochure into an institutional client acquisition engine. We build structured consultation funnels, clear service taxonomies, and partner-level credibility signals that attract and convert high-value corporate clients.",
    imageSrc: "/images/industries/accounting.jpg",
    imageAlt: "Executive accounting and tax advisory office with financial data analytics",
    slug: "accounting-tax",
    ctaText: "Explore Accounting Solutions",
    challengesSolved: [
      "Eliminates generic brochure positioning and establishes modern market authority",
      "Replaces high-friction inquiries with structured qualification and discovery booking",
      "Articulates complex multi-tier tax, audit, and advisory offerings with clean taxonomy",
      "Reassures corporate buyers and HNW clients with compliance-ready, secure UX",
    ],
    capabilities: [
      {title: "Consultation Architecture", description: "Frictionless intake funnels"},
      {title: "Partner-Depth Positioning", description: "Showcase niche practice expertise"},
      {title: "Client Portal UX", description: "Institutional trust & security"},
    ],
  },
  {
    id: "hospitality",
    numeral: "02",
    tabLabel: "Restaurants & Hospitality",
    badge: "Multi-Unit & QSR",
    headline: "High-Conversion Digital Systems for Growing Hospitality Brands",
    description:
      "Whether scaling a multi-location group or elevating a flagship dining destination, we engineer thumb-driven mobile menus, location-aware store finders, catering pipelines, and brand storytelling that drives covers and direct revenue.",
    imageSrc: "/images/industries/restaurant.jpg",
    imageAlt: "Modern open kitchen in high-end restaurant hospitality venue",
    slug: "restaurants-qsr",
    ctaText: "Explore Restaurant Solutions",
    challengesSolved: [
      "Mobile-first ordering and catering journeys engineered for zero checkout friction",
      "Dynamic multi-unit store locators with synchronized operating hours and menus",
      "Editorial visual storytelling that captures dining atmosphere and kitchen craft",
      "Direct digital customer acquisition reducing dependence on 3rd-party aggregators",
    ],
    capabilities: [
      {title: "Thumb-First Mobile UX", description: "Sub-second menu & booking flow"},
      {title: "Multi-Location Engine", description: "Automated hours, maps, and SEO"},
      {title: "Private Dining & Catering", description: "High-margin event lead intake"},
    ],
  },
  {
    id: "advisory",
    numeral: "03",
    tabLabel: "Advisory & Consulting",
    badge: "B2B Transformation",
    headline: "Commercial Clarity for B2B Advisory & Management Firms",
    description:
      "Bridge the divide between your firm's real-world reputation and your digital presentation. We transform complex methodologies into compelling, evidence-backed digital showcases that persuade enterprise C-suite stakeholders.",
    imageSrc: "/images/industries/advisory.jpg",
    imageAlt: "B2B advisory partners collaborating in modern boardroom",
    slug: "professional-services",
    ctaText: "Explore Advisory Solutions",
    challengesSolved: [
      "Translates bespoke methodologies into interactive diagnostic frameworks",
      "Evidence-backed case study architecture featuring verified commercial outcomes",
      "Streamlined qualification paths designed specifically for executive buyers",
      "Sub-second page speeds and flawless responsive delivery across all devices",
    ],
    capabilities: [
      {title: "Methodology Mapping", description: "Visualize proprietary frameworks"},
      {title: "Evidence Showcase", description: "Classified case studies with data"},
      {title: "Executive Inbound Funnel", description: "Diagnostic qualification forms"},
    ],
  },
];

export function HomeIndustries({section}: HomeIndustriesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const total = industryProfiles.length;
      let nextIndex = index;

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        nextIndex = (index + 1) % total;
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        nextIndex = (index - 1 + total) % total;
      } else if (event.key === "Home") {
        event.preventDefault();
        nextIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        nextIndex = total - 1;
      }

      if (nextIndex !== index) {
        setActiveIndex(nextIndex);
        tabRefs.current[nextIndex]?.focus();
      }
    },
    []
  );

  const headline =
    section?.title ?? "Sector-specific architectures engineered for how high-value clients decide.";
  const bodyText =
    section?.body ??
    "Every sector faces distinct commercial hurdles and customer decision cycles. We engineer industry-specific digital architectures designed to overcome friction, build authority, and drive qualified inquiries.";

  const currentProfile = industryProfiles[activeIndex] ?? industryProfiles[0];

  return (
    <section
      className="border-t border-ink/10 bg-canvas text-ink pt-12 pb-12 lg:pt-16 lg:pb-16 relative overflow-hidden"
      aria-label="Sector Focus"
    >
      <div className="mx-auto w-full max-w-content-wide px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              07 / Industry Relevance
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

        {/* Tabbed Persona Container */}
        <div className="mt-12 lg:mt-16 grid gap-8 lg:grid-cols-[minmax(260px,0.3fr)_minmax(0,0.7fr)] lg:items-start">
          {/* Left: Tablist Navigation */}
          <div
            role="tablist"
            aria-label="Industry Categories"
            className="flex flex-row overflow-x-auto pb-2 lg:pb-0 lg:flex-col gap-3"
          >
            {industryProfiles.map((profile, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={profile.id}
                  id={`industry-tab-${profile.id}`}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  aria-selected={isActive}
                  aria-controls={`industry-panel-${profile.id}`}
                  onClick={() => handleSelect(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group relative flex shrink-0 lg:shrink text-left rounded-xl p-4 sm:p-5 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-teal ${
                    isActive
                      ? "border-2 border-indigo bg-paper shadow-md"
                      : "border border-ink/15 bg-paper/60 hover:bg-paper hover:border-ink/30 opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Left accent bar on desktop */}
                  {isActive && (
                    <div className="hidden lg:block absolute left-0 top-3 bottom-3 w-1.5 bg-teal rounded-r" />
                  )}

                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-display text-[11px] font-semibold tracking-[0.18em] uppercase ${
                          isActive ? "text-teal" : "text-ink/60"
                        }`}
                      >
                        {profile.numeral} / {profile.badge}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isActive ? "text-indigo" : "text-ink/40"
                        }`}
                      >
                        →
                      </span>
                    </div>
                    <p
                      className={`mt-1 font-display text-base font-semibold ${
                        isActive ? "text-ink" : "text-ink/80"
                      }`}
                    >
                      {profile.tabLabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Industry Showcase Panel */}
          <article
            key={currentProfile.id}
            id={`industry-panel-${currentProfile.id}`}
            role="tabpanel"
            aria-labelledby={`industry-tab-${currentProfile.id}`}
            tabIndex={0}
            className="relative rounded-2xl border border-ink/15 bg-paper p-6 sm:p-8 lg:p-10 xl:p-12 shadow-[0_6px_24px_rgba(15,17,21,0.04)] focus-visible:outline-none overflow-hidden flex flex-col justify-between"
          >
            <ChromaEdge />

            <div>
              {/* Header with numeral, badges & title */}
              <header>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                    {currentProfile.numeral} / Sector Focus
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-ink/10 bg-ink/5 px-2.5 py-1 text-xs font-semibold text-ink/75">
                      {currentProfile.badge}
                    </span>
                    <span className="rounded-md border border-teal/20 bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">
                      Verified Architecture
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
                  {currentProfile.headline}
                </h3>
              </header>

              {/* Supporting Line */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/75 max-w-3xl">
                {currentProfile.description}
              </p>

              {/* Metadata: Capability Pills & Outcomes */}
              <section className="mt-6 pt-6 border-t border-ink/10" aria-label="Sector Capabilities and Outcomes">
                <p className="font-display text-[11px] font-semibold tracking-[0.18em] text-ink/60 uppercase">
                  Core Capabilities & Systems:
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {currentProfile.capabilities.map((cap, capIdx) => (
                    <span
                      key={capIdx}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-indigo/20 bg-indigo/5 px-3 py-1.5 text-xs font-medium text-indigo"
                    >
                      <span className="text-teal font-bold">✓</span> {cap.title}
                    </span>
                  ))}
                </div>

                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {currentProfile.challengesSolved.map((challenge, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2 text-xs text-ink/75 leading-relaxed">
                      <span className="mt-0.5 text-teal font-bold">◈</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Primary Actions */}
            <footer className="mt-8 pt-6 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Link
                href={`/contact?industry=${currentProfile.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3.5 font-display text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal cursor-pointer w-full sm:w-auto"
              >
                {currentProfile.ctaText} →
              </Link>
              <Link
                href="/work"
                className="text-xs font-semibold text-ink/60 hover:text-teal transition-colors text-center sm:text-left"
              >
                View Industry Case Studies →
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
