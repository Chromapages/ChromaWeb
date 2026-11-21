export const intakeStatuses = ["new", "active", "in_review", "done"] as const;
export const intakeRequestTypes = ["prospect", "client", "question"] as const;

export type IntakeStatus = (typeof intakeStatuses)[number];
export type IntakeRequestType = (typeof intakeRequestTypes)[number];

export type IntakeRequest = {
  id: string;
  reference: string;
  status: IntakeStatus;
  requestType: IntakeRequestType;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budgetRange: string;
  message: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
