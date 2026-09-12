import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it} from "vitest";

import {CombinedProcessAboutPage} from "./CombinedProcessAboutPage";

describe("CombinedProcessAboutPage", () => {
  it("composes studio and process content into one accessible page", () => {
    const markup = renderToStaticMarkup(
      <CombinedProcessAboutPage
        about={{
          title: "About Chromapages",
          introduction: "Studio introduction.",
          principles: [{title: "Principle one", description: "Principle detail."}],
          detail: "Working relationship lead.\n\nSupporting relationship detail.",
        }}
        process={{
          title: "How We Work",
          introduction: "Process introduction.",
          steps: [{id: "step-1", order: 1, title: "Align", description: "Start with context."}],
          operatingPrinciplesIntro: "Operating principles introduction.",
          operatingPrinciples: [{id: "principle-1", order: 1, title: "Direct access", description: "Decisions stay close."}],
          cta: {label: "Plan Your Digital Upgrade →", href: "/contact"},
        }}
      />,
    );

    expect(markup.match(/<main/g)).toHaveLength(1);
    expect(markup).toContain('id="page-hero-title-desktop"');
    expect(markup).toContain('id="page-hero-title-mobile"');
    expect(markup).toContain('id="studio"');
    expect(markup).toContain('id="principles"');
    expect(markup).toContain('id="delivery-process"');
    expect(markup).toContain('id="working-relationship"');
    expect(markup).toContain('id="project-fit"');
    expect(markup).toContain("Studio introduction.");
    expect(markup).toContain("Align");
    expect(markup).toContain("Principle one");
    expect(markup).toContain('data-analytics-location="process_operating_principles"');
  });

  it("keeps the process page usable when optional About content is missing", () => {
    const markup = renderToStaticMarkup(
      <CombinedProcessAboutPage
        about={null}
        process={{
          title: "How We Work",
          steps: [{id: "step-1", order: 1, title: "Align", description: "Start with context."}],
        }}
      />,
    );

    expect(markup).toContain('id="delivery-process"');
    expect(markup).toContain('id="project-fit"');
    expect(markup).not.toContain('id="studio"');
    expect(markup).not.toContain('id="principles"');
  });
});
