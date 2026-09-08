export type IndustryDirectoryRecord = {
  id?: string | null;
  title?: string | null;
  slug?: string | null;
  directoryStatus?: "featured" | "listed" | "comingSoon" | null;
  priorityRank?: number | null;
  listEyebrow?: string | null;
  hook?: string | null;
  listDescription?: string | null;
  conversionGoals?: string[] | null;
};

export type IndustryVertical = {
  id: string;
  order: number;
  categoryLabel: string;
  title: string;
  hookQuote: string;
  hookQuoteLink?: string;
  description: string;
  conversionActions: string[];
  exploreLink?: string;
  isPriority: boolean;
  isComingSoon: boolean;
};

export const fallbackIndustryDirectory: IndustryDirectoryRecord[] = [
  {id: "industry-accounting-advisory", title: "Tax, Accounting & Advisory", slug: "accounting-advisory", directoryStatus: "featured", priorityRank: 1, listEyebrow: "Priority vertical", hook: "Your expertise evolved. Did your website?", listDescription: "For firms moving beyond tax preparation toward advisory, fractional CFO, and higher-value services. We build clear expertise architecture and streamlined consultation pathways.", conversionGoals: ["Consultation bookings", "Advisory positioning", "Partner authority"]},
  {id: "industry-restaurant-qsr", title: "Restaurant & QSR Growth Brands", slug: "restaurant-qsr", directoryStatus: "featured", priorityRank: 2, listEyebrow: "Priority vertical", hook: "The food got better. Did the digital experience keep up?", listDescription: "For growing food brands with 2–20+ locations. We create appetite-driven mobile experiences governed by our Product Truth doctrine—connecting desire directly to ordering, catering, and location discovery.", conversionGoals: ["Mobile ordering · catering requests", "Location discovery", "Franchise interest"]},
  {id: "industry-insurance-financial-risk", title: "Insurance & Financial Risk", directoryStatus: "comingSoon", listEyebrow: "Coming soon", listDescription: "Specialized trust architecture, offer clarity, and compliance-aware quote/consultation pathways."},
  {id: "industry-b2b-professional-services", title: "B2B Professional Services", directoryStatus: "comingSoon", listEyebrow: "Coming soon", listDescription: "Differentiated positioning, leadership authority, and structured sales qualification journeys."},
  {id: "industry-multi-location-hospitality", title: "Multi-Location Hospitality", directoryStatus: "comingSoon", listEyebrow: "Coming soon", listDescription: "Scalable location discovery, centralized brand governance, and localized customer conversion."},
];

function nonEmptyString(value: string | null | undefined) {
  const trimmedValue = value?.trim();
  return trimmedValue || undefined;
}

export function mapIndustryDirectory(records: IndustryDirectoryRecord[]): IndustryVertical[] {
  return records.map((record, index) => {
    const slug = nonEmptyString(record.slug);
    const isComingSoon = record.directoryStatus === "comingSoon" || !slug;

    return {
      id: nonEmptyString(record.id) ?? slug ?? `industry-${index + 1}`,
      order: index + 1,
      categoryLabel: nonEmptyString(record.listEyebrow) ?? (isComingSoon ? "Coming soon" : "Industry vertical"),
      title: nonEmptyString(record.title) ?? "",
      hookQuote: nonEmptyString(record.hook) ?? "",
      description: nonEmptyString(record.listDescription) ?? "",
      conversionActions: record.conversionGoals?.map((goal) => goal.trim()).filter(Boolean) ?? [],
      exploreLink: isComingSoon ? undefined : `/industries/${slug}`,
      isPriority: record.directoryStatus === "featured",
      isComingSoon,
    };
  });
}
