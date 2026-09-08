import {defineField, defineType} from "sanity";

import {proofSignalTypes} from "@/lib/proofHierarchy";
import {caseStudyEditorialGuidance} from "../editorialGuidance";

export const proofSignal = defineType({
  name: "proofSignal",
  title: "Public proof signal",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Proof type",
      type: "string",
      options: {list: proofSignalTypes.map(({label, value}) => ({title: label, value})), layout: "radio"},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publicStatement",
      title: "Verified public statement",
      type: "text",
      rows: 3,
      description: caseStudyEditorialGuidance.proofStatement,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publicSourceContext",
      title: "Public source or context",
      type: "string",
      description: caseStudyEditorialGuidance.proofSource,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "timeframe",
      title: "Timeframe",
      type: "string",
      description: caseStudyEditorialGuidance.proofTimeframe,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "measurementContext",
      title: "Measurement context",
      type: "text",
      rows: 2,
      description: caseStudyEditorialGuidance.proofMeasurement,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publicLimitations",
      title: "Public limitations",
      type: "text",
      rows: 2,
      description: caseStudyEditorialGuidance.proofLimitations,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "verificationStatus",
      title: "Verification status",
      type: "string",
      options: {list: [
        {title: "Pending review", value: "pending"},
        {title: "Approved for public use", value: "approved"},
        {title: "Not approved", value: "notApproved"},
      ], layout: "radio"},
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: "publicStatement", subtitle: "type"},
  },
});
