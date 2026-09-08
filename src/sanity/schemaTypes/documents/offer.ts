import {defineArrayMember, defineField, defineType} from "sanity";

export const offer = defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "seo", title: "SEO metadata", type: "seo"}),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "title", maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({name: "summary", title: "Summary", type: "text", rows: 3}),
    defineField({name: "positioningStatement", title: "Positioning statement", type: "text", rows: 3}),
    defineField({name: "problem", title: "Problem addressed", type: "blockContent"}),
    defineField({name: "solution", title: "Solution", type: "blockContent"}),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      of: [defineArrayMember({type: "string"})],
    }),
    defineField({name: "investmentRange", title: "Investment range", type: "string"}),
    defineField({name: "timeline", title: "Timeline", type: "string"}),
    defineField({
      name: "deliverySteps",
      title: "Delivery steps",
      type: "array",
      of: [defineArrayMember({type: "deliveryStep"})],
    }),
    defineField({name: "cta", title: "Call to action", type: "callToAction"}),
    defineField({
      name: "relatedIndustries",
      title: "Related industries",
      type: "array",
      of: [defineArrayMember({type: "reference", to: [{type: "industry"}]})],
    }),
  ],
  preview: {select: {title: "title", subtitle: "slug.current"}},
});
