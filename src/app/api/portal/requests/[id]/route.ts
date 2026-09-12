import {NextResponse} from "next/server";

import {getCurrentSession} from "@/lib/portal/auth";
import {
  approveDeliverable,
  approveEstimate,
  createEstimate,
  createInternalNote,
  createMessage,
  getEstimates,
  getEvents,
  getInternalNotes,
  getMessages,
  getRequestById,
  getRequestByIdForStaff,
  publishDeliverable,
  rejectEstimate,
  requestDeliverableRevision,
  requestReopen,
  updateRequestStatus,
  updateRequestTriage,
} from "@/lib/portal/dataStore";
import type {CoverageState, RequestPriority, RequestStatus} from "@/lib/portal/types";

export const GET = async (
  _request: Request,
  props: {params: Promise<{id: string}>}
): Promise<NextResponse> => {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({error: "Unauthenticated"}, {status: 401});
  }

  const {id} = await props.params;

  let portalRequest = getRequestById(session.organizationId, id);
  if (!portalRequest && (session.isStaff || session.isStudioAdmin)) {
    portalRequest = getRequestByIdForStaff(id);
  }

  if (!portalRequest) {
    return NextResponse.json({error: "Request not found"}, {status: 404});
  }

  const messages = getMessages(portalRequest.organizationId, id);
  const estimates = getEstimates(portalRequest.organizationId, id);
  const events = getEvents(portalRequest.organizationId, id);

  // Internal notes: STRICTLY restricted to staff!
  let internalNotes: unknown[] = [];
  if (session.isStaff || session.isStudioAdmin) {
    internalNotes = getInternalNotes(id, session);
  }

  return NextResponse.json({
    request: portalRequest,
    messages,
    estimates,
    events,
    internalNotes,
  });
};

export const POST = async (
  request: Request,
  props: {params: Promise<{id: string}>}
): Promise<NextResponse> => {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({error: "Unauthenticated"}, {status: 401});
  }

  const {id} = await props.params;

  try {
    const body = (await request.json()) as {
      action: string;
      body?: string;
      version?: number;
      reason?: string;
      notes?: string;
      scopeSummary?: string;
      amountUsd?: number;
      estimatedHours?: number;
      previewUrl?: string;
      targetStatus?: RequestStatus;
      assigneeId?: string;
      priority?: RequestPriority;
      scheduledDate?: string;
      coverage?: CoverageState;
    };

    let portalRequest = getRequestById(session.organizationId, id);
    if (!portalRequest && (session.isStaff || session.isStudioAdmin)) {
      portalRequest = getRequestByIdForStaff(id);
    }

    if (!portalRequest) {
      return NextResponse.json({error: "Request not found"}, {status: 404});
    }

    const orgId = portalRequest.organizationId;

    if (body.action === "send_message") {
      if (!body.body?.trim()) {
        return NextResponse.json({error: "Message body required"}, {status: 400});
      }
      const newMsg = createMessage(orgId, id, body.body.trim(), session);
      return NextResponse.json({success: true, message: newMsg});
    }

    if (body.action === "add_internal_note") {
      if (!body.body?.trim()) {
        return NextResponse.json({error: "Note body required"}, {status: 400});
      }
      const newNote = createInternalNote(id, body.body.trim(), session);
      return NextResponse.json({success: true, note: newNote});
    }

    if (body.action === "approve_estimate") {
      if (body.version === undefined) {
        return NextResponse.json({error: "Estimate version required"}, {status: 400});
      }
      const appr = approveEstimate(orgId, id, body.version, session, body.notes);
      return NextResponse.json({success: true, approval: appr});
    }

    if (body.action === "reject_estimate") {
      if (body.version === undefined || !body.reason?.trim()) {
        return NextResponse.json({error: "Version and reason required"}, {status: 400});
      }
      const rej = rejectEstimate(orgId, id, body.version, session, body.reason.trim());
      return NextResponse.json({success: true, rejection: rej});
    }

    if (body.action === "create_estimate") {
      if (!body.scopeSummary?.trim()) {
        return NextResponse.json({error: "Scope summary is required"}, {status: 400});
      }
      const est = createEstimate(
        id,
        body.scopeSummary.trim(),
        body.amountUsd,
        body.estimatedHours,
        body.notes,
        session
      );
      return NextResponse.json({success: true, estimate: est});
    }

    if (body.action === "publish_deliverable") {
      if (!body.previewUrl?.trim()) {
        return NextResponse.json({error: "Preview URL required"}, {status: 400});
      }
      const updated = publishDeliverable(id, body.previewUrl.trim(), body.notes, session);
      return NextResponse.json({success: true, request: updated});
    }

    if (body.action === "approve_deliverable") {
      const updated = approveDeliverable(orgId, id, session, body.notes);
      return NextResponse.json({success: true, request: updated});
    }

    if (body.action === "request_revision") {
      if (!body.notes?.trim()) {
        return NextResponse.json({error: "Revision notes required"}, {status: 400});
      }
      const updated = requestDeliverableRevision(orgId, id, body.notes.trim(), session);
      return NextResponse.json({success: true, request: updated});
    }

    if (body.action === "request_reopen") {
      if (!body.reason?.trim()) {
        return NextResponse.json({error: "Reopening reason required"}, {status: 400});
      }
      const updated = requestReopen(orgId, id, body.reason.trim(), session);
      return NextResponse.json({success: true, request: updated});
    }

    if (body.action === "update_triage") {
      const updated = updateRequestTriage(
        id,
        {
          assigneeId: body.assigneeId,
          priority: body.priority,
          scheduledDate: body.scheduledDate,
          coverage: body.coverage,
        },
        session
      );
      return NextResponse.json({success: true, request: updated});
    }

    if (body.action === "update_status") {
      if (!body.targetStatus) {
        return NextResponse.json({error: "Target status required"}, {status: 400});
      }
      const updated = updateRequestStatus(id, body.targetStatus, session, body.reason);
      return NextResponse.json({success: true, request: updated});
    }

    return NextResponse.json({error: "Unrecognized action"}, {status: 400});
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Request action failed";
    return NextResponse.json({error: msg}, {status: 500});
  }
};
