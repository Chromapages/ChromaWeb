import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'proofStatus',
      title: 'Proof approval',
      type: 'string',
      initialValue: 'draft',
      options: { list: [
        { title: 'Awaiting owner review', value: 'draft' },
        { title: 'Owner-approved for publication', value: 'approved' },
      ], layout: 'radio' },
      description: 'Approve only after the owner verifies the project, permission to publish, narrative, and every result. Unapproved projects are hidden from the public site.',
      validation: (Rule) => Rule.required().custom((value) => value === 'draft' || value === 'approved' || 'Select a valid proof approval.'),
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required().custom((value) => Boolean(value?.trim()) || 'Enter a project title.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().custom((value) => Boolean(value?.trim()) || 'Enter an approved summary.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'Project Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required().min(1).custom((blocks) =>
        blocks?.some((block) => typeof block === 'object' && block !== null && 'children' in block
          && Array.isArray(block.children) && block.children.some((child: { text?: unknown }) => typeof child.text === 'string' && child.text.trim()))
          || 'Enter the approved project narrative.'),
    }),
    defineField({
      name: 'results',
      title: 'Project Results',
      description: 'Optional. Include only results verified and approved by the owner; leave empty when evidence is unavailable.',
      type: 'array',
      of: [{ type: 'string', validation: (Rule) => Rule.required().custom((value) => (typeof value === 'string' && Boolean(value.trim())) || 'Remove empty results.') }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
})
