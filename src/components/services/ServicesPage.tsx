import Link from "next/link";

import {IndustryDirectory} from "@/components/content/IndustryDirectory";
import type {IndustryDirectoryRecord} from "@/components/content/industryVerticals";
import type {OfferPageData} from "@/components/offer/OfferPage";
import type {WorkCard} from "@/components/work/WorkIndex";
import {ServiceDecisionAid} from "./ServiceDecisionAid";
import {ServicesOutcomeRail} from "./ServicesOutcomeRail";
import {normalizeServicesOffers, type ServicesAudit, type ServicesEngagement} from "./servicesData";

type HeroValueIconProps = {
  name: "clarity" | "progress" | "people";
};

const HeroValueIcon = ({name}: HeroValueIconProps) => {
  const common = {fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.8};

  if (name === "clarity") {
    return <svg aria-hidden="true" className="size-8 shrink-0 text-teal" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" {...common} /><path d="m20 12-3.5 8-4.5 2 3.5-8Z" {...common} /></svg>;
  }

  if (name === "progress") {
    return <svg aria-hidden="true" className="size-8 shrink-0 text-teal" viewBox="0 0 32 32"><path d="M5 26h22M7 24v-7h5v7M14 24V11h5v13M21 24V6h5v18" {...common} /></svg>;
  }

  return <svg aria-hidden="true" className="size-8 shrink-0 text-teal" viewBox="0 0 32 32"><circle cx="16" cy="10" r="4" {...common} /><circle cx="7.5" cy="13" r="3" {...common} /><circle cx="24.5" cy="13" r="3" {...common} /><path d="M9 27v-3.5c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5V27M2.5 26v-2c0-2.6 2-4.4 4.7-4.8M29.5 26v-2c0-2.6-2-4.4-4.7-4.8" {...common} /></svg>;
};

type EmptyPrimaryOffersProps = {
  missingSlugs: string[];
};

const EmptyPrimaryOffers = ({missingSlugs}: EmptyPrimaryOffersProps) => {
  return (
    <section aria-labelledby="primary-offers-unavailable" className="bg-canvas pb-16 lg:pb-24">
      <div className="mx-auto w-full max-w-content-wide px-5 sm:px-8 lg:px-12 2xl:px-20">
        <div className="border-l-4 border-indigo bg-paper p-6">
          <h2 className="font-display text-2xl font-bold text-ink" id="primary-offers-unavailable">Primary engagements are being prepared.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">Published service details remain available from their direct links once the canonical Sanity records are ready.</p>
          {process.env.NODE_ENV === "development" ? <p className="mt-3 text-xs text-ink/50">Missing records: {missingSlugs.join(", ")}</p> : null}
        </div>
      </div>
    </section>
  );
};

type EngagementRegisterProps = {
  engagements: ServicesEngagement[];
};

const EngagementRegister = ({engagements}: EngagementRegisterProps) => {
  if (!engagements.length) return null;

  return (
    <section aria-labelledby="engagement-register-title" className="bg-paper pt-8 pb-8 lg:pt-10 lg:pb-10">
      <div className="mx-auto w-full max-w-content-wide px-5 sm:px-8 lg:px-12 2xl:px-20">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">Compare Engagements</p>
              <span aria-hidden="true" className="h-px w-10 bg-teal/40" />
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-ink sm:text-4xl lg:text-5xl" id="engagement-register-title">Find the right fit at a glance.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-ink/70 lg:justify-self-end">Compare every primary engagement without using the interactive selector.</p>
        </div>

        {/* Desktop Table Layout */}
        <div aria-hidden="true" className="mt-10 hidden grid-cols-[1.15fr_1.35fr_0.8fr_1fr_1.5fr_auto] gap-5 border-b border-ink/15 pb-3 text-[10px] font-semibold tracking-[0.16em] text-teal uppercase xl:grid">
          <span>Engagement</span><span>Primary goal</span><span>Timeline</span><span>Investment</span><span>Best for</span><span>Action</span>
        </div>
        <ul className="hidden border-t border-ink/15 xl:block xl:border-t-0">
          {engagements.map((engagement) => (
            <li className="border-b border-ink/15 py-6" key={engagement.slug}>
              <article className="grid gap-5 xl:grid-cols-[1.15fr_1.35fr_0.8fr_1fr_1.5fr_auto] xl:items-center">
                <h3 className="font-display text-lg font-bold text-ink">{engagement.name}</h3>
                <dl className="contents">
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.16em] text-teal uppercase xl:sr-only">Primary goal</dt>
                    {engagement.primaryGoal ? <dd className="mt-1 line-clamp-3 text-sm leading-6 text-ink/70 xl:mt-0">{engagement.primaryGoal}</dd> : null}
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.16em] text-teal uppercase xl:sr-only">Typical timeline</dt>
                    {engagement.timeline ? <dd className="mt-1 text-sm font-medium text-ink xl:mt-0">{engagement.timeline}</dd> : null}
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.16em] text-teal uppercase xl:sr-only">Typical investment</dt>
                    {engagement.investment || (engagement.investmentTiers && engagement.investmentTiers.length > 0) ? (
                      <dd className="mt-1 text-sm font-medium text-ink xl:mt-0">
                        {engagement.investment ? <span>{engagement.investment}</span> : null}
                        {engagement.investmentTiers && engagement.investmentTiers.length > 0 ? (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {engagement.investmentTiers.map((tier) => (
                              <span
                                className="inline-flex items-center rounded bg-teal/10 px-1.5 py-0.5 text-[10px] font-semibold text-teal"
                                key={tier.label}
                                title={tier.description ?? undefined}
                              >
                                {tier.label.split(" ")[0]}: {tier.amount}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </dd>
                    ) : null}
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.16em] text-teal uppercase xl:sr-only">Best for</dt>
                    {engagement.bestFor ? <dd className="mt-1 text-sm leading-6 text-ink/70 xl:mt-0">{engagement.bestFor}</dd> : null}
                  </div>
                </dl>
                <Link aria-label={"Explore " + engagement.name} className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-teal underline decoration-transparent underline-offset-4 hover:decoration-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal xl:justify-self-end" href={engagement.detailHref}>Explore →</Link>
              </article>
            </li>
          ))}
        </ul>

        {/* Mobile & Tablet Card Layout */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:hidden">
          {engagements.map((engagement, index) => (
            <article className="flex flex-col justify-between rounded-xl border border-ink/15 bg-canvas/30 p-5 shadow-xs" key={engagement.slug}>
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-indigo uppercase">Engagement {String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink">{engagement.name}</h3>
                  </div>
                  {engagement.investment ? (
                    <span className="shrink-0 rounded-md bg-indigo/10 px-2.5 py-1 text-xs font-semibold text-indigo">
                      {engagement.investment.split(";")[0]}
                    </span>
                  ) : null}
                </div>

                {engagement.investmentTiers && engagement.investmentTiers.length > 0 ? (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {engagement.investmentTiers.map((tier) => (
                      <span className="rounded bg-indigo/5 px-2 py-0.5 text-[10px] font-medium text-indigo" key={tier.label}>
                        {tier.label}: {tier.amount}
                      </span>
                    ))}
                  </div>
                ) : null}

                <dl className="mt-4 space-y-3 border-t border-ink/10 pt-3 text-sm">
                  {engagement.primaryGoal ? (
                    <div>
                      <dt className="text-[10px] font-semibold tracking-wider text-teal uppercase">Primary Goal</dt>
                      <dd className="mt-0.5 text-xs leading-5 text-ink/75">{engagement.primaryGoal}</dd>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between gap-3 text-xs">
                    {engagement.timeline ? (
                      <div>
                        <dt className="text-[10px] font-semibold tracking-wider text-teal uppercase">Timeline</dt>
                        <dd className="mt-0.5 font-medium text-ink">{engagement.timeline}</dd>
                      </div>
                    ) : null}
                    {engagement.bestFor ? (
                      <div className="text-right">
                        <dt className="text-[10px] font-semibold tracking-wider text-teal uppercase">Best For</dt>
                        <dd className="mt-0.5 line-clamp-1 font-medium text-ink/75">{engagement.bestFor}</dd>
                      </div>
                    ) : null}
                  </div>
                </dl>
              </div>

              <div className="mt-5 border-t border-ink/10 pt-4">
                <Link
                  aria-label={"Explore " + engagement.name}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-teal/10 px-4 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-canvas active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  href={engagement.detailHref}
                >
                  Explore {engagement.name} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

type AuditBridgeProps = {
  audit: ServicesAudit;
};

const AuditBridge = ({audit}: AuditBridgeProps) => {
  const steps = [
    {title: "Diagnose the gap.", description: "Evaluate credibility, clarity, conversion, mobile, performance, and technical foundations."},
    {title: "Prioritize what matters.", description: "Separate urgent problems from lower-value improvements based on business impact."},
    {title: "Define the next move.", description: "Get a clear, actionable recommendation for the right next step."},
  ];

  return (
    <section aria-labelledby="audit-bridge-title" className="border-y border-white/10 bg-ink text-canvas py-14 lg:py-16">
      <div className="mx-auto grid w-full max-w-[112rem] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(25rem,1.35fr)_minmax(0,2.4fr)_minmax(17rem,0.9fr)] lg:items-stretch lg:gap-0 lg:px-12 2xl:px-20">
        <div className="border-l-2 border-indigo pl-5 lg:pr-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-teal uppercase">Still Unsure?</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] text-canvas sm:text-4xl lg:text-[2.5rem]" id="audit-bridge-title">Start with a {audit.name}.</h2>
          {audit.description ? <p className="mt-5 max-w-sm text-base leading-7 text-canvas/75">{audit.description}</p> : null}
        </div>

        <ol className="grid gap-8 sm:grid-cols-3 lg:gap-0">
          {steps.map((step, index) => (
            <li className="border-t border-white/10 pt-6 sm:border-t-0 sm:pt-0 lg:border-l lg:border-white/10 lg:px-7 lg:first:border-l-0 lg:first:pl-0" key={step.title}>
              <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full border border-teal/40 font-display text-2xl font-bold text-teal-300">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-display text-xl font-bold leading-tight tracking-[-0.03em] text-canvas">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-canvas/75">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-10 lg:pt-0">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-canvas/65 uppercase">Typical investment</p>
          {audit.investment ? <p className="mt-3 whitespace-nowrap font-display text-3xl font-bold tracking-[-0.04em] text-indigo-400">{audit.investment}</p> : null}
          <Link className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-teal px-5 text-base font-semibold text-canvas transition-colors hover:bg-indigo active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href={audit.detailHref}>Explore the Audit →</Link>
        </div>
      </div>
    </section>
  );
};

type SupportingServiceCardProps = {
  offer: OfferPageData;
  index: number;
  kind: string;
};

const SupportingServiceCard = ({offer, index, kind}: SupportingServiceCardProps) => {
  const slug = offer.slug?.trim();
  const title = offer.title?.trim();
  if (!slug || !title) return null;

  return (
    <article className="flex min-h-[18rem] flex-col rounded-xl border border-ink/15 bg-paper p-6 sm:p-8">
      <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.18em] text-indigo uppercase">
        <span>{String(index).padStart(2, "0")}</span>
        <span>{kind}</span>
      </div>
      <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.045em] text-ink">{title}</h3>
      {offer.summary ? <p className="mt-4 line-clamp-3 max-w-xl text-base leading-7 text-ink/70">{offer.summary}</p> : null}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-5 border-t border-ink/15 pt-5">
        <dl className="flex flex-wrap gap-x-7 gap-y-4">
          {offer.timeline ? <div><dt className="text-[10px] font-semibold tracking-[0.16em] text-indigo uppercase">Timeline</dt><dd className="mt-1 text-sm font-semibold text-ink">{offer.timeline}</dd></div> : null}
          {offer.investmentRange ? (
            <div><dt className="text-[10px] font-semibold tracking-[0.16em] text-indigo uppercase">Typical investment</dt><dd className="mt-1 text-sm font-semibold text-indigo">{offer.investmentRange}</dd></div>
          ) : offer.investmentTiers && offer.investmentTiers.length > 0 ? (
            <div><dt className="text-[10px] font-semibold tracking-[0.16em] text-indigo uppercase">Investment</dt><dd className="mt-1 text-sm font-semibold text-indigo">{offer.investmentTiers.map((t) => `${t.label}: ${t.amount}`).join(" · ")}</dd></div>
          ) : null}
        </dl>
        <Link className="inline-flex min-h-11 items-center text-sm font-semibold text-teal underline decoration-transparent underline-offset-4 hover:decoration-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href={`/services/${slug}`}>Explore {title} →</Link>
      </div>
    </article>
  );
};

type PublishedServicesProps = {
  coreOffer?: ServicesEngagement;
  offers: OfferPageData[];
};

const PublishedServices = ({coreOffer, offers}: PublishedServicesProps) => {
  if (!offers.length) return null;

  const findService = (matcher: (slug: string) => boolean) => offers.find((offer) => matcher(offer.slug?.trim() ?? ""));
  const multiLocation = findService((slug) => slug.includes("multi-location"));
  const commerce = findService((slug) => slug.includes("online-store") || slug.includes("e-commerce") || slug.includes("commerce"));
  const siteCare = findService((slug) => slug.includes("care") || slug.includes("maintenance"));
  const rescue = findService((slug) => slug.includes("rescue"));
  const featuredSlugs = new Set([multiLocation, commerce, siteCare, rescue].flatMap((offer) => offer?.slug ? [offer.slug] : []));
  const remaining = offers.filter((offer) => offer.slug && !featuredSlugs.has(offer.slug));

  return (
    <section aria-labelledby="published-services-title" className="bg-canvas pt-8 pb-16 lg:pt-10 lg:pb-24">
      <div className="mx-auto w-full max-w-[112rem] px-5 sm:px-8 lg:px-12 2xl:px-20">
        <header>
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-indigo uppercase">Specialized engagements</p>
            <h2 className="mt-4 max-w-6xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-ink sm:text-5xl lg:text-6xl" id="published-services-title">When the standard engagement<br className="hidden lg:block" /> needs to go further.</h2>
            <p className="mt-5 max-w-5xl text-lg leading-8 text-ink/70">Specialized paths for businesses with more specific digital needs, whether you’re expanding across locations, building a custom commerce experience, or need focused support for an existing site.</p>
          </div>
        </header>

        {(coreOffer || multiLocation || commerce) ? (
          <div className="mt-9 grid gap-4 lg:grid-cols-[minmax(14rem,0.8fr)_6rem_repeat(2,minmax(0,1fr))] lg:items-stretch">
            {coreOffer ? (
              <article className="flex min-h-[19rem] flex-col rounded-xl border border-indigo bg-indigo p-6 sm:p-8">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-canvas/80 uppercase">Core engagement</p>
                <h3 className="mt-5 font-display text-3xl font-bold leading-tight tracking-[-0.045em] text-canvas">{coreOffer.name}</h3>
                {coreOffer.shortTransformation ? <p className="mt-4 text-lg font-semibold leading-7 text-canvas">{coreOffer.shortTransformation}</p> : null}
                {coreOffer.shortDescription ? <p className="mt-5 line-clamp-3 text-base leading-7 text-canvas/80">{coreOffer.shortDescription}</p> : null}
                <Link className="mt-auto inline-flex min-h-11 items-center text-base font-semibold text-teal-300 underline decoration-transparent underline-offset-4 hover:decoration-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300" href={coreOffer.detailHref}>Explore {coreOffer.name} →</Link>
              </article>
            ) : <div className="hidden lg:block" />}
            <div aria-hidden="true" className="hidden items-center lg:flex">
              <div className="w-full border-y border-indigo/45 py-2">
                <span className="block pl-4 text-[10px] font-semibold tracking-[0.16em] text-indigo uppercase">Extensions</span>
                <span className="mt-1 block text-center text-sm leading-none text-indigo">→</span>
              </div>
            </div>
            {multiLocation ? <SupportingServiceCard index={1} kind="Specialized build" offer={multiLocation} /> : <div className="hidden lg:block" />}
            {commerce ? <SupportingServiceCard index={2} kind="Specialized build" offer={commerce} /> : <div className="hidden lg:block" />}
          </div>
        ) : null}

        {(siteCare || rescue) ? (
          <div className="mt-6 grid gap-4 border-t border-ink/15 pt-6 lg:grid-cols-[minmax(14rem,0.8fr)_repeat(2,minmax(0,1fr))]">
            <div className="flex flex-col justify-between py-2 lg:pr-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-indigo uppercase">After launch</p>
                <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.045em] text-ink sm:text-4xl">Continuity +<br />Intervention</h3>
                <p className="mt-4 max-w-sm text-base leading-7 text-ink/70">Keep moving forward with ongoing support or a focused solution when a quick fix is what you need.</p>
                <Link className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-teal px-5 text-sm font-semibold text-canvas transition-colors hover:bg-indigo active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href="/contact?service=website-care-plan">Discuss Ongoing Support →</Link>
              </div>
            </div>
            {siteCare ? <SupportingServiceCard index={3} kind="Continuity" offer={siteCare} /> : <div className="hidden lg:block" />}
            {rescue ? <SupportingServiceCard index={4} kind="Intervention" offer={rescue} /> : <div className="hidden lg:block" />}
          </div>
        ) : null}

        {remaining.length ? <div className="mt-6 grid gap-4 border-t border-ink/15 pt-6 md:grid-cols-2">{remaining.map((offer, index) => <SupportingServiceCard index={index + 5} key={offer.slug} kind="Specialized service" offer={offer} />)}</div> : null}
      </div>
    </section>
  );
};

type ServicesPageProps = {
  offers: OfferPageData[] | null;
  industries: IndustryDirectoryRecord[] | null;
  caseStudies?: WorkCard[] | null;
};

export const ServicesPage = ({offers, industries, caseStudies}: ServicesPageProps) => {
  const {primary, audit, supporting, missingPrimarySlugs, usesPublishedFallback} = normalizeServicesOffers(offers);

  if (process.env.NODE_ENV === "development" && missingPrimarySlugs.length && !usesPublishedFallback) {
    console.warn("Services page missing canonical Sanity offers:", missingPrimarySlugs.join(", "));
  }

  return (
    <main className="w-full overflow-x-clip" id="main-content" tabIndex={-1}>
      <header className="bg-ink text-canvas">
        <div className="mx-auto grid w-full max-w-content-wide gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(23rem,5fr)] lg:items-center lg:px-12 lg:py-16 2xl:px-20">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">Services</p>
              <span aria-hidden="true" className="h-px w-10 bg-teal/40" />
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-canvas sm:text-5xl lg:text-6xl">Choose the path that fits what needs to change.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-canvas/75 sm:text-lg sm:leading-8">Strategic digital engagements for growing service businesses. Websites, tools, and ongoing support—built around your goals, not just a to-do list.</p>
            <ul aria-label="Chromapages service principles" className="mt-7 grid max-w-2xl gap-4 border-canvas/15 sm:grid-cols-3 sm:divide-x sm:divide-canvas/15">
              {[
                {icon: "clarity" as const, label: "Business-minded strategy"},
                {icon: "progress" as const, label: "Premium design & development"},
                {icon: "people" as const, label: "Measurable real-world impact"},
              ].map((principle) => (
                <li className="flex items-center gap-3 text-sm font-medium leading-5 text-canvas sm:px-4 sm:first:pl-0" key={principle.label}>
                  <HeroValueIcon name={principle.icon} />
                  <span>{principle.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ServiceDecisionAid offers={offers} />
          </div>
        </div>
      </header>

      {primary.length ? <ServicesOutcomeRail caseStudies={caseStudies} engagements={primary} /> : <EmptyPrimaryOffers missingSlugs={missingPrimarySlugs} />}
      <EngagementRegister engagements={primary} />
      <PublishedServices coreOffer={primary[0]} offers={supporting} />
      {audit ? <AuditBridge audit={audit} /> : null}

      <div className="scroll-mt-24" id="industries">
        <IndustryDirectory industries={industries} />
      </div>

      <section aria-labelledby="services-final-cta" className="bg-canvas py-14 lg:py-20 pb-28 lg:pb-20">
        <div className="mx-auto grid w-full max-w-content-wide gap-8 border-l-2 border-teal px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_auto] lg:items-center lg:px-12 2xl:px-20">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-teal uppercase">Ready for What’s Next?</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl lg:text-5xl" id="services-final-cta">Plan your digital upgrade.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink/70">Start with a focused conversation about the work ahead and the business context shaping it.</p>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal px-6 text-sm font-semibold text-canvas transition-colors hover:bg-indigo active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href="/contact">Start a Conversation →</Link>
        </div>
      </section>

      <aside aria-label="Quick mobile navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/15 bg-paper/95 px-4 py-3 shadow-lg backdrop-blur-md lg:hidden [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ink/20 px-3.5 text-xs font-semibold text-ink transition-colors hover:border-teal hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            href="#outcome-pathways-title"
          >
            Compare Fits ↑
          </a>
          <Link
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-teal px-4 text-xs font-semibold text-canvas transition-colors hover:bg-indigo active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            href="/contact"
          >
            Plan Your Upgrade →
          </Link>
        </div>
      </aside>
    </main>
  );
};
