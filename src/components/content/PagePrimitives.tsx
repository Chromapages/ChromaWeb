import Link from "next/link";
import {getSequenceGridClassName, type ProcessStep} from "./processSteps";

export type PageAction = {label?: string | null; href?: string | null} | null;
export type PageStep = {title?: string | null; description?: string | null; proof?: string | null} | null;

export function PageActionLink({action, analyticsLocation, inverse = false}: {action?: PageAction; analyticsLocation: string; inverse?: boolean}) {
  if (!action?.label || !action.href) return null;

  return (
    <Link className={inverse ? "inline-flex rounded-lg border border-canvas px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:border-canvas hover:bg-canvas hover:text-ink focus-visible:outline-canvas" : "inline-flex rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo focus-visible:outline-indigo"} data-analytics-destination={action.href.split("?")[0]} data-analytics-event="cta_click" data-analytics-location={analyticsLocation} href={action.href}>
      {action.label}
    </Link>
  );
}

export function PublicPageUnavailable({title = "This page is unavailable right now.", body = "Please return to the homepage or get in touch to start a conversation."}: {title?: string; body?: string}) {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto flex min-h-[70vh] w-full max-w-main items-center px-6 py-20 lg:px-10">
      <section className="max-w-editorial border-l-4 border-indigo pl-6" aria-labelledby="page-title">
        <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">Chromapages</p>
        <h1 id="page-title" className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h1>
        <p className="mt-6 text-base leading-8 text-ink/70">{body}</p>
        <Link className="mt-8 inline-flex text-sm font-semibold text-indigo underline decoration-teal underline-offset-4 hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal" href="/">
          Return home
        </Link>
      </section>
    </main>
  );
}

/** @deprecated Use PublicPageUnavailable. Kept temporarily for existing public routes. */
export const PageEmpty = ({title}: {title: string; route?: string}) => <PublicPageUnavailable title={`${title} is unavailable right now.`} />;

import React from "react";
import {ChromaEdge} from "@/components/ui/ChromaEdge";

export type PageHeroMetric = {
  label: string;
  value: string;
};

export type PageHeroProps = {
  layout?: "standard" | "editorial";
  navigation?: {label: string; links: Array<{label: string; href: string}>} | null;
  eyebrow?: string | null;
  numeral?: string | null;
  badge?: string | null;
  title?: string | null;
  body?: string | null;
  backLink?: {href: string; label: string} | null;
  cta?: PageAction;
  secondaryCta?: PageAction;
  asideCard?: {
    eyebrow?: string;
    title?: string;
    items?: Array<{label: string; value: React.ReactNode}>;
    customContent?: React.ReactNode;
  } | null;
  metrics?: PageHeroMetric[] | null;
  analyticsLocation?: string;
};

function HeroBreadcrumb({backLink}: Pick<PageHeroProps, "backLink">) {
  if (!backLink) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <Link className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-canvas/70 uppercase transition-colors hover:text-teal focus-visible:outline-2 focus-visible:outline-teal" href={backLink.href}>
        <span className="text-teal transition-transform duration-200 group-hover:-translate-x-1">←</span>
        <span>{backLink.label}</span>
      </Link>
    </nav>
  );
}

function HeroMetadataCard({asideCard, metrics}: Pick<PageHeroProps, "asideCard" | "metrics">) {
  if (!asideCard && !metrics?.length) return null;

  return (
    <aside aria-label="Overview and metadata" className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xs sm:p-8">
        <ChromaEdge dark />
        {asideCard?.eyebrow ? <p className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">{asideCard.eyebrow}</p> : null}
        {asideCard?.title ? <p className="mt-2 font-display text-xl font-semibold text-canvas sm:text-2xl">{asideCard.title}</p> : null}
        {asideCard?.items?.length ? (
          <div className="mt-6 space-y-3.5 border-t border-white/10 pt-4 text-xs">
            {asideCard.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-4 text-canvas/80">
                <span className="text-canvas/60">{item.label}</span>
                <span className="text-right font-semibold text-canvas">{item.value}</span>
              </div>
            ))}
          </div>
        ) : null}
        {asideCard?.customContent ? <div className="mt-4">{asideCard.customContent}</div> : null}
        {metrics?.length ? (
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            {metrics.map((metric, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-display text-2xl font-bold text-teal">{metric.value}</span>
                <span className="mt-1 text-xs text-canvas/60">{metric.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}

function HeroNarrative({eyebrow, numeral, badge, title, body, cta, secondaryCta, analyticsLocation, titleId, mobile = false}: PageHeroProps & {titleId: string; mobile?: boolean}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        {numeral ? <span className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">{numeral}</span> : null}
        {eyebrow ? <span className="font-display text-xs font-semibold tracking-[0.2em] text-canvas/85 uppercase">{numeral ? `• ${eyebrow}` : eyebrow}</span> : null}
        {badge ? <span className="rounded-md border border-teal/30 bg-teal/10 px-2.5 py-0.5 text-xs font-semibold text-teal">{badge}</span> : null}
      </div>
      <h1 id={titleId} className={mobile ? "mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-balance text-canvas sm:text-5xl" : "mt-6 font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-balance text-canvas lg:text-7xl"}>
        {title ?? "Chromapages"}
      </h1>
      {body ? <p className={mobile ? "mt-6 max-w-2xl text-base leading-8 text-canvas/75" : "mt-7 max-w-2xl text-base leading-8 text-canvas/75 sm:text-lg"}>{body}</p> : null}
      {cta || secondaryCta ? (
        <div className={mobile ? "mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center [&>a]:justify-center sm:[&>a]:w-auto" : "mt-10 flex flex-wrap items-center gap-4"}>
          {cta ? <PageActionLink action={cta} analyticsLocation={`${analyticsLocation ?? "page_hero"}_primary`} /> : null}
          {secondaryCta ? <PageActionLink action={secondaryCta} analyticsLocation={`${analyticsLocation ?? "page_hero"}_secondary`} inverse /> : null}
        </div>
      ) : null}
    </div>
  );
}

/** An editorial opening, using the same CMS content and responsive hero entry points. */
function HeroEditorial({eyebrow, title, body, cta, navigation, analyticsLocation, backLink, mobile = false}: PageHeroProps & {mobile?: boolean}) {
  const hasNavigation = Boolean(navigation?.links.length || (cta?.label && cta.href));
  const primaryAction = cta?.label && cta.href ? (
    <Link href={cta.href} data-analytics-event="cta_click" data-analytics-location={`${analyticsLocation ?? "page_hero"}_primary`} data-analytics-destination={cta.href.split("?")[0]} className="flex min-h-12 w-full items-center justify-center rounded-lg bg-canvas px-6 py-4 text-center text-sm font-semibold text-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas sm:w-fit lg:w-full">
      {cta.label}
    </Link>
  ) : null;

  return (
    <div className="relative mx-auto w-full max-w-main px-6 pt-12 pb-12 sm:pt-16 lg:px-10 lg:pt-20 lg:pb-16">
      <HeroBreadcrumb backLink={backLink} />
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-10 bg-canvas/50" />
        {eyebrow ? <p className="text-xs font-semibold tracking-[0.18em] text-canvas/80 uppercase">{eyebrow}</p> : null}
      </div>
      <h1 id={`page-hero-title-${mobile ? "mobile" : "desktop"}`} className="mt-6 max-w-[28ch] font-display text-4xl font-bold leading-[1.12] tracking-[-0.035em] text-balance wrap-break-word text-canvas sm:text-5xl lg:text-6xl xl:text-7xl">
        {title ?? "Chromapages"}
      </h1>
      {mobile && primaryAction ? <div className="mt-6">{primaryAction}</div> : null}
      <div className={`mt-8 grid gap-8 border-t border-canvas/25 pt-8 lg:mt-12 lg:gap-16 lg:pt-10 ${hasNavigation ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]" : ""}`}>
        {body ? <p className="max-w-[65ch] min-w-0 whitespace-pre-line text-base leading-7 wrap-break-word text-canvas/80 sm:text-lg sm:leading-8">{body}</p> : null}
        {hasNavigation ? (
          <div className="min-w-0 lg:border-l lg:border-canvas/25 lg:pl-8">
            {!mobile ? primaryAction : null}
            {navigation?.links.length ? (
              <nav aria-label={navigation.label} className={!mobile && primaryAction ? "mt-8" : ""}>
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-canvas/70 uppercase">{navigation.label}</p>
                <ul className="divide-y divide-canvas/25">
                  {navigation.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} data-analytics-event="cta_click" data-analytics-location={`${analyticsLocation ?? "page_hero"}_navigation`} data-analytics-destination={link.href} className="group flex min-h-14 items-center justify-between gap-4 py-4 text-sm font-medium text-canvas underline decoration-transparent underline-offset-4 transition-colors hover:decoration-canvas focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas">
                        <span>{link.label}</span>
                        <span aria-hidden="true" className="shrink-0 text-lg">{link.href.startsWith("#") ? "↓" : "→"}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Global desktop composition for all non-home page heroes. */
export function DesktopPageHero(props: PageHeroProps) {
  if (props.layout === "editorial") return <div className="hidden lg:block"><HeroEditorial {...props} /></div>;
  const hasAside = Boolean(props.asideCard || props.metrics?.length);

  return (
    <div className="hidden lg:block">
      <div className="mx-auto w-full max-w-main px-10 pb-20 pt-28">
        <HeroBreadcrumb backLink={props.backLink} />
        <div className={`grid items-end gap-10 ${hasAside ? "grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]" : "max-w-4xl"}`}>
          <HeroNarrative {...props} titleId="page-hero-title-desktop" />
          {hasAside ? <div className="justify-self-end"><HeroMetadataCard asideCard={props.asideCard} metrics={props.metrics} /></div> : null}
        </div>
      </div>
    </div>
  );
}

/** Global mobile composition for all non-home page heroes. */
export function MobilePageHero(props: PageHeroProps) {
  if (props.layout === "editorial") return <div className="lg:hidden"><HeroEditorial {...props} mobile /></div>;
  const hasAside = Boolean(props.asideCard || props.metrics?.length);

  return (
    <div className="lg:hidden">
      <div className="mx-auto w-full max-w-main px-6 pb-16 pt-20">
        <HeroBreadcrumb backLink={props.backLink} />
        <HeroNarrative {...props} mobile titleId="page-hero-title-mobile" />
        {hasAside ? <div className="mt-10"><HeroMetadataCard asideCard={props.asideCard} metrics={props.metrics} /></div> : null}
      </div>
    </div>
  );
}

/** Stable global hero API; selects a layout through responsive CSS without client JavaScript. */
export const PageHero = (props: PageHeroProps) => (
  <header className={`relative overflow-hidden bg-ink text-canvas ${props.layout === "editorial" ? "hero-editorial border-b border-canvas/25" : ""}`}>
    {props.layout !== "editorial" ? <ChromaEdge dark /> : null}
    <DesktopPageHero {...props} />
    <MobilePageHero {...props} />
  </header>
);

export const EditorialHero = ({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title?: string | null;
  body?: string | null;
}) => {
  return <PageHero eyebrow={eyebrow} title={title} body={body} />;
};

export function EditorialSection({id, number, title, body, dark = false, children, readableMeasure = false}: {id?: string; number: string; title: string; body?: string | null; dark?: boolean; children?: React.ReactNode; readableMeasure?: boolean}) {
  const eyebrowClassName = dark ? "text-xs font-semibold tracking-[0.18em] text-canvas/85 uppercase" : "text-xs font-semibold tracking-[0.18em] text-teal uppercase";
  const measureClassName = readableMeasure ? "max-w-[65ch]" : "max-w-3xl";
  const bodyClassName = dark ? `mt-6 ${measureClassName} whitespace-pre-line text-base leading-8 text-canvas/72 sm:text-lg` : `mt-6 ${measureClassName} whitespace-pre-line text-base leading-8 text-ink/72 sm:text-lg`;

  return (
    <section id={id} tabIndex={id ? -1 : undefined} aria-labelledby={id ? `${id}-title` : undefined} className={`scroll-mt-24 ${dark ? "bg-ink text-canvas focus-visible:outline-canvas" : "bg-canvas text-ink"}`}>
      <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex items-center gap-3">
          <p className={eyebrowClassName}>{number}</p>
          <span aria-hidden="true" className={dark ? "h-px w-8 bg-canvas/40" : "h-px w-8 bg-teal/40"} />
        </div>
        <div className="mt-4">
          <h2 id={id ? `${id}-title` : undefined} className="max-w-4xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-balance sm:text-4xl lg:text-5xl">{title}</h2>
          {body ? <p className={bodyClassName}>{body}</p> : null}
          {children ? <div className="mt-12">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function StepGrid({steps, dark = false}: {steps?: PageStep[] | null; dark?: boolean}) {
  if (!steps?.length) return null;

  return (
    <ol className={dark ? "grid gap-px border border-canvas/25 sm:grid-cols-2" : "grid gap-px border border-ink/15 sm:grid-cols-2"}>
      {steps.map((step, index) => (
        <li key={`${step?.title ?? "step"}-${index}`} className="min-h-44 p-6">
          <p className={dark ? "text-xs font-semibold tracking-[0.18em] text-canvas/85" : "text-xs font-semibold tracking-[0.18em] text-teal"}>{String(index + 1).padStart(2, "0")}</p>
          {step?.title ? <h3 className="mt-6 font-display text-xl font-semibold">{step.title}</h3> : null}
          {step?.description ? <p className={dark ? "mt-3 text-sm leading-6 text-canvas/70" : "mt-3 text-sm leading-6 text-ink/70"}>{step.description}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export function SequenceStepGrid({steps}: {steps?: ProcessStep[] | null}) {
  if (!steps?.length) return null;

  return (
    <ol className={`grid list-none gap-8 border border-canvas/25 p-6 sm:gap-10 sm:p-8 lg:gap-14 lg:p-12 ${getSequenceGridClassName(steps.length)}`}>
      {steps.map((step, index) => {
        const isLastStep = index === steps.length - 1;

        return (
          <li key={step.id} className="relative min-w-0 min-h-52 pl-7 md:pl-0">
            {!isLastStep ? <span aria-hidden="true" className="pointer-events-none absolute top-7 left-2 h-[calc(100%+0.25rem)] border-l border-canvas/40 sm:h-[calc(100%+0.75rem)] md:hidden" /> : null}
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-canvas/85">{String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</p>
              {!isLastStep ? <span aria-hidden="true" className="hidden text-sm font-semibold text-teal md:inline">Next →</span> : <span aria-hidden="true" className="hidden text-sm font-semibold text-teal md:inline">Launch</span>}
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-canvas/70">{step.description}</p>
            {step.proofPoints.length ? (
              <ul aria-label={`${step.title} proof points`} className="mt-5 flex flex-wrap gap-2">
                {step.proofPoints.map((proofPoint) => <li key={proofPoint} className="rounded-full border border-canvas/40 bg-canvas/10 px-3 py-1 text-xs font-semibold text-canvas">{proofPoint}</li>)}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
