import {
  EditorialSection,
  PageActionLink,
  PageHero,
  type PageAction,
} from "./PagePrimitives";
import {AboutPerspective} from "./AboutPerspective";
import {AboutPrinciples} from "./AboutPrinciples";
import {DifferentiatorList} from "./DifferentiatorList";
import {ProcessSequenceCta, ProcessSequenceSectionView} from "./ProcessSequenceAnalytics";
import {normalizeProcessSteps} from "./processSteps";
import {parseProcessContext} from "./processContext";
import type {AboutPageData, ProcessPageData} from "./SingletonPages";
import {SequenceStepGrid} from "./PagePrimitives";

function hasAboutPrinciples(about?: AboutPageData | null) {
  return Boolean(about?.principles?.some((item) => item?.title?.trim()));
}

function hasAboutPerspective(about?: AboutPageData | null) {
  return Boolean(about?.detail?.split(/\r?\n\s*\r?\n/).some((paragraph) => paragraph.trim()));
}

export function CombinedProcessAboutPage({
  process,
  about,
}: {
  process: ProcessPageData;
  about?: AboutPageData | null;
}) {
  const steps = normalizeProcessSteps(process.steps);
  const context = parseProcessContext({
    detail: process.detail,
    intro: process.operatingPrinciplesIntro,
    standards: process.operatingPrinciples,
  });
  const studioContent = about?.introduction?.trim();
  const principlesAvailable = hasAboutPrinciples(about);
  const perspectiveAvailable = hasAboutPerspective(about);
  const cta: PageAction = process.cta ?? about?.cta ?? {label: "Plan Your Digital Upgrade →", href: "/contact"};
  const navigationLinks = [
    ...(studioContent ? [{label: "Studio", href: "#studio"}] : []),
    ...(principlesAvailable ? [{label: "Principles", href: "#principles"}] : []),
    {label: "Delivery process", href: "#delivery-process"},
    ...(perspectiveAvailable ? [{label: "Working relationship", href: "#working-relationship"}] : []),
    {label: "Project fit", href: "#project-fit"},
  ];

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
        body={process.introduction}
        eyebrow="How We Work"
        layout="editorial"
        navigation={{label: "On this page", links: navigationLinks}}
        title={process.title ?? "How We Work"}
      />

      {studioContent ? (
        <EditorialSection
          body={studioContent}
          id="studio"
          number="Studio"
          title="Why Chromapages exists"
        />
      ) : null}

      {principlesAvailable ? (
        <AboutPrinciples id="principles" principles={about?.principles} processHref="#delivery-process" />
      ) : null}

      <EditorialSection
        body="A four-stage delivery framework, adapted to the scope and operating reality of each engagement."
        dark
        id="delivery-process"
        number="Delivery Process"
        title="A controlled path to launch"
      >
        <ProcessSequenceSectionView stepCount={steps.length} />
        <SequenceStepGrid steps={steps} />
        <div className="mt-12">
          <ProcessSequenceCta action={cta} stepCount={steps.length} />
        </div>
      </EditorialSection>

      {context.standards.length ? (
        <EditorialSection
          body={context.intro}
          id="operating-principles"
          number="Operating Principles"
          readableMeasure
          title="What keeps the work moving"
        >
          <DifferentiatorList items={context.standards} />
          <div className="mt-12">
            <PageActionLink
              action={{label: "Plan Your Digital Upgrade →", href: "/contact"}}
              analyticsLocation="process_operating_principles"
            />
          </div>
        </EditorialSection>
      ) : null}

      {perspectiveAvailable ? <AboutPerspective detail={about?.detail} id="working-relationship" /> : null}

      <section
        aria-labelledby="project-fit-title"
        className="scroll-mt-24 bg-indigo text-canvas"
        id="project-fit"
        tabIndex={-1}
      >
        <div className="mx-auto flex w-full max-w-main flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-end lg:px-10 lg:py-24">
          <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em]" id="project-fit-title">
            Ready to plan a controlled path to launch?
          </h2>
          <PageActionLink action={cta} analyticsLocation="process_closing" inverse />
        </div>
      </section>
    </main>
  );
}
