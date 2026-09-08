import {defineField, defineType} from "sanity";

export const callToAction = defineType({
  name: "callToAction",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destination",
      type: "string",
      description: "Use a site-relative path or a complete URL.",
      validation: (rule) => rule.required(),
    }),
  ],
});
