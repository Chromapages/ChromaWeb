"use client";

import React, {useState} from "react";

import type {Estimate, PortalSession, RequestStatus} from "@/lib/portal/types";
import {PortalButton} from "./PortalButton";
import {PortalCard} from "./PortalCard";

export interface EstimateCardProps {
  estimates: Estimate[];
  currentVersion?: number;
  status: RequestStatus;
  session: PortalSession;
  onApprove: (version: number, notes?: string) => Promise<void>;
  onReject: (version: number, reason: string) => Promise<void>;
}

export const EstimateCard: React.FC<EstimateCardProps> = ({
  estimates,
  currentVersion,
  status,
  session,
  onApprove,
  onReject,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (estimates.length === 0) {
    return null;
  }

  const activeEstimate = estimates.find((e) => e.version === currentVersion) || estimates[0];
  if (!activeEstimate) {
    return null;
  }

  const isClientApprover = session.role === "client_owner" || session.isStudioAdmin;
  const isAwaitingApproval = status === "awaiting_approval";

  const handleApprove = async () => {
    setIsProcessing(true);
    setErrorMsg("");
    try {
      await onApprove(activeEstimate.version);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to accept estimate";
      setErrorMsg(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReason.trim()) {
      return;
    }
    setIsProcessing(true);
    setErrorMsg("");
    try {
      await onReject(activeEstimate.version, rejectReason.trim());
      setRejectMode(false);
      setRejectReason("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to decline estimate";
      setErrorMsg(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PortalCard
      badge={
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo/10 text-indigo border border-indigo/20">
          v{activeEstimate.version}
        </span>
      }
      id="estimate-card"
      subtitle={`Created on ${new Date(activeEstimate.createdAt).toLocaleDateString()} by ${activeEstimate.createdByName}`}
      title="Scope & Estimate"
    >
      <div className="space-y-4">
        {activeEstimate.invalidatedAt ? (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-medium">
            ⚠️ This estimate has been superseded by a newer version.
          </div>
        ) : null}

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-1">
            Scope Summary
          </h4>
          <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
            {activeEstimate.scopeSummary}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-ink/10">
          {activeEstimate.amountUsd !== undefined ? (
            <div className="p-3 rounded-lg bg-ink/5">
              <span className="block text-[11px] text-ink/60 uppercase font-bold tracking-wider">
                Investment
              </span>
              <span className="text-lg font-bold font-display text-indigo">
                ${activeEstimate.amountUsd.toLocaleString()} USD
              </span>
            </div>
          ) : null}

          {activeEstimate.estimatedHours !== undefined ? (
            <div className="p-3 rounded-lg bg-ink/5">
              <span className="block text-[11px] text-ink/60 uppercase font-bold tracking-wider">
                Estimated Delivery
              </span>
              <span className="text-lg font-bold font-display text-ink">
                ~{activeEstimate.estimatedHours} hrs
              </span>
            </div>
          ) : null}

          <div className="p-3 rounded-lg bg-ink/5 col-span-2 sm:col-span-1">
            <span className="block text-[11px] text-ink/60 uppercase font-bold tracking-wider">
              Status
            </span>
            <span className="text-sm font-semibold capitalize text-ink">
              {status === "scheduled" || status === "in_progress" || status === "ready_for_review" || status === "completed"
                ? "Accepted"
                : isAwaitingApproval
                  ? "Pending Approval"
                  : "Under Review"}
            </span>
          </div>
        </div>

        {activeEstimate.notes ? (
          <div className="text-xs text-ink/75 bg-ink/[0.02] p-3 rounded-lg border border-ink/10">
            <span className="font-semibold block text-ink mb-0.5">Notes:</span>
            {activeEstimate.notes}
          </div>
        ) : null}

        {errorMsg ? (
          <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
        ) : null}

        {/* Approval Actions for Client Approver */}
        {isAwaitingApproval && !activeEstimate.invalidatedAt ? (
          <div className="pt-4 border-t border-ink/10">
            {isClientApprover ? (
              !rejectMode ? (
                <div className="flex flex-wrap items-center gap-3">
                  <PortalButton
                    isLoading={isProcessing}
                    onClick={handleApprove}
                    size="sm"
                    variant="primary"
                  >
                    Accept Estimate & Schedule Work
                  </PortalButton>
                  <PortalButton
                    disabled={isProcessing}
                    onClick={() => setRejectMode(true)}
                    size="sm"
                    variant="outline"
                  >
                    Decline or Request Revisions
                  </PortalButton>
                  <span className="text-[11px] text-ink/60 italic w-full sm:w-auto">
                    Acceptance authorizes scheduling. Any later revision invalidates earlier approval.
                  </span>
                </div>
              ) : (
                <form className="space-y-3 bg-red-50/50 p-4 rounded-xl border border-red-200" onSubmit={handleRejectSubmit}>
                  <label className="block text-xs font-semibold text-red-950" htmlFor="decline-reason">
                    Reason for declining / requested scope adjustments:
                  </label>
                  <textarea
                    className="w-full p-2.5 text-xs rounded-lg border border-red-300 bg-white text-ink focus:border-red-600 focus:ring-1 focus:ring-red-600 focus-visible:outline-hidden"
                    id="decline-reason"
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Provide details for staff triage..."
                    required
                    rows={2}
                    value={rejectReason}
                  />
                  <div className="flex items-center gap-2">
                    <PortalButton
                      disabled={!rejectReason.trim() || isProcessing}
                      isLoading={isProcessing}
                      size="sm"
                      type="submit"
                      variant="danger"
                    >
                      Confirm Decline
                    </PortalButton>
                    <PortalButton
                      disabled={isProcessing}
                      onClick={() => setRejectMode(false)}
                      size="sm"
                      variant="ghost"
                    >
                      Cancel
                    </PortalButton>
                  </div>
                </form>
              )
            ) : (
              <p className="text-xs text-ink/60 italic">
                Awaiting approval from a client owner or designated approver.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </PortalCard>
  );
};
