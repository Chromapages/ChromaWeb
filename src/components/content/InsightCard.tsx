import Image from "next/image";
import Link from "next/link";

import type {InsightListItem} from "./InsightPages";
import {formatInsightPublicationDate} from "./insights";

export type InsightThumbnail = {
  url?: string | null;
  alt?: string | null;
  approvalStatus?: string | null;
  rightsConfirmed?: boolean | null;
  dimensions?: {width: number; height: number} | null;
  crop?: {left: number; right: number; top: number; bottom: number} | null;
  hotspot?: {x: number; y: number} | null;
};

// Reserve a 16:9 crop around the editor's focal point, inside the approved crop.
export function insightThumbnailUrl(image?: InsightThumbnail | null): string | null {
  if (!image?.url || image.approvalStatus !== "approved" || image.rightsConfirmed !== true) return null;
  let url: URL;
  try {
    url = new URL(image.url);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.hostname !== "cdn.sanity.io" || !url.pathname.startsWith("/images/")) return null;
  const dimensions = image.dimensions;
  if (!dimensions || dimensions.width <= 0 || dimensions.height <= 0) return null;
  const {width, height} = dimensions;
  const crop = image.crop ?? {left: 0, right: 0, top: 0, bottom: 0};
  const left = crop.left * width;
  const top = crop.top * height;
  const availableWidth = width * (1 - crop.left - crop.right);
  const availableHeight = height * (1 - crop.top - crop.bottom);
  if (availableWidth <= 0 || availableHeight <= 0) return null;
  const targetWidth = Math.min(availableWidth, availableHeight * 16 / 9);
  const targetHeight = targetWidth * 9 / 16;
  const centerX = (image.hotspot?.x ?? 0.5) * width;
  const centerY = (image.hotspot?.y ?? 0.5) * height;
  const x = Math.max(left, Math.min(centerX - targetWidth / 2, left + availableWidth - targetWidth));
  const y = Math.max(top, Math.min(centerY - targetHeight / 2, top + availableHeight - targetHeight));
  url.searchParams.set("rect", [x, y, targetWidth, targetHeight].map(Math.floor).join(","));
  url.searchParams.set("w", "1200");
  url.searchParams.set("h", "675");
  url.searchParams.set("fit", "crop");
  return url.toString();
}

export function InsightCard({insight, featured = false}: {insight: InsightListItem; featured?: boolean}) {
  if (!insight.slug || !insight.title) return null;
  const imageUrl = insightThumbnailUrl(insight.featuredImage);
  const date = formatInsightPublicationDate(insight.publishedAt);

  return (
    <article className="group relative flex h-full min-w-0 flex-col rounded-xl border border-ink/15 bg-canvas text-ink transition-[transform,border-color] duration-150 hover:border-teal focus-within:ring-2 focus-within:ring-indigo focus-within:ring-offset-4 focus-within:ring-offset-canvas motion-safe:hover:-translate-y-0.5 dark:border-canvas/25 dark:bg-ink dark:text-canvas dark:hover:border-canvas dark:focus-within:ring-canvas dark:focus-within:ring-offset-ink">
      <div className="relative aspect-[21/9] shrink-0 overflow-hidden rounded-t-xl border-b border-ink/15 dark:border-canvas/25">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={insight.featuredImage?.alt ?? ""}
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 384px, (min-width: 1200px) calc((100vw - 128px) / 3), (min-width: 1024px) calc((100vw - 104px) / 2), (min-width: 768px) calc((100vw - 72px) / 2), calc(100vw - 48px)"
            className="object-cover"
          />
        ) : (
          <div aria-hidden="true" className="flex h-full flex-col justify-between bg-indigo p-5 text-canvas">
            <span className="text-xs font-semibold tracking-widest uppercase">Chromapages / Guides</span>
            <div className="border-l-2 border-canvas/60 pl-4">
              <span className="block max-w-[20ch] font-display text-2xl leading-snug font-semibold">{insight.category ?? "Insights"}</span>
            </div>
          </div>
        )}
        {featured ? <span className="absolute top-4 right-4 rounded-md bg-canvas px-3 py-2 text-xs font-semibold text-indigo">Editor’s pick</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-[1.4] font-bold tracking-[-0.025em] break-words min-[75rem]:text-[1.375rem]">
          <Link href={`/insights/${insight.slug}`} className="outline-none! after:absolute after:inset-0 after:rounded-xl group-hover:underline group-hover:decoration-teal group-hover:underline-offset-4">
            {insight.title}
          </Link>
        </h3>
        {insight.summary ? <p className="mt-3 text-sm leading-6 break-words text-ink/80 dark:text-canvas/85">{insight.summary}</p> : null}
        <div className="mt-3 space-y-1 text-sm leading-[1.5] text-ink/75 dark:text-canvas/80">
          {insight.category ? <p>{insight.category}</p> : null}
          {date || insight.author ? <p>
            {date ? <time dateTime={insight.publishedAt ?? undefined}>{date}</time> : null}
            {date && insight.author ? <span aria-hidden="true"> · </span> : null}
            {insight.author ? <span>{insight.author}</span> : null}
          </p> : null}
        </div>
        <p aria-hidden="true" className="mt-auto pt-4 text-sm leading-6 font-semibold text-indigo dark:text-canvas">Read guide <span className="ml-2">→</span></p>
      </div>
    </article>
  );
}
