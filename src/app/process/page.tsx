import type {Metadata} from "next";

import {ProcessRedesignPage} from "@/components/content/ProcessRedesignPage";
import {PageEmpty} from "@/components/content/PagePrimitives";
import {buildMetadata} from "@/lib/seo";
import {getAboutPage, getProcessPage} from "@/sanity/lib/contentPages";

export async function generateMetadata(): Promise<Metadata> {
  const processPage = await getProcessPage();
  return buildMetadata({
    title: processPage.data?.hero?.headline ?? processPage.data?.title ?? "Process",
    description: processPage.data?.hero?.introduction ?? processPage.data?.introduction,
    path: "/process",
    seo: processPage.data?.seo,
    robots: processPage.data ? undefined : {index: false, follow: true},
  });
}

export default async function ProcessRoute() {
  const [processPage, aboutPage] = await Promise.all([getProcessPage(), getAboutPage()]);
  return processPage.data ? (
    <ProcessRedesignPage process={processPage.data} about={aboutPage.data} />
  ) : (
    <PageEmpty title="Process" />
  );
}
