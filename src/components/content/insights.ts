export type InsightPortableTextSpan = {
  _key?: string;
  _type?: string;
  marks?: string[];
  text?: string;
};

export type InsightPortableTextBlock = {
  _key?: string;
  _type?: string;
  children?: InsightPortableTextSpan[];
  markDefs?: Array<{_key?: string; _type?: string; href?: string}>;
  level?: number;
  listItem?: "bullet" | "number";
  style?: "normal" | "h2" | "h3";
};

export type InsightPortableText = InsightPortableTextBlock[];

export function insightPlainText(content?: InsightPortableText | null) {
  return content
    ?.map((block) => block.children?.map((child) => child.text?.trim() ?? "").filter(Boolean).join("") ?? "")
    .filter(Boolean)
    .join("\n\n") ?? "";
}

export function estimateInsightReadingTime(content?: InsightPortableText | null) {
  const words = insightPlainText(content).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatInsightPublicationDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {month: "long", day: "numeric", year: "numeric", timeZone: "UTC"}).format(date);
}
