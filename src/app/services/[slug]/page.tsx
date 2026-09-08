import {notFound} from "next/navigation";
import type {Metadata} from "next";

import {OfferPage} from "@/components/offer/OfferPage";
import {buildMetadata} from "@/lib/seo";
import {getOffer} from "@/sanity/lib/offer";

const serviceRoutes = [
  {slug: "signature-website", fallbackTitle: "Signature Website"},
  {slug: "landing-page-sprint", fallbackTitle: "Landing Page Sprint"},
  {slug: "digital-product-build", fallbackTitle: "Digital Product Build"},
  {slug: "growth-partnership", fallbackTitle: "Growth Partnership"},
  {slug: "digital-elevation-audit", fallbackTitle: "Digital Elevation Audit"},
] as const;

export function generateStaticParams() {
  return serviceRoutes.map(({slug}) => ({slug}));
}

export const dynamicParams = false;

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const offer = await getOffer(slug);

  return buildMetadata({title: offer.data?.title ?? "Service", description: offer.data?.summary, path: `/services/${slug}`, seo: offer.data?.seo, robots: offer.data ? undefined : {index: false, follow: true}});
}

export default async function ServicePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const service = serviceRoutes.find((candidate) => candidate.slug === slug);

  if (!service) {
    notFound();
  }

  const offer = await getOffer(slug);

  if (!offer.data) notFound();

  return <OfferPage data={offer.data} fallbackTitle={service.fallbackTitle} />;
}
