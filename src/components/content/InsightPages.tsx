import Image from "next/image";
import Link from "next/link";
import type {ReactNode} from "react";

import type {SeoData} from "@/lib/seo";
import {GlobalCtaSection} from "./GlobalCtaSection";
import {InsightsRegister} from "./InsightsRegister";
import type {InsightThumbnail} from "./InsightCard";

import {PageHero, type PageAction} from "./PagePrimitives";
import {
  estimateInsightReadingTime,
  formatInsightPublicationDate,
  type InsightPortableText,
  type InsightPortableTextBlock,
  type InsightPortableTextSpan,
} from "./insights";

export type InsightListItem = {
  id?: string | null;
  title?: string | null;
  slug?: string | null;
  category?: string | null;
  author?: string | null;
  summary?: string | null;
  publishedAt?: string | null;
  body?: string | null;
  featuredImage?: InsightThumbnail | null;
};

export type InsightsPageData = {
  title?: string | null;
  introduction?: string | null;
  heroImage?: {url?: string | null; alt?: string | null} | null;
  featuredHeading?: string | null;
  featuredInsightId?: string | null;
  latestHeading?: string | null;
  emptyStateHeading?: string | null;
  emptyStateBody?: string | null;
  ctaHeading?: string | null;
  cta?: PageAction;
  seo?: SeoData | null;
};

export type InsightDetailData = Omit<InsightListItem, "body" | "featuredImage"> & {
  content?: InsightPortableText | null;
  seo?: SeoData | null;
  featuredImage?: {url?: string | null; alt?: string | null; caption?: string | null} | null;
  relatedOffers?: Array<{title?: string | null; slug?: string | null} | null> | null;
};


export function InsightsIndex({insights, page}: {insights: InsightListItem[] | null; page?: InsightsPageData | null}) {
  const items = insights?.filter((insight) => insight.slug && insight.title) ?? [];
  const featured = page?.featuredInsightId ? items.find((insight) => insight.id === page.featuredInsightId) : null;
  const orderedItems = featured ? [featured, ...items.filter((insight) => insight.id !== featured.id)] : items;
  const hasInsights = items.length > 0;
  const title = page?.title ?? "Ideas for stronger digital experiences.";
  const introduction = page?.introduction ?? "Practical perspectives on strategy, performance, and controlled website delivery.";

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="relative isolate overflow-hidden bg-ink text-canvas" aria-labelledby="insights-hero-title">
        <Image alt={page?.heroImage?.alt ?? ""} aria-hidden={page?.heroImage?.url ? undefined : true} className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center" fill priority sizes="100vw" src={page?.heroImage?.url ?? "/insights-editorial-hero.png"} />
        <div className="absolute inset-0 -z-10 bg-ink/30" aria-hidden="true" />
        <div className="mx-auto grid min-h-[16rem] w-full max-w-[112rem] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-end lg:px-12 lg:py-8 2xl:px-20">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-canvas/90 uppercase"><span aria-hidden="true" className="h-px w-5 bg-canvas/80" /> Insights</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-5xl lg:text-6xl" id="insights-hero-title">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-canvas/90 sm:text-lg">{introduction}</p>
          </div>
          <p className="hidden self-center border-l border-canvas/60 pl-5 text-xs font-bold leading-5 tracking-[0.22em] text-canvas/85 uppercase lg:block">Practical<br />ideas.<br />Real impact.</p>
        </div>
      </section>
      {hasInsights ? (
        <InsightsRegister featuredId={featured?.id} heading={page?.latestHeading} items={orderedItems} />
      ) : (
        <section className="bg-canvas text-ink"><div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24"><div className="max-w-[65ch] border-l-2 border-indigo pl-6 sm:pl-8"><p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">Guide library</p><h2 className="mt-4 font-display text-3xl leading-tight tracking-[-0.035em] text-balance sm:text-4xl">{page?.emptyStateHeading ?? "Practical guides are in development."}</h2><p className="mt-6 text-base leading-8 text-ink/75 sm:text-lg">{page?.emptyStateBody ?? "We are preparing practical perspectives on the decisions behind a stronger digital presence. Until then, we can discuss the operating realities of your next project directly."}</p></div></div></section>
      )}
      <GlobalCtaSection
        analyticsLocation="insights_closing"
        primaryAction={page?.cta}
        title={page?.ctaHeading?.trim() ? page.ctaHeading : undefined}
      />
    </main>
  );
}

function safeArticleHref(value?: string) {
  if (!value) return null;
  if (value.startsWith("/") || value.startsWith("#")) return value;
  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? value : null;
  } catch {
    return null;
  }
}

function renderSpan(span: InsightPortableTextSpan, block: InsightPortableTextBlock, key: string) {
  let node: ReactNode = span.text ?? "";
  if (span.marks?.includes("strong")) node = <strong key={`${key}-strong`}>{node}</strong>;
  if (span.marks?.includes("em")) node = <em key={`${key}-em`}>{node}</em>;
  const link = span.marks?.map((mark) => block.markDefs?.find((definition) => definition._key === mark)).find((definition) => definition?._type === "link");
  const href = safeArticleHref(link?.href);
  if (href) {
    const external = href.startsWith("http");
    node = <a key={`${key}-link`} className="font-medium text-indigo underline decoration-teal underline-offset-4 hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo" href={href} rel={external ? "noreferrer" : undefined} target={external ? "_blank" : undefined}>{node}</a>;
  }
  return <>{node}</>;
}

function renderBlockText(block: InsightPortableTextBlock) {
  return block.children?.map((span, index) => <span key={span._key ?? index}>{renderSpan(span, block, `${block._key ?? "block"}-${index}`)}</span>) ?? null;
}

function RichText({content}: {content?: InsightPortableText | null}) {
  if (!content?.length) return null;
  const nodes: ReactNode[] = [];
  let listItems: InsightPortableTextBlock[] = [];
  let listType: "bullet" | "number" | null = null;
  const flushList = () => {
    if (!listItems.length || !listType) return;
    const List = listType === "number" ? "ol" : "ul";
    nodes.push(<List key={`list-${nodes.length}`} className={listType === "number" ? "my-6 list-decimal space-y-3 pl-6 text-base leading-8 text-ink/80 sm:text-lg" : "my-6 list-disc space-y-3 pl-6 text-base leading-8 text-ink/80 sm:text-lg"}>{listItems.map((block, index) => <li key={block._key ?? index}>{renderBlockText(block)}</li>)}</List>);
    listItems = [];
    listType = null;
  };
  for (const block of content) {
    if (block._type !== "block") continue;
    if (block.listItem) {
      if (listType && listType !== block.listItem) flushList();
      listType = block.listItem;
      listItems.push(block);
      continue;
    }
    flushList();
    const key = block._key ?? `block-${nodes.length}`;
    if (block.style === "h2") nodes.push(<h2 key={key} className="mt-12 font-display text-3xl leading-tight tracking-[-0.03em] text-balance sm:text-4xl">{renderBlockText(block)}</h2>);
    else if (block.style === "h3") nodes.push(<h3 key={key} className="mt-8 font-display text-2xl leading-snug tracking-[-0.025em] text-pretty sm:text-3xl">{renderBlockText(block)}</h3>);
    else nodes.push(<p key={key} className="mt-6 text-base leading-8 text-ink/80 sm:text-lg">{renderBlockText(block)}</p>);
  }
  flushList();
  return <div className="max-w-[65ch]">{nodes}</div>;
}

export function InsightPage({data}: {data: InsightDetailData}) {
  const publishedAt = formatInsightPublicationDate(data.publishedAt);
  const readingTime = estimateInsightReadingTime(data.content);

  return (
    <main id="main-content" tabIndex={-1}><article>
      <PageHero analyticsLocation="insight_hero" layout="editorial" backLink={{href: "/insights", label: "Insights"}} body={data.summary ?? undefined} eyebrow="Guide" title={data.title} />
      <section aria-label="Article details" className="border-b border-ink/15 bg-canvas text-ink"><div className="mx-auto flex w-full max-w-main flex-wrap gap-x-6 gap-y-3 px-6 py-5 text-sm text-ink/65 lg:px-10"><span>{readingTime} min read</span>{publishedAt ? <span>{publishedAt}</span> : null}{data.author ? <span>By {data.author}</span> : null}</div></section>
      {data.featuredImage?.url ? <figure className="bg-canvas"><div className="mx-auto max-w-main px-6 py-10 lg:px-10 lg:py-14"><Image alt={data.featuredImage.alt ?? ""} className="w-full object-cover" height={1080} sizes="100vw" src={data.featuredImage.url} width={1920} />{data.featuredImage.caption ? <figcaption className="mt-3 text-sm text-ink/60">{data.featuredImage.caption}</figcaption> : null}</div></figure> : null}
      {data.content?.length ? <section className="bg-canvas text-ink"><div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24"><p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">The guide</p><div className="mt-8"><RichText content={data.content} /></div></div></section> : null}
      {data.relatedOffers?.length ? <section className="bg-ink text-canvas"><div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24"><p className="text-xs font-semibold tracking-[0.18em] text-canvas/80 uppercase">Relevant engagements</p><h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight tracking-[-0.035em] text-balance sm:text-4xl">Apply this perspective to the work ahead.</h2><ul className="mt-10 grid gap-3 border-t border-canvas/25 sm:grid-cols-2">{data.relatedOffers.map((offer) => <li key={offer?.slug ?? offer?.title}>{offer?.slug ? <Link className="flex min-h-14 items-center justify-between gap-4 border-b border-canvas/25 py-4 font-display text-lg text-canvas underline decoration-transparent underline-offset-4 hover:decoration-canvas focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas" href={`/services/${offer.slug}`}>{offer.title}<span aria-hidden="true">→</span></Link> : null}</li>)}</ul></div></section> : null}
    </article></main>
  );
}
