import {defineField, defineType} from "sanity";

export const deliveryStep = defineType({
  name: "deliveryStep",
  title: "Delivery step",
  type: "object",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "description", title: "Description", type: "string"}),
    defineField({name: "proof", title: "Proof badge", description: "A concise, approved standard or artifact to display alongside this step.", type: "string"}),
  ],
});
