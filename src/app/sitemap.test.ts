import {describe, expect, it} from "vitest";

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("keeps the Solutions hub while leaving the Industries overview redirected", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url.toString());

    expect(urls).toContain("https://chromapages.com/services");
    expect(urls).not.toContain("https://chromapages.com/industries");
  });
});
