"use client";

import Link from "next/link";
import {useEffect} from "react";

import type {PageAction} from "./PagePrimitives";
import {trackEvent} from "@/lib/analytics";

function getCtaIdentifier(href: string) {
  return href.split("?")[0].replace(/^\/+/, "") || "home";
}

export function ProcessSequenceSectionView({stepCount}: {stepCount: number}) {
  useEffect(() => {
    trackEvent("process_sequence_section_view", {step_count: stepCount});
  }, [stepCount]);

  return null;
}

export function ProcessSequenceCta({action, stepCount}: {action?: PageAction; stepCount: number}) {
  if (!action?.label || !action.href) return null;

  const ctaId = getCtaIdentifier(action.href);
  return (
    <Link className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-teal px-5 text-sm font-semibold text-canvas transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas sm:w-auto" href={action.href} onClick={() => trackEvent("process_sequence_cta_click", {step_count: stepCount, cta_id: ctaId})}>
      {action.label}
    </Link>
  );
}
