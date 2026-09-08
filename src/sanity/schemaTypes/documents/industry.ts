import {defineArrayMember, defineField, defineType} from "sanity";

import {publishingStatusOptions, validateEditorialReadiness, validateIndustryDirectoryReadiness, validateSeoReadiness} from "../objects/publishing";

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({name: "name", title: "Industry name", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "seo", title: "SEO metadata", type: "seo", validation: (rule) => rule.custom(validateSeoReadiness).warning()}),
    defineField({
      name: "publishingStatus",
      title: "Publishing readiness",
      type: "string",
      description: "Only Published ready industries can appear on the public site. Complete editorial review before selecting it.",
      options: {list: publishingStatusOptions, layout: "radio"},
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "name", maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "directoryStatus",
      title: "Industry directory status",
      type: "string",
      options: {list: [{title: "Featured", value: "featured"}, {title: "Listed", value: "listed"}, {title: "Coming soon", value: "comingSoon"}], layout: "radio"},
    }),
    defineField({name: "priorityRank", title: "Featured priority rank", type: "number", hidden: ({document}) => document?.directoryStatus !== "featured", validation: (rule) => rule.integer().positive()}),
    defineField({name: "listEyebrow", title: "Directory eyebrow", type: "string"}),
    defineField({name: "hook", title: "Directory hook", type: "string"}),
    defineField({name: "listDescription", title: "Directory description", type: "text", rows: 3}),
    defineField({name: "conversionGoals", title: "Conversion goals", description: "Descriptive customer-journey goals, not analytics events or links.", type: "array", of: [defineArrayMember({type: "string"})], validation: (rule) => rule.max(3)}),
    defineField({name: "buyerProblems", title: "Buyer problems", type: "blockContent"}),
    defineField({name: "positioning", title: "Positioning", type: "blockContent"}),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [defineArrayMember({type: "reference", to: [{type: "offer"}]})],
    }),
    defineField({
      name: "relatedCaseStudies",
      title: "Related case studies",
      type: "array",
      of: [defineArrayMember({type: "reference", to: [{type: "caseStudy"}]})],
    }),
    defineField({name: "content", title: "Content", type: "blockContent"}),
    defineField({name: "cta", title: "Call to action", type: "callToAction"}),
  ],
  validation: (rule) => rule.custom(validateEditorialReadiness).custom(validateIndustryDirectoryReadiness),
  preview: {select: {title: "name", subtitle: "slug.current"}},
});
