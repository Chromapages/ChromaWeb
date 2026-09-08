import Link from "next/link";

import type {SeoData} from "@/lib/seo";
import {EditorialSection, PageHero} from "@/components/content/PagePrimitives";
import {CaseStudyMediaGroup} from "./CaseStudyMedia";

import {getClassificationLabel} from "./classification";
import {getProofSignalType, normalizeProofSignals, type ProofSignal} from "@/lib/proofHierarchy";
import {isPublicCaseStudyMedia, sortCaseStudyMedia, type CaseStudyMedia} from "@/lib/caseStudyMedia";

export type CaseStudyData = {
  title?: string | null;
  seo?: SeoData | null;
  slug?: string | null;
  classification?: string | null;
  projectIdentity?: string | null;
  role?: string | null;
  description?: string | null;
  scope?: string | null;
  challenge?: string | null;
  strategy?: string | null;
  build?: string | null;
  launch?: string | null;
  nextStage?: string | null;
  proofSignals?: ProofSignal[] | null;
  attributionLimitations?: string | null;
  images?: Array<CaseStudyMedia | null> | null;
  relatedServices?: Array<{title?: string | null; slug?: string | null} | null> | null;
};

function DetailSection({eyebrow, title, body, dark = false}: {eyebrow: string; title: string; body?: string | null; dark?: boolean}) {
  if (!body) return null;

  return <EditorialSection body={body} dark={dark} number={eyebrow} title={title} />;
}

function CaseStudyEvidence({signals, attributionLimitations}: {signals?: ProofSignal[] | null; attributionLimitations?: string | null}) {
  const orderedSignals = normalizeProofSignals(signals);

  if (!orderedSignals.length) return null;

  return (
    <section className="bg-ink text-canvas" aria-labelledby="case-study-evidence-title">
      <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24">
        <div className="max-w-editorial">
          <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">06 / Evidence</p>
          <h2 id="case-study-evidence-title" className="mt-4 font-display text-3xl tracking-[-0.035em] sm:text-4xl">What the record supports.</h2>
        </div>
        <ol className="mt-10 max-w-editorial border-y border-canvas/20">
          {orderedSignals.map((signal) => {
            const type = getProofSignalType(signal.type);
            return (
              <li key={`${signal.type}-${signal.statement}`} className="border-b border-canvas/20 py-8 last:border-b-0">
                <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">{type?.label}</p>
                <p className="mt-5 text-base font-medium leading-7 text-canvas">{signal.statement}</p>
                <dl className="mt-5 grid gap-x-8 gap-y-3 text-sm leading-6 text-canvas/72 sm:grid-cols-2">
                  <div><dt className="inline font-semibold text-canvas">Source:</dt> <dd className="inline">{signal.sourceContext}</dd></div>
                  <div><dt className="inline font-semibold text-canvas">Timeframe:</dt> <dd className="inline">{signal.timeframe}</dd></div>
                  <div className="sm:col-span-2"><dt className="inline font-semibold text-canvas">Measurement context:</dt> <dd className="inline">{signal.measurementContext}</dd></div>
                  <div className="sm:col-span-2"><dt className="inline font-semibold text-canvas">Attribution limits:</dt> <dd className="inline">{signal.limitations}</dd></div>
                </dl>
              </li>
            );
          })}
        </ol>
        {attributionLimitations ? <p className="mt-8 max-w-editorial text-sm leading-6 text-canvas/65"><span className="font-semibold text-canvas">Project-level limits:</span> {attributionLimitations}</p> : null}
      </div>
    </section>
  );
}

function NextStage({body}: {body?: string | null}) {
  return (
    <section className="bg-indigo text-canvas" aria-labelledby="next-stage-title">
      <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-xs font-semibold tracking-[0.18em] text-canvas/80 uppercase">07 / Next Stage</p>
        <h2 id="next-stage-title" className="mt-4 max-w-editorial font-display text-3xl tracking-[-0.035em] sm:text-4xl">Continue the conversation.</h2>
        {body ? <p className="mt-6 max-w-editorial text-base leading-7 text-canvas/80">{body}</p> : null}
        <Link className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas" href="/contact">Plan Your Digital Upgrade →</Link>
      </div>
    </section>
  );
}

export function CaseStudyPage({caseStudy}: {caseStudy: CaseStudyData}) {
  const images = sortCaseStudyMedia(caseStudy.images?.filter((image): image is CaseStudyMedia => Boolean(image)).filter(isPublicCaseStudyMedia) ?? []);
  const proofMedia = images.filter((image) => Boolean(image.proofSignalType));
  const mediaForAnchor = (anchor: string) => images.filter((image) => image.narrativeAnchor === anchor);

  const classificationLabel = getClassificationLabel(caseStudy.classification);

  const metadataItems = [
    ...(caseStudy.role ? [{label: "Chromapages role", value: caseStudy.role}] : []),
    ...(caseStudy.scope ? [{label: "Scope", value: caseStudy.scope}] : []),
    ...(classificationLabel ? [{label: "Classification", value: classificationLabel}] : []),
    ...(caseStudy.relatedServices?.length ? [{label: "Services", value: `${caseStudy.relatedServices.length} Disciplines`}] : []),
  ];

  return (
    <main data-proof-classification={caseStudy.classification ?? undefined} id="main-content" tabIndex={-1}>
      <PageHero
        analyticsLocation="case_study_hero"
        asideCard={{
          eyebrow: "Project Identity",
          title: caseStudy.projectIdentity ?? "Client Engagement",
          items: metadataItems.length ? metadataItems : undefined,
        }}
        backLink={{
          href: "/work",
          label: "Back to Selected Work",
        }}
        badge={classificationLabel}
        body={caseStudy.description}
        eyebrow="Evidence Case Study"
        title={caseStudy.title}
      />

      <DetailSection eyebrow="01 / Context" title="The project context" body={caseStudy.scope} />
      <CaseStudyMediaGroup media={mediaForAnchor("scope")} title="Scope-supporting project media" />
      <DetailSection eyebrow="02 / Challenge" title="The context for the work" body={caseStudy.challenge} dark />
      <CaseStudyMediaGroup media={mediaForAnchor("challenge")} title="Challenge-supporting project media" />
      <DetailSection eyebrow="03 / Strategy" title="The strategic direction" body={caseStudy.strategy} />
      <CaseStudyMediaGroup media={mediaForAnchor("strategy")} title="Strategy-supporting project media" />
      <DetailSection eyebrow="04 / Build" title="What Chromapages built" body={caseStudy.build} dark />
      <CaseStudyMediaGroup media={mediaForAnchor("build")} title="Build-supporting project media" />
      <DetailSection eyebrow="05 / Launch" title="How the work was released" body={caseStudy.launch} />
      <CaseStudyMediaGroup media={mediaForAnchor("launch")} title="Launch-supporting project media" />
      <CaseStudyEvidence attributionLimitations={caseStudy.attributionLimitations} signals={caseStudy.proofSignals} />
      <CaseStudyMediaGroup media={proofMedia} title="Evidence-supporting project media" />
      <NextStage body={caseStudy.nextStage} />

      {caseStudy.relatedServices?.length ? (
        <section className="bg-indigo text-canvas">
          <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24">
            <p className="text-xs font-semibold tracking-[0.18em] text-canvas/85 uppercase">Related services</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {caseStudy.relatedServices.map((service) => (
                <li key={service?.slug ?? service?.title}>
                  {service?.slug ? <Link className="block border-b border-canvas/25 py-4 font-display text-xl font-semibold hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal" href={`/services/${service.slug}`}>{service.title}</Link> : <span className="block border-b border-canvas/25 py-4 font-display text-xl font-semibold">{service?.title}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
