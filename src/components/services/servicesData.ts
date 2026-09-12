import type {InvestmentTier, OfferPageData} from "@/components/offer/OfferPage";

const primaryOfferDefinitions = [
  {slug: "signature-website", aliases: ["custom-website-design-and-development"], outcomePrompt: "The business has outgrown the website."},
  {slug: "landing-page-sprint", aliases: ["landing-page-design-and-build"], outcomePrompt: "The campaign is ready. The destination isn’t."},
  {slug: "digital-product-build", aliases: ["web-apps-and-customer-portals", "web-app-and-portal-build"], outcomePrompt: "The workflow has outgrown generic software."},
  {slug: "growth-partnership", aliases: ["ongoing-website-support-and-growth", "website-growth-partnership"], outcomePrompt: "The site is live. Now keep improving."},
  {slug: "digital-elevation-audit", aliases: ["site-clarity-audit", "website-clarity-audit", "clarity-audit", "site-audit", "digital-audit", "website-audit", "website-audit-and-action-plan"], outcomePrompt: "You know something needs to improve, but not where to begin."},
] as const;

export type ServicesEngagement = {
  slug: string;
  name: string;
  outcomePrompt: string;
  shortTransformation?: string;
  shortDescription?: string;
  fitReasons: string[];
  primaryGoal?: string;
  timeline?: string;
  investment?: string;
  investmentTiers?: InvestmentTier[];
  bestFor?: string;
  detailHref: string;
  optionalMedia?: {url: string; alt: string};
};

export type ServicesAudit = {
  slug: string;
  name: string;
  description?: string;
  investment?: string;
  detailHref: string;
};

function clean(value?: string | null) {
  return value?.trim() || undefined;
}

function normalizePrimaryOffer(offer: OfferPageData, outcomePrompt: string): ServicesEngagement | null {
  const slug = clean(offer.slug);
  const name = clean(offer.title);
  if (!slug || !name) return null;

  const summary = clean(offer.summary);
  const primaryGoal = clean(offer.primaryGoal) ?? summary;

  const rawTiers = (offer.investmentTiers ?? [])
    .filter((tier): tier is InvestmentTier => Boolean(tier?.label && tier?.amount))
    .map((tier) => ({
      label: tier.label.trim(),
      amount: tier.amount.trim(),
      description: clean(tier.description),
      timeline: clean(tier.timeline),
    }));

  const investmentTiers = rawTiers.length > 0 ? rawTiers : undefined;

  return {
    slug,
    name,
    outcomePrompt: clean(offer.outcomePrompt) ?? outcomePrompt,
    shortTransformation: clean(offer.shortTransformation) ?? clean(offer.positioningStatement),
    shortDescription: summary,
    fitReasons: (offer.fitReasons ?? offer.deliverables ?? []).map(clean).filter((value): value is string => Boolean(value)).slice(0, 3),
    primaryGoal,
    timeline: clean(offer.timeline),
    investment: clean(offer.investmentRange),
    investmentTiers,
    bestFor: clean(offer.bestFor),
    detailHref: `/services/${slug}`,
    optionalMedia: offer.image?.url ? {url: offer.image.url, alt: clean(offer.image.alt) ?? ""} : undefined,
  };
}

export function normalizeServicesOffers(offers?: OfferPageData[] | null) {
  const offersBySlug = new Map(
    (offers ?? []).flatMap((offer) => {
      const slug = clean(offer.slug);
      return slug ? [[slug, offer] as const] : [];
    }),
  );

  const matchingOffers = primaryOfferDefinitions.map((definition) =>
    [definition.slug, ...definition.aliases].map((slug) => offersBySlug.get(slug)).find(Boolean)
    ?? (definition.slug.includes("audit") ? (offers ?? []).find((offer) => /\baudit\b/i.test(offer.title ?? "") || /\baudit\b/i.test(offer.slug ?? "")) : undefined),
  );
  const assignedSlugs = new Set(matchingOffers.flatMap((offer) => {
    const slug = clean(offer?.slug);
    return slug ? [slug] : [];
  }));
  const recognisedOfferSlugs = new Set<string>(primaryOfferDefinitions.flatMap(({slug, aliases}) => [slug, ...aliases]));
  const fallbackOffers = (offers ?? []).filter((offer) => {
    const slug = clean(offer.slug);
    return slug && !assignedSlugs.has(slug) && !recognisedOfferSlugs.has(slug);
  });

  const missingPrimarySlugs: string[] = [];
  let fallbackIndex = 0;
  const primary = primaryOfferDefinitions.flatMap((definition, index) => {
    const offer = matchingOffers[index] ?? fallbackOffers[fallbackIndex++];
    if (!offer) {
      missingPrimarySlugs.push(definition.slug);
      return [];
    }
    const normalized = normalizePrimaryOffer(offer, definition.outcomePrompt);
    return normalized ? [normalized] : [];
  });

  const auditOffer = offersBySlug.get("digital-elevation-audit")
    ?? (offers ?? []).find((offer) => /\baudit\b/i.test(offer.title ?? ""));
  const auditName = clean(auditOffer?.title);
  const auditSlug = clean(auditOffer?.slug);
  const audit: ServicesAudit | null = auditOffer && auditName && auditSlug ? {
    slug: auditSlug,
    name: auditName,
    description: clean(auditOffer.summary),
    investment: clean(auditOffer.investmentRange),
    detailHref: `/services/${auditSlug}`,
  } : null;

  const primarySlugs = new Set<string>(primary.map(({slug}) => slug));
  const supporting = (offers ?? []).filter((offer) => {
    const slug = clean(offer.slug);
    return slug && !primarySlugs.has(slug) && slug !== auditSlug;
  });

  return {primary, audit, supporting, missingPrimarySlugs, usesPublishedFallback: fallbackIndex > 0};
}
