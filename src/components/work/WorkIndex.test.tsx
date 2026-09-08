import {describe, expect, it} from "vitest";
import {renderToStaticMarkup} from "react-dom/server";

import {WorkIndex} from "./WorkIndex";

describe("WorkIndex", () => {
  it("renders a factual empty state without placeholders, CMS details, or faux project cards", () => {
    const markup = renderToStaticMarkup(<WorkIndex caseStudies={[]} status="connected" />);

    expect(markup).toContain("Evidence is being prepared carefully.");
    expect(markup).toContain("There are no case studies to share right now.");
    expect(markup).not.toContain("placeholder");
    expect(markup).not.toContain("Sanity");
    expect(markup).not.toContain("Case-study queue");
    expect(markup).not.toContain("Case study title");
  });

  it("does not expose an unavailable CMS state", () => {
    const markup = renderToStaticMarkup(<WorkIndex caseStudies={null} status="unavailable" />);

    expect(markup).toContain("Evidence is temporarily unavailable.");
    expect(markup).not.toContain("Sanity");
    expect(markup).not.toContain("unavailable CMS");
  });

  it("renders only a classified record with its schema-backed context and route", () => {
    const markup = renderToStaticMarkup(<WorkIndex caseStudies={[{
      title: "Service site refresh",
      slug: "service-site-refresh",
      classification: "concept-study",
      projectIdentity: "Concept system",
      challenge: "The service architecture was difficult for buyers to navigate.",
      strategy: "Chromapages clarified the service paths and conversion journey.",
      proofSignals: [{
        type: "technical-proof",
        statement: "The record documents the delivered architecture.",
        sourceContext: "Approved delivery review.",
        timeframe: "Delivery review period.",
        measurementContext: "Approved delivery documentation.",
        limitations: "No commercial outcome is claimed.",
      }],
      relatedServices: [{title: "Signature Website", slug: "signature-website"}],
    }]} status="connected" />);

    expect(markup).toContain("Published evidence");
    expect(markup).toContain("Concept work");
    expect(markup).toContain("The problem");
    expect(markup).toContain("What changed");
    expect(markup).toContain("Technical proof");
    expect(markup).toContain("Source/context:");
    expect(markup).toContain("Limits:");
    expect(markup).toContain("Primary disciplines");
    expect(markup).toContain("Signature Website");
    expect(markup).toContain('href="/work/service-site-refresh"');
    expect(markup).toContain('>Service site refresh</a>');
    expect(markup).toContain("Project details →");
    expect(markup).toContain('aria-label="Read the evidence case study: Service site refresh"');
  });

  it("omits the proof row when no approved public signal is available", () => {
    const markup = renderToStaticMarkup(<WorkIndex caseStudies={[{
      title: "Owned brand system",
      slug: "owned-brand-system",
      classification: "owned-brand",
      projectIdentity: "Chromapages-owned system",
      challenge: "The offering needed a clearer digital structure.",
      strategy: "Chromapages established a focused content architecture.",
    }]} status="connected" />);

    expect(markup).toContain("The problem");
    expect(markup).toContain("What changed");
    expect(markup).not.toContain("Technical proof");
  });

  it("uses one explicit editorial feature placement while preserving the supporting preview hierarchy", () => {
    const markup = renderToStaticMarkup(<WorkIndex caseStudies={[
      {
        title: "Featured project",
        slug: "featured-project",
        classification: "owned-brand",
        projectIdentity: "Chromapages-owned project",
        workIndexFeatured: true,
        workIndexRank: 1,
        challenge: "A documented buyer problem.",
        strategy: "A documented intervention.",
      },
      {
        title: "Supporting project",
        slug: "supporting-project",
        classification: "concept-study",
        projectIdentity: "Concept system",
        workIndexRank: 2,
        challenge: "A documented buyer problem.",
        strategy: "A documented intervention.",
      },
    ]} status="connected" />);

    expect(markup.indexOf("Featured project")).toBeLessThan(markup.indexOf("Supporting project"));
    expect(markup).toContain("lg:col-span-12");
    expect(markup).toContain("lg:col-span-6");
    expect(markup).toContain("The problem");
    expect(markup).toContain("What changed");
  });
});
