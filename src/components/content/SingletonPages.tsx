import {PageHero, EditorialSection, PageActionLink, type PageAction, SequenceStepGrid, type PageStep} from "./PagePrimitives";
import {AboutPrinciples} from "./AboutPrinciples";
import {AboutPerspective} from "./AboutPerspective";
import {ProcessSequenceCta, ProcessSequenceSectionView} from "./ProcessSequenceAnalytics";
import {normalizeProcessSteps, type ProcessStepSource} from "./processSteps";
import {DifferentiatorList} from "./DifferentiatorList";
import type {DifferentiatorItemSource} from "./differentiators";
import {parseProcessContext} from "./processContext";
import {ProjectFitForm} from "@/components/contact/ProjectFitForm";
import type {SeoData} from "@/lib/seo";

export type ProcessWorkingTogetherRole = {
  label?: string | null;
  detail?: string | null;
  icon?: {
    url?: string | null;
    alt?: string | null;
  } | null;
};

export type ProcessResponsibilityRow = {
  title?: string | null;
  detail?: string | null;
  studio?: boolean | null;
  team?: boolean | null;
  together?: boolean | null;
};

export type ProcessWorkingTogetherData = {
  eyebrow?: string | null;
  headline?: string | null;
  introduction?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  sharedGoalLabel?: string | null;
  sharedGoalText?: string | null;
  roles?: ProcessWorkingTogetherRole[] | null;
  responsibilities?: ProcessResponsibilityRow[] | null;
  summaryTitle?: string | null;
  summaryText?: string | null;
  highlights?: Array<string | null> | null;
  summaryCtaLabel?: string | null;
  summaryCtaHref?: string | null;
};

export type ProcessWhyItMattersItem = {
  title?: string | null;
  description?: string | null;
  icon?: {
    url?: string | null;
    alt?: string | null;
  } | null;
};

export type ProcessWhyItMattersData = {
  eyebrow?: string | null;
  headline?: string | null;
  introduction?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  items?: ProcessWhyItMattersItem[] | null;
};

export type ProcessPageData = {
  title?: string | null;
  seo?: SeoData | null;
  introduction?: string | null;
  hero?: {
    eyebrow?: string | null;
    headline?: string | null;
    introduction?: string | null;
    secondaryCtaLabel?: string | null;
    secondaryCtaHref?: string | null;
    image?: {
      url?: string | null;
      alt?: string | null;
      caption?: string | null;
    } | null;
  } | null;
  steps?: ProcessStepSource[] | null;
  detail?: string | null;
  operatingPrinciplesIntro?: string | null;
  operatingPrinciples?: DifferentiatorItemSource[] | null;
  whyItMatters?: ProcessWhyItMattersData | null;
  workingTogether?: ProcessWorkingTogetherData | null;
  launchConfidence?: {
    eyebrow?: string | null;
    headline?: string | null;
    introduction?: string | null;
    checklistLabel?: string | null;
    ctaLabel?: string | null;
    areas?: Array<{
      _key?: string | null;
      id?: string | null;
      title?: string | null;
      description?: string | null;
      checks?: Array<string | null> | null;
    } | null> | null;
  } | null;
  afterLaunch?: {
    eyebrow?: string | null;
    headline?: string | null;
    introduction?: string | null;
    repeatLabel?: string | null;
    steps?: Array<{
      _key?: string | null;
      id?: string | null;
      title?: string | null;
      description?: string | null;
      output?: string | null;
    } | null> | null;
  } | null;
  cta?: PageAction;
};

export type AboutPageData = {
  title?: string | null;
  seo?: SeoData | null;
  introduction?: string | null;
  principles?: PageStep[] | null;
  detail?: string | null;
  cta?: PageAction;
};

export type ContactPageData = {
  title?: string | null;
  seo?: SeoData | null;
  introduction?: string | null;
  formNotice?: string | null;
  cta?: PageAction;
};

export function ProcessPage({data}: {data: ProcessPageData}) {
  const steps = normalizeProcessSteps(data.steps);
  const context = parseProcessContext({
    detail: data.detail,
    intro: data.operatingPrinciplesIntro,
    standards: data.operatingPrinciples,
  });
  const contextFallback = data.detail;

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        analyticsLocation="process_hero"
        asideCard={{
          eyebrow: "Delivery Architecture",
          title: "4-Stage Delivery System",
          items: [
            {label: "Stage 01", value: "Discovery & Scope Blueprint"},
            {label: "Stage 02", value: "Bespoke Design System"},
            {label: "Stage 03", value: "Full-Stack Web Engineering"},
            {label: "Stage 04", value: "Launch & Governance"},
          ],
        }}
        body={data.introduction}
        eyebrow="Delivery Standard"
        title={data.title}
      />
      <EditorialSection body="A four-stage delivery framework, adapted to the scope and operating reality of each engagement." number="Sequence" title="A controlled path to launch" dark>
        <ProcessSequenceSectionView stepCount={steps.length} />
        <SequenceStepGrid steps={steps} />
        <div className="mt-12">
          <ProcessSequenceCta action={data.cta} stepCount={steps.length} />
        </div>
      </EditorialSection>
      <EditorialSection body={context.standards.length ? context.intro : contextFallback} number="Operating Principles" readableMeasure title="What keeps the work moving">
        {context.standards.length ? (
          <>
            <DifferentiatorList items={context.standards} />
            <div className="mt-12">
              <PageActionLink action={{label: "Plan Your Digital Upgrade →", href: "/contact"}} analyticsLocation="process_operating_principles" />
            </div>
          </>
        ) : null}
      </EditorialSection>
      {data.cta ? <section className="bg-indigo text-canvas">
        <div className="mx-auto flex w-full max-w-main flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-end lg:px-10 lg:py-24">
          <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Ready to plan a controlled path to launch?</h2>
          <PageActionLink action={data.cta} analyticsLocation="process_closing" inverse />
        </div>
      </section> : null}
    </main>
  );
}

export function AboutPage({data}: {data: AboutPageData}) {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        analyticsLocation="about_hero"
        layout="editorial"
        body={data.introduction}
        eyebrow="About Chromapages"
        title={data.title}
        cta={data.cta?.label && data.cta.href ? data.cta : {label: "Plan Your Digital Upgrade →", href: "/contact"}}
        navigation={{label: "Explore the studio", links: [
          ...(data.principles?.some((item) => item?.title?.trim()) ? [{label: "How we approach the work", href: "#about-principles"}] : []),
          {label: "Our delivery process", href: "/process"},
        ]}}
      />
      <AboutPrinciples principles={data.principles} />
      <AboutPerspective detail={data.detail} />
      {data.cta ? <section className="bg-indigo text-canvas">
        <div className="mx-auto flex w-full max-w-main flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-end lg:px-10 lg:py-24">
          <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Ready to discuss the next stage of your digital presence?</h2>
          <PageActionLink action={data.cta} analyticsLocation="about_closing" inverse />
        </div>
      </section> : null}
    </main>
  );
}

export function ContactPage({data}: {data: ContactPageData}) {
  const formNotice = data.formNotice;
  const formAvailable = !data.formNotice;

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        analyticsLocation="contact_hero"
        asideCard={{
          eyebrow: "Project conversation",
          title: "A focused first step",
          items: [{label: "Format", value: "Project-fit conversation"}],
        }}
        body={data.introduction}
        eyebrow="Project Fit Review"
        title={data.title ?? "Start a project conversation"}
      />
      <section className="bg-canvas py-12 lg:py-20">
        <div className="mx-auto grid w-full max-w-main gap-12 px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:px-10">
          <div>
            <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              The first conversation
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              A focused conversation about the work ahead.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              Share the current challenge, the direction you are considering, and the outcomes that matter most.
            </p>

            <div className="mt-8 space-y-6 border-t border-ink/10 pt-6 text-xs text-ink/70">
              <div className="border-l-2 border-indigo pl-4">
                <p className="font-semibold text-ink">01 / Your context</p>
                <p className="mt-1">Tell us what is changing in the business and where the digital experience is falling behind.</p>
              </div>
              <div className="border-l-2 border-teal pl-4">
                <p className="font-semibold text-ink">02 / Project fit</p>
                <p className="mt-1">We will clarify the scope, timing, and the most useful next step.</p>
              </div>
              <div className="border-l-2 border-indigo pl-4">
                <p className="font-semibold text-ink">03 / Next move</p>
                <p className="mt-1">You will leave with a clear sense of whether an engagement makes sense.</p>
              </div>
            </div>
          </div>

          <div>
            <ProjectFitForm available={formAvailable} notice={formNotice} />
          </div>
        </div>
      </section>
      {data.cta ? (
        <section className="bg-ink text-canvas">
          <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-20">
            <PageActionLink action={data.cta} analyticsLocation="contact_alternative" inverse />
          </div>
        </section>
      ) : null}
    </main>
  );
}
