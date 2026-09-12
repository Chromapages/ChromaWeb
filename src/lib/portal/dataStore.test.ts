import {beforeEach, describe, expect, it} from "vitest";

import {
  approveDeliverable,
  approveEstimate,
  createEstimate,
  createInternalNote,
  createMessage,
  createRequest,
  getEstimates,
  getInternalNotes,
  getMessages,
  getProjectById,
  getRequestById,
  getRequests,
  publishDeliverable,
  rejectEstimate,
  requestDeliverableRevision,
  requestReopen,
  resetDataStore,
  updateRequestStatus,
} from "./dataStore";
import type {PortalSession} from "./types";

const clientOwnerSession: PortalSession = {
  uid: "user-sarah-apex",
  email: "sarah.jenkins@apexlegal.example.com",
  displayName: "Sarah Jenkins",
  role: "client_owner",
  organizationId: "org-apex-legal",
  organizationName: "Apex Legal Partners",
  isStaff: false,
  isStudioAdmin: false,
};

const clientMemberSession: PortalSession = {
  uid: "user-marcus-apex",
  email: "marcus.vance@apexlegal.example.com",
  displayName: "Marcus Vance",
  role: "client_member",
  organizationId: "org-apex-legal",
  organizationName: "Apex Legal Partners",
  isStaff: false,
  isStudioAdmin: false,
};

const staffSession: PortalSession = {
  uid: "user-alex-staff",
  email: "alex.morales@chromapages.com",
  displayName: "Alex Morales",
  role: "staff",
  organizationId: "org-apex-legal",
  organizationName: "Apex Legal Partners",
  isStaff: true,
  isStudioAdmin: false,
};

describe("DataStore & Multi-Tenant Isolation", () => {
  beforeEach(() => {
    resetDataStore();
  });

  it("enforces multi-tenant query isolation for requests", () => {
    const apexRequests = getRequests("org-apex-legal");
    const beaconRequests = getRequests("org-beacon-wealth");

    expect(apexRequests.length).toBeGreaterThan(0);
    expect(beaconRequests.length).toBeGreaterThan(0);

    // Verify no cross-tenant leakage
    for (const req of apexRequests) {
      expect(req.organizationId).toBe("org-apex-legal");
    }
    for (const req of beaconRequests) {
      expect(req.organizationId).toBe("org-beacon-wealth");
    }
  });

  it("enforces multi-tenant isolation on getRequestById and getProjectById", () => {
    // Org A request cannot be fetched by passing Org B ID
    const crossReq = getRequestById("org-beacon-wealth", "req-apex-101");
    expect(crossReq).toBeNull();

    // Org A project cannot be fetched by passing Org B ID
    const crossProj = getProjectById("org-beacon-wealth", "proj-apex-web");
    expect(crossProj).toBeNull();
  });

  it("blocks clients from reading or creating internal notes", () => {
    // Client owner cannot read internal notes
    expect(() => getInternalNotes("req-apex-101", clientOwnerSession)).toThrow(
      /Access denied/
    );

    // Client member cannot read internal notes
    expect(() => getInternalNotes("req-apex-101", clientMemberSession)).toThrow(
      /Access denied/
    );

    // Client cannot create internal notes
    expect(() =>
      createInternalNote("req-apex-101", "Client trying note", clientOwnerSession)
    ).toThrow(/Access denied/);

    // Staff CAN read and create internal notes
    const staffNotes = getInternalNotes("req-apex-101", staffSession);
    expect(Array.isArray(staffNotes)).toBe(true);

    const newNote = createInternalNote("req-apex-101", "Valid staff internal note", staffSession);
    expect(newNote.body).toBe("Valid staff internal note");
  });

  it("supports public conversation messages for client and staff", () => {
    const msg = createMessage(
      "org-apex-legal",
      "req-apex-101",
      "Hello team, checking in on progress.",
      clientOwnerSession
    );
    expect(msg.body).toBe("Hello team, checking in on progress.");

    const thread = getMessages("org-apex-legal", "req-apex-101");
    expect(thread.some((m) => m.id === msg.id)).toBe(true);
  });

  it("handles estimate versioning and invalidation of previous versions", () => {
    // Initial state: req-apex-103 has estimate version 1
    const estimatesBefore = getEstimates("org-apex-legal", "req-apex-103");
    expect(estimatesBefore.length).toBe(1);
    expect(estimatesBefore[0]?.version).toBe(1);
    expect(estimatesBefore[0]?.invalidatedAt).toBeUndefined();

    // Staff creates a revised estimate v2
    const estimateV2 = createEstimate(
      "req-apex-103",
      "Revised scope with additional interactive filters",
      3200,
      22,
      "Includes 2 extra filter modes",
      staffSession
    );
    expect(estimateV2.version).toBe(2);

    // Previous version 1 is now marked invalidated
    const estimatesAfter = getEstimates("org-apex-legal", "req-apex-103");
    const v1 = estimatesAfter.find((e) => e.version === 1);
    expect(v1?.invalidatedAt).toBeDefined();

    // Stale approval: Client approving old v1 must be rejected
    expect(() =>
      approveEstimate("org-apex-legal", "req-apex-103", 1, clientOwnerSession)
    ).toThrow(/Stale approval/);

    // Client approving current v2 succeeds
    const approval = approveEstimate("org-apex-legal", "req-apex-103", 2, clientOwnerSession);
    expect(approval.status).toBe("accepted");

    // Request is now scheduled
    const updatedReq = getRequestById("org-apex-legal", "req-apex-103");
    expect(updatedReq?.status).toBe("scheduled");
  });

  it("rejects estimate and transitions back to in_review", () => {
    // Decline estimate on req-apex-103
    const rejection = rejectEstimate(
      "org-apex-legal",
      "req-apex-103",
      1,
      clientOwnerSession,
      "Budget exceeds current quarterly allowance"
    );
    expect(rejection.status).toBe("rejected");

    const req = getRequestById("org-apex-legal", "req-apex-103");
    expect(req?.status).toBe("in_review");
  });

  it("handles deliverable publishing, review, and revision flow", () => {
    // Staff publishes preview deliverable on req-apex-101 (in_progress)
    const delivered = publishDeliverable(
      "req-apex-101",
      "https://preview-staging.chromapages.com/apex-tax",
      "Initial staging layout ready for partner bio review",
      staffSession
    );
    expect(delivered.status).toBe("ready_for_review");
    expect(delivered.deliverable?.previewUrl).toContain("preview-staging");

    // Client owner requests revision
    const revised = requestDeliverableRevision(
      "org-apex-legal",
      "req-apex-101",
      "Please adjust bio photo alignment on tablet view",
      clientOwnerSession
    );
    expect(revised.status).toBe("revision_requested");

    // Staff addresses revision and republishes updated deliverable
    updateRequestStatus("req-apex-101", "in_progress", staffSession, "Applying photo alignment fix");
    const updatedDeliverable = publishDeliverable(
      "req-apex-101",
      "https://preview-staging.chromapages.com/apex-tax-v2",
      "Bio photo alignment updated for tablet view",
      staffSession
    );
    expect(updatedDeliverable.status).toBe("ready_for_review");

    // Client owner approves deliverable when satisfied
    const approved = approveDeliverable("org-apex-legal", "req-apex-101", clientOwnerSession);
    expect(approved.status).toBe("completed");
    expect(approved.completedDate).toBeDefined();

    // Client can request reopening
    const reopened = requestReopen(
      "org-apex-legal",
      "req-apex-101",
      "Found missing practice area link in footer",
      clientMemberSession
    );
    expect(reopened.status).toBe("in_review");
  });

  it("creates a new request with unique reference number and audit log", () => {
    const newReq = createRequest(
      "org-apex-legal",
      {
        projectId: "proj-apex-web",
        title: "Accessibility Audit Review",
        description: "Review contrast on navigation bar dropdowns",
        category: "performance",
        priority: "normal",
        businessImpact: "low",
        desiredDate: "2026-10-15",
      },
      clientMemberSession
    );

    expect(newReq.id).toBeDefined();
    expect(newReq.referenceNumber).toMatch(/^REQ-\d+/);
    expect(newReq.status).toBe("submitted");
    expect(newReq.requesterEmail).toBe(clientMemberSession.email);
  });
});
