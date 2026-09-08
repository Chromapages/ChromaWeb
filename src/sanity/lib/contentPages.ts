import type {AboutPageData, ContactPageData, ProcessPageData} from "@/components/content/SingletonPages";
import type {IndustryPageData} from "@/components/content/IndustryPage";
import type {IndustryDirectoryRecord} from "@/components/content/industryVerticals";
import type {InsightDetailData, InsightListItem, InsightsPageData} from "@/components/content/InsightPages";

import {fetchSanity} from "./fetchPage";
import {
  aboutPageQuery,
  contactPageQuery,
  industryDirectoryQuery,
  industryDetailQuery,
  industrySlugsQuery,
  insightDetailQuery,
  insightSlugsQuery,
  insightsIndexQuery,
  insightsPageQuery,
  processPageQuery,
} from "./queries";

export function getProcessPage() {
  return fetchSanity<ProcessPageData>(processPageQuery);
}

export function getAboutPage() {
  return fetchSanity<AboutPageData>(aboutPageQuery);
}

export function getContactPage() {
  return fetchSanity<ContactPageData>(contactPageQuery);
}

export function getIndustryPage(slug: string) {
  return fetchSanity<IndustryPageData>(industryDetailQuery, {slug});
}

export function getIndustryDirectory() {
  return fetchSanity<IndustryDirectoryRecord[]>(industryDirectoryQuery);
}

export function getIndustrySlugs() {
  return fetchSanity<Array<{slug?: string | null}>>(industrySlugsQuery);
}

export function getInsights() {
  return fetchSanity<InsightListItem[]>(insightsIndexQuery);
}

export function getInsightsPage() {
  return fetchSanity<InsightsPageData>(insightsPageQuery);
}

export function getInsightPage(slug: string) {
  return fetchSanity<InsightDetailData>(insightDetailQuery, {slug});
}

export function getInsightSlugs() {
  return fetchSanity<Array<{slug?: string | null}>>(insightSlugsQuery);
}
