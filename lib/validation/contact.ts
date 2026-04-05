import { z } from "zod";
import { budgetRanges, projectTypes, timelineOptions } from "@/lib/site";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  website: z
    .string()
    .trim()
    .url("Please enter a valid website URL.")
    .optional()
    .or(z.literal("")),
  projectType: z.enum(projectTypes),
  budgetRange: z.enum(budgetRanges).optional().or(z.literal("")),
  timeline: z.enum(timelineOptions).optional().or(z.literal("")),
  message: z.string().trim().min(20, "Please add a short project summary."),
  honeypot: z.string().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
