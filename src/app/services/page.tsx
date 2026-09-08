import type {Metadata} from "next";
import Link from "next/link";
import {buildMetadata} from "@/lib/seo";
import {ChromaEdge} from "@/components/ui/ChromaEdge";
import {PageHero} from "@/components/content/PagePrimitives";
import {ServiceDecisionAid} from "@/components/services/ServiceDecisionAid";

export const metadata: Metadata = buildMetadata({
  title: "Services & Engagements",
  description: "Defined digital upgrade engagements for service businesses that have outgrown their existing websites.",
  path: "/services",
});

// Stage 1: Diagnostic Entry Ramp
const diagnosticService = {
  slug: "digital-elevation-audit",
  anchorId: "offer-digital-elevation-audit",
  stageNumber: "Stage 01 / Diagnostic Entry",
  title: "Digital Elevation Audit",
  categoryBadge: "Best first step when scope is unclear",
  triggerQuote: "When you know your digital presence underperforms, but the scope is unclear.",
  outcome: "A forensic evaluation of technical debt, accessibility, and conversion leaks with a fixed-scope upgrade roadmap.",
  deliverables: [
    "28-point forensic diagnostic across UX, accessibility, SEO & code health",
    "Executive conversion audit identifying high-friction dropoff points",
    "Lighthouse & Core Web Vitals technical performance benchmarks",
    "Prioritized remediation roadmap with fixed-scope upgrade recommendations",
  ],
  range: "$2,500 – $5,000",
  timeline: "10 Business Days",
  primaryCta: {
    label: "Order 10-Day Audit →",
    href: "/contact?service=digital-elevation-audit",
  },
};

// Stage 2: Core Flagship Foundation
const flagshipService = {
  slug: "signature-website",
  anchorId: "offer-signature-website",
  stageNumber: "Stage 02 / Core Flagship",
  title: "Signature Website",
  categoryBadge: "Core Flagship Engagement",
  triggerQuote: "When your business has outgrown its website and needs to command premium pricing.",
  outcome: "A high-authority digital flagship that commands premium rates, builds executive trust, and eliminates friction.",
  deliverables: [
    "Bespoke information architecture & 8–12 custom page templates",
    "Headless Next.js App Router engineering with a <0.8s LCP target",
    "Structured content system setup with full team publishing autonomy",
    "28-point pre-flight launch QA (WCAG 2.2 AA accessibility & technical SEO)",
  ],
  range: "$18,000 – $35,000",
  timeline: "8–12 Weeks",
  primaryCta: {
    label: "Plan Signature Build →",
    href: "/contact?service=signature-website",
  },
};

// Stage 3: Velocity Sprint
const sprintService = {
  slug: "landing-page-sprint",
  anchorId: "offer-landing-page-sprint",
  stageNumber: "Stage 03 / Velocity Sprint",
  title: "Landing Page Sprint",
  categoryBadge: "High-Velocity Single-Funnel",
  triggerQuote: "When the paid campaign is ready but the conversion destination isn't.",
  outcome: "A high-conversion single-funnel destination calibrated to maximize return on active ad spend.",
  specMatrix: [
    {
      code: "01 / FUNNEL",
      title: "Conversion Architecture",
      desc: "Dedicated single-offer narrative & high-converting wireframing",
    },
    {
      code: "02 / VELOCITY",
      title: "Sub-800ms Engineering",
      desc: "High-speed Next.js build with mobile-optimized tap targets",
    },
    {
      code: "03 / TESTING",
      title: "Split-Testing Hook",
      desc: "Multi-variant hero testing & analytics event tracking",
    },
    {
      code: "04 / ROUTING",
      title: "Automated Lead Routing",
      desc: "Direct lead delivery to CRM / email dispatch workflows",
    },
  ],
  range: "$6,500 – $12,000",
  timeline: "2–3 Weeks",
  primaryCta: {
    label: "Reserve Sprint Window →",
    href: "/contact?service=landing-page-sprint",
  },
};

// Stage 4: Digital Product Build (Phased Offer)
const productBuildService = {
  slug: "digital-product-build",
  anchorId: "offer-digital-product-build",
  stageNumber: "Stage 04 / Custom Systems",
  title: "Digital Product Build",
  categoryBadge: "Custom Systems & Portals",
  triggerQuote: "Best when standard off-the-shelf software breaks under your specific operational workflows.",
  outcome: "Proprietary software assets, client portals, and automated dashboards that streamline business operations.",
  phasedStructure: {
    phase1: {
      code: "PHASE 01 / DISCOVERY",
      name: "Paid Technical Discovery",
      price: "$7.5k – $15k",
      timeline: "2–3 Weeks",
      scope: "Full system architecture, database schema, wireframes, and fixed-price build proposal.",
      enables: "Enables executive build/no-build decision with zero architecture ambiguity.",
    },
    phase2: {
      code: "PHASE 02 / BUILD",
      name: "Custom Application Build",
      price: "$40k – $100k+",
      timeline: "Phased Milestones",
      scope: "Full-stack Next.js, Node/Python, Postgres, RBAC, CI/CD pipelines, automated tests & QA.",
      enables: "Triggered upon Phase 1 completion; delivers production-ready web application.",
    },
    justification: "Discovery is required first to eliminate technical uncertainty and lock in fixed milestone pricing before build commencement.",
  },
  primaryCta: {
    label: "Book Phase 1 Discovery →",
    href: "/contact?service=digital-product-build",
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* Unified Concept 1 Split Hero Section */}
      <PageHero
        asideCard={{
          eyebrow: "Delivery Framework",
          title: "Fixed Scope & Clear Timelines",
          items: [
            {label: "Core Engagement", value: "Signature Website"},
            {label: "Standard Timeline", value: "8–12 Weeks Delivery"},
            {label: "Investment Guidance", value: "$18k – $35k Range"},
            {label: "Technical Standard", value: "WCAG 2.2 AA / < 0.8s LCP"},
          ],
        }}
        body="We structure our work as defined commercial engagements with clear scopes, timelines, and deliverables—delivering a premium result through a controlled, launch-safe process."
        eyebrow="Defined Engagements"
        numeral="01"
        title="Choose an engagement calibrated to your business situation."
      />

      {/* Main Services Journey Section */}
      <section className="bg-canvas py-16 lg:py-24">
        <div className="mx-auto w-full max-w-main space-y-12 px-6 lg:px-10">
          
          {/* Step 4: Neutral 3-Question Decision Aid */}
          <ServiceDecisionAid />

          {/* Section Narrative Intro */}
          <div className="max-w-3xl pt-4">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              Buyer Journey &amp; Engagement Architecture
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl text-balance">
              Four distinct engagement stages. Zero ambiguous scope.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/80">
              Select the engagement matched to your current scope clarity and timeline urgency. Every project operates under fixed-fee milestone gating with guaranteed deliverables.
            </p>
          </div>

          {/* Semantic List of Engagements */}
          <ul
            className="space-y-12 list-none p-0 m-0"
            role="list"
            aria-label="Service engagements lineup"
          >
            {/* STAGE 1: Diagnostic Entry Ramp -> Concept 2: Two-Column Split Terminal */}
            <li role="listitem" className="list-none">
              <div
                id={diagnosticService.anchorId}
                className="relative rounded-2xl border border-indigo/20 bg-white p-7 sm:p-9 shadow-xs"
              >
                <ChromaEdge />
                
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  {/* Left Bay: Strategy & Diagnostic Trigger */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                        {diagnosticService.stageNumber}
                      </span>
                      <span className="rounded-full border border-teal/25 bg-teal/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal">
                        {diagnosticService.categoryBadge}
                      </span>
                    </div>

                    <p className="mt-4 font-display text-base font-semibold text-indigo sm:text-lg">
                      &ldquo;{diagnosticService.triggerQuote}&rdquo;
                    </p>

                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                      {diagnosticService.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-ink/80 sm:text-base">
                      {diagnosticService.outcome}
                    </p>

                    <p className="mt-4 text-xs text-ink/75 leading-relaxed">
                      Recommended before committing to multi-month rebuilds when existing conversion dropoffs are suspected but lack empirical diagnostic data.
                    </p>
                  </div>

                  {/* Right Bay: Elevated Deliverables & Action Panel */}
                  <div className="flex flex-col justify-between rounded-xl border border-ink/10 bg-paper p-6 sm:p-7 shadow-xs">
                    <div>
                      <h4 className="font-display text-[11px] font-semibold tracking-[0.18em] text-ink uppercase">
                        Audit Deliverables:
                      </h4>
                      <ul className="mt-3.5 space-y-2.5 text-xs text-ink/80 list-none p-0">
                        {diagnosticService.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-teal font-bold shrink-0" aria-hidden="true">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-ink/10 pt-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="rounded-full border border-indigo/20 bg-indigo/10 px-3.5 py-1 text-xs font-semibold text-indigo">
                          {diagnosticService.range}
                        </span>
                        <span className="text-xs font-medium text-ink/75">
                          {diagnosticService.timeline}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link
                          className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center rounded-lg bg-teal px-5 py-2.5 text-xs font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                          href={diagnosticService.primaryCta.href}
                          aria-label="Order 10-day Digital Elevation Audit"
                        >
                          {diagnosticService.primaryCta.label}
                        </Link>
                        <Link
                          className="inline-flex min-h-[44px] items-center text-xs font-semibold text-teal hover:text-indigo underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                          href={`/services/${diagnosticService.slug}`}
                          aria-label="Full scope breakdown for Digital Elevation Audit"
                        >
                          Full Scope Breakdown →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* STAGE 2: Core Flagship Foundation -> Concept 2: Two-Column Split Terminal */}
            <li role="listitem" className="list-none">
              <div
                id={flagshipService.anchorId}
                className="relative rounded-2xl border-2 border-indigo/30 bg-white p-8 sm:p-12 shadow-sm"
              >
                <ChromaEdge />
                
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  {/* Left Bay: Strategy & Executive Stature */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                        {flagshipService.stageNumber}
                      </span>
                      <span className="rounded-full border border-indigo/25 bg-indigo/10 px-3 py-0.5 text-xs font-semibold text-indigo">
                        {flagshipService.categoryBadge}
                      </span>
                    </div>

                    <p className="mt-4 font-display text-lg font-semibold text-indigo sm:text-xl">
                      &ldquo;{flagshipService.triggerQuote}&rdquo;
                    </p>

                    <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                      {flagshipService.title}
                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-ink/80">
                      {flagshipService.outcome}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-ink/[0.03] px-3.5 py-1.5 border border-ink/10 text-xs text-ink/80">
                      <span className="font-semibold text-teal">Ideal for:</span>
                      <span>Established firms ($1M–$10M revenue) upgrading market stature</span>
                    </div>
                  </div>

                  {/* Right Bay: Elevated Scope & Commitment Panel */}
                  <div className="flex flex-col justify-between rounded-xl border border-ink/10 bg-paper p-6 sm:p-8 shadow-xs">
                    <div>
                      <h4 className="font-display text-xs font-semibold tracking-[0.18em] text-ink uppercase">
                        Flagship Inclusions:
                      </h4>
                      <ul className="mt-4 space-y-3 text-xs text-ink/80 list-none p-0">
                        {flagshipService.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-teal font-bold shrink-0" aria-hidden="true">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-ink/10 pt-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                        <span className="rounded-full border border-indigo/20 bg-indigo/10 px-4 py-1.5 text-xs font-semibold text-indigo">
                          {flagshipService.range}
                        </span>
                        <span className="text-xs font-medium text-ink/75">
                          {flagshipService.timeline}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <Link
                          className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center rounded-lg bg-teal px-5 py-2.5 text-xs font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                          href={flagshipService.primaryCta.href}
                          aria-label="Plan Signature Website build"
                        >
                          {flagshipService.primaryCta.label}
                        </Link>
                        <Link
                          className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-semibold text-teal hover:text-indigo underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                          href={`/services/${flagshipService.slug}`}
                          aria-label="Full scope breakdown for Signature Website"
                        >
                          Full Scope Breakdown →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* STAGES 3 & 4: Speed & Systems Grid -> Concept 1: Blueprint Spec Sheet */}
            <li role="listitem" className="list-none">
              <ul
                className="grid gap-8 lg:grid-cols-2 items-stretch list-none p-0 m-0"
                role="list"
                aria-label="Specialized engagement sprints"
              >
                {/* Stage 3: Landing Page Sprint (Blueprint Spec Sheet) */}
                <li role="listitem" className="list-none flex">
                  <div
                    id={sprintService.anchorId}
                    className="relative flex w-full flex-col justify-between rounded-xl border border-ink/15 bg-paper p-7 sm:p-8 transition-all hover:border-indigo/40 hover:shadow-md"
                  >
                    <div className="flex-1 flex flex-col">
                      {/* Element 1: Category / Number */}
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                          {sprintService.stageNumber}
                        </span>
                        <span className="rounded-full border border-teal/20 bg-teal/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal">
                          {sprintService.categoryBadge}
                        </span>
                      </div>

                      {/* Element 2: Buyer Trigger (Leading Hook) */}
                      <p className="mt-4 font-display text-sm font-semibold text-indigo">
                        &ldquo;{sprintService.triggerQuote}&rdquo;
                      </p>

                      {/* Element 3: Service Title */}
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
                        {sprintService.title}
                      </h3>

                      {/* Element 4: One-Sentence Outcome */}
                      <p className="mt-3 text-sm leading-relaxed text-ink/80">
                        {sprintService.outcome}
                      </p>

                      {/* Element 5: Concept 1 Modular Spec Matrix */}
                      <div className="mt-6 border-t border-ink/10 pt-4">
                        <h4 className="font-display text-[11px] font-semibold tracking-[0.18em] text-ink uppercase mb-3">
                          Blueprint Deliverables:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2.5">
                          {sprintService.specMatrix.map((spec, idx) => (
                            <div key={idx} className="rounded-lg bg-ink/[0.03] border border-ink/10 p-3 flex flex-col justify-between">
                              <span className="font-display text-[10px] font-bold tracking-wider text-teal uppercase">
                                {spec.code}
                              </span>
                              <p className="mt-1 text-xs font-semibold text-ink">
                                {spec.title}
                              </p>
                              <p className="mt-1 text-[11px] text-ink/75 leading-snug">
                                {spec.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Elements 6 & 7: Investment & Timeline + Pinned CTA Footer */}
                    <div className="mt-auto pt-6 border-t border-ink/10">
                      {/* Element 6: Investment & Timeline */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="rounded-full border border-indigo/20 bg-indigo/10 px-3 py-1 text-xs font-semibold text-indigo">
                          {sprintService.range}
                        </span>
                        <span className="text-xs font-medium text-ink/75">
                          {sprintService.timeline}
                        </span>
                      </div>

                      {/* Element 7: Clear CTA */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link
                          className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                          href={sprintService.primaryCta.href}
                          aria-label="Reserve Landing Page Sprint window"
                        >
                          {sprintService.primaryCta.label}
                        </Link>
                        <Link
                          className="inline-flex min-h-[44px] items-center text-xs font-semibold text-teal hover:text-indigo underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                          href={`/services/${sprintService.slug}`}
                          aria-label="Full scope breakdown for Landing Page Sprint"
                        >
                          Full Breakdown →
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Stage 4: Digital Product Build (Blueprint Phased Spec Sheet) */}
                <li role="listitem" className="list-none flex">
                  <div
                    id={productBuildService.anchorId}
                    className="relative flex w-full flex-col justify-between rounded-xl border border-ink/15 bg-paper p-7 sm:p-8 transition-all hover:border-indigo/40 hover:shadow-md"
                  >
                    <div className="flex-1 flex flex-col">
                      {/* Element 1: Category / Number */}
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                          {productBuildService.stageNumber}
                        </span>
                        <span className="rounded-full border border-teal/20 bg-teal/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal">
                          {productBuildService.categoryBadge}
                        </span>
                      </div>

                      {/* Element 3: Service Title */}
                      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink">
                        {productBuildService.title}
                      </h3>

                      {/* Element 2: Buyer Trigger (As "Best when" qualifier) */}
                      <p className="mt-2 text-xs font-medium text-indigo sm:text-sm">
                        {productBuildService.triggerQuote}
                      </p>

                      {/* Element 4: One-Sentence Outcome */}
                      <p className="mt-3 text-sm leading-relaxed text-ink/80">
                        {productBuildService.outcome}
                      </p>

                      {/* Step 4 Exception: Elements 5 & 6 Phased Spec Grid (Responsive 2-col at tablet, stacked at mobile & desktop) */}
                      <div className="mt-5 border-t border-ink/10 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
                          {/* Phase 1 Discovery Box */}
                          <div className="rounded-lg bg-ink/[0.03] p-3.5 border border-ink/10 text-xs flex flex-col justify-between">
                            <div>
                              <div className="flex flex-wrap items-center justify-between gap-2 font-semibold text-ink">
                                <span className="font-display text-[10px] font-bold tracking-wider text-teal uppercase block">
                                  {productBuildService.phasedStructure.phase1.code}
                                </span>
                                <span className="rounded-md bg-indigo/10 border border-indigo/20 px-2 py-0.5 text-[11px] font-semibold text-indigo">
                                  {productBuildService.phasedStructure.phase1.price}
                                </span>
                              </div>
                              <h4 className="mt-1 font-bold text-ink text-sm">{productBuildService.phasedStructure.phase1.name}</h4>
                              <p className="mt-2 text-[11px] text-ink/75 leading-snug">
                                {productBuildService.phasedStructure.phase1.scope}
                              </p>
                            </div>
                            <p className="mt-2 text-[11px] font-medium text-teal">
                              ↳ {productBuildService.phasedStructure.phase1.enables}
                            </p>
                          </div>

                          {/* Phase 2 Build Box */}
                          <div className="rounded-lg bg-ink/[0.03] p-3.5 border border-ink/10 text-xs flex flex-col justify-between">
                            <div>
                              <div className="flex flex-wrap items-center justify-between gap-2 font-semibold text-ink">
                                <span className="font-display text-[10px] font-bold tracking-wider text-ink/60 uppercase block">
                                  {productBuildService.phasedStructure.phase2.code}
                                </span>
                                <span className="rounded-md bg-indigo/10 border border-indigo/20 px-2 py-0.5 text-[11px] font-semibold text-indigo">
                                  {productBuildService.phasedStructure.phase2.price}
                                </span>
                              </div>
                              <h4 className="mt-1 font-bold text-ink text-sm">{productBuildService.phasedStructure.phase2.name}</h4>
                              <p className="mt-2 text-[11px] text-ink/75 leading-snug">
                                {productBuildService.phasedStructure.phase2.scope}
                              </p>
                            </div>
                            <p className="mt-2 text-[11px] font-medium text-ink">
                              ↳ {productBuildService.phasedStructure.phase2.enables}
                            </p>
                          </div>
                        </div>

                        {/* Phased Justification Note */}
                        <p className="mt-3 text-[11px] text-ink/70 italic leading-relaxed">
                          *{productBuildService.phasedStructure.justification}
                        </p>
                      </div>
                    </div>

                    {/* Elements 6 & 7: Investment Summary & Pinned CTA Footer */}
                    <div className="mt-auto pt-5 border-t border-ink/10">
                      {/* Element 6: Total Range Summary */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="rounded-full border border-indigo/20 bg-indigo/10 px-3 py-1 text-xs font-semibold text-indigo">
                          Discovery: $7.5k–$15k | Build: $40k–$100k+
                        </span>
                        <span className="text-xs font-medium text-ink/75">
                          Phased Delivery
                        </span>
                      </div>

                      {/* Element 7: Clear First-Commitment CTA */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link
                          className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                          href={productBuildService.primaryCta.href}
                          aria-label="Book Phase 1 Technical Discovery for Digital Product Build"
                        >
                          {productBuildService.primaryCta.label}
                        </Link>
                        <Link
                          className="inline-flex min-h-[44px] items-center text-xs font-semibold text-teal hover:text-indigo underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                          href={`/services/${productBuildService.slug}`}
                          aria-label="Full architecture breakdown for Digital Product Build"
                        >
                          Full Architecture Breakdown →
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            {/* STAGE 5: Post-Launch Continuation -> Concept 2: Two-Column Split Terminal */}
            <li role="listitem" className="list-none">
              <div className="relative overflow-hidden rounded-2xl border border-indigo/20 bg-gradient-to-r from-indigo/5 via-teal/5 to-indigo/5 p-7 sm:p-9">
                <ChromaEdge />
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                  {/* Left Bay: Continuity Narrative & Pillars */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-xs font-semibold tracking-[0.2em] text-indigo uppercase">
                        Stage 05 / Post-Launch Evolution
                      </span>
                      <span className="rounded-full border border-indigo/20 bg-indigo/10 px-2.5 py-0.5 text-xs font-semibold text-indigo">
                        Continuation Retainer
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
                      Growth Partnership: Ongoing Evolution After Launch
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/80 max-w-2xl">
                      Digital excellence doesn&apos;t end at deployment. For clients with live Chromapages builds, we offer dedicated monthly design and engineering capacity for continuous conversion rate optimization, split testing, new landing pages, and component evolution.
                    </p>
                    <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink/80 list-none p-0">
                      <li className="flex items-center gap-1.5"><span className="text-teal font-bold" aria-hidden="true">✓</span> 20–60h Guaranteed Monthly Capacity</li>
                      <li className="flex items-center gap-1.5"><span className="text-teal font-bold" aria-hidden="true">✓</span> Continuous CRO &amp; Testing</li>
                      <li className="flex items-center gap-1.5"><span className="text-teal font-bold" aria-hidden="true">✓</span> Quarterly Roadmap Alignment</li>
                    </ul>
                  </div>

                  {/* Right Bay: Elevated Retainer Action Slip */}
                  <div className="rounded-xl border border-indigo/15 bg-white/90 p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-[11px] font-semibold tracking-[0.18em] text-indigo uppercase block">
                        Retainer Terms:
                      </h4>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-base text-indigo">$2,500 – $7,500 / mo</span>
                        <span className="text-xs font-medium text-ink/75">3-Month Min.</span>
                      </div>
                      <p className="mt-2 text-xs text-ink/75 leading-snug">
                        Dedicated monthly sprint cycles reserved exclusively for Chromapages production codebases.
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-ink/10 flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5">
                      <Link
                        className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-indigo px-5 py-2.5 text-xs font-semibold text-canvas transition-colors hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
                        href="/contact?service=growth-partnership"
                        aria-label="Inquire on Growth Partnership retainer capacity"
                      >
                        Inquire on Retainer Capacity →
                      </Link>
                      <Link
                        className="inline-flex min-h-[44px] items-center justify-center text-center text-xs font-semibold text-teal hover:text-indigo underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                        href="/services/growth-partnership"
                        aria-label="View Growth Partnership details"
                      >
                        View Partnership Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="relative overflow-hidden bg-ink text-canvas border-t border-white/10">
        <ChromaEdge dark />
        <div className="mx-auto flex w-full max-w-main flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-end lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-teal-400 uppercase">
                Project Fit Review
              </span>
              <span className="h-px w-6 bg-teal-400/40" />
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.035em] sm:text-4xl text-balance">
              Not sure which engagement fits your commercial scope?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-canvas/75 sm:text-base sm:leading-7">
              Schedule a structured 30-minute consultation. We evaluate your existing digital presence, identify conversion bottlenecks, and recommend the exact fixed-scope engagement calibrated to your timeline and budget.
            </p>
          </div>
          <Link
            className="inline-flex items-center justify-center rounded-lg bg-teal px-6 py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal shrink-0"
            href="/contact"
          >
            Schedule Project Fit Review →
          </Link>
        </div>
      </section>
    </main>
  );
}
