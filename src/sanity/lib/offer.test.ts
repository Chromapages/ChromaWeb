import {describe, expect, it} from "vitest";

import {offerDirectoryQuery} from "./queries";

describe("offerDirectoryQuery", () => {
  it("sorts Services offers by the editor-controlled order with a title fallback", () => {
    expect(offerDirectoryQuery).toContain("order(coalesce(order, 9999) asc, title asc)");
    expect(offerDirectoryQuery).toContain("order,");
    expect(offerDirectoryQuery).toContain("outcomePrompt,");
    expect(offerDirectoryQuery).toContain("shortTransformation,");
    expect(offerDirectoryQuery).toContain("fitReasons,");
    expect(offerDirectoryQuery).toContain("primaryGoal,");
    expect(offerDirectoryQuery).toContain("bestFor,");
    expect(offerDirectoryQuery).toContain("investmentTiers[]{");
  });
});
