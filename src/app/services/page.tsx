import type {Metadata} from "next";

import {ServicesPage} from "@/components/services/ServicesPage";
import {buildMetadata} from "@/lib/seo";
import {getIndustryDirectory} from "@/sanity/lib/contentPages";
import {getWorkIndex} from "@/sanity/lib/caseStudy";
import {getOffers} from "@/sanity/lib/offer";

export const metadata: Metadata = buildMetadata({
  title: "Solutions & Engagements",
  description: "Defined digital engagements and industry-specific digital upgrade solutions for service businesses.",
  path: "/services",
});

export default async function ServicesRoute() {
  const [offers, industries, work] = await Promise.all([getOffers(), getIndustryDirectory(), getWorkIndex()]);

  return <ServicesPage caseStudies={work.data} industries={industries.data} offers={offers.data} />;
}
