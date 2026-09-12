import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it, vi} from "vitest";

vi.mock("./ServiceDecisionAid", () => ({
  ServiceDecisionAid: () => <div>Fit diagnostic</div>,
}));

import {ServicesPage} from "./ServicesPage";

const primaryOffers = [
  {
    title: "Signature Website",
    slug: "signature-website",
    summary: "Signature CMS summary.",
    shortTransformation: "Signature CMS transformation.",
    fitReasons: ["Signature reason"],
    primaryGoal: "Full website transformation",
    investmentRange: "Signature CMS investment",
    timeline: "Signature CMS timeline",
    bestFor: "Established service businesses",
  },
  {
    title: "Landing Page Sprint",
    slug: "landing-page-sprint",
    summary: "Sprint CMS summary.",
    primaryGoal: "Campaign conversion",
    investmentRange: "Sprint CMS investment",
    timeline: "Sprint CMS timeline",
  },
  {
    title: "Digital Product Build",
    slug: "digital-product-build",
    summary: "Product CMS summary.",
    primaryGoal: "Custom workflow system",
    investmentRange: "Product CMS investment",
  },
  {
    title: "Growth Partnership",
    slug: "growth-partnership",
    summary: "Growth CMS summary.",
    primaryGoal: "Ongoing optimization",
    investmentRange: "Growth CMS investment",
    timeline: "Ongoing",
  },
];

describe("ServicesPage", () => {
  it("renders the four Sanity-backed primary offers, separate audit, and unchanged industries in order", () => {
    const markup = renderToStaticMarkup(
      <ServicesPage
        industries={[]}
        offers={[
          ...primaryOffers,
          {
            title: "Digital Elevation Audit",
            slug: "digital-elevation-audit",
            summary: "Audit CMS summary.",
            investmentRange: "Audit CMS investment",
          },
          {
            title: "Website Rescue",
            slug: "website-rescue",
            summary: "Noncanonical CMS record.",
          },
        ]}
      />,
    );

    expect(markup.match(/type="radio"/g)).toHaveLength(10);
    expect(markup).toContain("Signature CMS transformation.");
    expect(markup).toContain("Signature CMS timeline");
    expect(markup).toContain("Signature CMS investment");
    expect(markup).toContain("Audit CMS summary.");
    expect(markup).toContain("Noncanonical CMS record.");
    expect(markup).toContain("When the standard engagement");
    expect(markup).toContain("needs to go further.");
    expect(markup.indexOf("Start with a Digital Elevation Audit")).toBeLessThan(markup.indexOf("Active Industry Solutions"));
    expect(markup.indexOf("Active Industry Solutions")).toBeLessThan(markup.indexOf("Plan your digital upgrade."));
    expect(markup.match(/<main/g)).toHaveLength(1);
    expect(markup.match(/<h1/g)).toHaveLength(1);
  });

  it("renders structured investment breakdown tiers when provided on offers", () => {
    const markup = renderToStaticMarkup(
      <ServicesPage
        industries={[]}
        offers={[
          {
            title: "Custom Platform Build",
            slug: "digital-product-build",
            summary: "Platform summary.",
            investmentRange: "$25,000–$50,000",
            investmentTiers: [
              {label: "Discovery Sprint", amount: "$5,000", description: "Architecture and specs"},
              {label: "Core Engineering", amount: "$20,000–$45,000", description: "Full stack delivery"},
            ],
          },
        ]}
      />,
    );

    expect(markup).toContain("Discovery Sprint");
    expect(markup).toContain("$5,000");
    expect(markup).toContain("Core Engineering");
    expect(markup).toContain("$20,000–$45,000");
  });

  it("keeps published Sanity services visible in the primary architecture while canonical slugs are being migrated", () => {
    const markup = renderToStaticMarkup(
      <ServicesPage
        industries={null}
        offers={[{title: "Website Rescue", slug: "website-rescue", summary: "Supporting service."}]}
      />,
    );

    expect(markup).toContain('type="radio"');
    expect(markup).toContain("Supporting service.");
    expect(markup).toContain("Start with what needs to change.");
    expect(markup).not.toContain("Primary engagements are being prepared.");
  });
});
