import { defineType, defineField } from "sanity";

export const service = defineType({
    name: "service",
    title: "Service",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
        }),
        defineField({
            name: "icon",
            title: "Icon Name",
            type: "string",
            description: "Lucide icon name (e.g., 'Globe', 'ShoppingCart', 'Code')",
        }),
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "longDescription",
            title: "Long Description",
            type: "blockContent",
        }),
        defineField({
            name: "features",
            title: "Features",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "process",
            title: "Process Steps",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", type: "string", title: "Step Title" },
                        { name: "description", type: "text", title: "Description" },
                    ],
                },
            ],
        }),
        defineField({
            name: "relatedCaseStudies",
            title: "Related Case Studies",
            type: "array",
            of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        select: { title: "title", subtitle: "shortDescription" },
    },
});
