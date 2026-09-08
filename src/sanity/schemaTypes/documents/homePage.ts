import {defineArrayMember, defineField, defineType} from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({name: "title", title: "Internal title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "seo", title: "SEO metadata", type: "seo"}),
    defineField({name: "hero", title: "Hero", type: "homepageSection", validation: (rule) => rule.required()}),
    defineField({name: "heroCta", title: "Hero call to action", type: "callToAction"}),
    defineField({name: "problem", title: "Customer problem", type: "homepageSection"}),
    defineField({name: "solution", title: "Dependable solution", type: "homepageSection"}),
    defineField({name: "standard", title: "Chromapages Standard", type: "homepageSection"}),
    defineField({
      name: "standardSteps",
      title: "Chromapages Standard steps",
      type: "array",
      of: [defineArrayMember({type: "homepageStep"})],
    }),
    defineField({name: "proof", title: "Evidence", type: "homepageSection"}),
    defineField({name: "offers", title: "Defined offers", type: "homepageSection"}),
    defineField({name: "process", title: "Process", type: "homepageSection"}),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      of: [defineArrayMember({type: "homepageStep"})],
    }),
    defineField({name: "industries", title: "Industry relevance", type: "homepageSection"}),
    defineField({name: "closingCta", title: "Next step", type: "homepageSection"}),
    defineField({name: "closingCtaAction", title: "Next-step call to action", type: "callToAction"}),
  ],
  preview: {prepare: () => ({title: "Homepage"})},
});
