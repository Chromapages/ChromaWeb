import {defineField, defineType} from "sanity";

export const insightsPage = defineType({
  name: "insightsPage",
  title: "Insights page",
  type: "document",
  groups: [
    {name: "hero", title: "Hero", default: true},
    {name: "library", title: "Guide library"},
    {name: "closing", title: "Closing call to action"},
    {name: "seo", title: "SEO"},
  ],
  fields: [
    defineField({name: "title", title: "Hero title", type: "string", group: "hero", validation: (rule) => rule.required()}),
    defineField({name: "introduction", title: "Hero introduction", type: "text", rows: 3, group: "hero"}),
    defineField({name: "heroImage", title: "Hero image", type: "editorialImage", group: "hero", description: "Optional. Use an approved editorial image with confirmed rights. The public page uses the local editorial fallback when this is empty."}),
    defineField({name: "featuredHeading", title: "Featured-guide heading", type: "string", group: "library"}),
    defineField({
      name: "featuredInsight",
      title: "Featured guide",
      type: "reference",
      to: [{type: "insight"}],
      group: "library",
      description: "Select an approved guide. The public page shows it only when its publishing readiness is Published ready.",
    }),
    defineField({name: "latestHeading", title: "Latest-guides heading", type: "string", group: "library"}),
    defineField({name: "emptyStateHeading", title: "Empty-library heading", type: "string", group: "library"}),
    defineField({name: "emptyStateBody", title: "Empty-library body", type: "text", rows: 3, group: "library"}),
    defineField({name: "ctaHeading", title: "Closing heading", type: "string", group: "closing"}),
    defineField({name: "cta", title: "Closing call to action", type: "callToAction", group: "closing"}),
    defineField({name: "seo", title: "SEO metadata", type: "seo", group: "seo"}),
  ],
  preview: {prepare: () => ({title: "Insights page"})},
});
