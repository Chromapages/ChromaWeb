import {defineField, defineType} from "sanity";

export const homepageStep = defineType({
  name: "homepageStep",
  title: "Homepage step",
  type: "object",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "description", title: "Description", type: "string"}),
  ],
});
