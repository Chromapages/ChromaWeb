import { groq } from "next-sanity";

// Homepage Query
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    title,
    heroHeadline,
    heroSubheadline,
    heroCta,
    heroSecondaryCta,
    "heroMockup": heroMockup.asset->url,
    featuredServices[]-> {
      _id,
      title,
      slug,
      shortDescription,
      icon
    },
    featuredCaseStudies[]-> {
      _id,
      title,
      slug,
      client,
      industry,
      projectType,
      "mainImage": mainImage.asset->url,
      excerpt,
      results,
      testimonial-> {
        quote,
        author,
        role,
        company
      }
    },
    testimonials[]-> {
      _id,
      quote,
      author,
      role,
      company,
      "avatar": avatar.asset->url
    },
    seo
  }
`;

// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    logo,
    navigation[] {
      label,
      href,
      isExternal
    },
    footerLinks[] {
      title,
      links[] {
        label,
        href
      }
    },
    socialLinks[] {
      platform,
      url
    },
    ctaButton {
      label,
      href
    }
  }
`;

// Services Query
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    features
  }
`;

// Single Service Query
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    longDescription,
    icon,
    features,
    process[] {
      title,
      description
    },
    relatedCaseStudies[]-> {
      _id,
      title,
      slug,
      client,
      mainImage
    },
    seo
  }
`;

// Case Studies Query
export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    industry,
    projectType,
    mainImage,
    excerpt,
    results[]
  }
`;

// Single Case Study Query
export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    industry,
    mainImage,
    gallery[],
    problem,
    solution,
    results[] {
      metric,
      value,
      description
    },
    testimonial-> {
      quote,
      author,
      role
    },
    technologies[],
    publishedAt,
    seo
  }
`;

// Pricing Query
export const pricingQuery = groq`
  *[_type == "pricing"][0] {
    headline,
    subheadline,
    packages[] {
      name,
      description,
      price,
      priceType,
      features[],
      isPopular,
      ctaLabel
    },
    retainerInfo {
      title,
      description,
      features[]
    }
  }
`;
