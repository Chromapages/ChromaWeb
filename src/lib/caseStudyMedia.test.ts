import {describe, expect, it} from "vitest";

import {isPublicCaseStudyMedia, sortCaseStudyMedia, type CaseStudyMedia} from "./caseStudyMedia";

describe("case-study media", () => {
  const approvedMedia = {
    url: "https://example.com/interface.jpg",
    alt: "Approved interface crop",
    mediaRole: "interface-crop",
    storytellingJob: "Shows the delivered interface hierarchy.",
    narrativeAnchor: "build",
  };

  it("accepts an asset only when it has a valid role, storytelling job, and placement", () => {
    expect(isPublicCaseStudyMedia(approvedMedia)).toBe(true);
    expect(isPublicCaseStudyMedia({...approvedMedia, storytellingJob: ""})).toBe(false);
    expect(isPublicCaseStudyMedia({...approvedMedia, narrativeAnchor: undefined})).toBe(false);
    expect(isPublicCaseStudyMedia({...approvedMedia, mediaRole: "laptop-mockup"})).toBe(false);
  });

  it("orders proof-linked assets before narrative-supporting assets", () => {
    const input: CaseStudyMedia[] = [
      approvedMedia,
      {...approvedMedia, url: "https://example.com/performance.jpg", mediaRole: "code-performance-evidence", proofSignalType: "technical-proof", narrativeAnchor: undefined},
      {...approvedMedia, url: "https://example.com/outcome.jpg", mediaRole: "before-after-comparison", proofSignalType: "business-outcome", narrativeAnchor: undefined},
    ];
    const media = sortCaseStudyMedia(input);

    expect(media.map((asset) => asset.proofSignalType ?? asset.narrativeAnchor)).toEqual(["business-outcome", "technical-proof", "build"]);
  });
});
