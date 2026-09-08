import {renderToStaticMarkup} from "react-dom/server";
import {describe, expect, it} from "vitest";
import {InsightCard, insightThumbnailUrl, type InsightThumbnail} from "./InsightCard";

const approvedImage: InsightThumbnail = {
  url: "https://cdn.sanity.io/images/project/production/example-1600x1200.jpg",
  approvalStatus: "approved",
  rightsConfirmed: true,
  dimensions: {width: 1600, height: 1200},
  alt: "Checklist showing the three planning inputs.",
  crop: {left: 0.1, right: 0.1, top: 0, bottom: 0},
  hotspot: {x: 0.5, y: 0.8},
};

describe("guide thumbnails", () => {
  it("fails closed for unapproved images or unconfirmed rights", () => {
    expect(insightThumbnailUrl({...approvedImage, approvalStatus: "pending"})).toBeNull();
    expect(insightThumbnailUrl({...approvedImage, rightsConfirmed: false})).toBeNull();
    expect(insightThumbnailUrl({...approvedImage, url: "https://example.com/private.jpg"})).toBeNull();
  });

  it("keeps the thumbnail within the editor crop while honoring the focal point", () => {
    const url = new URL(insightThumbnailUrl(approvedImage)!);
    expect(url.searchParams.get("rect")).toBe("160,480,1280,720");
  });

  it("renders approved media lazily with responsive sizes and meaningful alt text", () => {
    const markup = renderToStaticMarkup(<InsightCard insight={{title: "Planning a redesign", slug: "planning", featuredImage: approvedImage}} />);
    expect(markup).toContain('loading="lazy"');
    expect(markup).toContain('srcSet=');
    expect(markup).toContain(approvedImage.alt);
  });

  it("uses a decorative cover when media and metadata are missing", () => {
    const markup = renderToStaticMarkup(<InsightCard insight={{title: "Planning a redesign", slug: "planning"}} />);
    expect(markup).not.toContain("<img");
    expect(markup).not.toContain("<time");
    expect(markup.split('href="/insights/planning"')).toHaveLength(2);
    expect(markup).toContain('aria-hidden="true"');
  });
});
