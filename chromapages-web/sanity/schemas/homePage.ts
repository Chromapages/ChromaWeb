import { defineType, defineField } from "sanity";

export const homePage = defineType({
    name: "homePage",
    title: "Home Page",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Internal Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        // Hero Section
        defineField({
            name: "heroHeadline",
            title: "Hero Headline",
            type: "string",
        }),
        defineField({
            name: "heroSubheadline",
            title: "Hero Subheadline",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "heroCta",
            title: "Hero Primary CTA",
            type: "object",
            fields: [
                { name: "label", type: "string", title: "Label" },
                { name: "href", type: "string", title: "URL" },
            ],
        }),
        defineField({
            name: "heroSecondaryCta",
            title: "Hero Secondary CTA",
            type: "object",
            fields: [
                { name: "label", type: "string", title: "Label" },
                { name: "href", type: "string", title: "URL" },
            ],
        }),
        // Featured Content
        defineField({
            name: "featuredServices",
            title: "Featured Services",
            type: "array",
            of: [{ type: "reference", to: [{ type: "service" }] }],
            validation: (Rule) => Rule.max(3),
        }),
        defineField({
            name: "featuredCaseStudies",
            title: "Featured Case Studies",
            type: "array",
            of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
            validation: (Rule) => Rule.max(3),
        }),
        defineField({
            name: "testimonials",
            title: "Featured Testimonials",
            type: "array",
            of: [{ type: "reference", to: [{ type: "testimonial" }] }],
        }),
        // SEO
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        prepare() {
            return { title: "Home Page" };
        },
    },
});
