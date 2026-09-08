import type {Metadata} from "next";

import {PageEmpty} from "@/components/content/PagePrimitives";
import {AboutPage} from "@/components/content/SingletonPages";
import {buildMetadata} from "@/lib/seo";
import {getAboutPage} from "@/sanity/lib/contentPages";

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();
  return buildMetadata({title: aboutPage.data?.title ?? "About", description: aboutPage.data?.introduction, path: "/about", seo: aboutPage.data?.seo, robots: aboutPage.data ? undefined : {index: false, follow: true}});
}

export default async function AboutRoute() {
  const aboutPage = await getAboutPage();
  return aboutPage.data ? <AboutPage data={aboutPage.data} /> : <PageEmpty title="About" />;
}
