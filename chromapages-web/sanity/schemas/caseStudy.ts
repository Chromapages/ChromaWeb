import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
    name: "caseStudy",
    title: "Case Study",
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
            name: "client",
            title: "Client Name",
            type: "string",
        }),
        defineField({
            name: "industry",
            title: "Industry",
            type: "string",
            options: {
                list: [
                    "Technology",
                    "E-Commerce",
                    "Finance",
                    "Healthcare",
                    "Real Estate",
                    "Food & Beverage",
                    "Professional Services",
                    "Other",
                ],
            },
        }),
        defineField({
            name: "mainImage",
            title: "Main Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "gallery",
            title: "Image Gallery",
            type: "array",
            of: [{ type: "image", options: { hotspot: true } }],
        }),
        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "problem",
            title: "The Problem",
            type: "blockContent",
        }),
        defineField({
            name: "solution",
            title: "The Solution",
            type: "blockContent",
        }),
        defineField({
            name: "results",
            title: "Results",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "metric", type: "string", title: "Metric Name" },
                        { name: "value", type: "string", title: "Value" },
                        { name: "description", type: "string", title: "Description" },
                    ],
                },
            ],
        }),
        defineField({
            name: "testimonial",
            title: "Client Testimonial",
            type: "reference",
            to: [{ type: "testimonial" }],
        }),
        defineField({
            name: "technologies",
            title: "Technologies Used",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        select: { title: "title", subtitle: "client", media: "mainImage" },
    },
});
