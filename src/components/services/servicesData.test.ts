import {describe, expect, it} from "vitest";

import {normalizeServicesOffers} from "./servicesData";

describe("normalizeServicesOffers", () => {
  it("keeps canonical records in their outcome positions and preserves Sanity commercial fields", () => {
    const normalized = normalizeServicesOffers([
      {title: "Growth", slug: "growth-partnership", summary: "CMS summary", timeline: "CMS timeline", investmentRange: "CMS investment"},
      {title: "Signature", slug: "signature-website", outcomePrompt: "CMS outcome", deliverables: ["One", "Two", "Three", "Four"]},
      {title: "Audit", slug: "digital-elevation-audit", summary: "CMS audit", investmentRange: "CMS audit investment"},
      {title: "Rescue", slug: "website-rescue", summary: "Not primary"},
    ]);

    expect(normalized.primary.map(({slug}) => slug)).toEqual([
      "signature-website",
      "website-rescue",
      "growth-partnership",
      "digital-elevation-audit",
    ]);
    expect(normalized.primary[0]).toMatchObject({outcomePrompt: "CMS outcome", fitReasons: ["One", "Two", "Three"]});
    expect(normalized.primary[2]).toMatchObject({timeline: "CMS timeline", investment: "CMS investment"});
    expect(normalized.audit).toMatchObject({slug: "digital-elevation-audit", description: "CMS audit", investment: "CMS audit investment"});
    expect(normalized.supporting).toEqual([]);
    expect(normalized.missingPrimarySlugs).toEqual(["digital-product-build"]);
  });

  it("uses published Sanity records as a visible fallback before canonical offer slugs are editorially migrated", () => {
    const normalized = normalizeServicesOffers([
      {title: "Website Rescue", slug: "website-rescue"},
      {title: "Website Audit", slug: "website-audit-and-action-plan"},
    ]);

    expect(normalized.primary.map(({slug}) => slug)).toEqual([
      "website-rescue",
      "website-audit-and-action-plan",
    ]);
    expect(normalized.primary.map(({outcomePrompt}) => outcomePrompt)).toEqual([
      "The business has outgrown the website.",
      "You know something needs to improve, but not where to begin.",
    ]);
    expect(normalized.audit).toMatchObject({slug: "website-audit-and-action-plan", name: "Website Audit"});
    expect(normalized.supporting).toEqual([]);
    expect(normalized.usesPublishedFallback).toBe(true);
  });

  it("uses recognised existing service slugs to fill all five primary pathways in order", () => {
    const normalized = normalizeServicesOffers([
      {title: "Signature Website", slug: "signature-website"},
      {title: "Landing Page Design & Build", slug: "landing-page-design-and-build"},
      {title: "Web App & Portal Build", slug: "web-app-and-portal-build"},
      {title: "Website Growth Partnership", slug: "website-growth-partnership"},
      {title: "Digital Elevation Audit", slug: "digital-elevation-audit"},
    ]);

    expect(normalized.primary.map(({slug}) => slug)).toEqual([
      "signature-website",
      "landing-page-design-and-build",
      "web-app-and-portal-build",
      "website-growth-partnership",
      "digital-elevation-audit",
    ]);
    expect(normalized.primary.map(({outcomePrompt}) => outcomePrompt)).toEqual([
      "The business has outgrown the website.",
      "The campaign is ready. The destination isn’t.",
      "The workflow has outgrown generic software.",
      "The site is live. Now keep improving.",
      "You know something needs to improve, but not where to begin.",
    ]);
    expect(normalized.usesPublishedFallback).toBe(false);
  });

  it("preserves explicit multi-tier investments from Sanity and does not invent tiers when omitted", () => {
    const normalized = normalizeServicesOffers([
      {
        title: "Signature Website",
        slug: "signature-website",
        investmentRange: "$18,000–$35,000",
      },
      {
        title: "Landing Page Sprint",
        slug: "landing-page-sprint",
        investmentRange: "$6,500–$12,000",
        investmentTiers: [
          {label: "Discovery Sprint", amount: "$2,500", description: "Design & copy prototype"},
          {label: "Sprint Build", amount: "$5,000", description: "Framer/Next.js page and tracking"},
        ],
      },
    ]);

    expect(normalized.primary[0].investmentTiers).toBeUndefined();
    expect(normalized.primary[0].investment).toBe("$18,000–$35,000");
    expect(normalized.primary[1].investmentTiers).toHaveLength(2);
    expect(normalized.primary[1].investmentTiers?.[0]).toMatchObject({label: "Discovery Sprint", amount: "$2,500"});
  });
});
