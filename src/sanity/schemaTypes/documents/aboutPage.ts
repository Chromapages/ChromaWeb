import {defineArrayMember, defineField, defineType} from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "seo", title: "SEO metadata", type: "seo"}),
    defineField({name: "introduction", title: "Introduction", type: "blockContent"}),
    defineField({
      name: "principles",
      title: "Operating principles",
      type: "array",
      of: [defineArrayMember({type: "deliveryStep"})],
    }),
    defineField({name: "detail", title: "Supporting detail", type: "blockContent"}),
    defineField({name: "cta", title: "Call to action", type: "callToAction"}),
  ],
  preview: {prepare: () => ({title: "About page"})},
});
