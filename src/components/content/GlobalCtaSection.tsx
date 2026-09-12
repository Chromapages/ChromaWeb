import Image from "next/image";
import Link from "next/link";
import type {ReactNode} from "react";
import {PageActionLink, type PageAction} from "./PagePrimitives";

export type GlobalCtaSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  primaryAction?: PageAction;
  primaryCaption?: string;
  secondaryAction?: {label: string; href: string} | null;
  secondaryCaption?: string;
  analyticsLocation?: string;
};

export function GlobalCtaSection({
  id = "project-fit",
  eyebrow = "Ready to move forward?",
  title,
  description = "Your business has outgrown the current experience. We’ll help you determine whether that means an audit, a focused build, or a larger digital transformation.",
  primaryAction,
  primaryCaption = "Talk through your goals and get a clear plan.",
  secondaryAction = {label: "Start With an Audit", href: "/services#audit-bridge-title"},
  secondaryCaption = "Get expert insight on your current site.",
  analyticsLocation = "global_cta",
}: GlobalCtaSectionProps) {
  const resolvedAction: PageAction =
    primaryAction?.label && primaryAction.href
      ? primaryAction
      : {label: "Plan Your Digital Upgrade →", href: "/contact"};

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink text-canvas"
      id={id}
    >
      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center"
        fill
        sizes="100vw"
        src="/process-global-cta-arc.png"
      />
      <div className="mx-auto grid w-full max-w-[112rem] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-x-16 lg:px-12 lg:py-8 2xl:px-20">
        <div className="max-w-2xl lg:border-r lg:border-canvas/55 lg:pr-16">
          {eyebrow ? (
            <p className="text-xs font-bold tracking-[0.18em] text-canvas/70 uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className="mt-2 font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-4xl lg:text-5xl"
            id={`${id}-title`}
          >
            {title ?? (
              <>
                Choose the <span className="text-teal">right next step.</span>
              </>
            )}
          </h2>
          {description ? (
            <p className="mt-3 max-w-xl text-sm leading-6 text-canvas/70 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
          <div className="[&>a]:w-full [&>a]:justify-center">
            <PageActionLink action={resolvedAction} analyticsLocation={analyticsLocation} />
            {primaryCaption ? (
              <p className="mt-3 text-sm leading-5 text-canvas/70">{primaryCaption}</p>
            ) : null}
          </div>
          {secondaryAction?.label && secondaryAction.href ? (
            <div>
              <Link
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-canvas/75 px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:border-teal hover:bg-canvas/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                href={secondaryAction.href}
              >
                {secondaryAction.label} <span aria-hidden="true" className="ml-1">→</span>
              </Link>
              {secondaryCaption ? (
                <p className="mt-3 text-sm leading-5 text-canvas/70">{secondaryCaption}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
