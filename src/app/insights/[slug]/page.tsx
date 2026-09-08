import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {InsightPage} from "@/components/content/InsightPages";
import {buildMetadata} from "@/lib/seo";
import {getInsightPage, getInsightSlugs} from "@/sanity/lib/contentPages";
import {insightPlainText} from "@/components/content/insights";

export async function generateStaticParams() {
  const insights = await getInsightSlugs();
  return insights.data?.flatMap((insight) => insight.slug ? [{slug: insight.slug}] : []) ?? [];
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const insight = await getInsightPage(slug);
  return buildMetadata({
    title: insight.data?.title ?? "Insight",
    description: insight.data?.summary ?? insightPlainText(insight.data?.content),
    path: `/insights/${slug}`,
    seo: insight.data?.seo,
    imageUrl: insight.data?.featuredImage?.url,
    type: "article",
  });
}

export default async function InsightRoute({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const insight = await getInsightPage(slug);

  if (!insight.data) notFound();
  return <InsightPage data={insight.data} />;
}
