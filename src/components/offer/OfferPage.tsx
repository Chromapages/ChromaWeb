import Link from "next/link";

import {EditorialSection, PageHero} from "@/components/content/PagePrimitives";
import type {SeoData} from "@/lib/seo";

export type OfferPageData = {
  title?: string | null;
  seo?: SeoData | null;
  slug?: string | null;
  summary?: string | null;
  positioningStatement?: string | null;
  problem?: string | null;
  solution?: string | null;
  deliverables?: string[] | null;
  investmentRange?: string | null;
  timeline?: string | null;
  deliverySteps?: Array<{title?: string | null; description?: string | null} | null> | null;
  cta?: {label?: string | null; href?: string | null} | null;
  relatedIndustries?: Array<{title?: string | null; slug?: string | null} | null> | null;
};

type OfferPageProps = {
  data: OfferPageData | null;
  fallbackTitle: string;
};

function OfferCta({cta, analyticsLocation, inverse = false}: {cta?: OfferPageData["cta"]; analyticsLocation: string; inverse?: boolean}) {
  if (!cta?.label || !cta.href) {
    return null;
  }

  return (
    <Link
      className={inverse ? "inline-flex rounded-lg border border-canvas px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:border-teal hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal" : "inline-flex rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"}
      data-analytics-destination={cta.href.split("?")[0]}
      data-analytics-event="cta_click"
      data-analytics-location={analyticsLocation}
      href={cta.href}
    >
      {cta.label}
    </Link>
  );
}

export function OfferPage({data, fallbackTitle}: OfferPageProps) {
  const title = data?.title ?? fallbackTitle;
  const summary = data?.summary;
  const positioning = data?.positioningStatement;
  const problem = data?.problem;
  const solution = data?.solution;

  const metadataItems = [
    ...(data?.investmentRange ? [{label: "Investment", value: data.investmentRange}] : []),
    ...(data?.timeline ? [{label: "Timeline", value: data.timeline}] : []),
    ...(data?.deliverables?.length ? [{label: "Core Systems", value: `${data.deliverables.length} Deliverables`}] : []),
  ];

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        analyticsLocation="offer_hero"
        asideCard={{
          eyebrow: "Engagement Overview",
          title: positioning ?? undefined,
          items: metadataItems.length ? metadataItems : undefined,
        }}
        backLink={{
          href: "/services",
          label: "Back to Defined Engagements",
        }}
        body={summary}
        cta={data?.cta}
        eyebrow="Defined Offer"
        title={title}
      />

      {problem || solution ? <section className="bg-canvas">
        <div className="mx-auto grid w-full max-w-main gap-px px-6 py-20 md:grid-cols-2 lg:px-10 lg:py-28">
          {problem ? <article className="border-t border-ink/15 pt-6 md:pr-10">
            <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">Buyer problem</p>
            <p className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">{problem}</p>
          </article> : null}
          {solution ? <article className="border-t border-ink/15 pt-6 md:pl-10">
            <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">Solution</p>
            <p className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">{solution}</p>
          </article> : null}
        </div>
      </section> : null}

      {data?.deliverables?.length ? <EditorialSection number="01 / Deliverables" title="What the engagement includes">
          <ul className="grid gap-0 border-t border-ink/15 sm:grid-cols-2">
            {data.deliverables.map((deliverable) => (
              <li key={deliverable} className="border-b border-ink/15 py-4 pr-5 text-base text-ink/80">{deliverable}</li>
            ))}
          </ul>
      </EditorialSection> : null}

      {data?.investmentRange || data?.timeline ? <section className="bg-indigo text-canvas">
        <div className="mx-auto grid w-full max-w-main gap-px px-6 py-20 md:grid-cols-2 lg:px-10 lg:py-28">
          {data.investmentRange ? <article className="border-t border-canvas/25 pt-6 md:pr-10">
            <p className="text-xs font-semibold tracking-[0.18em] text-canvas/85 uppercase">Investment guidance</p>
            <p className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em]">{data.investmentRange}</p>
          </article> : null}
          {data.timeline ? <article className="border-t border-canvas/25 pt-6 md:pl-10">
            <p className="text-xs font-semibold tracking-[0.18em] text-canvas/85 uppercase">Timeline</p>
            <p className="mt-6 text-lg leading-8 text-canvas/75">{data.timeline}</p>
          </article> : null}
        </div>
      </section> : null}

      {data?.deliverySteps?.length ? <EditorialSection number="02 / Delivery" title="A controlled path to launch" dark>
          <ol className="grid gap-px border border-canvas/20 sm:grid-cols-2 lg:grid-cols-3">
            {data.deliverySteps.map((step, index) => (
              <li key={`${step?.title ?? "step"}-${index}`} className="min-h-40 p-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-canvas/85">{String(index + 1).padStart(2, "0")}</p>
                {step?.title ? <h3 className="mt-6 font-display text-xl font-semibold">{step.title}</h3> : null}
                {step?.description ? <p className="mt-3 text-sm leading-6 text-canvas/65">{step.description}</p> : null}
              </li>
            ))}
          </ol>
      </EditorialSection> : null}

      {data?.relatedIndustries?.length ? (
        <EditorialSection number="03 / Relevance" title="Related industries">
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.relatedIndustries.map((industry) => (
              <li key={industry?.slug ?? industry?.title}>
                {industry?.slug ? <Link className="block border-b border-ink/15 py-4 font-display text-xl font-semibold hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal" href={`/industries/${industry.slug}`}>{industry.title}</Link> : <span className="block border-b border-ink/15 py-4 font-display text-xl font-semibold">{industry?.title}</span>}
              </li>
            ))}
          </ul>
        </EditorialSection>
      ) : null}

      {data?.cta ? <section className="bg-ink text-canvas">
        <div className="mx-auto flex w-full max-w-main flex-col items-start justify-between gap-10 px-6 py-20 lg:flex-row lg:items-end lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-canvas/85 uppercase">Next step</p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Ready to discuss the next stage of your digital experience?</h2>
          </div>
          <OfferCta cta={data?.cta} analyticsLocation="offer_closing" inverse />
        </div>
      </section> : null}
    </main>
  );
}
