import {describe, expect, it} from "vitest";

import {getCaseStudyMetadataTitle, getProofClassificationLabel, isProofClassification, proofClassifications} from "./proofClassification";
import {validateCaseStudyReadiness} from "@/sanity/schemaTypes/objects/publishing";

const publishedCaseStudy = {
  publishingStatus: "publishedReady",
  classification: "confidential-client",
  publicTitle: "Complex service platform redesign",
  publicProjectIdentity: "Confidential professional-services engagement",
  publicSummary: "A public-safe summary of the engagement.",
  publicRole: "Digital strategy, design, and engineering partner.",
  workIndexFeatured: false,
  workIndexRank: 1,
  publicIdentityApproved: true,
  publicArtifactApproved: true,
  proofReviewStatus: "approved",
  permissionStatus: "confidential-disclosure-approved",
  attributionLimitations: "Identity and commercial outcomes are not disclosed.",
  scope: [{_type: "block"}],
  challenge: [{_type: "block"}],
  strategy: [{_type: "block"}],
  designDecisions: [{_type: "block"}],
  developmentDecisions: [{_type: "block"}],
  evidence: [{_type: "block"}],
  build: [{_type: "block"}],
  launch: [{_type: "block"}],
  proofSignals: [{
    type: "technical-proof",
    publicStatement: "The delivered architecture was reviewed before launch.",
    publicSourceContext: "Approved QA review.",
    timeframe: "Pre-launch review window.",
    measurementContext: "The delivery team documented the completed QA checks.",
    publicLimitations: "No commercial outcome is claimed.",
    verificationStatus: "approved",
  }],
  relatedServices: [{_ref: "service"}],
  images: [{
    asset: {_ref: "image"},
    approvalStatus: "approved",
    rightsConfirmed: true,
    alt: "Approved abstract interface image",
    mediaRole: "interface-crop",
    storytellingJob: "Shows the approved interface structure delivered for the engagement.",
    narrativeAnchor: "build",
    publicDisplayApproved: true,
  }],
};

describe("proof classification registry", () => {
  it("defines exactly the six approved public classifications", () => {
    expect(proofClassifications.map(({value}) => value)).toEqual([
      "real-public-client",
      "confidential-client",
      "white-label",
      "concept-study",
      "internal-prototype",
      "owned-brand",
    ]);
    expect(isProofClassification("concept-study")).toBe(true);
    expect(isProofClassification("client-project")).toBe(false);
    expect(proofClassifications.map(({publicLabel}) => publicLabel)).toEqual([
      "Real public work",
      "Confidential work",
      "White-label work",
      "Concept work",
      "Prototype work",
      "Owned-brand work",
    ]);
  });

  it("uses an explicit public label for non-client classifications in metadata", () => {
    expect(getProofClassificationLabel("owned-brand")).toBe("Owned-brand work");
    expect(getCaseStudyMetadataTitle("Platform system", "owned-brand")).toBe("Platform system | Owned-brand work");
  });
});

describe("case-study publication safety", () => {
  it("accepts a confidential record only with its matching disclosure and public-safe attestations", () => {
    expect(validateCaseStudyReadiness(publishedCaseStudy)).toBe(true);
  });

  it("rejects a confidential record without public artifact approval", () => {
    expect(validateCaseStudyReadiness({...publishedCaseStudy, publicArtifactApproved: false})).toContain("public artifact");
  });

  it("rejects an unknown classification before a record can publish", () => {
    expect(validateCaseStudyReadiness({...publishedCaseStudy, classification: "unclassified"})).toContain("approved classifications");
  });

  it("requires at least one approved, bounded public proof signal", () => {
    expect(validateCaseStudyReadiness({...publishedCaseStudy, proofSignals: []})).toContain("approved public proof signal");
  });

  it("rejects proof that lacks a timeframe or measurement context", () => {
    expect(validateCaseStudyReadiness({...publishedCaseStudy, proofSignals: [{...publishedCaseStudy.proofSignals[0], timeframe: ""}]})).toContain("source, timeframe, measurement context");
  });

  it("requires a positive editorial rank without treating it as proof ranking", () => {
    expect(validateCaseStudyReadiness({...publishedCaseStudy, workIndexRank: 0})).toContain("Selected Work rank");
  });
});
