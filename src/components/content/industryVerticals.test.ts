import {describe, expect, it} from "vitest";

import {mapIndustryDirectory, type IndustryDirectoryRecord} from "./industryVerticals";

describe("mapIndustryDirectory", () => {
  it("maps two active verticals with one-based order and Explore links", () => {
    const verticals = mapIndustryDirectory([
      {id: "tax", title: "Tax", slug: "tax", directoryStatus: "featured", listEyebrow: "Priority", listDescription: "Tax description", conversionGoals: ["Bookings"]},
      {id: "qsr", title: "QSR", slug: "qsr", directoryStatus: "listed", listEyebrow: "Listed", listDescription: "QSR description", conversionGoals: ["Orders"]},
    ]);

    expect(verticals).toMatchObject([
      {id: "tax", order: 1, exploreLink: "/industries/tax", isPriority: true, isComingSoon: false},
      {id: "qsr", order: 2, exploreLink: "/industries/qsr", isPriority: false, isComingSoon: false},
    ]);
  });

  it("keeps a third Coming Soon vertical visible but non-interactive", () => {
    const verticals = mapIndustryDirectory([
      {id: "one", title: "One", slug: "one", directoryStatus: "featured"},
      {id: "two", title: "Two", slug: "two", directoryStatus: "listed"},
      {id: "three", title: "Three", directoryStatus: "comingSoon"},
    ]);

    expect(verticals[2]).toMatchObject({id: "three", order: 3, isComingSoon: true});
    expect(verticals[2]?.exploreLink).toBeUndefined();
  });

  it("derives stable order and links for six verticals", () => {
    const records: IndustryDirectoryRecord[] = Array.from({length: 6}, (_, index) => ({
      id: `vertical-${index + 1}`,
      title: `Vertical ${index + 1}`,
      slug: `vertical-${index + 1}`,
      directoryStatus: "listed",
    }));

    const verticals = mapIndustryDirectory(records);

    expect(verticals.map(({order}) => order)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(verticals.map(({exploreLink}) => exploreLink)).toEqual([
      "/industries/vertical-1",
      "/industries/vertical-2",
      "/industries/vertical-3",
      "/industries/vertical-4",
      "/industries/vertical-5",
      "/industries/vertical-6",
    ]);
  });

  it("normalizes missing optional fields without rendering empty conversion actions", () => {
    const [vertical] = mapIndustryDirectory([{id: "future", title: "Future", directoryStatus: "comingSoon"}]);

    expect(vertical).toEqual({
      id: "future",
      order: 1,
      categoryLabel: "Coming soon",
      title: "Future",
      hookQuote: "",
      description: "",
      conversionActions: [],
      exploreLink: undefined,
      isPriority: false,
      isComingSoon: true,
    });
    expect(vertical?.hookQuoteLink).toBeUndefined();
  });
});
