"use server";

import {z} from "zod";

const ProjectFitSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please provide a valid business email address."),
  company: z.string().min(2, "Please enter your organization or company name."),
  website: z.string().optional(),
  industry: z.enum([
    "accounting-advisory",
    "restaurant-qsr",
    "professional-services",
    "insurance",
    "hospitality",
    "contractor-trades",
    "nonprofit-church",
    "other",
  ]),
  trigger: z.string().min(5, "Please briefly explain what changed that made the digital presence a priority now."),
  desiredAction: z.string().min(3, "Please describe the key customer action or transformation needed."),
  serviceInterest: z.enum([
    "signature-website",
    "landing-page-sprint",
    "digital-product-build",
    "growth-partnership",
    "digital-elevation-audit",
    "unsure",
  ]),
  investmentRange: z.string().min(1, "Please select an investment readiness range."),
  timeline: z.enum(["immediate", "1-3-months", "3-6-months", "exploratory"]),
  isDecisionMaker: z.enum(["yes", "partner", "marketing-lead", "evaluating"]),
  notes: z.string().optional(),
  hpField: z.string().max(0, "Spam detected."),
});

export type ProjectFitState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function submitProjectFit(
  _prevState: ProjectFitState,
  formData: FormData
): Promise<ProjectFitState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    website: formData.get("website") || undefined,
    industry: formData.get("industry"),
    trigger: formData.get("trigger"),
    desiredAction: formData.get("desiredAction"),
    serviceInterest: formData.get("serviceInterest"),
    investmentRange: formData.get("investmentRange"),
    timeline: formData.get("timeline"),
    isDecisionMaker: formData.get("isDecisionMaker"),
    notes: formData.get("notes") || undefined,
    hpField: formData.get("hpField") || "",
  };

  const parsed = ProjectFitSchema.safeParse(rawData);

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Please review the highlighted fields to complete your qualification submission.",
      errors: flattened,
    };
  }

  // Sub-brand automatic routing logic notification
  const {industry, company, name, email} = parsed.data;
  let routingNote = "Chromapages Core Studio";
  if (industry === "contractor-trades") {
    routingNote = "Routed to BuiltExpert (Chromapages Contractor Practice)";
  } else if (industry === "nonprofit-church") {
    routingNote = "Routed to ServeStrategy (Chromapages Mission Practice)";
  }

  console.info(`[Project Fit Inquiry Received] Company: ${company} (${name}, ${email}) - Practice: ${routingNote}`);

  return {
    success: true,
    message: "Your Project Fit review has been received. Our partners review every submission within 1 business day to calibrate scope and schedule your discovery conversation.",
  };
}
