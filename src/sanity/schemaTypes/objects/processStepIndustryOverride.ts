import {defineArrayMember, defineField, defineType} from "sanity";

export const processStepIndustryOverride = defineType({
  name: "processStepIndustryOverride",
  title: "Industry-specific process step",
  type: "object",
  fields: [
    defineField({name: "industrySlug", title: "Industry slug", description: "The industry route segment this replacement applies to, for example accounting-advisory.", type: "string", validation: (rule) => rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)}),
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "description", title: "Description", type: "text", rows: 3, validation: (rule) => rule.required()}),
    defineField({name: "proofPoints", title: "Proof points", type: "array", of: [defineArrayMember({type: "string"})], validation: (rule) => rule.required().min(1)}),
  ],
});
