import type {Metadata} from "next";

import {PageEmpty} from "@/components/content/PagePrimitives";
import {ContactPage} from "@/components/content/SingletonPages";
import {buildMetadata} from "@/lib/seo";
import {getContactPage} from "@/sanity/lib/contentPages";

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage();
  return buildMetadata({title: contactPage.data?.title ?? "Contact", description: contactPage.data?.introduction, path: "/contact", seo: contactPage.data?.seo, robots: contactPage.data ? undefined : {index: false, follow: true}});
}

export default async function ContactRoute() {
  const contactPage = await getContactPage();
  return contactPage.data ? <ContactPage data={contactPage.data} /> : <PageEmpty title="Contact" />;
}
