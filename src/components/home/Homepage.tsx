import Link from "next/link";

import type {SeoData} from "@/lib/seo";
import {PageStack} from "@/components/ui/PageStack";
import {ChromaEdge} from "@/components/ui/ChromaEdge";
import {PublicPageUnavailable} from "@/components/content/PagePrimitives";

import {HeroGradientBackground} from "./HeroGradientBackground";
import {HomeIndustries} from "./HomeIndustries";
import {HomeOffers} from "./HomeOffers";
import {HomeMismatch} from "./HomeMismatch";
import {HomeStandard} from "./HomeStandard";

export type HomepageData = {
  title?: string | null;
  seo?: SeoData | null;
  hero?: HomepageSectionData | null;
  heroCta?: HomepageAction | null;
  problem?: HomepageSectionData | null;
  solution?: HomepageSectionData | null;
  standard?: HomepageSectionData | null;
  standardSteps?: HomepageStep[] | null;
  proof?: HomepageSectionData | null;
  offers?: HomepageSectionData | null;
  process?: HomepageSectionData | null;
  processSteps?: HomepageStep[] | null;
  industries?: HomepageSectionData | null;
  closingCta?: HomepageSectionData | null;
  closingCtaAction?: HomepageAction | null;
  offerCards?: Array<{title?: string | null; slug?: string | null; summary?: string | null; investmentRange?: string | null}> | null;
  caseStudies?: Array<{title?: string | null; slug?: string | null; classification?: string | null}> | null;
  industryCards?: Array<{title?: string | null; slug?: string | null}> | null;
};

type HomepageSectionData = {
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
};

type HomepageStep = {title?: string | null; description?: string | null} | null;
type HomepageAction = {label?: string | null; href?: string | null};

function HomeAction({action, analyticsLocation, inverse = false}: {action?: HomepageAction | null; analyticsLocation: string; inverse?: boolean}) {
  if (!action?.label || !action.href) {
    return null;
  }

  return (
    <Link
      className={inverse ? "inline-flex rounded-lg border border-canvas px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:border-teal hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal" : "inline-flex rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"}
      data-analytics-destination={action.href.split("?")[0]}
      data-analytics-event="cta_click"
      data-analytics-location={analyticsLocation}
      href={action.href}
    >
      {action.label}
    </Link>
  );
}

export function Homepage({data}: {data: HomepageData | null}) {
  if (!data) {
    return <PublicPageUnavailable title="Chromapages is unavailable right now." />;
  }

  const heroTitle = data?.hero?.title ?? "Your business has evolved. Your website should show it.";
  const heroSubtitle = data?.hero?.body ?? "Chromapages brings your digital presence up to the level of your business—so customers can understand what makes you valuable, trust what they see, and find a clear next step.";

  return (
    <main id="main-content" tabIndex={-1}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-ink text-canvas">
        {/* Animated background with contrast overlays for hero content. */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <HeroGradientBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[min(780px,calc(100svh-80px))] w-full max-w-main items-center gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-400 uppercase">
              {data.hero?.eyebrow ?? "Premium Web Design + Development"}
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl text-balance">
              {heroTitle}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-canvas/75 sm:text-lg">
              {heroSubtitle}
            </p>
            <p className="mt-4 text-xs font-medium text-canvas/50">
              Strategy, design, development, performance, QA, and launch through one controlled engagement.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                className="inline-flex rounded-lg bg-teal px-6 py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                data-analytics-destination="/contact"
                data-analytics-event="cta_click"
                data-analytics-location="homepage_hero_primary"
                href="/contact"
              >
                Plan Your Digital Upgrade →
              </Link>
              <Link
                className="inline-flex rounded-lg border border-canvas/30 px-6 py-3.5 text-sm font-semibold text-canvas transition-colors hover:border-canvas hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                data-analytics-destination="/work"
                data-analytics-event="cta_click"
                data-analytics-location="homepage_hero_secondary"
                href="/work"
              >
                View Selected Work
              </Link>
            </div>
          </div>

          <div className="lg:justify-self-end w-full max-w-md">
            <PageStack
              ariaLabel="Chromapages core engineering standards"
              autoPlayInterval={5000}
              dark
              items={[
                <div key="card-architecture" className="relative p-8">
                  <ChromaEdge dark />
                  <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                    01 / Digital Architecture
                  </span>
                  <p className="mt-4 font-display text-2xl font-semibold text-canvas">
                    Bespoke Design.<br />
                    Sub-Second Speed.<br />
                    Content Autonomy.<br />
                    Launch Discipline.
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs text-canvas/80">
                      <span className="text-canvas/60">Core Web Vitals Target</span>
                      <span className="font-semibold text-teal">&lt; 0.8s LCP</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-canvas/80">
                      <span className="text-canvas/60">Accessibility Standard</span>
                      <span className="font-semibold text-teal">WCAG 2.2 AA</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-canvas/80">
                      <span className="text-canvas/60">Content System</span>
                      <span className="font-semibold text-teal">Autonomous</span>
                    </div>
                  </div>
                </div>,
                <div key="card-performance" className="relative p-8">
                  <ChromaEdge dark />
                  <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                    02 / Performance Engineering
                  </span>
                  <p className="mt-4 font-display text-2xl font-semibold text-canvas">
                    Edge-Rendered.<br />
                    Stable Layouts.<br />
                    Zero Bloat JS.<br />
                    Lighthouse 100s.
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs text-canvas/80">
                      <span className="text-canvas/60">Server Response Time</span>
                      <span className="font-semibold text-teal">&lt; 50ms TTFB</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-canvas/80">
                      <span className="text-canvas/60">Cumulative Layout Shift</span>
                      <span className="font-semibold text-teal">CLS &lt; 0.05 target</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-canvas/80">
                      <span className="text-canvas/60">Interaction Responsiveness</span>
                      <span className="font-semibold text-teal">&lt; 50ms INP</span>
                    </div>
                  </div>
                </div>,
                <div key="card-autonomy" className="relative p-8">
                  <ChromaEdge dark />
                  <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                    03 / Editorial Autonomy
                  </span>
                  <p className="mt-4 font-display text-2xl font-semibold text-canvas">
                    Structured Schemas.<br />
                    Live Studio Previews.<br />
                    Zero Dev Lock-In.<br />
                    Type-Safe GROQ.
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs text-canvas/80">
                      <span className="text-canvas/60">Marketing Team Speed</span>
                      <span className="font-semibold text-teal">Instant Edits</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-canvas/80">
                      <span className="text-canvas/60">Schema Validation</span>
                      <span className="font-semibold text-teal">Structured validation</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-canvas/80">
                      <span className="text-canvas/60">Architecture Modernity</span>
                      <span className="font-semibold text-teal">App Router</span>
                    </div>
                  </div>
                </div>,
              ]}
            />
          </div>
        </div>
      </section>

      {/* 02 / Customer Problem & Sector Focus */}
      <HomeMismatch section={data.problem} />
      <HomeIndustries section={data.industries} industries={data.industryCards} />

      {/* 03 / Defined Engagements (Clear Scopes, Deliverables, & Timelines) */}
      <HomeOffers section={data.offers} offers={data.offerCards} />

      {/* 04 / The Standard & Evidence (5 Operating Principles & Audited Benchmarks) */}
      <HomeStandard section={data.standard} />

      {/* 05 / Next Step (Concept 1: Executive Diagnostic Bento CTA - Compacted) */}
      <section className="relative overflow-hidden bg-ink text-canvas border-t border-white/10">
        <ChromaEdge dark />
        
        {/* Subtle Ambient Radial Lighting */}
        <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-indigo/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-teal/15 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-main items-center gap-8 lg:gap-12 px-6 py-12 lg:py-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:px-10">
          {/* Left Column: Strategic Narrative & Actions */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-teal-400 uppercase">
                05 / Project Fit Review
              </span>
              <span className="h-px w-6 bg-teal-400/40" />
            </div>

            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl text-balance">
              {data.closingCta?.title ?? "Ready to bring your digital presence up to the level of your business?"}
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-canvas/75 sm:text-base sm:leading-7">
              {data.closingCta?.body ??
                "Schedule a structured 30-minute Project Fit consultation. We review your current digital presence, identify conversion friction, and outline a clear, launch-safe upgrade path."}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              {data.closingCtaAction ? (
                <HomeAction action={data.closingCtaAction} analyticsLocation="homepage_closing" inverse />
              ) : (
                <>
                  <Link
                    className="inline-flex items-center justify-center rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                    data-analytics-destination="/contact"
                    data-analytics-event="cta_click"
                    data-analytics-location="homepage_closing_primary"
                    href="/contact"
                  >
                    Plan Your Digital Upgrade →
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center rounded-lg border border-canvas/30 px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:border-canvas hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                    data-analytics-destination="/services"
                    data-analytics-event="cta_click"
                    data-analytics-location="homepage_closing_secondary"
                    href="/services"
                  >
                    Explore Engagements
                  </Link>
                </>
              )}
            </div>

            {/* Micro-Trust Signals */}
            <div className="mt-6 flex flex-wrap items-center gap-y-1.5 gap-x-5 text-xs text-canvas/65 border-t border-white/10 pt-4">
              <span className="flex items-center gap-1.5">
                <span className="text-teal-400 font-bold">✓</span> Direct Partner Access
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-teal-400 font-bold">✓</span> Zero Sales Pressure
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-teal-400 font-bold">✓</span> 24h Confirmation
              </span>
            </div>
          </div>

          {/* Right Column: Concept 1 Architectural Parameter Card */}
          <aside
            aria-label="Engagement parameters and capacity"
            className="w-full max-w-md lg:justify-self-end"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-5 sm:p-6 lg:p-7 backdrop-blur-xs shadow-xl">
              <ChromaEdge dark />

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-teal-400 uppercase">
                  Engagement Parameters
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-teal-300">
                  <span className="size-2 rounded-full bg-teal-400 animate-pulse" />
                  Active Q3 Schedule
                </span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-canvas/60">Signature Websites</span>
                  <span className="font-semibold text-canvas">$18k – $35k</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-canvas/60">Landing Page Sprints</span>
                  <span className="font-semibold text-canvas">$6k – $12k</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-canvas/60">Standard Timeline</span>
                  <span className="font-semibold text-canvas">8–12 Weeks</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-canvas/60">Technical Standard</span>
                  <span className="font-semibold text-teal-300">WCAG 2.2 AA / &lt; 0.8s LCP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-canvas/60">Production Capacity</span>
                  <span className="font-semibold text-canvas">Limited Cohort Model</span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-white/[0.03] p-3 border-l-2 border-teal-400">
                <p className="text-[11px] text-canvas/70 leading-relaxed">
                  Transparent working parameters with fixed milestone gating and zero developer lock-in.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
