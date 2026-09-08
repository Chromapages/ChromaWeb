import {defineArrayMember, defineField, defineType} from "sanity";

export const processPage = defineType({
  name: "processPage",
  title: "Process page",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "seo", title: "SEO metadata", type: "seo"}),
    defineField({name: "introduction", title: "Introduction", type: "blockContent"}),
    defineField({
      name: "steps",
      title: "Process steps",
      type: "array",
      of: [defineArrayMember({type: "processStep"})],
    }),
    defineField({name: "detail", title: "Supporting detail", type: "blockContent"}),
    defineField({name: "operatingPrinciplesIntro", title: "Operating principles introduction", description: "Optional replacement for the legacy supporting detail used above the operating-principles list.", type: "blockContent"}),
    defineField({name: "operatingPrinciples", title: "Operating principles", description: "Optional structured replacement for the numbered legacy supporting detail.", type: "array", of: [defineArrayMember({type: "differentiatorItem"})]}),
    defineField({name: "cta", title: "Call to action", type: "callToAction"}),
  ],
  preview: {prepare: () => ({title: "Process page"})},
});
