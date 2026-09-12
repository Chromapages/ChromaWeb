export type UserRole = "client_member" | "client_owner" | "staff" | "studio_admin";

export type RequestStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "needs_info"
  | "awaiting_approval"
  | "scheduled"
  | "in_progress"
  | "ready_for_review"
  | "revision_requested"
  | "completed"
  | "cancelled";

export type RequestCategory =
  | "service"
  | "bug"
  | "content"
  | "design"
  | "feature"
  | "performance"
  | "other";

export type RequestPriority = "low" | "normal" | "high" | "urgent";

export type BusinessImpact = "low" | "medium" | "high" | "critical";

export type CoverageState = "unreviewed" | "included" | "additional_estimate" | "declined";

export interface BugDetails {
  expectedBehavior: string;
  actualBehavior: string;
  reproductionSteps: string;
  deviceBrowser?: string;
}

export interface Attachment {
  id: string;
  filename: string;
  byteCount: number;
  mimeType: string;
  storageKey: string;
  uploadedBy: string;
  uploadedAt: string;
  downloadUrl?: string;
}

export interface Estimate {
  id: string; // string representation of version, e.g. "1"
  requestId: string;
  organizationId: string;
  version: number;
  scopeSummary: string;
  amountUsd?: number;
  estimatedHours?: number;
  notes?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  invalidatedAt?: string;
}

export interface Approval {
  id: string;
  requestId: string;
  organizationId: string;
  type: "estimate" | "deliverable";
  targetVersion: number;
  actorId: string;
  actorName: string;
  actorEmail: string;
  status: "accepted" | "rejected";
  notes?: string;
  timestamp: string;
}

export interface Deliverable {
  previewUrl: string;
  notes?: string;
  version: number;
  publishedBy: string;
  publishedByName: string;
  publishedAt: string;
}

export interface PortalRequest {
  id: string;
  referenceNumber: string; // e.g. "REQ-1001"
  organizationId: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  category: RequestCategory;
  status: RequestStatus;
  priority: RequestPriority;
  businessImpact: BusinessImpact;
  affectedUrl?: string;
  bugDetails?: BugDetails;
  desiredDate?: string;
  scheduledDate?: string;
  completedDate?: string;
  coverage: CoverageState;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  assigneeId?: string;
  assigneeName?: string;
  currentEstimateVersion?: number;
  deliverable?: Deliverable;
  closedSummary?: string;
  attachments: Attachment[];
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface RequestMessage {
  id: string;
  requestId: string;
  organizationId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  body: string;
  attachments?: Attachment[];
  createdAt: string;
}

export interface InternalNote {
  id: string;
  requestId: string;
  organizationId: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface RequestEvent {
  id: string;
  requestId: string;
  organizationId: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  eventType:
    | "created"
    | "status_changed"
    | "priority_changed"
    | "assigned"
    | "estimate_created"
    | "estimate_approved"
    | "estimate_rejected"
    | "deliverable_published"
    | "deliverable_approved"
    | "revision_requested"
    | "reopened"
    | "closed";
  fromStatus?: RequestStatus;
  toStatus?: RequestStatus;
  description: string;
  timestamp: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  domain?: string;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string; // `${organizationId}_${userId}`
  organizationId: string;
  userId: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  currentOrganizationId: string;
  isStaff: boolean;
  isStudioAdmin: boolean;
  mfaEnrolled?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Invitation {
  id: string;
  tokenHash: string;
  tokenPlain?: string;
  organizationId: string;
  organizationName: string;
  invitedEmail: string;
  role: UserRole;
  createdBy: string;
  createdByName: string;
  expiresAt: string;
  usedAt?: string;
  revoked: boolean;
  createdAt: string;
}

export interface OutboxEvent {
  id: string;
  recipientEmail: string;
  subject: string;
  template: string;
  payload: Record<string, unknown>;
  status: "pending" | "sent" | "failed";
  attempts: number;
  lastError?: string;
  createdAt: string;
  processedAt?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actorId: string;
  actorRole: UserRole;
  organizationId?: string;
  targetType: string;
  targetId: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface PortalSession {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  organizationId: string;
  organizationName: string;
  isStaff: boolean;
  isStudioAdmin: boolean;
}
