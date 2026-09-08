import {defineArrayMember, defineField, defineType} from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "object",
  fields: [
    defineField({name: "id", title: "Stable ID", description: "A permanent lowercase identifier used for analytics and content references.", type: "string", validation: (rule) => rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)}),
    defineField({name: "order", title: "Order", type: "number", validation: (rule) => rule.required().integer().min(1)}),
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "description", title: "Description", type: "text", rows: 4, validation: (rule) => rule.required()}),
    defineField({name: "proofPoints", title: "Proof points", description: "Approved standards, checks, or technical evidence displayed as tags rather than in the paragraph.", type: "array", of: [defineArrayMember({type: "string"})], validation: (rule) => rule.required().min(1)}),
    defineField({name: "industryOverrides", title: "Industry overrides", description: "Optional complete replacements for a particular industry. The generic step remains the fallback.", type: "array", of: [defineArrayMember({type: "processStepIndustryOverride"})]}),
  ],
});
