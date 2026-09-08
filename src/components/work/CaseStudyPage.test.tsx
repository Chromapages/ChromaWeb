import {describe, expect, it} from "vitest";
import {renderToStaticMarkup} from "react-dom/server";

import {CaseStudyPage} from "./CaseStudyPage";

describe("CaseStudyPage", () => {
  it("renders ordered proof before imagery so craft cannot lead the case study", () => {
    const markup = renderToStaticMarkup(<CaseStudyPage caseStudy={{
      title: "Approved case study",
      classification: "owned-brand",
      projectIdentity: "Chromapages-owned project",
      description: "A public-safe project summary.",
      proofSignals: [{
        type: "technical-proof",
        statement: "The launch met the documented technical release criteria.",
        sourceContext: "Approved launch review.",
        timeframe: "Launch review window.",
        measurementContext: "Documented technical acceptance checks.",
        limitations: "No commercial outcome is claimed.",
      }],
      images: [{
        url: "https://example.com/approved-image.jpg",
        alt: "Approved project artifact",
        mediaRole: "interface-crop",
        storytellingJob: "Shows the approved interface structure delivered for the engagement.",
        proofSignalType: "technical-proof",
      }],
    }} />);

    expect(markup).toContain("What the record supports.");
    expect(markup).toContain("Technical proof");
    expect(markup).toContain("Timeframe:");
    expect(markup).toContain("Measurement context:");
    expect(markup.indexOf("What the record supports.")).toBeLessThan(markup.indexOf("approved-image.jpg"));
  });

  it("renders the approved editorial chapters in order and falls back safely for Next Stage", () => {
    const markup = renderToStaticMarkup(<CaseStudyPage caseStudy={{
      title: "Approved case study",
      classification: "owned-brand",
      projectIdentity: "Chromapages-owned project",
      role: "Strategy, design, and engineering partner.",
      description: "A public-safe project summary.",
      scope: "The approved project scope.",
      challenge: "The approved project challenge.",
      strategy: "The approved project strategy.",
      build: "The approved build account.",
      launch: "The approved launch account.",
      proofSignals: [{
        type: "process-proof",
        statement: "The release followed its documented QA protocol.",
        sourceContext: "Approved delivery record.",
        timeframe: "Launch period.",
        measurementContext: "Documented delivery checks.",
        limitations: "This does not establish a business outcome.",
      }],
    }} />);

    const chapters = ["01 / Context", "02 / Challenge", "03 / Strategy", "04 / Build", "05 / Launch", "06 / Evidence", "07 / Next Stage"];
    chapters.forEach((chapter, index) => {
      expect(markup).toContain(chapter);
      if (index > 0) expect(markup.indexOf(chapters[index - 1])).toBeLessThan(markup.indexOf(chapter));
    });
    expect(markup).toContain("Chromapages role");
    expect(markup).toContain("Plan Your Digital Upgrade");
  });
});
