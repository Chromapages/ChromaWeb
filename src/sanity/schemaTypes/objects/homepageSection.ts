import {defineField, defineType} from "sanity";

export const homepageSection = defineType({
  name: "homepageSection",
  title: "Homepage section",
  type: "object",
  fields: [
    defineField({name: "eyebrow", title: "Eyebrow", type: "string"}),
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "body", title: "Supporting copy", type: "text", rows: 4}),
  ],
});
