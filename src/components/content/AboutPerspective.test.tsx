import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it} from "vitest";

import {AboutPerspective} from "./AboutPerspective";

describe("AboutPerspective", () => {
  it("preserves CMS paragraphs in reading order with a labeled section and lead", () => {
    const markup = renderToStaticMarkup(<AboutPerspective detail={"Opening perspective.\r\n\r\nSupporting detail.\n\nFurther detail."} />);
    expect(markup).toContain('aria-labelledby="about-perspective-title"');
    expect(markup).toContain('<h2 id="about-perspective-title"');
    expect(markup.match(/<p\b/g)).toHaveLength(4);
    expect(markup.indexOf("Opening perspective.")).toBeLessThan(markup.indexOf("Supporting detail."));
    expect(markup.indexOf("Supporting detail.")).toBeLessThan(markup.indexOf("Further detail."));
    expect(markup).toContain("max-w-[65ch]");
    expect(markup).toContain("border-l-2 border-indigo");
    expect(markup).not.toMatch(/<a\b|<button\b|<blockquote\b/);
  });

  it("does not render an empty supporting rule for single-paragraph content", () => {
    const markup = renderToStaticMarkup(<AboutPerspective detail="Only one paragraph." />);
    expect(markup).toContain("Only one paragraph.");
    expect(markup).not.toContain("border-l-2");
  });

  it("hides the section when CMS detail is absent or whitespace-only", () => {
    for (const detail of [undefined, null, "", " \n\n \r\n"]) {
      expect(renderToStaticMarkup(<AboutPerspective detail={detail} />)).toBe("");
    }
  });
});
