import {
  SEED_ESTIMATES,
  SEED_EVENTS,
  SEED_INTERNAL_NOTES,
  SEED_INVITATIONS,
  SEED_MEMBERSHIPS,
  SEED_MESSAGES,
  SEED_ORGANIZATIONS,
  SEED_PROJECTS,
  SEED_REQUESTS,
  SEED_USERS,
} from "./seed";
import type {
  Approval,
  BusinessImpact,
  CoverageState,
  Estimate,
  InternalNote,
  Invitation,
  Membership,
  Organization,
  PortalRequest,
  PortalSession,
  Project,
  RequestCategory,
  RequestEvent,
  RequestMessage,
  RequestPriority,
  RequestStatus,
  UserProfile,
  UserRole,
} from "./types";
import {canTransition} from "./workflow";

// In-memory persistent state (can sync with Firestore emulator or Admin SDK)
let organizations: Organization[] = JSON.parse(JSON.stringify(SEED_ORGANIZATIONS));
let projects: Project[] = JSON.parse(JSON.stringify(SEED_PROJECTS));
let users: UserProfile[] = JSON.parse(JSON.stringify(SEED_USERS));
let memberships: Membership[] = JSON.parse(JSON.stringify(SEED_MEMBERSHIPS));
let invitations: Invitation[] = JSON.parse(JSON.stringify(SEED_INVITATIONS));
let requests: PortalRequest[] = JSON.parse(JSON.stringify(SEED_REQUESTS));
let messages: RequestMessage[] = JSON.parse(JSON.stringify(SEED_MESSAGES));
let internalNotes: InternalNote[] = JSON.parse(JSON.stringify(SEED_INTERNAL_NOTES));
let estimates: Estimate[] = JSON.parse(JSON.stringify(SEED_ESTIMATES));
let approvals: Approval[] = [];
let events: RequestEvent[] = JSON.parse(JSON.stringify(SEED_EVENTS));
let requestCounter = 1004;

export const resetDataStore = () => {
  organizations = JSON.parse(JSON.stringify(SEED_ORGANIZATIONS));
  projects = JSON.parse(JSON.stringify(SEED_PROJECTS));
  users = JSON.parse(JSON.stringify(SEED_USERS));
  memberships = JSON.parse(JSON.stringify(SEED_MEMBERSHIPS));
  invitations = JSON.parse(JSON.stringify(SEED_INVITATIONS));
  requests = JSON.parse(JSON.stringify(SEED_REQUESTS));
  messages = JSON.parse(JSON.stringify(SEED_MESSAGES));
  internalNotes = JSON.parse(JSON.stringify(SEED_INTERNAL_NOTES));
  estimates = JSON.parse(JSON.stringify(SEED_ESTIMATES));
  approvals = [];
  events = JSON.parse(JSON.stringify(SEED_EVENTS));
  requestCounter = 1004;
};

// Organization functions
export const getOrganizations = (): Organization[] => {
  return [...organizations];
};

export const getOrganizationById = (orgId: string): Organization | null => {
  const match = organizations.find((org) => org.id === orgId);
  return match ? {...match} : null;
};

export const createOrganization = (name: string, domain?: string): Organization => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const newOrg: Organization = {
    id: `org-${slug}-${Date.now()}`,
    name,
    slug,
    domain,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  organizations.push(newOrg);
  return {...newOrg};
};

// Project functions
export const getProjects = (orgId: string): Project[] => {
  return projects.filter((project) => project.organizationId === orgId);
};

export const getProjectById = (orgId: string, projectId: string): Project | null => {
  const match = projects.find(
    (project) => project.organizationId === orgId && project.id === projectId
  );
  return match ? {...match} : null;
};

export const createProject = (orgId: string, name: string, domain?: string): Project => {
  const newProject: Project = {
    id: `proj-${Date.now()}`,
    organizationId: orgId,
    name,
    domain,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.push(newProject);
  return {...newProject};
};

// Membership & Profile functions
export const getUserProfile = (uid: string): UserProfile | null => {
  const match = users.find((u) => u.uid === uid);
  return match ? {...match} : null;
};

export const getUserProfileByEmail = (email: string): UserProfile | null => {
  const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  return match ? {...match} : null;
};

export const getMembership = (orgId: string, userId: string): Membership | null => {
  const match = memberships.find(
    (m) => m.organizationId === orgId && m.userId === userId
  );
  return match ? {...match} : null;
};

export const getOrganizationMemberships = (orgId: string): Membership[] => {
  return memberships.filter((m) => m.organizationId === orgId);
};

export const createMembership = (
  orgId: string,
  userId: string,
  email: string,
  displayName: string,
  role: UserRole
): Membership => {
  const existing = getMembership(orgId, userId);
  if (existing) {
    existing.role = role;
    existing.updatedAt = new Date().toISOString();
    return {...existing};
  }

  const newMembership: Membership = {
    id: `${orgId}_${userId}`,
    organizationId: orgId,
    userId,
    email,
    displayName,
    role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  memberships.push(newMembership);
  return {...newMembership};
};

// Invitations
export const getInvitations = (orgId: string): Invitation[] => {
  return invitations.filter((inv) => inv.organizationId === orgId && !inv.revoked && !inv.usedAt);
};

export const createInvitation = (
  orgId: string,
  email: string,
  role: UserRole,
  actorSession: PortalSession
): Invitation => {
  const org = getOrganizationById(orgId);
  if (!org) {
    throw new Error("Organization not found");
  }

  const token = `inv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const invitation: Invitation = {
    id: `inv-${Date.now()}`,
    tokenHash: token,
    tokenPlain: token,
    organizationId: orgId,
    organizationName: org.name,
    invitedEmail: email.toLowerCase(),
    role,
    createdBy: actorSession.uid,
    createdByName: actorSession.displayName,
    expiresAt,
    revoked: false,
    createdAt: new Date().toISOString(),
  };

  invitations.push(invitation);
  return {...invitation};
};

export const revokeInvitation = (orgId: string, invitationId: string): boolean => {
  const inv = invitations.find((i) => i.id === invitationId && i.organizationId === orgId);
  if (!inv) {
    return false;
  }
  inv.revoked = true;
  return true;
};

export const getInvitationByToken = (token: string): Invitation | null => {
  const match = invitations.find(
    (i) => (i.tokenHash === token || i.tokenPlain === token) && !i.revoked && !i.usedAt
  );
  if (!match) {
    return null;
  }
  const isExpired = new Date(match.expiresAt).getTime() < Date.now();
  if (isExpired) {
    return null;
  }
  return {...match};
};

export const acceptInvitation = (
  token: string,
  displayName: string,
  _passwordHash: string
): {user: UserProfile; membership: Membership} => {
  void _passwordHash;
  const inv = getInvitationByToken(token);
  if (!inv) {
    throw new Error("Invalid, revoked, or expired invitation token.");
  }

  let user = getUserProfileByEmail(inv.invitedEmail);
  if (!user) {
    user = {
      uid: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email: inv.invitedEmail,
      displayName,
      currentOrganizationId: inv.organizationId,
      isStaff: inv.role === "staff" || inv.role === "studio_admin",
      isStudioAdmin: inv.role === "studio_admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(user);
  }

  const membership = createMembership(
    inv.organizationId,
    user.uid,
    inv.invitedEmail,
    displayName,
    inv.role
  );

  // Mark invitation used
  const originalInv = invitations.find((i) => i.id === inv.id);
  if (originalInv) {
    originalInv.usedAt = new Date().toISOString();
  }

  return {user: {...user}, membership: {...membership}};
};

// Requests
export interface RequestFilters {
  projectId?: string;
  status?: RequestStatus | "all";
  category?: RequestCategory | "all";
  priority?: RequestPriority | "all";
  assigneeId?: string | "all";
  searchQuery?: string;
}

export const getRequests = (orgId: string, filters?: RequestFilters): PortalRequest[] => {
  let result = requests.filter((r) => r.organizationId === orgId);

  if (!filters) {
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  if (filters.projectId && filters.projectId !== "all") {
    result = result.filter((r) => r.projectId === filters.projectId);
  }
  if (filters.status && filters.status !== "all") {
    result = result.filter((r) => r.status === filters.status);
  }
  if (filters.category && filters.category !== "all") {
    result = result.filter((r) => r.category === filters.category);
  }
  if (filters.priority && filters.priority !== "all") {
    result = result.filter((r) => r.priority === filters.priority);
  }
  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.referenceNumber.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getAllRequestsForStaff = (filters?: RequestFilters & {organizationId?: string}): PortalRequest[] => {
  let result = [...requests];

  if (filters?.organizationId && filters.organizationId !== "all") {
    result = result.filter((r) => r.organizationId === filters.organizationId);
  }
  if (filters?.projectId && filters.projectId !== "all") {
    result = result.filter((r) => r.projectId === filters.projectId);
  }
  if (filters?.status && filters.status !== "all") {
    result = result.filter((r) => r.status === filters.status);
  }
  if (filters?.category && filters.category !== "all") {
    result = result.filter((r) => r.category === filters.category);
  }
  if (filters?.priority && filters.priority !== "all") {
    result = result.filter((r) => r.priority === filters.priority);
  }
  if (filters?.assigneeId) {
    if (filters.assigneeId === "unassigned") {
      result = result.filter((r) => !r.assigneeId);
    } else if (filters.assigneeId !== "all") {
      result = result.filter((r) => r.assigneeId === filters.assigneeId);
    }
  }
  if (filters?.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.referenceNumber.toLowerCase().includes(q) ||
        r.projectName.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getRequestById = (orgId: string, requestId: string): PortalRequest | null => {
  const match = requests.find(
    (r) => r.organizationId === orgId && r.id === requestId
  );
  return match ? {...match} : null;
};

export const getRequestByIdForStaff = (requestId: string): PortalRequest | null => {
  const match = requests.find((r) => r.id === requestId);
  return match ? {...match} : null;
};

export interface CreateRequestInput {
  projectId: string;
  title: string;
  description: string;
  category: RequestCategory;
  priority: RequestPriority;
  businessImpact: BusinessImpact;
  affectedUrl?: string;
  bugDetails?: {
    expectedBehavior: string;
    actualBehavior: string;
    reproductionSteps: string;
    deviceBrowser?: string;
  };
  desiredDate?: string;
}

export const createRequest = (
  orgId: string,
  input: CreateRequestInput,
  actorSession: PortalSession
): PortalRequest => {
  const project = getProjectById(orgId, input.projectId);
  if (!project) {
    throw new Error("Invalid project for this organization");
  }

  const id = `req-${Date.now()}`;
  const refNum = `REQ-${requestCounter++}`;
  const now = new Date().toISOString();

  const newRequest: PortalRequest = {
    id,
    referenceNumber: refNum,
    organizationId: orgId,
    projectId: input.projectId,
    projectName: project.name,
    title: input.title,
    description: input.description,
    category: input.category,
    status: "submitted",
    priority: input.priority,
    businessImpact: input.businessImpact,
    affectedUrl: input.affectedUrl,
    bugDetails: input.bugDetails,
    desiredDate: input.desiredDate,
    coverage: "unreviewed",
    requesterId: actorSession.uid,
    requesterName: actorSession.displayName,
    requesterEmail: actorSession.email,
    attachments: [],
    version: 1,
    createdAt: now,
    updatedAt: now,
  };

  requests.push(newRequest);

  // Record creation event
  events.push({
    id: `evt-${Date.now()}`,
    requestId: id,
    organizationId: orgId,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorRole: actorSession.role,
    eventType: "created",
    toStatus: "submitted",
    description: `Request submitted by ${actorSession.displayName}`,
    timestamp: now,
  });

  return {...newRequest};
};

export const updateRequestStatus = (
  requestId: string,
  targetStatus: RequestStatus,
  actorSession: PortalSession,
  reason?: string,
  isApprovalAction: boolean = false
): PortalRequest => {
  const req = requests.find((r) => r.id === requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  // Cross-tenant verification: if not staff/admin, must match org
  if (!actorSession.isStaff && !actorSession.isStudioAdmin && req.organizationId !== actorSession.organizationId) {
    throw new Error("Forbidden: cross-tenant access denied.");
  }

  const check = canTransition(req.status, targetStatus, actorSession.role, isApprovalAction);
  if (!check.allowed) {
    throw new Error(check.reason || "Transition not permitted");
  }

  const fromStatus = req.status;
  req.status = targetStatus;
  req.version += 1;
  req.updatedAt = new Date().toISOString();

  if (targetStatus === "completed") {
    req.completedDate = new Date().toISOString();
  }

  events.push({
    id: `evt-${Date.now()}`,
    requestId,
    organizationId: req.organizationId,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorRole: actorSession.role,
    eventType: "status_changed",
    fromStatus,
    toStatus: targetStatus,
    description: reason || `Status changed from ${fromStatus} to ${targetStatus} by ${actorSession.displayName}`,
    timestamp: new Date().toISOString(),
  });

  return {...req};
};

export const updateRequestTriage = (
  requestId: string,
  updates: {
    assigneeId?: string;
    priority?: RequestPriority;
    scheduledDate?: string;
    coverage?: CoverageState;
    closedSummary?: string;
  },
  actorSession: PortalSession
): PortalRequest => {
  if (!actorSession.isStaff && !actorSession.isStudioAdmin) {
    throw new Error("Only staff can triage requests");
  }

  const req = requests.find((r) => r.id === requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  if (updates.assigneeId !== undefined) {
    if (updates.assigneeId === "") {
      req.assigneeId = undefined;
      req.assigneeName = undefined;
    } else {
      const staffUser = users.find((u) => u.uid === updates.assigneeId);
      req.assigneeId = updates.assigneeId;
      req.assigneeName = staffUser ? staffUser.displayName : "Staff Member";
      events.push({
        id: `evt-${Date.now()}`,
        requestId,
        organizationId: req.organizationId,
        actorId: actorSession.uid,
        actorName: actorSession.displayName,
        actorRole: actorSession.role,
        eventType: "assigned",
        description: `Assigned to ${req.assigneeName} by ${actorSession.displayName}`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  if (updates.priority && updates.priority !== req.priority) {
    req.priority = updates.priority;
    events.push({
      id: `evt-${Date.now()}`,
      requestId,
      organizationId: req.organizationId,
      actorId: actorSession.uid,
      actorName: actorSession.displayName,
      actorRole: actorSession.role,
      eventType: "priority_changed",
      description: `Priority updated to ${updates.priority} by ${actorSession.displayName}`,
      timestamp: new Date().toISOString(),
    });
  }

  if (updates.scheduledDate !== undefined) {
    req.scheduledDate = updates.scheduledDate;
  }
  if (updates.coverage !== undefined) {
    req.coverage = updates.coverage;
  }
  if (updates.closedSummary !== undefined) {
    req.closedSummary = updates.closedSummary;
  }

  req.updatedAt = new Date().toISOString();
  return {...req};
};

// Messages (Client & Staff Public Conversation)
export const getMessages = (orgId: string, requestId: string): RequestMessage[] => {
  return messages
    .filter((m) => m.organizationId === orgId && m.requestId === requestId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const createMessage = (
  orgId: string,
  requestId: string,
  body: string,
  actorSession: PortalSession
): RequestMessage => {
  const req = getRequestById(orgId, requestId);
  if (!req && !actorSession.isStaff && !actorSession.isStudioAdmin) {
    throw new Error("Request not found in organization");
  }

  const newMessage: RequestMessage = {
    id: `msg-${Date.now()}`,
    requestId,
    organizationId: orgId,
    authorId: actorSession.uid,
    authorName: actorSession.displayName,
    authorRole: actorSession.role,
    body,
    createdAt: new Date().toISOString(),
  };

  messages.push(newMessage);
  return {...newMessage};
};

// Internal Notes (Staff-Only! Never returned to client)
export const getInternalNotes = (
  requestId: string,
  actorSession: PortalSession
): InternalNote[] => {
  if (!actorSession.isStaff && !actorSession.isStudioAdmin) {
    throw new Error("Access denied: Internal notes are restricted to studio staff.");
  }

  return internalNotes
    .filter((n) => n.requestId === requestId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const createInternalNote = (
  requestId: string,
  body: string,
  actorSession: PortalSession
): InternalNote => {
  if (!actorSession.isStaff && !actorSession.isStudioAdmin) {
    throw new Error("Access denied: Internal notes are restricted to studio staff.");
  }

  const req = requests.find((r) => r.id === requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  const newNote: InternalNote = {
    id: `note-${Date.now()}`,
    requestId,
    organizationId: req.organizationId,
    authorId: actorSession.uid,
    authorName: actorSession.displayName,
    body,
    createdAt: new Date().toISOString(),
  };

  internalNotes.push(newNote);
  return {...newNote};
};

// Estimates
export const getEstimates = (orgId: string, requestId: string): Estimate[] => {
  return estimates
    .filter((e) => e.organizationId === orgId && e.requestId === requestId)
    .sort((a, b) => b.version - a.version);
};

export const createEstimate = (
  requestId: string,
  scopeSummary: string,
  amountUsd: number | undefined,
  estimatedHours: number | undefined,
  notes: string | undefined,
  actorSession: PortalSession
): Estimate => {
  if (!actorSession.isStaff && !actorSession.isStudioAdmin) {
    throw new Error("Only staff can create estimates");
  }

  const req = requests.find((r) => r.id === requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  const existingEstimates = estimates.filter((e) => e.requestId === requestId);
  const nextVersion = existingEstimates.length > 0
    ? Math.max(...existingEstimates.map((e) => e.version)) + 1
    : 1;

  // Invalidate previous versions
  const now = new Date().toISOString();
  for (const prev of existingEstimates) {
    if (!prev.invalidatedAt) {
      prev.invalidatedAt = now;
    }
  }

  const newEstimate: Estimate = {
    id: `est-${requestId}-v${nextVersion}`,
    requestId,
    organizationId: req.organizationId,
    version: nextVersion,
    scopeSummary,
    amountUsd,
    estimatedHours,
    notes,
    createdBy: actorSession.uid,
    createdByName: actorSession.displayName,
    createdAt: now,
  };

  estimates.push(newEstimate);

  // Update request state to awaiting_approval
  req.currentEstimateVersion = nextVersion;
  req.coverage = "additional_estimate";
  req.status = "awaiting_approval";
  req.updatedAt = now;

  events.push({
    id: `evt-${Date.now()}`,
    requestId,
    organizationId: req.organizationId,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorRole: actorSession.role,
    eventType: "estimate_created",
    description: `Estimate v${nextVersion} created ($${amountUsd ?? "N/A"}) by ${actorSession.displayName}`,
    timestamp: now,
  });

  return {...newEstimate};
};

export const approveEstimate = (
  orgId: string,
  requestId: string,
  version: number,
  actorSession: PortalSession,
  notes?: string
): Approval => {
  if (actorSession.role !== "client_owner" && !actorSession.isStudioAdmin) {
    throw new Error("Only client owners / approvers can accept an estimate");
  }

  const req = getRequestById(orgId, requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  if (req.currentEstimateVersion !== version) {
    throw new Error("Stale approval: This estimate has been revised. Please review the current version.");
  }

  const targetEst = estimates.find(
    (e) => e.requestId === requestId && e.version === version && !e.invalidatedAt
  );
  if (!targetEst) {
    throw new Error("Active estimate version not found");
  }

  const now = new Date().toISOString();
  const approval: Approval = {
    id: `appr-${Date.now()}`,
    requestId,
    organizationId: orgId,
    type: "estimate",
    targetVersion: version,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorEmail: actorSession.email,
    status: "accepted",
    notes,
    timestamp: now,
  };
  approvals.push(approval);

  // Atomically transition status to scheduled
  updateRequestStatus(requestId, "scheduled", actorSession, `Estimate v${version} accepted by ${actorSession.displayName}`, true);

  events.push({
    id: `evt-${Date.now()}`,
    requestId,
    organizationId: orgId,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorRole: actorSession.role,
    eventType: "estimate_approved",
    description: `Estimate v${version} accepted by ${actorSession.displayName}`,
    timestamp: now,
  });

  return {...approval};
};

export const rejectEstimate = (
  orgId: string,
  requestId: string,
  version: number,
  actorSession: PortalSession,
  reason: string
): Approval => {
  if (actorSession.role !== "client_owner" && !actorSession.isStudioAdmin) {
    throw new Error("Only client owners / approvers can decline an estimate");
  }

  const req = getRequestById(orgId, requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  const now = new Date().toISOString();
  const approval: Approval = {
    id: `appr-${Date.now()}`,
    requestId,
    organizationId: orgId,
    type: "estimate",
    targetVersion: version,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorEmail: actorSession.email,
    status: "rejected",
    notes: reason,
    timestamp: now,
  };
  approvals.push(approval);

  // Transition back to in_review
  updateRequestStatus(requestId, "in_review", actorSession, `Estimate v${version} declined by ${actorSession.displayName}: ${reason}`, true);

  events.push({
    id: `evt-${Date.now()}`,
    requestId,
    organizationId: orgId,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorRole: actorSession.role,
    eventType: "estimate_rejected",
    description: `Estimate v${version} declined by ${actorSession.displayName}`,
    timestamp: now,
  });

  return {...approval};
};

// Deliverables
export const publishDeliverable = (
  requestId: string,
  previewUrl: string,
  notes: string | undefined,
  actorSession: PortalSession
): PortalRequest => {
  if (!actorSession.isStaff && !actorSession.isStudioAdmin) {
    throw new Error("Only staff can publish preview deliverables");
  }

  const req = requests.find((r) => r.id === requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  const nextVersion = (req.deliverable?.version ?? 0) + 1;
  const now = new Date().toISOString();

  req.deliverable = {
    previewUrl,
    notes,
    version: nextVersion,
    publishedBy: actorSession.uid,
    publishedByName: actorSession.displayName,
    publishedAt: now,
  };

  updateRequestStatus(requestId, "ready_for_review", actorSession, `Deliverable v${nextVersion} preview published by ${actorSession.displayName}`);

  events.push({
    id: `evt-${Date.now()}`,
    requestId,
    organizationId: req.organizationId,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorRole: actorSession.role,
    eventType: "deliverable_published",
    description: `Preview v${nextVersion} delivered for client review: ${previewUrl}`,
    timestamp: now,
  });

  return {...req};
};

export const approveDeliverable = (
  orgId: string,
  requestId: string,
  actorSession: PortalSession,
  notes?: string
): PortalRequest => {
  if (actorSession.role !== "client_owner" && !actorSession.isStudioAdmin) {
    throw new Error("Only client owners can accept deliverables");
  }

  const req = getRequestById(orgId, requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  const now = new Date().toISOString();
  approvals.push({
    id: `appr-${Date.now()}`,
    requestId,
    organizationId: orgId,
    type: "deliverable",
    targetVersion: req.deliverable?.version ?? 1,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorEmail: actorSession.email,
    status: "accepted",
    notes,
    timestamp: now,
  });

  const updated = updateRequestStatus(requestId, "completed", actorSession, `Deliverable approved by ${actorSession.displayName}`, true);

  events.push({
    id: `evt-${Date.now()}`,
    requestId,
    organizationId: orgId,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorRole: actorSession.role,
    eventType: "deliverable_approved",
    description: `Deliverable accepted and request completed by ${actorSession.displayName}`,
    timestamp: now,
  });

  return updated;
};

export const requestDeliverableRevision = (
  orgId: string,
  requestId: string,
  revisionNotes: string,
  actorSession: PortalSession
): PortalRequest => {
  if (actorSession.role !== "client_owner" && !actorSession.isStudioAdmin) {
    throw new Error("Only client owners can request revisions");
  }

  const req = getRequestById(orgId, requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  const now = new Date().toISOString();
  approvals.push({
    id: `appr-${Date.now()}`,
    requestId,
    organizationId: orgId,
    type: "deliverable",
    targetVersion: req.deliverable?.version ?? 1,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorEmail: actorSession.email,
    status: "rejected",
    notes: revisionNotes,
    timestamp: now,
  });

  const updated = updateRequestStatus(requestId, "revision_requested", actorSession, `Revision requested: ${revisionNotes}`);

  events.push({
    id: `evt-${Date.now()}`,
    requestId,
    organizationId: orgId,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorRole: actorSession.role,
    eventType: "revision_requested",
    description: `Revisions requested by ${actorSession.displayName}: ${revisionNotes}`,
    timestamp: now,
  });

  return updated;
};

export const requestReopen = (
  orgId: string,
  requestId: string,
  reason: string,
  actorSession: PortalSession
): PortalRequest => {
  const req = getRequestById(orgId, requestId);
  if (!req) {
    throw new Error("Request not found");
  }

  const updated = updateRequestStatus(requestId, "in_review", actorSession, `Reopened by ${actorSession.displayName}: ${reason}`);

  events.push({
    id: `evt-${Date.now()}`,
    requestId,
    organizationId: orgId,
    actorId: actorSession.uid,
    actorName: actorSession.displayName,
    actorRole: actorSession.role,
    eventType: "reopened",
    description: `Request reopened by ${actorSession.displayName}: ${reason}`,
    timestamp: new Date().toISOString(),
  });

  return updated;
};

// Events
export const getEvents = (orgId: string, requestId: string): RequestEvent[] => {
  return events
    .filter((e) => e.organizationId === orgId && e.requestId === requestId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};
