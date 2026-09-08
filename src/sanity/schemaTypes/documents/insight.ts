import {defineArrayMember, defineField, defineType} from "sanity";

import {publishingStatusOptions, validateInsightReadiness, validateSeoReadiness} from "../objects/publishing";

export const insight = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({
      name: "publishingStatus",
      title: "Publishing readiness",
      type: "string",
      description: "Only Published ready insights can appear on the public site. Complete editorial review before selecting it.",
      options: {list: publishingStatusOptions, layout: "radio"},
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "title", maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({name: "category", title: "Category", type: "string"}),
    defineField({name: "author", title: "Author", type: "string"}),
    defineField({
      name: "summary",
      title: "Guide summary",
      type: "text",
      rows: 3,
      description: "Explain the practical value of this guide without claiming client results that the article does not evidence.",
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      description: "Set only when the guide is ready for public publication. Do not use a draft-creation date as a public publication date.",
    }),
    defineField({name: "content", title: "Content", type: "blockContent"}),
    defineField({name: "seo", title: "SEO metadata", type: "seo", validation: (rule) => rule.custom(validateSeoReadiness).warning()}),
    defineField({name: "featuredImage", title: "Featured image", type: "editorialImage"}),
    defineField({
      name: "relatedOffers",
      title: "Related offers",
      type: "array",
      of: [defineArrayMember({type: "reference", to: [{type: "offer"}]})],
    }),
  ],
  validation: (rule) => rule.custom(validateInsightReadiness),
  preview: {select: {title: "title", subtitle: "category", media: "featuredImage"}},
});
