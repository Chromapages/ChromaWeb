"use client";

import Image from "next/image";
import Link from "next/link";
import {useMemo, useState} from "react";

import {insightThumbnailUrl} from "./InsightCard";
import {formatInsightPublicationDate} from "./insights";
import type {InsightListItem} from "./InsightPages";

const themes = [
  {id: "strategy", label: "Strategy", match: ["strategy"], icon: "/insights-theme-strategy.png"},
  {id: "design", label: "Design + UX", match: ["design", "ux"], icon: "/insights-theme-design.png"},
  {id: "performance", label: "Performance", match: ["performance"], icon: "/insights-theme-performance.png"},
  {id: "growth", label: "Launch + Growth", match: ["launch", "growth"], icon: "/insights-theme-growth.png"},
  {id: "industry", label: "Industry", match: ["industry"], icon: "/insights-theme-industry.png"},
] as const;

function matchesTheme(insight: InsightListItem, themeId: string) {
  if (themeId === "all") return true;
  const theme = themes.find((item) => item.id === themeId);
  const category = insight.category?.toLowerCase() ?? "";
  return theme?.match.some((term) => category.includes(term)) ?? false;
}

function readingTime(insight: InsightListItem) {
  const words = (insight.body ?? insight.summary ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function InsightsRegister({items, featuredId, heading}: {items: InsightListItem[]; featuredId?: string | null; heading?: string | null}) {
  const [themeId, setThemeId] = useState("all");
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");
  const visibleItems = useMemo(() => {
    const primary = items[0];
    const rest = items.slice(1).filter((item) => matchesTheme(item, themeId));
    rest.sort((left, right) => {
      const leftTime = left.publishedAt ? Date.parse(left.publishedAt) : 0;
      const rightTime = right.publishedAt ? Date.parse(right.publishedAt) : 0;
      return sortBy === "latest" ? rightTime - leftTime : leftTime - rightTime;
    });
    return primary && matchesTheme(primary, themeId) ? [primary, ...rest] : rest;
  }, [items, sortBy, themeId]);
  const [lead, ...additional] = visibleItems;

  return (
    <section aria-labelledby="insights-library-title" className="scroll-mt-24 bg-canvas text-ink" id="insights-library">
      <div className="mx-auto grid w-full max-w-[112rem] gap-12 px-5 py-12 sm:px-8 lg:px-12 lg:py-10 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-14 2xl:px-20">
        <div className="min-w-0">
          <div className="flex flex-col gap-5 border-b border-indigo/25 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <p className="shrink-0 text-xs font-bold tracking-[0.2em] text-indigo uppercase">The knowledge register</p>
              <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-indigo/25" />
            </div>
            <div className="flex items-center gap-4 text-sm text-ink/65">
              <span>{visibleItems.length} {visibleItems.length === 1 ? "article" : "articles"}</span>
              <span aria-hidden="true" className="h-5 w-px bg-indigo/30" />
              <label className="flex items-center gap-3" htmlFor="insights-sort">
                <span>Sort by</span>
                <select className="h-9 rounded-md border border-indigo/20 bg-white px-3 text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo" id="insights-sort" onChange={(event) => setSortBy(event.target.value as "latest" | "oldest")} value={sortBy}>
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </label>
            </div>
          </div>

          <h2 className="sr-only" id="insights-library-title">{heading ?? "Latest guides"}</h2>
          {lead ? (
            <ol className="divide-y divide-indigo/20">
              <li className="py-10 lg:py-12">
                <article className="grid gap-7 lg:grid-cols-[4rem_minmax(15rem,22rem)_minmax(0,1fr)] lg:items-center lg:gap-8">
                  <p aria-hidden="true" className="font-display text-4xl font-light tracking-[-0.045em] text-indigo/45">01</p>
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-indigo/10">
                    {insightThumbnailUrl(lead.featuredImage) ? <Image alt={lead.featuredImage?.alt ?? ""} className="object-cover" fill sizes="(min-width: 1024px) 352px, 100vw" src={insightThumbnailUrl(lead.featuredImage)!} /> : <div aria-hidden="true" className="size-full bg-indigo/10" />}
                  </div>
                  <div className="min-w-0">
                    {lead.category ? <p className="text-xs font-bold tracking-[0.18em] text-teal uppercase">{lead.category}</p> : null}
                    <h3 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-4xl">
                      <Link className="group inline-flex items-start gap-4 outline-none hover:text-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo" href={`/insights/${lead.slug}`}>
                        <span>{lead.title}</span><span aria-hidden="true" className="mt-1 text-2xl font-normal text-indigo transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </h3>
                    {lead.summary ? <p className="mt-4 max-w-xl text-base leading-7 text-ink/70">{lead.summary}</p> : null}
                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink/65">
                      <span>Guide</span><span aria-hidden="true" className="h-4 w-px bg-indigo/25" />
                      <span>{readingTime(lead)} min read</span>
                      {lead.publishedAt ? <><span aria-hidden="true" className="h-4 w-px bg-indigo/25" /><time dateTime={lead.publishedAt}>{formatInsightPublicationDate(lead.publishedAt)}</time></> : null}
                      {lead.author ? <><span aria-hidden="true" className="h-4 w-px bg-indigo/25" /><span>By {lead.author}</span></> : null}
                    </div>
                    {lead.id === featuredId ? <span className="sr-only">Editor’s pick</span> : null}
                  </div>
                </article>
              </li>
              {additional.map((insight, index) => (
                <li className="py-7" key={insight.id ?? insight.slug}>
                  <article className="grid gap-4 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-center">
                    <p aria-hidden="true" className="font-display text-3xl font-light text-indigo/45">{String(index + 2).padStart(2, "0")}</p>
                    <div>
                      {insight.category ? <p className="text-xs font-bold tracking-[0.16em] text-teal uppercase">{insight.category}</p> : null}
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.035em]"><Link className="hover:text-indigo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo" href={`/insights/${insight.slug}`}>{insight.title}</Link></h3>
                      {insight.summary ? <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/70">{insight.summary}</p> : null}
                    </div>
                    <span aria-hidden="true" className="text-2xl text-indigo">→</span>
                  </article>
                </li>
              ))}
              {!additional.length && !lead ? null : null}
            </ol>
          ) : <div className="py-12"><p className="font-display text-2xl font-bold">No guides in this theme yet.</p><button className="mt-4 text-sm font-semibold text-indigo underline decoration-teal underline-offset-4" onClick={() => setThemeId("all")} type="button">Show all insights</button></div>}
          {lead && additional.length === 0 ? <div className="grid gap-5 border-t border-indigo/20 py-9 sm:grid-cols-[4rem_minmax(0,1fr)] sm:items-start">
            <p aria-hidden="true" className="font-display text-4xl font-light tracking-[-0.045em] text-indigo/45">02</p>
            <div>
              <h3 className="font-display text-2xl font-bold tracking-[-0.04em]">More insights coming soon.</h3>
              <p className="mt-2 text-base leading-7 text-ink/70">We’re publishing new guides, frameworks, and industry perspectives.</p>
              <Link className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-teal px-5 py-3 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo" href="/contact?topic=insights">Get notified <span aria-hidden="true" className="ml-2">→</span></Link>
            </div>
          </div> : null}
        </div>

        <aside className="border-t border-indigo/25 pt-8 xl:border-t-0 xl:border-l xl:pl-10 xl:pt-0" aria-label="Explore insights">
          <p className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-indigo uppercase"><span>Explore by theme</span><span aria-hidden="true" className="h-px flex-1 bg-indigo/25" /></p>
          <nav className="mt-4" aria-label="Insight themes">
            {themes.map((theme) => (
              <button aria-pressed={theme.id === themeId} className="flex min-h-12 w-full items-center justify-between border-b border-indigo/15 py-3 text-left text-sm font-semibold text-ink transition-colors hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo" key={theme.id} onClick={() => setThemeId(theme.id)} type="button">
                <span className="flex items-center gap-3"><Image alt="" aria-hidden className="size-6" height={96} src={`${theme.icon}?v=icon-fit-2`} unoptimized width={96} />{theme.label}</span><span aria-hidden="true" className="text-lg font-normal text-indigo">→</span>
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-xl border border-indigo/10 bg-indigo/5 p-6">
            <p className="text-xs font-bold tracking-[0.16em] text-indigo/75 uppercase">Have a topic in mind?</p>
            <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.04em]">We’d love to cover it.</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">Share what you’d like to see and help shape future content.</p>
            <Link className="mt-5 inline-flex min-h-10 items-center rounded-lg border border-teal px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo" href="/contact?topic=insight">Suggest a topic <span aria-hidden="true" className="ml-2">→</span></Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
