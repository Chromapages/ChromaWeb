import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it} from "vitest";

import {HomeMismatch} from "./HomeMismatch";

describe("HomeMismatch", () => {
  it("renders separate responsive views while preserving the shared CMS headline", () => {
    const markup = renderToStaticMarkup(
      <HomeMismatch
        section={{
          title: "A shared mismatch headline",
          body: "Shared mismatch body copy.",
        }}
      />,
    );

    expect(markup).toContain('data-home-mismatch-view="desktop"');
    expect(markup).toContain('data-home-mismatch-view="mobile"');
    expect(markup).toContain("hidden border-t");
    expect(markup).toContain("lg:hidden");
    expect(markup.match(/A shared mismatch headline/g)).toHaveLength(2);
    expect(markup.match(/Shared mismatch body copy\./g)).toHaveLength(1);
    expect(markup).toContain("When the website trails the business");
  });
});
