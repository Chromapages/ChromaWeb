import type {Metadata} from "next";

export const siteUrl = new URL("https://chromapages.com");

export type SeoData = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
};

type MetadataInput = {
  title?: string | null;
  description?: string | null;
  path: string;
  seo?: SeoData | null;
  imageUrl?: string | null;
  type?: "website" | "article";
  robots?: Metadata["robots"];
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

function canonicalUrl(path: string, override?: string | null) {
  if (override) {
    try {
      const candidate = new URL(override);
      if (candidate.protocol === "https:" && candidate.hostname === siteUrl.hostname) {
        candidate.search = "";
        candidate.hash = "";
        return candidate.toString();
      }
    } catch {
      // Invalid or off-domain CMS overrides safely fall back to the route URL.
    }
  }

  return absoluteUrl(path);
}

export function buildMetadata({
  title,
  description,
  path,
  seo,
  imageUrl,
  type = "website",
  robots,
}: MetadataInput): Metadata {
  const resolvedTitle = seo?.metaTitle ?? title ?? "Chromapages";
  const resolvedDescription = seo?.metaDescription ?? description ?? "Premium web design and development for service businesses.";
  const canonical = canonicalUrl(path, seo?.canonicalUrl);
  const socialImages = imageUrl ? [{url: imageUrl}] : [];

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {canonical},
    openGraph: {
      type,
      siteName: "Chromapages",
      url: canonical,
      title: resolvedTitle,
      description: resolvedDescription,
      images: socialImages,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description: resolvedDescription,
      images: socialImages,
    },
    ...(robots ? {robots} : {}),
  };
}
