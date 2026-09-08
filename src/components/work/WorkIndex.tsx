import Link from "next/link";

import {ProjectMediaFrame} from "./CaseStudyMedia";
import {getClassificationLabel} from "./classification";
import type {CmsFetchResult} from "@/sanity/lib/fetchPage";
import {isPublicCaseStudyMedia, type CaseStudyMedia} from "@/lib/caseStudyMedia";
import {getProofSignalType, selectPrimaryProofSignal, type ProofSignal} from "@/lib/proofHierarchy";

export type WorkCard = {
  title?: string | null;
  slug?: string | null;
  classification?: string | null;
  workIndexFeatured?: boolean | null;
  workIndexRank?: number | null;
  projectIdentity?: string | null;
  role?: string | null;
  challenge?: string | null;
  strategy?: string | null;
  proofSignals?: ProofSignal[] | null;
  relatedServices?: Array<{title?: string | null; slug?: string | null} | null> | null;
  image?: CaseStudyMedia | null;
};

import {PageHero} from "@/components/content/PagePrimitives";

const evidenceStandards = [
  "Work classification and project context",
  "Evidence stated with its relevant limits",
  "Approved editorial imagery with meaningful alternatives",
];

type WorkIndexProps = Pick<CmsFetchResult<WorkCard[]>, "status"> & {
  caseStudies: WorkCard[] | null;
};

function WorkStatus({status}: Pick<WorkIndexProps, "status">) {
  const unavailable = status === "unconfigured" || status === "unavailable";

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        asideCard={{
          eyebrow: "Selected work",
          title: unavailable ? "Please check back soon" : "A considered selection",
          items: [
            {label: "Focus", value: "Digital transformation"},
            {label: "Approach", value: "Context-first"},
          ],
        }}
        body={unavailable
          ? "The evidence index is temporarily unavailable. Please check back soon, or start a conversation about your project."
          : "There are no case studies to share right now. If you are planning a digital upgrade, we would be glad to start a conversation."}
        cta={{label: "Start a project", href: "/contact"}}
        eyebrow="Evidence Index"
        title={unavailable ? "Evidence is temporarily unavailable." : "Evidence is being prepared carefully."}
      />
      {!unavailable ? <EvidenceStandards /> : null}
    </main>
  );
}

function EvidenceStandards() {
  return (
    <section className="bg-canvas" aria-labelledby="evidence-standards-title">
      <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24">
        <div className="max-w-editorial">
          <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">Evidence standards</p>
          <h2 id="evidence-standards-title" className="mt-4 font-display text-3xl tracking-[-0.035em] sm:text-4xl">What a published record makes clear.</h2>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {evidenceStandards.map((standard) => (
            <li key={standard} className="border border-ink/15 bg-white p-6 sm:p-7">
              <span aria-hidden="true" className="block size-2 rounded-full bg-teal" />
              <p className="mt-8 text-base leading-7 text-ink/72">{standard}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EvidenceCard({caseStudy, featured = false}: {caseStudy: WorkCard; featured?: boolean}) {
  if (!caseStudy.slug) return null;

  const classificationLabel = getClassificationLabel(caseStudy.classification);
  const disciplines = caseStudy.relatedServices?.filter((service): service is NonNullable<typeof service> & {title: string} => Boolean(service?.title)) ?? [];
  const primaryProof = selectPrimaryProofSignal(caseStudy.proofSignals);
  const leadMedia = caseStudy.image && isPublicCaseStudyMedia(caseStudy.image) ? caseStudy.image : null;

  return (
    <article className={featured ? "group grid h-full border border-ink/15 bg-canvas lg:grid-cols-12" : "group flex h-full flex-col border border-ink/15 bg-canvas"}>
      {leadMedia ? <div className={featured ? "lg:col-span-7" : undefined}><ProjectMediaFrame featured={featured} media={leadMedia} /></div> : null}
      <div className={featured ? (leadMedia ? "flex flex-1 flex-col p-6 sm:p-8 lg:col-span-5" : "flex flex-1 flex-col p-6 sm:p-8 lg:col-span-12") : "flex flex-1 flex-col p-6 sm:p-8"}>
        <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">{classificationLabel}</p>
        {caseStudy.projectIdentity ? <p className="mt-5 text-sm text-ink/60">{caseStudy.projectIdentity}</p> : null}
        <h3 className={featured ? "mt-2 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl" : "mt-2 font-display text-3xl font-semibold tracking-[-0.035em]"}>
          <Link aria-label={`Read the evidence case study: ${caseStudy.title ?? "case study"}`} className="text-ink underline decoration-teal decoration-2 underline-offset-4 transition-colors hover:text-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal" data-analytics-case-study-slug={caseStudy.slug} data-analytics-event="case_study_open" data-proof-classification={caseStudy.classification ?? undefined} href={`/work/${caseStudy.slug}`}>
            {caseStudy.title}
          </Link>
        </h3>
        <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {caseStudy.challenge ? (
            <div className="grid gap-2 py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5">
              <dt className="text-xs font-semibold tracking-[0.14em] text-ink/60 uppercase">The problem</dt>
              <dd className="text-sm leading-6 text-ink/75">{caseStudy.challenge}</dd>
            </div>
          ) : null}
          {caseStudy.strategy ? (
            <div className="grid gap-2 py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5">
              <dt className="text-xs font-semibold tracking-[0.14em] text-ink/60 uppercase">What changed</dt>
              <dd className="text-sm leading-6 text-ink/75">{caseStudy.strategy}</dd>
            </div>
          ) : null}
          {primaryProof ? (
            <div className="grid gap-2 py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5">
              <dt className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">{getProofSignalType(primaryProof.type)?.label}</dt>
              <dd>
                <p className="text-sm font-medium leading-6 text-ink">{primaryProof.statement}</p>
                <p className="mt-2 text-xs leading-5 text-ink/65"><span className="font-semibold">Source/context:</span> {primaryProof.sourceContext}</p>
                <p className="mt-1 text-xs leading-5 text-ink/65"><span className="font-semibold">Limits:</span> {primaryProof.limitations}</p>
              </dd>
            </div>
          ) : null}
        </dl>
        {disciplines.length ? (
          <div className="mt-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-ink/60 uppercase">Primary disciplines</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2" aria-label={`Primary disciplines for ${caseStudy.title ?? "this case study"}`}>
              {disciplines.map((service) => <li key={service.slug ?? service.title} className="text-sm text-ink/75">{service.title}</li>)}
            </ul>
          </div>
        ) : null}
        <Link aria-label={`Read the evidence case study: ${caseStudy.title ?? "case study"}`} className="mt-8 inline-flex self-start text-sm font-semibold text-indigo underline decoration-teal underline-offset-4 transition-colors hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal" data-analytics-case-study-slug={caseStudy.slug} data-analytics-event="case_study_open" data-proof-classification={caseStudy.classification ?? undefined} href={`/work/${caseStudy.slug}`}>
          Project details →
        </Link>
      </div>
    </article>
  );
}

export function WorkIndex({caseStudies, status}: WorkIndexProps) {
  if (!caseStudies?.length) {
    return <WorkStatus status={status} />;
  }

  const validStudies = caseStudies.filter((caseStudy): caseStudy is WorkCard & {slug: string} => Boolean(caseStudy.slug));

  if (!validStudies.length) {
    return <WorkStatus status="empty" />;
  }

  const featuredStudy = validStudies.find((caseStudy) => caseStudy.workIndexFeatured) ?? null;
  const supportingStudies = featuredStudy ? validStudies.filter((caseStudy) => caseStudy.slug !== featuredStudy.slug) : validStudies;

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        asideCard={{
          eyebrow: "Evidence standard",
          title: "Classified before published",
          items: [
            {label: "Record includes", value: "Context + limits"},
            {label: "Focus", value: "Digital transformation"},
          ],
        }}
        body="Every published record identifies the work, its classification, and the limits of the evidence shown."
        eyebrow="Evidence Index"
        title="Work, clearly classified."
      />

      <section className="bg-canvas" aria-labelledby="published-evidence-title">
        <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-editorial">
            <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">Published evidence</p>
            <h2 id="published-evidence-title" className="mt-4 font-display text-3xl tracking-[-0.035em] sm:text-4xl">Selected engagements, with their context intact.</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
            {featuredStudy ? <div className="lg:col-span-12"><EvidenceCard caseStudy={featuredStudy} featured /></div> : null}
            {supportingStudies.map((caseStudy) => <div key={caseStudy.slug} className="lg:col-span-6"><EvidenceCard caseStudy={caseStudy} /></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
