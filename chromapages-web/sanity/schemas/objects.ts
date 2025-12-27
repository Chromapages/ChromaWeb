import { defineType, defineField } from "sanity";

// Reusable SEO object type
export const seo = defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            description: "Title for search engines (50-60 characters)",
            validation: (Rule) => Rule.max(60),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            rows: 3,
            description: "Description for search engines (150-160 characters)",
            validation: (Rule) => Rule.max(160),
        }),
        defineField({
            name: "ogImage",
            title: "Open Graph Image",
            type: "image",
            description: "Image for social sharing (1200x630 recommended)",
        }),
    ],
});

// Reusable block content type for rich text
export const blockContent = defineType({
    name: "blockContent",
    title: "Block Content",
    type: "array",
    of: [
        {
            type: "block",
            styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
            ],
            marks: {
                decorators: [
                    { title: "Bold", value: "strong" },
                    { title: "Italic", value: "em" },
                    { title: "Underline", value: "underline" },
                ],
                annotations: [
                    {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                            {
                                name: "href",
                                type: "url",
                                title: "URL",
                            },
                            {
                                name: "blank",
                                type: "boolean",
                                title: "Open in new tab",
                            },
                        ],
                    },
                ],
            },
        },
        {
            type: "image",
            options: { hotspot: true },
        },
    ],
});
