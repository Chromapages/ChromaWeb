import {defineField, defineType} from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "seo", title: "SEO metadata", type: "seo"}),
    defineField({name: "introduction", title: "Introduction", type: "blockContent"}),
    defineField({
      name: "formNotice",
      title: "Form availability notice",
      type: "text",
      rows: 3,
      description: "Explain that the form is not yet accepting submissions.",
    }),
    defineField({name: "cta", title: "Call to action", type: "callToAction"}),
  ],
  preview: {prepare: () => ({title: "Contact page"})},
});
