// Sanity Schema Index
// All document and object types for the Chromapages CMS

import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { service } from "./service";
import { caseStudy } from "./caseStudy";
import { testimonial } from "./testimonial";
import { seo, blockContent } from "./objects";
import { cta, trustPill } from "./ui";
import { bentoCard, bentoGrid } from "./bento";

export const schemaTypes = [
    // Object types (must be defined first)
    seo,
    blockContent,
    cta,
    trustPill,
    bentoCard,
    bentoGrid,

    // Singleton documents
    siteSettings,
    homePage,

    // Collection documents
    service,
    caseStudy,
    testimonial,
];
