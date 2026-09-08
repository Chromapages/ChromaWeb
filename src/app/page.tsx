import type {Metadata} from "next";

import {Homepage} from "@/components/home/Homepage";
import {buildMetadata} from "@/lib/seo";
import {getHomepage} from "@/sanity/lib/homePage";

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await getHomepage();

  return buildMetadata({title: data?.title ?? "Chromapages", description: data?.hero?.body, path: "/", seo: data?.seo, robots: data ? undefined : {index: false, follow: true}});
}

export default async function HomePage() {
  const {data} = await getHomepage();

  return <Homepage data={data} />;
}
