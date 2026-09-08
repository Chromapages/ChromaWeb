import React from "react";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({data}: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chromapages",
    url: "https://chromapages.com",
    logo: "https://chromapages.com/brand/chromapages-logo.svg",
    description: "Premium web design and development studio for growth-minded service businesses.",
    slogan: "Your business has evolved. Your website should show it.",
    sameAs: [],
  };
}

export function buildServiceSchema({
  name,
  description,
  url,
  priceRange,
}: {
  name: string;
  description: string;
  url: string;
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": "Organization",
      name: "Chromapages",
      url: "https://chromapages.com",
    },
    description,
    url,
    ...(priceRange ? {offers: {"@type": "Offer", priceSpecification: {priceCurrency: "USD", price: priceRange}}} : {}),
  };
}

export function buildArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = "Chromapages Studio",
  imageUrl,
}: {
  title: string;
  description?: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: datePublished ?? new Date().toISOString(),
    dateModified: dateModified ?? datePublished ?? new Date().toISOString(),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Chromapages",
      logo: {
        "@type": "ImageObject",
        url: "https://chromapages.com/brand/chromapages-logo.svg",
      },
    },
    ...(imageUrl ? {image: imageUrl} : {}),
  };
}

export function buildBreadcrumbSchema(items: Array<{name: string; url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
