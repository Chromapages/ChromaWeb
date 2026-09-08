import {defineField, defineType} from "sanity";

import {caseStudyMediaAnchors, caseStudyMediaRoles} from "@/lib/caseStudyMedia";
import {proofSignalTypes} from "@/lib/proofHierarchy";
import {caseStudyEditorialGuidance} from "../editorialGuidance";

export const editorialImage = defineType({
  name: "editorialImage",
  title: "Editorial image",
  type: "image",
  options: {hotspot: true},
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe meaningful content. Use an empty value only for decorative images.",
      validation: (rule) => rule.required(),
    }),
    defineField({name: "caption", title: "Caption", type: "string"}),
    defineField({
      name: "mediaRole",
      title: "Case-study media role",
      type: "string",
      description: caseStudyEditorialGuidance.mediaRole,
      options: {list: caseStudyMediaRoles.map(({label, value}) => ({title: label, value})), layout: "radio"},
    }),
    defineField({
      name: "storytellingJob",
      title: "Case-study storytelling job",
      type: "text",
      rows: 2,
      description: caseStudyEditorialGuidance.mediaJob,
    }),
    defineField({
      name: "proofSignalType",
      title: "Related proof category",
      type: "string",
      description: "Optional. Select when the asset directly supports a published proof signal.",
      options: {list: proofSignalTypes.map(({label, value}) => ({title: label, value})), layout: "radio"},
    }),
    defineField({
      name: "narrativeAnchor",
      title: "Related case-study section",
      type: "string",
      description: caseStudyEditorialGuidance.mediaPlacement,
      options: {list: caseStudyMediaAnchors.map(({label, value}) => ({title: label, value})), layout: "radio"},
    }),
    defineField({
      name: "publicDisplayApproved",
      title: "Public case-study display approved",
      type: "boolean",
      description: "For case-study media only. Confirm this artifact, role, and storytelling job are approved for public display.",
      initialValue: false,
    }),
    defineField({name: "source", title: "Source", type: "string"}),
    defineField({name: "rights", title: "Rights / permission notes", type: "text", rows: 2}),
    defineField({
      name: "rightsConfirmed",
      title: "Rights confirmed",
      type: "boolean",
      description: "Confirm that Chromapages has the right to publish this image. Do not paste legal documents or personal information here.",
      initialValue: false,
    }),
    defineField({
      name: "approvalStatus",
      title: "Editorial approval",
      type: "string",
      description: "Set to Approved only after verifying rights, alt text, caption accuracy, and proof-policy suitability.",
      options: {
        list: [
          {title: "Pending review", value: "pending"},
          {title: "Approved", value: "approved"},
          {title: "Not approved", value: "notApproved"},
        ],
        layout: "radio",
      },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "aiUsage",
      title: "AI usage",
      type: "string",
      options: {
        list: [
          {title: "No AI used", value: "none"},
          {title: "AI-assisted concept image", value: "ai-assisted-concept"},
        ],
        layout: "radio",
      },
      initialValue: "none",
      validation: (rule) => rule.required(),
    }),
  ],
});
