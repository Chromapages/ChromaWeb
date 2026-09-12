"use client";

import React, {useState} from "react";

import type {Deliverable, PortalSession, RequestStatus} from "@/lib/portal/types";
import {PortalButton} from "./PortalButton";
import {PortalCard} from "./PortalCard";

export interface DeliverableCardProps {
  deliverable?: Deliverable;
  status: RequestStatus;
  session: PortalSession;
  onApprove: () => Promise<void>;
  onRequestRevision: (notes: string) => Promise<void>;
}

export const DeliverableCard: React.FC<DeliverableCardProps> = ({
  deliverable,
  status,
  session,
  onApprove,
  onRequestRevision,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [revisionMode, setRevisionMode] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!deliverable) {
    return null;
  }

  const isClientApprover = session.role === "client_owner" || session.isStudioAdmin;
  const isReadyForReview = status === "ready_for_review";

  const handleApprove = async () => {
    setIsProcessing(true);
    setErrorMsg("");
    try {
      await onApprove();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to approve deliverable";
      setErrorMsg(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRevisionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNotes.trim()) {
      return;
    }
    setIsProcessing(true);
    setErrorMsg("");
    try {
      await onRequestRevision(revisionNotes.trim());
      setRevisionMode(false);
      setRevisionNotes("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to request revisions";
      setErrorMsg(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PortalCard
      badge={
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
          Preview v{deliverable.version}
        </span>
      }
      id="deliverable-card"
      subtitle={`Delivered by ${deliverable.publishedByName} on ${new Date(deliverable.publishedAt).toLocaleDateString()}`}
      title="Work Deliverable & Preview"
    >
      <div className="space-y-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1">
            Staging Preview URL
          </span>
          <a
            aria-label={`Open staging preview: ${deliverable.previewUrl}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-indigo underline break-all focus-visible:outline-2 focus-visible:outline-teal"
            href={deliverable.previewUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{deliverable.previewUrl}</span>
            <span aria-hidden="true">&nearr;</span>
          </a>
        </div>

        {deliverable.notes ? (
          <div className="text-xs text-ink/85 bg-ink/[0.02] p-3 rounded-lg border border-ink/10">
            <span className="font-semibold block text-ink mb-0.5">Delivery Notes:</span>
            {deliverable.notes}
          </div>
        ) : null}

        {errorMsg ? (
          <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
        ) : null}

        {isReadyForReview ? (
          <div className="pt-4 border-t border-ink/10">
            {isClientApprover ? (
              !revisionMode ? (
                <div className="flex flex-wrap items-center gap-3">
                  <PortalButton
                    isLoading={isProcessing}
                    onClick={handleApprove}
                    size="sm"
                    variant="primary"
                  >
                    Approve Deliverable & Complete
                  </PortalButton>
                  <PortalButton
                    disabled={isProcessing}
                    onClick={() => setRevisionMode(true)}
                    size="sm"
                    variant="outline"
                  >
                    Request Revisions
                  </PortalButton>
                  <span className="text-[11px] text-ink/60 italic w-full sm:w-auto">
                    Approval confirms deliverables meet requirements.
                  </span>
                </div>
              ) : (
                <form className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200" onSubmit={handleRevisionSubmit}>
                  <label className="block text-xs font-semibold text-amber-950" htmlFor="revision-notes">
                    Describe required adjustments or fixes:
                  </label>
                  <textarea
                    className="w-full p-2.5 text-xs rounded-lg border border-amber-300 bg-white text-ink focus:border-indigo focus:ring-1 focus:ring-indigo focus-visible:outline-hidden"
                    id="revision-notes"
                    onChange={(e) => setRevisionNotes(e.target.value)}
                    placeholder="Provide specific feedback..."
                    required
                    rows={2}
                    value={revisionNotes}
                  />
                  <div className="flex items-center gap-2">
                    <PortalButton
                      disabled={!revisionNotes.trim() || isProcessing}
                      isLoading={isProcessing}
                      size="sm"
                      type="submit"
                      variant="primary"
                    >
                      Submit Revision Request
                    </PortalButton>
                    <PortalButton
                      disabled={isProcessing}
                      onClick={() => setRevisionMode(false)}
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
                Awaiting sign-off from a client owner or designated approver.
              </p>
            )}
          </div>
        ) : status === "completed" ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-900 font-semibold flex items-center gap-2">
            <span>✓</span>
            <span>Deliverable accepted and request marked completed.</span>
          </div>
        ) : null}
      </div>
    </PortalCard>
  );
};
