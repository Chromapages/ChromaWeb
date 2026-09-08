import type {Metadata} from "next";

import {PageEmpty} from "@/components/content/PagePrimitives";
import {ProcessPage} from "@/components/content/SingletonPages";
import {buildMetadata} from "@/lib/seo";
import {getProcessPage} from "@/sanity/lib/contentPages";

export async function generateMetadata(): Promise<Metadata> {
  const processPage = await getProcessPage();
  return buildMetadata({title: processPage.data?.title ?? "Process", description: processPage.data?.introduction, path: "/process", seo: processPage.data?.seo, robots: processPage.data ? undefined : {index: false, follow: true}});
}

export default async function ProcessRoute() {
  const processPage = await getProcessPage();
  return processPage.data ? <ProcessPage data={processPage.data} /> : <PageEmpty title="Process" />;
}
