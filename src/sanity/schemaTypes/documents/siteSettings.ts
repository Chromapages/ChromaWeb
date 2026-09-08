import {defineField, defineType} from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageTitles",
      title: "Page titles",
      type: "object",
      description: "Phase 1 route titles. These allow all fixed routes to verify their CMS connection.",
      fields: [
        defineField({name: "home", title: "Home", type: "string"}),
        defineField({name: "work", title: "Work", type: "string"}),
        defineField({name: "process", title: "Process", type: "string"}),
        defineField({name: "about", title: "About", type: "string"}),
        defineField({name: "insights", title: "Insights", type: "string"}),
        defineField({name: "contact", title: "Contact", type: "string"}),
      ],
    }),
    defineField({
      name: "logo",
      title: "Site logo",
      type: "image",
      description: "Upload the global site logo (SVG, PNG, or WebP).",
      options: {
        accept: "image/svg+xml, image/png, image/jpeg, image/webp",
      },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Upload the sitewide favicon (SVG, ICO, or PNG).",
      options: {
        accept: "image/svg+xml, image/x-icon, image/png, image/vnd.microsoft.icon",
      },
    }),
    defineField({name: "defaultSeo", title: "Default SEO metadata", type: "seo"}),
  ],
  preview: {prepare: () => ({title: "Site settings"})},
});
