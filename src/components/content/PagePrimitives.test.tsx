import {describe, expect, it} from "vitest";
import {renderToStaticMarkup} from "react-dom/server";

import {DesktopPageHero, MobilePageHero, PageHero, PublicPageUnavailable, SequenceStepGrid} from "./PagePrimitives";
import {DifferentiatorList} from "./DifferentiatorList";
import {ProcessSequenceCta} from "./ProcessSequenceAnalytics";
import {parseProcessContext} from "./processContext";
import {normalizeDifferentiators} from "./differentiators";
import {getSequenceGridClassName, normalizeProcessSteps, type ProcessStepSource} from "./processSteps";

const buildSteps = (count: number): ProcessStepSource[] => Array.from({length: count}, (_, index) => ({
  id: `step-${index + 1}`,
  order: index + 1,
  title: `Step ${index + 1}`,
  description: `Description ${index + 1}`,
  proofPoints: [`Proof ${index + 1}`],
}));

describe("normalizeProcessSteps", () => {
  it("sorts a three-step configuration and uses a three-column grid", () => {
    const steps = normalizeProcessSteps([...buildSteps(3)].reverse());
    expect(steps.map((step) => step.order)).toEqual([1, 2, 3]);
    expect(getSequenceGridClassName(steps.length)).toBe("md:grid-cols-2 lg:grid-cols-3");
  });

  it("preserves explicit proof points for a four-step configuration", () => {
    const steps = normalizeProcessSteps(buildSteps(4));
    expect(steps).toHaveLength(4);
    expect(steps[0]?.proofPoints).toEqual(["Proof 1"]);
    expect(getSequenceGridClassName(steps.length)).toBe("md:grid-cols-2");
  });

  it("uses a three-column, two-row-capable grid for six steps", () => {
    const steps = normalizeProcessSteps(buildSteps(6));
    expect(steps).toHaveLength(6);
    expect(getSequenceGridClassName(steps.length)).toBe("md:grid-cols-2 lg:grid-cols-3");
  });

  it("uses a complete industry override and falls back to the generic record", () => {
    const source: ProcessStepSource = {
      ...buildSteps(1)[0],
      industryOverrides: [{
        industrySlug: "restaurant-qsr",
        title: "Location journey architecture",
        description: "Map ordering and location paths.",
        proofPoints: ["Location handoff checks"],
      }],
    };

    expect(normalizeProcessSteps([source], "restaurant-qsr")[0]).toMatchObject({
      title: "Location journey architecture",
      proofPoints: ["Location handoff checks"],
    });
    expect(normalizeProcessSteps([source], "accounting-advisory")[0]).toMatchObject({
      title: "Step 1",
      proofPoints: ["Proof 1"],
    });
  });
});

describe("Sequence accessibility markup", () => {
  const steps = normalizeProcessSteps(buildSteps(4));

  it("renders a semantic ordered list, heading hierarchy, and labeled proof-point groups", () => {
    const markup = renderToStaticMarkup(<SequenceStepGrid steps={steps} />);
    expect(markup).toContain("<ol");
    expect(markup).toContain("list-none");
    expect(markup).toContain("<h3");
    expect(markup).toContain('aria-label="Step 1 proof points"');
    expect(markup).toContain("<ul");
    expect(markup).toContain("aria-hidden=\"true\"");
    expect(markup).toContain("md:hidden");
    expect(markup).toContain("md:grid-cols-2");
    expect(markup).toContain("p-6");
    expect(markup).toContain("lg:p-12");
  });

  it("renders a 44px CTA with a high-contrast focus ring", () => {
    const markup = renderToStaticMarkup(<ProcessSequenceCta action={{label: "Plan Your Digital Upgrade →", href: "/contact"}} stepCount={steps.length} />);
    expect(markup).toContain("h-11");
    expect(markup).toContain("focus-visible:outline-2");
    expect(markup).toContain("focus-visible:outline-canvas");
    expect(markup).toContain("w-full");
    expect(markup).toContain("sm:w-auto");
  });
});

describe("PageHero responsive compositions", () => {
  const heroProps = {
    eyebrow: "Delivery standard",
    title: "A controlled path to launch",
    body: "A structured, launch-safe engagement.",
    backLink: {href: "/work", label: "Work"},
    cta: {label: "Plan Your Digital Upgrade →", href: "/contact"},
    asideCard: {eyebrow: "Overview", title: "Four stages", items: [{label: "Stage", value: "01"}]},
  };

  it("renders global desktop and mobile hero components from the same props", () => {
    const desktopMarkup = renderToStaticMarkup(<DesktopPageHero {...heroProps} />);
    const mobileMarkup = renderToStaticMarkup(<MobilePageHero {...heroProps} />);

    expect(desktopMarkup).toContain("hidden lg:block");
    expect(desktopMarkup).toContain('id="page-hero-title-desktop"');
    expect(mobileMarkup).toContain("lg:hidden");
    expect(mobileMarkup).toContain('id="page-hero-title-mobile"');
    expect(mobileMarkup).toContain("flex-col");
    expect(mobileMarkup).toContain("Overview and metadata");
  });

  it("keeps the wrapper as the single global hero entry point", () => {
    const markup = renderToStaticMarkup(<PageHero {...heroProps} />);
    expect(markup).toContain("page-hero-title-desktop");
    expect(markup).toContain("page-hero-title-mobile");
    expect(markup).toContain("data-analytics-location=\"page_hero_primary\"");
  });
});

describe("Public content boundary", () => {
  it("keeps shared public fallbacks free of editorial diagnostics", () => {
    const markup = renderToStaticMarkup(<PublicPageUnavailable title="Work is unavailable right now." />);

    expect(markup).toContain("Work is unavailable right now.");
    expect(markup).not.toMatch(/placeholder|sanity|cms|publish|setup/i);
  });
});

describe("parseProcessContext", () => {
  it("separates the approved operational standards without altering their copy", () => {
    const content = parseProcessContext({detail: "The operational model keeps the work moving.\n\n1. Fixed-Milestone Gating: Approvals happen at clear milestones.\n2. Direct Architect Access: Decisions stay close to the work.\n3. Zero-Chaos Launch: Release work remains controlled."});
    expect(content.intro).toBe("The operational model keeps the work moving.");
    expect(content.standards).toEqual([
      {id: "legacy-operating-principle-1", order: 1, title: "Fixed-Milestone Gating", description: "Approvals happen at clear milestones."},
      {id: "legacy-operating-principle-2", order: 2, title: "Direct Architect Access", description: "Decisions stay close to the work."},
      {id: "legacy-operating-principle-3", order: 3, title: "Zero-Chaos Launch", description: "Release work remains controlled."},
    ]);
  });

  it("preserves unstructured CMS content as the plain-text fallback", () => {
    expect(parseProcessContext({detail: "Supporting process detail."})).toEqual({intro: "Supporting process detail.", standards: []});
  });
});

describe("DifferentiatorList", () => {
  const items = normalizeDifferentiators([
    {id: "direct-access", order: 2, title: "Direct Architect Access", description: "Decisions stay close to the work."},
    {id: "milestone-gating", order: 1, title: "Fixed-Milestone Gating", description: "Approvals happen at clear milestones.", proofLink: "/work/example"},
  ]);

  it("normalizes the shared data model and renders browser-managed ordered-list markers", () => {
    expect(items.map((item) => item.id)).toEqual(["milestone-gating", "direct-access"]);
    const markup = renderToStaticMarkup(<DifferentiatorList items={items} />);
    expect(markup).toContain("<ol");
    expect(markup).toContain("list-decimal");
    expect(markup).toContain("<h3");
    expect(markup).toContain("View supporting proof for Fixed-Milestone Gating");
    expect(markup).not.toContain(">01<");
  });
});
