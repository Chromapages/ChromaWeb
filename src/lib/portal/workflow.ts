import type {RequestStatus, UserRole} from "./types";

export const ALLOWED_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
  draft: ["submitted"],
  submitted: ["in_review", "cancelled"],
  in_review: ["needs_info", "awaiting_approval", "scheduled", "in_progress", "cancelled"],
  needs_info: ["in_review", "cancelled"],
  awaiting_approval: ["scheduled", "in_review", "cancelled"],
  scheduled: ["in_progress", "cancelled"],
  in_progress: ["ready_for_review", "cancelled"],
  ready_for_review: ["revision_requested", "completed"],
  revision_requested: ["in_progress", "cancelled"],
  completed: ["in_review"],
  cancelled: ["in_review"],
};

export const STATUS_LABELS: Record<RequestStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  in_review: "In Review",
  needs_info: "Needs Information",
  awaiting_approval: "Awaiting Approval",
  scheduled: "Scheduled",
  in_progress: "In Progress",
  ready_for_review: "Ready for Review",
  revision_requested: "Revision Requested",
  completed: "Completed",
  cancelled: "Cancelled",
};

export interface TransitionValidationResult {
  allowed: boolean;
  reason?: string;
}

export const canTransition = (
  from: RequestStatus,
  to: RequestStatus,
  role: UserRole,
  isApprovalAction: boolean = false
): TransitionValidationResult => {
  const allowedTargets = ALLOWED_TRANSITIONS[from];
  if (!allowedTargets || !allowedTargets.includes(to)) {
    return {
      allowed: false,
      reason: `Transition from "${STATUS_LABELS[from]}" to "${STATUS_LABELS[to]}" is not permitted by workflow rules.`,
    };
  }

  // Client member rules
  if (role === "client_member") {
    if (from === "draft" && to === "submitted") {
      return {allowed: true};
    }
    if (from === "completed" && to === "in_review") {
      return {allowed: true};
    }
    return {
      allowed: false,
      reason: "Client members can only submit drafts and request reopening of completed work.",
    };
  }

  // Client owner rules
  if (role === "client_owner") {
    if (from === "draft" && to === "submitted") {
      return {allowed: true};
    }
    if (from === "completed" && to === "in_review") {
      return {allowed: true};
    }
    // Estimate acceptance
    if (from === "awaiting_approval" && to === "scheduled" && isApprovalAction) {
      return {allowed: true};
    }
    // Estimate rejection / decline
    if (from === "awaiting_approval" && to === "in_review" && isApprovalAction) {
      return {allowed: true};
    }
    // Deliverable approval
    if (from === "ready_for_review" && to === "completed" && isApprovalAction) {
      return {allowed: true};
    }
    // Deliverable revision request
    if (from === "ready_for_review" && to === "revision_requested") {
      return {allowed: true};
    }
    return {
      allowed: false,
      reason: "Client owners can only submit, approve estimates/deliverables, request revisions, and request reopening.",
    };
  }

  // Staff and Studio Admin rules
  if (role === "staff" || role === "studio_admin") {
    // Staff cannot approve estimates on behalf of client approvers
    if (from === "awaiting_approval" && to === "scheduled" && !isApprovalAction) {
      return {
        allowed: false,
        reason: "Only an authorized client approver can accept an estimate to schedule work.",
      };
    }
    // Staff cannot approve client deliverables on behalf of the client
    if (from === "ready_for_review" && to === "completed" && !isApprovalAction) {
      return {
        allowed: false,
        reason: "Only an authorized client approver can approve deliverables as completed.",
      };
    }
    return {allowed: true};
  }

  return {
    allowed: false,
    reason: "Unrecognized user role.",
  };
};
