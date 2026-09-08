import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {CaseStudyPage} from "@/components/work/CaseStudyPage";
import {getCaseStudyMetadataTitle} from "@/lib/proofClassification";
import {buildMetadata} from "@/lib/seo";
import {getCaseStudy, getCaseStudySlugs} from "@/sanity/lib/caseStudy";

export async function generateStaticParams() {
  const caseStudies = await getCaseStudySlugs();
  return caseStudies.data?.flatMap((caseStudy) => caseStudy.slug ? [{slug: caseStudy.slug}] : []) ?? [];
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const caseStudy = await getCaseStudy(slug);

  return buildMetadata({
    title: getCaseStudyMetadataTitle(caseStudy.data?.title, caseStudy.data?.classification),
    description: caseStudy.data?.description,
    path: `/work/${slug}`,
    imageUrl: caseStudy.data?.images?.find((image) => image?.url)?.url,
    type: "article",
  });
}

export default async function CaseStudyRoute({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy.data) {
    notFound();
  }

  return <CaseStudyPage caseStudy={caseStudy.data} />;
}
