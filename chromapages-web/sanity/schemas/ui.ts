import { defineType, defineField } from "sanity";
import { Link, MousePointer2 } from "lucide-react";

export const cta = defineType({
    name: "cta",
    title: "Call to Action",
    type: "object",
    icon: MousePointer2,
    fields: [
        defineField({
            name: "label",
            title: "Label",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "href",
            title: "Link / URL",
            type: "string", // simple string for now, could be improved with link selection
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "variant",
            title: "Variant",
            type: "string",
            options: {
                list: [
                    { title: "Primary (Solid)", value: "primary" },
                    { title: "Secondary (Outline)", value: "secondary" },
                    { title: "Ghost (Text)", value: "ghost" },
                ],
                layout: "radio",
            },
            initialValue: "primary",
        }),
    ],
});

export const trustPill = defineType({
    name: "trustPill",
    title: "Trust Pill",
    type: "object",
    fields: [
        defineField({
            name: "rating",
            title: "Rating",
            type: "string", // e.g., "4.9"
            initialValue: "5.0",
        }),
        defineField({
            name: "reviewCount",
            title: "Review Count",
            type: "string", // e.g., "2k+"
        }),
        defineField({
            name: "source",
            title: "Source",
            type: "string", // e.g., "Trustpilot"
        }),
    ],
});
