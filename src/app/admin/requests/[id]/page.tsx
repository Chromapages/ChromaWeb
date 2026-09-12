"use client";

import Link from "next/link";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";

import {InternalNotesThread} from "@/components/portal/InternalNotesThread";
import {
  CategoryBadge,
  CoverageBadge,
  PriorityBadge,
  StatusBadge,
} from "@/components/portal/PortalBadge";
import {PortalButton} from "@/components/portal/PortalButton";
import {PortalCard} from "@/components/portal/PortalCard";
import {PortalModal} from "@/components/portal/PortalModal";
import {PublicConversation} from "@/components/portal/PublicConversation";
import {RequestTimeline} from "@/components/portal/RequestTimeline";
import type {
  CoverageState,
  Estimate,
  InternalNote,
  PortalRequest,
  PortalSession,
  RequestEvent,
  RequestMessage,
  RequestPriority,
  RequestStatus,
} from "@/lib/portal/types";
import {ALLOWED_TRANSITIONS, STATUS_LABELS} from "@/lib/portal/workflow";

export default function StaffRequestTriagePage() {
  const params = useParams<{id: string}>();
  const requestId = params.id;

  const [portalRequest, setPortalRequest] = useState<PortalRequest | null>(null);
  const [messages, setMessages] = useState<RequestMessage[]>([]);
  const [internalNotes, setInternalNotes] = useState<InternalNote[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [events, setEvents] = useState<RequestEvent[]>([]);

  // Triage editing state
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [priority, setPriority] = useState<RequestPriority>("normal");
  const [coverage, setCoverage] = useState<CoverageState>("unreviewed");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [isSavingTriage, setIsSavingTriage] = useState(false);
  const [triageSaved, setTriageSaved] = useState(false);

  // Estimate creation modal
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [estimateScope, setEstimateScope] = useState("");
  const [estimateAmount, setEstimateAmount] = useState("");
  const [estimateHours, setEstimateHours] = useState("");
  const [estimateNotes, setEstimateNotes] = useState("");
  const [isSubmittingEstimate, setIsSubmittingEstimate] = useState(false);

  // Deliverable publishing modal
  const [isDeliverableModalOpen, setIsDeliverableModalOpen] = useState(false);
  const [deliverableUrl, setDeliverableUrl] = useState("");
  const [deliverableNotes, setDeliverableNotes] = useState("");
  const [isPublishingDeliverable, setIsPublishingDeliverable] = useState(false);

  // Status transition modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<RequestStatus>("in_progress");
  const [statusReason, setStatusReason] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const staffSession: PortalSession = {
    uid: "user-alex-staff",
    email: "alex.morales@chromapages.com",
    displayName: "Alex Morales",
    role: "staff",
    organizationId: portalRequest?.organizationId || "org-apex-legal",
    organizationName: "Studio Admin",
    isStaff: true,
    isStudioAdmin: true,
  };

  const fetchRequestDetails = async () => {
    try {
      const res = await fetch(`/api/portal/requests/${requestId}`);
      const data = (await res.json()) as {
        request?: PortalRequest;
        messages?: RequestMessage[];
        internalNotes?: InternalNote[];
        estimates?: Estimate[];
        events?: RequestEvent[];
        error?: string;
      };

      if (!res.ok || !data.request) {
        setErrorMsg(data.error || "Request not found.");
        return;
      }

      setPortalRequest(data.request);
      setMessages(data.messages || []);
      setInternalNotes(data.internalNotes || []);
      setEstimates(data.estimates || []);
      setEvents(data.events || []);

      // Populate triage fields
      setAssigneeId(data.request.assigneeId || "");
      setPriority(data.request.priority);
      setCoverage(data.request.coverage);
      setScheduledDate(data.request.scheduledDate || "");
    } catch {
      setErrorMsg("Failed to load staff request data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const loadDetails = async () => {
      try {
        const res = await fetch(`/api/portal/requests/${requestId}`);
        const data = (await res.json()) as {
          request?: PortalRequest;
          messages?: RequestMessage[];
          internalNotes?: InternalNote[];
          estimates?: Estimate[];
          events?: RequestEvent[];
          error?: string;
        };

        if (ignore) return;
        if (!res.ok || !data.request) {
          setErrorMsg(data.error || "Request not found.");
          return;
        }

        setPortalRequest(data.request);
        setMessages(data.messages || []);
        setInternalNotes(data.internalNotes || []);
        setEstimates(data.estimates || []);
        setEvents(data.events || []);

        setAssigneeId(data.request.assigneeId || "");
        setPriority(data.request.priority);
        setCoverage(data.request.coverage);
        setScheduledDate(data.request.scheduledDate || "");
      } catch {
        if (!ignore) setErrorMsg("Failed to load staff request data.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    void loadDetails();
    return () => {
      ignore = true;
    };
  }, [requestId]);

  const handleSaveTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingTriage(true);
    setTriageSaved(false);

    try {
      const res = await fetch(`/api/portal/requests/${requestId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "update_triage",
          assigneeId,
          priority,
          coverage,
          scheduledDate: scheduledDate || undefined,
        }),
      });

      const data = (await res.json()) as {success?: boolean; error?: string};
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to update triage.");
        return;
      }

      setTriageSaved(true);
      setTimeout(() => setTriageSaved(false), 2500);
      await fetchRequestDetails();
    } catch {
      alert("Network error updating triage.");
    } finally {
      setIsSavingTriage(false);
    }
  };

  const handleCreateEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimateScope.trim() || isSubmittingEstimate) return;

    setIsSubmittingEstimate(true);
    try {
      const res = await fetch(`/api/portal/requests/${requestId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "create_estimate",
          scopeSummary: estimateScope.trim(),
          amountUsd: estimateAmount ? parseFloat(estimateAmount) : undefined,
          estimatedHours: estimateHours ? parseFloat(estimateHours) : undefined,
          notes: estimateNotes.trim() || undefined,
        }),
      });

      const data = (await res.json()) as {success?: boolean; error?: string};
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to create estimate");
        return;
      }

      setIsEstimateModalOpen(false);
      setEstimateScope("");
      setEstimateAmount("");
      setEstimateHours("");
      setEstimateNotes("");
      await fetchRequestDetails();
    } catch {
      alert("Network error creating estimate.");
    } finally {
      setIsSubmittingEstimate(false);
    }
  };

  const handlePublishDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliverableUrl.trim() || isPublishingDeliverable) return;

    setIsPublishingDeliverable(true);
    try {
      const res = await fetch(`/api/portal/requests/${requestId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "publish_deliverable",
          previewUrl: deliverableUrl.trim(),
          notes: deliverableNotes.trim() || undefined,
        }),
      });

      const data = (await res.json()) as {success?: boolean; error?: string};
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to publish deliverable");
        return;
      }

      setIsDeliverableModalOpen(false);
      setDeliverableUrl("");
      setDeliverableNotes("");
      await fetchRequestDetails();
    } catch {
      alert("Network error publishing deliverable.");
    } finally {
      setIsPublishingDeliverable(false);
    }
  };

  const handleStatusTransition = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/portal/requests/${requestId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "update_status",
          targetStatus,
          reason: statusReason.trim() || undefined,
        }),
      });

      const data = (await res.json()) as {success?: boolean; error?: string};
      if (!res.ok || !data.success) {
        alert(data.error || "Transition rejected");
        return;
      }

      setIsStatusModalOpen(false);
      setStatusReason("");
      await fetchRequestDetails();
    } catch {
      alert("Network error updating status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendMessage = async (body: string) => {
    const res = await fetch(`/api/portal/requests/${requestId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({action: "send_message", body}),
    });
    const data = (await res.json()) as {success?: boolean; error?: string};
    if (!res.ok || !data.success) throw new Error(data.error || "Failed to post message");
    await fetchRequestDetails();
  };

  const handleAddInternalNote = async (body: string) => {
    const res = await fetch(`/api/portal/requests/${requestId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({action: "add_internal_note", body}),
    });
    const data = (await res.json()) as {success?: boolean; error?: string};
    if (!res.ok || !data.success) throw new Error(data.error || "Failed to save internal note");
    await fetchRequestDetails();
  };

  if (isLoading) {
    return <div className="py-16 text-center text-xs text-ink/50">Loading request triage data...</div>;
  }

  if (errorMsg || !portalRequest) {
    return (
      <div className="py-16 text-center space-y-3">
        <p className="text-sm font-bold text-red-600">{errorMsg || "Request not found."}</p>
        <Link className="text-xs font-semibold text-indigo hover:underline" href="/admin">
          &larr; Return to staff queue
        </Link>
      </div>
    );
  }

  const allowedNextStatuses = ALLOWED_TRANSITIONS[portalRequest.status] || [];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between text-xs">
        <Link
          className="text-indigo hover:underline font-semibold focus-visible:outline-1 focus-visible:outline-indigo"
          href="/admin"
        >
          &larr; Back to Delivery Queue
        </Link>
        <span className="font-mono font-bold text-ink/70">
          Ref: {portalRequest.referenceNumber}
        </span>
      </div>

      {/* Staff Header & Quick Actions */}
      <header className="bg-white border border-indigo/20 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-extrabold text-indigo bg-indigo/10 px-2.5 py-1 rounded border border-indigo/20">
              {portalRequest.referenceNumber}
            </span>
            <StatusBadge status={portalRequest.status} />
            <CategoryBadge category={portalRequest.category} />
            <PriorityBadge priority={portalRequest.priority} />
            <CoverageBadge coverage={portalRequest.coverage} />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {allowedNextStatuses.length > 0 ? (
              <PortalButton
                onClick={() => {
                  setTargetStatus(allowedNextStatuses[0] as RequestStatus);
                  setIsStatusModalOpen(true);
                }}
                size="sm"
                variant="primary"
              >
                Change Status &rarr;
              </PortalButton>
            ) : null}

            <PortalButton
              onClick={() => setIsEstimateModalOpen(true)}
              size="sm"
              variant="outline"
            >
              + Create Estimate
            </PortalButton>

            <PortalButton
              onClick={() => setIsDeliverableModalOpen(true)}
              size="sm"
              variant="secondary"
            >
              Deliver Preview
            </PortalButton>
          </div>
        </div>

        <h1 className="font-display text-xl sm:text-2xl font-extrabold text-ink">
          {portalRequest.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-ink/60 pt-3 border-t border-ink/10">
          <span>Client: <strong className="text-ink">{portalRequest.projectName}</strong></span>
          <span>Requester: <strong>{portalRequest.requesterName}</strong> ({portalRequest.requesterEmail})</span>
          <span>Submitted: {new Date(portalRequest.createdAt).toLocaleDateString()}</span>
          {portalRequest.desiredDate ? (
            <span>Requested Date: <strong>{portalRequest.desiredDate}</strong></span>
          ) : null}
          {portalRequest.scheduledDate ? (
            <span>Scheduled: <strong className="text-teal">{portalRequest.scheduledDate}</strong></span>
          ) : null}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scope, Public Chat, Internal Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Internal Notes: STAFF ONLY */}
          <InternalNotesThread
            notes={internalNotes}
            onAddNote={handleAddInternalNote}
            session={staffSession}
          />

          {/* Request Details */}
          <PortalCard title="Client Submission Details">
            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-ink/60 uppercase block mb-1">Description:</span>
                <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
                  {portalRequest.description}
                </p>
              </div>

              {portalRequest.affectedUrl ? (
                <div>
                  <span className="font-semibold text-ink/60 uppercase block mb-1">Target URL:</span>
                  <a
                    className="text-indigo hover:underline break-all"
                    href={portalRequest.affectedUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {portalRequest.affectedUrl}
                  </a>
                </div>
              ) : null}

              {portalRequest.bugDetails ? (
                <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 space-y-2">
                  <h4 className="font-bold text-red-950 flex items-center gap-1">
                    <span>🐞</span>
                    <span>Reported Bug Details</span>
                  </h4>
                  <p><strong>Expected:</strong> {portalRequest.bugDetails.expectedBehavior}</p>
                  <p><strong>Actual:</strong> {portalRequest.bugDetails.actualBehavior}</p>
                  <p className="whitespace-pre-wrap"><strong>Steps:</strong> {portalRequest.bugDetails.reproductionSteps}</p>
                  {portalRequest.bugDetails.deviceBrowser ? (
                    <p><strong>Device/Browser:</strong> {portalRequest.bugDetails.deviceBrowser}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </PortalCard>

          {/* Estimates History */}
          {estimates.length > 0 ? (
            <PortalCard title={`Estimates History (${estimates.length})`}>
              <div className="space-y-3">
                {estimates.map((est) => (
                  <div
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      est.invalidatedAt
                        ? "border-ink/10 bg-ink/[0.02] opacity-75"
                        : "border-indigo/20 bg-indigo/[0.02]"
                    }`}
                    key={est.id}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink">Version {est.version}</span>
                      {est.invalidatedAt ? (
                        <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-semibold text-[10px]">
                          Superseded
                        </span>
                      ) : (
                        <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-semibold text-[10px]">
                          Current Version
                        </span>
                      )}
                    </div>
                    <p className="text-ink/85">{est.scopeSummary}</p>
                    <div className="flex gap-4 pt-1 font-semibold text-ink">
                      {est.amountUsd !== undefined ? <span>Investment: ${est.amountUsd} USD</span> : null}
                      {est.estimatedHours !== undefined ? <span>Hours: ~{est.estimatedHours} hrs</span> : null}
                    </div>
                  </div>
                ))}
              </div>
            </PortalCard>
          ) : null}

          {/* Public Client Discussion */}
          <PortalCard subtitle="Messages exchanged with client contacts" title="Client Conversation Thread">
            <PublicConversation
              messages={messages}
              onSendMessage={handleSendMessage}
              session={staffSession}
            />
          </PortalCard>
        </div>

        {/* Right Column: Triage Controls & Timeline */}
        <div className="space-y-6">
          {/* Triage Editor Card */}
          <PortalCard title="Staff Triage Controls">
            <form className="space-y-4 text-xs" onSubmit={handleSaveTriage}>
              <div>
                <label className="block font-semibold text-ink mb-1" htmlFor="assignee-select">
                  Staff Assignee
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
                  id="assignee-select"
                  onChange={(e) => setAssigneeId(e.target.value)}
                  value={assigneeId}
                >
                  <option value="">-- Unassigned --</option>
                  <option value="user-alex-staff">Alex Morales (Senior Dev)</option>
                  <option value="user-devin-admin">Devin Cross (Studio Lead)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1" htmlFor="priority-select">
                  Priority
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
                  id="priority-select"
                  onChange={(e) => setPriority(e.target.value as RequestPriority)}
                  value={priority}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1" htmlFor="coverage-select">
                  Commercial Coverage
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
                  id="coverage-select"
                  onChange={(e) => setCoverage(e.target.value as CoverageState)}
                  value={coverage}
                >
                  <option value="unreviewed">Unreviewed</option>
                  <option value="included">Included in Scope/Retainer</option>
                  <option value="additional_estimate">Additional Estimate Required</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1" htmlFor="scheduled-date">
                  Scheduled Delivery Date
                </label>
                <input
                  className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
                  id="scheduled-date"
                  onChange={(e) => setScheduledDate(e.target.value)}
                  type="date"
                  value={scheduledDate}
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-ink/10">
                {triageSaved ? (
                  <span className="text-xs font-semibold text-green-700">✓ Saved</span>
                ) : <span />}
                <PortalButton
                  disabled={isSavingTriage}
                  isLoading={isSavingTriage}
                  size="sm"
                  type="submit"
                  variant="primary"
                >
                  Save Triage
                </PortalButton>
              </div>
            </form>
          </PortalCard>

          {/* Timeline */}
          <PortalCard subtitle="Immutable transition and approval trail" title="Event Audit Trail">
            <RequestTimeline events={events} />
          </PortalCard>
        </div>
      </div>

      {/* Create Estimate Modal */}
      <PortalModal
        description="Creating an estimate transitions the request to Awaiting Approval and automatically invalidates prior estimate versions."
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
        title="Create Versioned Scope Estimate"
      >
        <form className="space-y-4 text-xs" onSubmit={handleCreateEstimate}>
          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="estimate-scope">
              Scope Summary <span className="text-red-600">*</span>
            </label>
            <textarea
              className="w-full p-2.5 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="estimate-scope"
              onChange={(e) => setEstimateScope(e.target.value)}
              placeholder="Detail technical approach, components to modify, and deliverables..."
              required
              rows={3}
              value={estimateScope}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-ink mb-1" htmlFor="estimate-amount">
                Amount (USD)
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
                id="estimate-amount"
                min={0}
                onChange={(e) => setEstimateAmount(e.target.value)}
                placeholder="2400"
                step="50"
                type="number"
                value={estimateAmount}
              />
            </div>
            <div>
              <label className="block font-semibold text-ink mb-1" htmlFor="estimate-hours">
                Estimated Hours
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
                id="estimate-hours"
                min={0}
                onChange={(e) => setEstimateHours(e.target.value)}
                placeholder="16"
                step="0.5"
                type="number"
                value={estimateHours}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="estimate-notes">
              Delivery / Technical Notes
            </label>
            <textarea
              className="w-full p-2.5 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="estimate-notes"
              onChange={(e) => setEstimateNotes(e.target.value)}
              placeholder="Assumptions, dependencies, staging deployment timeframe..."
              rows={2}
              value={estimateNotes}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-ink/10">
            <PortalButton
              disabled={isSubmittingEstimate}
              onClick={() => setIsEstimateModalOpen(false)}
              size="sm"
              variant="ghost"
            >
              Cancel
            </PortalButton>
            <PortalButton
              disabled={!estimateScope.trim() || isSubmittingEstimate}
              isLoading={isSubmittingEstimate}
              size="sm"
              type="submit"
              variant="primary"
            >
              Issue Estimate &amp; Request Approval
            </PortalButton>
          </div>
        </form>
      </PortalModal>

      {/* Deliverable Modal */}
      <PortalModal
        description="Publishing a staging preview transitions the request to Ready for Review for client approval or revision feedback."
        isOpen={isDeliverableModalOpen}
        onClose={() => setIsDeliverableModalOpen(false)}
        title="Deliver Staging Preview"
      >
        <form className="space-y-4 text-xs" onSubmit={handlePublishDeliverable}>
          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="deliverable-url">
              Staging Preview URL <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="deliverable-url"
              onChange={(e) => setDeliverableUrl(e.target.value)}
              placeholder="https://preview-staging.chromapages.com/client-update"
              required
              type="url"
              value={deliverableUrl}
            />
          </div>

          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="deliverable-notes">
              Release Notes &amp; Verification Guidance
            </label>
            <textarea
              className="w-full p-2.5 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="deliverable-notes"
              onChange={(e) => setDeliverableNotes(e.target.value)}
              placeholder="Instructions on what to review or test on staging..."
              rows={3}
              value={deliverableNotes}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-ink/10">
            <PortalButton
              disabled={isPublishingDeliverable}
              onClick={() => setIsDeliverableModalOpen(false)}
              size="sm"
              variant="ghost"
            >
              Cancel
            </PortalButton>
            <PortalButton
              disabled={!deliverableUrl.trim() || isPublishingDeliverable}
              isLoading={isPublishingDeliverable}
              size="sm"
              type="submit"
              variant="primary"
            >
              Publish Deliverable
            </PortalButton>
          </div>
        </form>
      </PortalModal>

      {/* Status Transition Modal */}
      <PortalModal
        description="Execute an authorized workflow transition with an audit log reason."
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Update Request Status"
      >
        <form className="space-y-4 text-xs" onSubmit={handleStatusTransition}>
          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="target-status">
              Target Status
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="target-status"
              onChange={(e) => setTargetStatus(e.target.value as RequestStatus)}
              value={targetStatus}
            >
              {allowedNextStatuses.map((st) => (
                <option key={st} value={st}>
                  {STATUS_LABELS[st as RequestStatus] || st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="status-reason">
              Transition Reason / Notes
            </label>
            <textarea
              className="w-full p-2.5 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="status-reason"
              onChange={(e) => setStatusReason(e.target.value)}
              placeholder="Explain why this transition is occurring..."
              rows={2}
              value={statusReason}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-ink/10">
            <PortalButton
              disabled={isUpdatingStatus}
              onClick={() => setIsStatusModalOpen(false)}
              size="sm"
              variant="ghost"
            >
              Cancel
            </PortalButton>
            <PortalButton
              disabled={isUpdatingStatus}
              isLoading={isUpdatingStatus}
              size="sm"
              type="submit"
              variant="primary"
            >
              Confirm Status Change
            </PortalButton>
          </div>
        </form>
      </PortalModal>
    </div>
  );
}
