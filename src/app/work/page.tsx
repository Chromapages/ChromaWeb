import type {Metadata} from "next";

import {WorkIndex} from "@/components/work/WorkIndex";
import {buildMetadata} from "@/lib/seo";
import {getWorkIndex} from "@/sanity/lib/caseStudy";
import {getSiteSeo} from "@/sanity/lib/siteSeo";

export async function generateMetadata(): Promise<Metadata> {
  const [site, work] = await Promise.all([getSiteSeo(), getWorkIndex()]);
  const hasPublishedEvidence = Boolean(work.data?.length);

  return buildMetadata({
    title: site.data?.pageTitles?.work ?? "Evidence Index | Chromapages",
    description: "Classified case studies with project context and evidence limitations.",
    path: "/work",
    robots: hasPublishedEvidence ? undefined : {index: false, follow: true},
  });
}

export default async function WorkPage() {
  const work = await getWorkIndex();

  return <WorkIndex caseStudies={work.data} status={work.status} />;
}
