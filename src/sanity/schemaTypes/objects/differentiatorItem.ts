import {defineField, defineType} from "sanity";

export const differentiatorItem = defineType({
  name: "differentiatorItem",
  title: "Differentiator item",
  type: "object",
  fields: [
    defineField({name: "id", title: "Stable ID", description: "A permanent lowercase identifier used for analytics and content references.", type: "string", validation: (rule) => rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)}),
    defineField({name: "order", title: "Order", type: "number", validation: (rule) => rule.required().integer().min(1)}),
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "description", title: "Description", type: "text", rows: 4, validation: (rule) => rule.required()}),
    defineField({name: "proofLink", title: "Supporting proof link", description: "Optional site-relative path or complete URL to approved evidence. Leave blank when no approved proof is available.", type: "string"}),
  ],
});
