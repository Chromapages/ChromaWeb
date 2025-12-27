// Sanity Schema Index
// All document and object types for the Chromapages CMS

import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { service } from "./service";
import { caseStudy } from "./caseStudy";
import { testimonial } from "./testimonial";
import { seo, blockContent } from "./objects";

export const schemaTypes = [
    // Object types (must be defined first)
    seo,
    blockContent,

    // Singleton documents
    siteSettings,
    homePage,

    // Collection documents
    service,
    caseStudy,
    testimonial,
];
