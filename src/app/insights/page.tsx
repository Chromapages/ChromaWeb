import type {Metadata} from "next";

import {InsightsIndex} from "@/components/content/InsightPages";
import {buildMetadata} from "@/lib/seo";
import {getInsights, getInsightsPage} from "@/sanity/lib/contentPages";

export async function generateMetadata(): Promise<Metadata> {
  const [page, insights] = await Promise.all([getInsightsPage(), getInsights()]);
  return buildMetadata({
    title: page.data?.title ?? "Insights",
    description: page.data?.introduction,
    path: "/insights",
    seo: page.data?.seo,
    robots: insights.data?.length ? undefined : {index: false, follow: true},
  });
}

export default async function InsightsRoute() {
  const [page, insights] = await Promise.all([getInsightsPage(), getInsights()]);
  return <InsightsIndex insights={insights.data} page={page.data} />;
}
