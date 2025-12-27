import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({
            name: "siteName",
            title: "Site Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "navigation",
            title: "Navigation Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "label", type: "string", title: "Label" },
                        { name: "href", type: "string", title: "URL" },
                        { name: "isExternal", type: "boolean", title: "External Link" },
                    ],
                },
            ],
        }),
        defineField({
            name: "ctaButton",
            title: "CTA Button",
            type: "object",
            fields: [
                { name: "label", type: "string", title: "Label" },
                { name: "href", type: "string", title: "URL" },
            ],
        }),
        defineField({
            name: "footerLinks",
            title: "Footer Link Groups",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", type: "string", title: "Group Title" },
                        {
                            name: "links",
                            type: "array",
                            title: "Links",
                            of: [
                                {
                                    type: "object",
                                    fields: [
                                        { name: "label", type: "string", title: "Label" },
                                        { name: "href", type: "string", title: "URL" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: "socialLinks",
            title: "Social Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "platform", type: "string", title: "Platform" },
                        { name: "url", type: "url", title: "URL" },
                    ],
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: "Site Settings" };
        },
    },
});
