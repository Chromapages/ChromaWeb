import Link from "next/link";

import {getClassificationLabel} from "@/components/work/classification";
import type {SeoData} from "@/lib/seo";

import {PageHero, EditorialSection, PageActionLink, type PageAction} from "./PagePrimitives";

export type IndustryPageData = {
  title?: string | null;
  seo?: SeoData | null;
  slug?: string | null;
  buyerProblems?: string | null;
  positioning?: string | null;
  content?: string | null;
  cta?: PageAction;
  services?: Array<{title?: string | null; slug?: string | null; summary?: string | null} | null> | null;
  relatedCaseStudies?: Array<{title?: string | null; slug?: string | null; classification?: string | null; projectIdentity?: string | null; description?: string | null} | null> | null;
};

export function IndustryPage({data}: {data: IndustryPageData}) {
  const metadataItems = [
    ...(data.services?.length ? [{label: "Available Engagements", value: `${data.services.length} Calibrated Models`}] : []),
    ...(data.relatedCaseStudies?.length ? [{label: "Evidence Case Studies", value: `${data.relatedCaseStudies.length} Published`}] : []),
    {label: "Target Alignment", value: "High-Intent Growth"},
  ];

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        analyticsLocation="industry_hero"
        asideCard={{
          eyebrow: "Sector Architecture",
          title: "Tailored Growth Model",
          items: metadataItems,
        }}
        backLink={{
          href: "/industries",
          label: "Back to Industry Verticals",
        }}
        body={data.positioning}
        cta={data.cta}
        eyebrow="Industry Relevance"
        title={data.title}
      />
      {data.buyerProblems ? <EditorialSection number="01 / Buyer context" title="What the digital experience needs to solve" body={data.buyerProblems} /> : null}
      {data.services?.length ? <EditorialSection number="02 / Services" title="Relevant engagements" dark>
        {data.services?.length ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.services.map((service) => (
              <li key={service?.slug ?? service?.title}>
                {service?.slug ? <Link className="block border-b border-canvas/25 py-4 font-display text-xl font-semibold hover:text-canvas/75 focus-visible:outline-canvas" href={`/services/${service.slug}`}>{service.title}</Link> : <span className="block border-b border-canvas/25 py-4 font-display text-xl font-semibold">{service?.title}</span>}
                {service?.summary ? <p className="mt-2 text-sm leading-6 text-canvas/70">{service.summary}</p> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </EditorialSection> : null}
      {data.relatedCaseStudies?.length ? <EditorialSection number="03 / Work" title="Related, classified work">
        {data.relatedCaseStudies?.length ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {data.relatedCaseStudies.map((caseStudy) => (
              <li key={caseStudy?.slug ?? caseStudy?.title} className="border border-ink/15 p-6">
                <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">{getClassificationLabel(caseStudy?.classification)}</p>
                <p className="mt-4 text-sm text-ink/60">{caseStudy?.projectIdentity}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{caseStudy?.title}</h3>
                {caseStudy?.description ? <p className="mt-4 text-sm leading-6 text-ink/70">{caseStudy.description}</p> : null}
                {caseStudy?.slug ? <Link className="mt-5 inline-flex text-sm font-semibold text-indigo underline decoration-teal underline-offset-4 hover:text-teal focus-visible:outline-indigo" href={`/work/${caseStudy.slug}`}>View case study</Link> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </EditorialSection> : null}
      {data.content ? <EditorialSection number="04 / Detail" title="Supporting perspective" body={data.content} dark /> : null}
      {data.cta ? <section className="bg-indigo text-canvas"><div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-20"><PageActionLink action={data.cta} analyticsLocation="industry_closing" inverse /></div></section> : null}
    </main>
  );
}
