import { z } from "zod";
import { budgetRanges, projectTypes } from "@/lib/site";
import { intakeRequestTypes, intakeStatuses } from "@/types/intake";

export const requestSchema = z.object({
  name: z.string().max(120, "Enter no more than 120 characters.").trim().min(2, "Please enter your name."),
  email: z.string().max(254, "Enter no more than 254 characters.").trim().email("Please enter a valid email address."),
  company: z.string().max(120).trim().optional(),
  requestType: z.enum(intakeRequestTypes),
  projectType: z.enum(projectTypes).or(z.literal("")).refine((value) => value.length <= 120).optional(),
  budgetRange: z.enum(budgetRanges).or(z.literal("")).refine((value) => value.length <= 120).optional(),
  message: z.string().max(10000, "Enter no more than 10,000 characters.")
    .refine((message) => message.trim().length >= 10, "Please describe your request in at least 10 characters."),
  honeypot: z.string().optional().or(z.literal("")),
});

export type RequestFormValues = z.infer<typeof requestSchema>;

export const intakeResponseSchema = z.object({
  success: z.literal(true),
  reference: z.string().trim().min(1),
});

export const updateRequestSchema = z.strictObject({
  status: z.enum(intakeStatuses).optional(),
  notes: z.string().max(5000).optional(),
}).refine(({ status, notes }) => status !== undefined || notes !== undefined);
