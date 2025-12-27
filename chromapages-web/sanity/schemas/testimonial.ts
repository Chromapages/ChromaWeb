import { defineType, defineField } from "sanity";

export const testimonial = defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
        defineField({
            name: "quote",
            title: "Quote",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "author",
            title: "Author Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "role",
            title: "Role / Title",
            type: "string",
        }),
        defineField({
            name: "company",
            title: "Company",
            type: "string",
        }),
        defineField({
            name: "avatar",
            title: "Avatar",
            type: "image",
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: { title: "author", subtitle: "company", media: "avatar" },
    },
});
