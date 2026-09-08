import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it} from "vitest";

import {InsightPage, InsightsIndex, type InsightListItem} from "./InsightPages";
import {estimateInsightReadingTime, formatInsightPublicationDate, insightPlainText, type InsightPortableText} from "./insights";

const articleContent: InsightPortableText = [
  {_key: "intro", _type: "block", style: "normal", children: [{_key: "intro-span", _type: "span", text: "A useful opening paragraph."}]},
  {_key: "heading", _type: "block", style: "h2", children: [{_key: "heading-span", _type: "span", text: "A meaningful heading"}]},
  {_key: "bullet-one", _type: "block", style: "normal", listItem: "bullet", children: [{_key: "bullet-one-span", _type: "span", text: "First consideration."}]},
  {_key: "bullet-two", _type: "block", style: "normal", listItem: "bullet", children: [{_key: "bullet-two-span", _type: "span", text: "Second consideration."}]},
  {_key: "source", _type: "block", style: "normal", markDefs: [{_key: "source-link", _type: "link", href: "https://www.w3.org/WAI/"}], children: [{_key: "source-span", _type: "span", text: "W3C guidance", marks: ["source-link"]}]},
];

const insights: InsightListItem[] = [
  {id: "first", title: "First guide", slug: "first-guide", category: "Strategy", summary: "A concise useful summary.", publishedAt: "2026-09-06T00:00:00.000Z", body: "one two three"},
  {id: "second", title: "Second guide", slug: "second-guide", category: "Performance", summary: "Another concise useful summary.", body: "one two"},
];

describe("insight content helpers", () => {
  it("extracts readable content and derives an honest minimum reading estimate", () => {
    expect(insightPlainText(articleContent)).toContain("A useful opening paragraph.");
    expect(estimateInsightReadingTime(articleContent)).toBe(1);
    expect(formatInsightPublicationDate("2026-09-06T00:00:00.000Z")).toBe("September 6, 2026");
    expect(formatInsightPublicationDate("not-a-date")).toBeNull();
  });
});

describe("InsightsIndex", () => {
  it("renders an intentional public empty state without internal CMS diagnostics", () => {
    const markup = renderToStaticMarkup(<InsightsIndex insights={null} page={{title: "Guidance", emptyStateHeading: "Guides are coming."}} />);
    expect(markup).toContain("Guides are coming.");
    expect(markup).not.toMatch(/sanity|cms|publish|setup/i);
    expect(markup).not.toContain('id="insights-library"');
  });

  it("pins the selected guide once and keeps one descriptive link per card", () => {
    const markup = renderToStaticMarkup(<InsightsIndex insights={insights} page={{featuredInsightId: "second", latestHeading: "More guides"}} />);
    expect(markup).toContain("Editor’s pick");
    expect(markup).toContain("More guides");
    for (const guide of insights) {
      expect(markup.split(`href="/insights/${guide.slug}"`)).toHaveLength(2);
    }
    expect(markup.indexOf('href="/insights/second-guide"')).toBeLessThan(markup.indexOf('href="/insights/first-guide"'));
    expect(markup).toContain("<h3");
    expect(markup).not.toContain("published guides");
  });

  it.each([1, 2, 6])("renders %i guides without duplicate links or empty items", (count) => {
    const items = Array.from({length: count}, (_, index) => ({...insights[0], id: String(index), slug: `guide-${index}`}));
    const markup = renderToStaticMarkup(<InsightsIndex insights={items} />);
    expect(markup.split("<article")).toHaveLength(count + 1);
    expect(markup.split('href="/insights/guide-')).toHaveLength(count + 1);
  });
});

describe("InsightPage", () => {
  it("renders rich text with meaningful headings, grouped lists, and safe links", () => {
    const markup = renderToStaticMarkup(<InsightPage data={{title: "A guide", summary: "Article summary.", content: articleContent}} />);
    expect(markup).toContain("<h1");
    expect(markup).toContain("<h2");
    expect(markup).toContain("<ul");
    expect(markup).toContain("First consideration.");
    expect(markup).toContain('href="https://www.w3.org/WAI/"');
    expect(markup).toContain('rel="noreferrer"');
  });
});
