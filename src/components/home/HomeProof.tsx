import Link from "next/link";
import {ChromaEdge} from "@/components/ui/ChromaEdge";
import {getClassificationLabel} from "@/components/work/classification";

type CaseStudyCard = {
  title?: string | null;
  slug?: string | null;
  classification?: string | null;
  projectIdentity?: string | null;
  description?: string | null;
};

type HomeProofProps = {
  section?: {
    eyebrow?: string | null;
    title?: string | null;
    body?: string | null;
  } | null;
  caseStudies?: CaseStudyCard[] | null;
};

const panoramicBenchmarks = [
  {
    metric: "< 0.8s LCP",
    title: "Sub-Second Mobile Speed",
    detail: "Fastest mobile rendering engineered with Next.js App Router and static edge caching.",
    tag: "Core Web Vitals 95+",
    icon: "⚡",
  },
  {
    metric: "100% WCAG AA",
    title: "Certified Accessibility",
    detail: "Full screen-reader semantic landmarks, keyboard navigation, and contrast validation.",
    tag: "Inclusive UX Standard",
    icon: "✓",
  },
  {
    metric: "0.00 Layout Shift",
    title: "Zero Content Drift",
    detail: "Absolute layout stability (CLS < 0.05) via explicit asset geometry and minimal client JS.",
    tag: "Visual Precision",
    icon: "◈",
  },
];

const classificationTiers = [
  "Real Public Client",
  "Confidential Client",
  "White-Label Work",
  "Concept Study",
  "Internal Prototype",
  "Owned-Brand Work",
];

export function HomeProof({section, caseStudies}: HomeProofProps) {
  const headline =
    section?.title ?? "Evidence before adjectives.";
  const bodyText =
    section?.body ??
    "Every project states what it is and the limits of the evidence presented. We do not disguise concept work as client outcomes, publish fabricated metrics, or add unverified placeholder logos.";

  const featuredCaseStudy = caseStudies?.length ? caseStudies[0] : null;

  return (
    <section className="border-t border-white/10 bg-ink text-canvas py-20 lg:py-28 relative overflow-hidden">
      <div className="mx-auto w-full max-w-content-wide px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              04 / Selected Work &amp; Proof
            </span>
            <span className="h-px w-8 bg-teal/40" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl text-canvas">
            {headline}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-canvas/75 sm:text-lg">
            {bodyText}
          </p>
        </div>

        {/* Top: 3 Panoramic Benchmark Indicator Tiles */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {panoramicBenchmarks.map((bench) => (
            <div
              key={bench.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-teal/50"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="rounded bg-teal/15 px-2.5 py-1 text-[11px] font-semibold text-teal tracking-wide uppercase">
                    {bench.tag}
                  </span>
                  <span className="text-xs text-canvas/40">{bench.icon}</span>
                </div>
                <p className="mt-5 font-display text-3xl font-semibold text-canvas tracking-tight">
                  {bench.metric}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-canvas/90">
                  {bench.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-canvas/60">
                  {bench.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: Featured Classified Case Study Showcase or Proof Architecture Panel */}
        {featuredCaseStudy?.slug ? (
          <div className="mt-10 relative rounded-2xl border border-teal/40 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 sm:p-12 shadow-[0_12px_32px_rgba(35,105,140,0.12)]">
            <ChromaEdge dark />

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-teal/30 pb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-teal/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-teal uppercase">
                  {featuredCaseStudy.classification
                    ? getClassificationLabel(featuredCaseStudy.classification)
                    : "Classified Engagement"}
                </span>
                {featuredCaseStudy.projectIdentity && (
                  <span className="text-xs text-canvas/60">
                    {featuredCaseStudy.projectIdentity}
                  </span>
                )}
              </div>
              <span className="text-xs text-teal-300 font-medium">
                Verified Case Study
              </span>
            </div>

            <div className="mt-8 max-w-3xl">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-canvas tracking-tight">
                {featuredCaseStudy.title}
              </h3>
              {featuredCaseStudy.description && (
                <p className="mt-4 text-sm leading-relaxed text-canvas/75">
                  {featuredCaseStudy.description}
                </p>
              )}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-canvas/50">
                Evidence Before Adjectives: Verified client outcomes with published classification.
              </p>
              <Link
                href={`/work/${featuredCaseStudy.slug}`}
                className="inline-flex items-center gap-2 font-display text-xs font-semibold text-teal hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal"
              >
                Read Full Case Study →
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 relative rounded-2xl border border-teal/40 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 sm:p-12 shadow-[0_12px_32px_rgba(35,105,140,0.12)]">
            <ChromaEdge dark />

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-teal/30 pb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-teal/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-teal uppercase">
                  Proof Integrity Policy
                </span>
                <span className="text-xs text-canvas/60">
                  Precision in Practice
                </span>
              </div>
              <span className="text-xs text-teal-300 font-medium">
                Evidence Before Adjectives
              </span>
            </div>

            <div className="mt-8 max-w-3xl">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-canvas tracking-tight">
                Every project states what it is and the limits of the evidence presented.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-canvas/75">
                Chromapages strictly prohibits placeholder client logos, fabricated metrics, or disguising concept work as verified client outcomes. Every case study in our index is assigned one of six mandatory classifications.
              </p>
            </div>

            {/* 3 Verification Pillars */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3 rounded-xl bg-ink/60 border border-white/10 p-5 sm:p-6">
              <div className="border-l-2 border-indigo-400 pl-3.5">
                <p className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
                  01 // Real Telemetry
                </p>
                <p className="mt-1.5 text-xs text-canvas/70 leading-relaxed">
                  Speed and performance metrics are measured via real Lighthouse and Core Web Vitals profiling.
                </p>
              </div>
              <div className="border-l-2 border-teal pl-3.5">
                <p className="text-[11px] font-semibold text-teal uppercase tracking-wider">
                  02 // Explicit Scope
                </p>
                <p className="mt-1.5 text-xs text-canvas/70 leading-relaxed">
                  Deliverables, timelines, and commercial contexts are transparently documented on every engagement.
                </p>
              </div>
              <div className="border-l-2 border-canvas/40 pl-3.5">
                <p className="text-[11px] font-semibold text-canvas/90 uppercase tracking-wider">
                  03 // Zero Fabrications
                </p>
                <p className="mt-1.5 text-xs text-canvas/70 leading-relaxed">
                  No invented testimonials or placeholder logos. Only verified work with client consent.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-canvas/50">
                Operating strictly under Chromapages Brand Strategy v1.0 and PRD Claims Policy.
              </p>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-display text-xs font-semibold text-teal hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal"
              >
                Explore Classified Work Index →
              </Link>
            </div>
          </div>
        )}

        {/* 6-Tier Classification Key */}
        <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.18em] text-canvas/80 uppercase">
                The 6 Mandatory Proof Classifications
              </p>
              <p className="text-[11px] text-canvas/50">
                Chromapages never renders an unclassified case study.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {classificationTiers.map((tier) => (
                <span
                  key={tier}
                  className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-canvas/70"
                >
                  {tier}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
