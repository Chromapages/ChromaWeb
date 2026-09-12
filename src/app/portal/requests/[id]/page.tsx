"use client";

import Link from "next/link";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";

import {DeliverableCard} from "@/components/portal/DeliverableCard";
import {EstimateCard} from "@/components/portal/EstimateCard";
import {
  CategoryBadge,
  CoverageBadge,
  ImpactBadge,
  PriorityBadge,
  StatusBadge,
} from "@/components/portal/PortalBadge";
import {PortalButton} from "@/components/portal/PortalButton";
import {PortalCard} from "@/components/portal/PortalCard";
import {PortalModal} from "@/components/portal/PortalModal";
import {PublicConversation} from "@/components/portal/PublicConversation";
import {RequestTimeline} from "@/components/portal/RequestTimeline";
import type {
  Estimate,
  PortalRequest,
  PortalSession,
  RequestEvent,
  RequestMessage,
} from "@/lib/portal/types";

export default function RequestDetailPage() {
  const params = useParams<{id: string}>();
  const requestId = params.id;

  const [portalRequest, setPortalRequest] = useState<PortalRequest | null>(null);
  const [messages, setMessages] = useState<RequestMessage[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [events, setEvents] = useState<RequestEvent[]>([]);
  const session: PortalSession | null = null;

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isReopenModalOpen, setIsReopenModalOpen] = useState(false);
  const [reopenReason, setReopenReason] = useState("");
  const [isReopening, setIsReopening] = useState(false);

  const fetchRequestDetails = async () => {
    try {
      const res = await fetch(`/api/portal/requests/${requestId}`);
      const data = (await res.json()) as {
        request?: PortalRequest;
        messages?: RequestMessage[];
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
      setEstimates(data.estimates || []);
      setEvents(data.events || []);
    } catch {
      setErrorMsg("Failed to load request details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const res = await fetch(`/api/portal/requests/${requestId}`);
        const data = (await res.json()) as {
          request?: PortalRequest;
          messages?: RequestMessage[];
          estimates?: Estimate[];
          events?: RequestEvent[];
          error?: string;
        };

        if (!ignore) {
          if (!res.ok || !data.request) {
            setErrorMsg(data.error || "Request not found.");
          } else {
            setPortalRequest(data.request);
            setMessages(data.messages || []);
            setEstimates(data.estimates || []);
            setEvents(data.events || []);
          }
        }
      } catch {
        if (!ignore) setErrorMsg("Failed to load request details.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    void loadData();
    return () => {
      ignore = true;
    };
  }, [requestId]);

  const handleSendMessage = async (body: string) => {
    const res = await fetch(`/api/portal/requests/${requestId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({action: "send_message", body}),
    });
    const data = (await res.json()) as {success?: boolean; error?: string};
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to post message");
    }
    await fetchRequestDetails();
  };

  const handleApproveEstimate = async (version: number) => {
    const res = await fetch(`/api/portal/requests/${requestId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({action: "approve_estimate", version}),
    });
    const data = (await res.json()) as {success?: boolean; error?: string};
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to accept estimate");
    }
    await fetchRequestDetails();
  };

  const handleRejectEstimate = async (version: number, reason: string) => {
    const res = await fetch(`/api/portal/requests/${requestId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({action: "reject_estimate", version, reason}),
    });
    const data = (await res.json()) as {success?: boolean; error?: string};
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to decline estimate");
    }
    await fetchRequestDetails();
  };

  const handleApproveDeliverable = async () => {
    const res = await fetch(`/api/portal/requests/${requestId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({action: "approve_deliverable"}),
    });
    const data = (await res.json()) as {success?: boolean; error?: string};
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to approve deliverable");
    }
    await fetchRequestDetails();
  };

  const handleRequestRevision = async (notes: string) => {
    const res = await fetch(`/api/portal/requests/${requestId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({action: "request_revision", notes}),
    });
    const data = (await res.json()) as {success?: boolean; error?: string};
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to request revision");
    }
    await fetchRequestDetails();
  };

  const handleReopenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reopenReason.trim() || isReopening) return;

    setIsReopening(true);
    try {
      const res = await fetch(`/api/portal/requests/${requestId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({action: "request_reopen", reason: reopenReason.trim()}),
      });
      const data = (await res.json()) as {success?: boolean; error?: string};
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to reopen request");
      }
      setIsReopenModalOpen(false);
      setReopenReason("");
      await fetchRequestDetails();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Reopening failed";
      alert(msg);
    } finally {
      setIsReopening(false);
    }
  };

  if (isLoading) {
    return <div className="py-16 text-center text-xs text-ink/50">Loading request details...</div>;
  }

  if (errorMsg || !portalRequest) {
    return (
      <div className="py-16 text-center space-y-3">
        <p className="text-sm font-bold text-red-600">{errorMsg || "Request not found."}</p>
        <Link className="text-xs font-semibold text-teal hover:underline" href="/portal/requests">
          &larr; Return to requests
        </Link>
      </div>
    );
  }

  // Fallback mock session for local rendering if needed
  const currentSession: PortalSession = session || {
    uid: portalRequest.requesterId,
    email: portalRequest.requesterEmail,
    displayName: portalRequest.requesterName,
    role: "client_owner",
    organizationId: portalRequest.organizationId,
    organizationName: "Client Organization",
    isStaff: false,
    isStudioAdmin: false,
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs">
        <Link
          className="text-ink/60 hover:text-ink font-semibold focus-visible:outline-1 focus-visible:outline-teal"
          href="/portal/requests"
        >
          &larr; All Requests
        </Link>
        <span className="font-mono font-bold text-ink/70">
          Ref: {portalRequest.referenceNumber}
        </span>
      </div>

      {/* Header Banner */}
      <header className="bg-white border border-ink/15 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-extrabold text-ink bg-ink/5 px-2.5 py-1 rounded border border-ink/15">
              {portalRequest.referenceNumber}
            </span>
            <StatusBadge status={portalRequest.status} />
            <CategoryBadge category={portalRequest.category} />
            <PriorityBadge priority={portalRequest.priority} />
            <CoverageBadge coverage={portalRequest.coverage} />
          </div>

          {portalRequest.status === "completed" ? (
            <PortalButton
              onClick={() => setIsReopenModalOpen(true)}
              size="sm"
              variant="outline"
            >
              Request Reopening &rarr;
            </PortalButton>
          ) : null}
        </div>

        <h1 className="font-display text-xl sm:text-2xl font-extrabold text-ink">
          {portalRequest.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-ink/60 pt-3 border-t border-ink/10">
          <span>Project: <strong className="text-ink">{portalRequest.projectName}</strong></span>
          <span>Submitted by: <strong>{portalRequest.requesterName}</strong></span>
          <span>Date: {new Date(portalRequest.createdAt).toLocaleDateString()}</span>
          {portalRequest.desiredDate ? (
            <span>Desired Date: <strong>{portalRequest.desiredDate}</strong></span>
          ) : null}
          {portalRequest.scheduledDate ? (
            <span>Scheduled Delivery: <strong className="text-teal">{portalRequest.scheduledDate}</strong></span>
          ) : null}
        </div>
      </header>

      {/* Next Action Callout Banner */}
      {portalRequest.status === "awaiting_approval" ? (
        <div className="p-4 rounded-xl border border-orange-300 bg-orange-50 text-xs text-orange-950 flex items-center justify-between gap-4">
          <div>
            <strong className="block font-semibold">Action Required: Estimate Approval</strong>
            <span>Staff has prepared an estimate for your review below. A client approver must accept to schedule implementation.</span>
          </div>
          <a className="font-bold underline text-orange-900 shrink-0" href="#estimate-card">
            Review Estimate &darr;
          </a>
        </div>
      ) : portalRequest.status === "ready_for_review" ? (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-xs text-emerald-950 flex items-center justify-between gap-4">
          <div>
            <strong className="block font-semibold">Action Required: Deliverable Preview Sign-Off</strong>
            <span>Studio staff delivered a staging preview. Please inspect the deliverable and confirm sign-off or request adjustments.</span>
          </div>
          <a className="font-bold underline text-emerald-900 shrink-0" href="#deliverable-card">
            Review Deliverable &darr;
          </a>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scope, Conversation, Estimates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scope & Estimate Card (if any) */}
          <EstimateCard
            currentVersion={portalRequest.currentEstimateVersion}
            estimates={estimates}
            onApprove={handleApproveEstimate}
            onReject={handleRejectEstimate}
            session={currentSession}
            status={portalRequest.status}
          />

          {/* Deliverable Preview Card (if any) */}
          <DeliverableCard
            deliverable={portalRequest.deliverable}
            onApprove={handleApproveDeliverable}
            onRequestRevision={handleRequestRevision}
            session={currentSession}
            status={portalRequest.status}
          />

          {/* Request Overview / Details Card */}
          <PortalCard title="Request Details">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-1">
                  Description
                </h4>
                <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
                  {portalRequest.description}
                </p>
              </div>

              {portalRequest.affectedUrl ? (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-1">
                    Affected URL
                  </h4>
                  <a
                    className="text-xs text-teal hover:underline break-all focus-visible:outline-1 focus-visible:outline-teal"
                    href={portalRequest.affectedUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {portalRequest.affectedUrl}
                  </a>
                </div>
              ) : null}

              {portalRequest.bugDetails ? (
                <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 text-xs space-y-2">
                  <h4 className="font-bold text-red-950 flex items-center gap-1.5">
                    <span>🐞</span>
                    <span>Reproduction Details</span>
                  </h4>
                  <div>
                    <span className="font-semibold text-red-900 block">Expected:</span>
                    <p className="text-red-950/80">{portalRequest.bugDetails.expectedBehavior}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-red-900 block">Actual:</span>
                    <p className="text-red-950/80">{portalRequest.bugDetails.actualBehavior}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-red-900 block">Steps:</span>
                    <p className="text-red-950/80 whitespace-pre-wrap">{portalRequest.bugDetails.reproductionSteps}</p>
                  </div>
                  {portalRequest.bugDetails.deviceBrowser ? (
                    <div>
                      <span className="font-semibold text-red-900 block">Device / Browser:</span>
                      <p className="text-red-950/80">{portalRequest.bugDetails.deviceBrowser}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </PortalCard>

          {/* Public Discussion Thread */}
          <PortalCard subtitle="Messages exchanged between your team and Chromapages studio staff" title="Discussion & Updates">
            <PublicConversation
              messages={messages}
              onSendMessage={handleSendMessage}
              session={currentSession}
            />
          </PortalCard>
        </div>

        {/* Right Column: Metadata, Impact, Timeline */}
        <div className="space-y-6">
          <PortalCard title="Overview & Impact">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-ink/10">
                <span className="text-ink/60">Business Impact:</span>
                <ImpactBadge impact={portalRequest.businessImpact} />
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-ink/10">
                <span className="text-ink/60">Priority:</span>
                <PriorityBadge priority={portalRequest.priority} />
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-ink/10">
                <span className="text-ink/60">Coverage Review:</span>
                <CoverageBadge coverage={portalRequest.coverage} />
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-ink/10">
                <span className="text-ink/60">Assigned Studio Lead:</span>
                <span className="font-semibold text-ink">{portalRequest.assigneeName || "Pending Assignment"}</span>
              </div>
              {portalRequest.closedSummary ? (
                <div className="pt-2">
                  <span className="font-semibold text-ink/70 block mb-1">Completion Summary:</span>
                  <p className="p-2.5 rounded bg-green-50 border border-green-200 text-green-950">
                    {portalRequest.closedSummary}
                  </p>
                </div>
              ) : null}
            </div>
          </PortalCard>

          {/* Timeline */}
          <PortalCard subtitle="Lifecycle log of status transitions and approvals" title="Timeline & History">
            <RequestTimeline events={events} />
          </PortalCard>
        </div>
      </div>

      {/* Reopening Modal */}
      <PortalModal
        description="Completed requests can be reopened if subsequent issues arise or additional scope is needed."
        isOpen={isReopenModalOpen}
        onClose={() => setIsReopenModalOpen(false)}
        title="Request Reopening"
      >
        <form className="space-y-4" onSubmit={handleReopenSubmit}>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1" htmlFor="reopen-reason">
              Reason for Reopening <span className="text-red-600">*</span>
            </label>
            <textarea
              className="w-full p-3 text-xs rounded-lg border border-ink/20 bg-canvas text-ink focus:border-teal focus-visible:outline-hidden"
              id="reopen-reason"
              onChange={(e) => setReopenReason(e.target.value)}
              placeholder="Explain what requires further attention..."
              required
              rows={3}
              value={reopenReason}
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-ink/10">
            <PortalButton
              disabled={isReopening}
              onClick={() => setIsReopenModalOpen(false)}
              size="sm"
              variant="ghost"
            >
              Cancel
            </PortalButton>
            <PortalButton
              disabled={!reopenReason.trim() || isReopening}
              isLoading={isReopening}
              size="sm"
              type="submit"
              variant="primary"
            >
              Confirm Reopening
            </PortalButton>
          </div>
        </form>
      </PortalModal>
    </div>
  );
}
