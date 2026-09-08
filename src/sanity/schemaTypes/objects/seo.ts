import {defineField, defineType} from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO metadata",
  type: "object",
  fields: [
    defineField({name: "metaTitle", title: "Meta title", type: "string"}),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({name: "canonicalUrl", title: "Canonical URL", type: "url"}),
  ],
});
