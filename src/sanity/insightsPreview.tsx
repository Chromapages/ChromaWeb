"use client";

import type {SanityDocument} from "sanity";

type StudioPreviewProps = {
  document: {displayed: Partial<SanityDocument>};
};

function textValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function statusLabel(value: unknown) {
  return textValue(value)?.replace(/([A-Z])/g, " $1").trim() ?? "Draft";
}

export function InsightsPageStudioPreview({document}: StudioPreviewProps) {
  const page = document.displayed;
  const title = textValue(page.title) ?? "Untitled Insights page";
  const introduction = textValue(page.introduction) ?? "Add a concise explanation of what readers can learn here.";
  const featuredReference = page.featuredInsight && typeof page.featuredInsight === "object" && "_ref" in page.featuredInsight
    ? textValue(page.featuredInsight._ref)
    : null;

  return (
    <section aria-label="Insights page preview" className="p-6">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase">Insights page · Studio preview</p>
      <h1 className="mt-4 text-3xl font-bold">{title}</h1>
      <p className="mt-4 max-w-2xl leading-7">{introduction}</p>
      <div className="mt-8 space-y-6">
        <section className="rounded border p-5"><h2 className="text-lg font-semibold">Library configuration</h2><p className="mt-2 leading-6">{featuredReference ? "A featured guide reference is selected. It becomes public only when that guide is Published ready." : "No featured guide selected. The public library will remain a chronological list."}</p><p className="mt-2 leading-6">{textValue(page.latestHeading) ?? "Latest guides"}</p></section>
        <section className="rounded border p-5"><h2 className="text-lg font-semibold">Public boundary</h2><p className="mt-2 leading-6">This view can display unsaved and draft page content. It does not publish the page or make draft guides available at /insights.</p></section>
      </div>
    </section>
  );
}

export function InsightStudioPreview({document}: StudioPreviewProps) {
  const insight = document.displayed;
  const title = textValue(insight.title) ?? "Untitled guide";
  const summary = textValue(insight.summary) ?? "Add a useful buyer-oriented summary before publication.";

  return (
    <section aria-label="Insight preview" className="p-6">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase">Guide · Studio preview · {statusLabel(insight.publishingStatus)}</p>
      <div className="mt-6 rounded border p-5"><h1 className="text-3xl font-bold">{title}</h1>{textValue(insight.category) ? <p className="mt-3 text-sm">{textValue(insight.category)}</p> : null}<p className="mt-4 max-w-2xl leading-7">{summary}</p></div>
      <p className="mt-6 max-w-2xl leading-7">Review content, summary, SEO, date, image permissions, and related services here. Public index and article routes exclude this guide until it is both published in Sanity and marked Published ready.</p>
    </section>
  );
}
