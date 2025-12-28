import { defineType, defineField } from "sanity";
import { LayoutGrid, Square, TrendingUp, Image as ImageIcon } from "lucide-react";

export const bentoCard = defineType({
    name: "bentoCard",
    title: "Bento Card",
    type: "object",
    icon: Square,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "variant",
            title: "Variant",
            type: "string",
            options: {
                list: [
                    { title: "Standard", value: "standard" },
                    { title: "Featured (Mockup)", value: "featured" },
                    { title: "Gradient", value: "gradient" },
                    { title: "Stat", value: "stat" },
                ],
            },
            initialValue: "standard",
        }),
        defineField({
            name: "span",
            title: "Grid Span",
            type: "string",
            options: {
                list: [
                    { title: "1x1", value: "1x1" },
                    { title: "2x1 (Wide)", value: "2x1" },
                    { title: "1x2 (Tall)", value: "1x2" },
                    { title: "2x2 (Large)", value: "2x2" },
                ],
            },
            initialValue: "1x1",
        }),
        defineField({
            name: "image",
            title: "Image / Mockup",
            type: "image",
            options: { hotspot: true },
            hidden: ({ parent }) => parent?.variant === "stat",
        }),
        defineField({
            name: "stat",
            title: "Statistic Data",
            type: "object",
            hidden: ({ parent }) => parent?.variant !== "stat",
            fields: [
                defineField({ name: "value", title: "Value (e.g. +45%)", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "trend", title: "Trend Arrow", type: "string", options: { list: ["up", "down", "neutral"] } }),
            ],
        }),
        defineField({
            name: "icon",
            title: "Icon Name (Lucide)",
            type: "string",
            description: "Name of the Lucide icon to use (e.g., 'Zap', 'Shield')",
        }),
        defineField({
            name: "cta",
            title: "Card CTA",
            type: "cta",
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'variant',
            media: 'image'
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title,
                subtitle: `Bento Card (${subtitle})`,
                media: media || Square,
            };
        },
    },
});

export const bentoGrid = defineType({
    name: "bentoGrid",
    title: "Bento Grid Section",
    type: "object",
    icon: LayoutGrid,
    fields: [
        defineField({
            name: "sectionTitle",
            title: "Section Title",
            type: "string",
        }),
        defineField({
            name: "sectionSubtitle",
            title: "Subtitle",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "cards",
            title: "Cards",
            type: "array",
            of: [{ type: "bentoCard" }],
        }),
    ],
    preview: {
        select: {
            title: 'sectionTitle',
            cardCount: 'cards.length',
        },
        prepare({ title, cardCount }) {
            return {
                title: title || 'Untitled Bento Grid',
                subtitle: `${cardCount || 0} cards`,
                media: LayoutGrid,
            };
        },
    },
});
