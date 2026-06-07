import { z } from "zod";
import { budgetRanges, projectTypes } from "@/lib/site";

export const requestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  requestType: z.enum(["prospect", "client", "question"]),
  projectType: z.enum(projectTypes).optional().or(z.literal("")),
  budgetRange: z.enum(budgetRanges).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please describe your request in at least 10 characters."),
  honeypot: z.string().optional().or(z.literal("")),
});

export type RequestFormValues = z.infer<typeof requestSchema>;
