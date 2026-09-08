import type {MetadataRoute} from "next";

import {absoluteUrl} from "@/lib/seo";
import {getSitemapContent, type SitemapContent} from "@/sanity/lib/siteSeo";

const fixedPaths = [
  "/",
  "/work",
  "/services/signature-website",
  "/services/landing-page-sprint",
  "/services/digital-product-build",
  "/services/growth-partnership",
  "/services/digital-elevation-audit",
  "/process",
  "/about",
  "/insights",
  "/contact",
];

function dynamicEntries(items: SitemapContent[keyof SitemapContent], prefix: string): MetadataRoute.Sitemap {
  return items?.flatMap((item) => {
    if (!item.slug || item.slug === "placeholder") return [];
    return [{url: absoluteUrl(`${prefix}/${item.slug}`), lastModified: item._updatedAt || undefined}];
  }) ?? [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemapContent();

  return [
    ...fixedPaths.map((path) => ({url: absoluteUrl(path)})),
    ...dynamicEntries(content.data?.industries, "/industries"),
    ...dynamicEntries(content.data?.insights, "/insights"),
    ...dynamicEntries(content.data?.caseStudies, "/work"),
  ];
}
