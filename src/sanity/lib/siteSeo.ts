import type {SeoData} from "@/lib/seo";

import {fetchSanity} from "./fetchPage";
import {siteSeoQuery, sitemapContentQuery} from "./queries";

export type SiteSeoData = {
  title?: string | null;
  pageTitles?: Record<string, string | null> | null;
  defaultSeo?: SeoData | null;
  logo?: string | null;
  favicon?: string | null;
};

export type SitemapContent = {
  industries?: Array<{slug?: string | null; _updatedAt?: string | null}> | null;
  insights?: Array<{slug?: string | null; _updatedAt?: string | null}> | null;
  caseStudies?: Array<{slug?: string | null; _updatedAt?: string | null}> | null;
};

export function getSiteSeo() {
  return fetchSanity<SiteSeoData>(siteSeoQuery);
}

export function getSitemapContent() {
  return fetchSanity<SitemapContent>(sitemapContentQuery);
}
