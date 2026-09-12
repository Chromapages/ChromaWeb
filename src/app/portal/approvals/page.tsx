"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";

import {CategoryBadge, StatusBadge} from "@/components/portal/PortalBadge";
import type {PortalRequest} from "@/lib/portal/types";

export default function PortalApprovalsPage() {
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/portal/requests");
        const data = (await res.json()) as {requests?: PortalRequest[]};
        if (data.requests) {
          const pending = data.requests.filter(
            (r) => r.status === "awaiting_approval" || r.status === "ready_for_review"
          );
          setRequests(pending);
        }
      } catch {
        // Fallback
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Approvals Queue</h1>
        <p className="text-xs text-ink/65 mt-0.5">
          Review and approve versioned estimates and staging deliverables across your organization.
        </p>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-ink/50">Loading approvals...</div>
      ) : requests.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-ink/20 rounded-xl bg-ink/[0.01]">
          <span aria-hidden="true" className="text-3xl block mb-2">
            ✓
          </span>
          <p className="text-sm font-semibold text-ink/80">All caught up!</p>
          <p className="text-xs text-ink/50 mt-1">
            There are no pending estimates or deliverable sign-offs awaiting your response.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div
              className={`p-5 rounded-xl border bg-white shadow-2xs space-y-3 ${
                req.status === "awaiting_approval"
                  ? "border-orange-300"
                  : "border-emerald-300"
              }`}
              key={req.id}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-ink/70">
                    {req.referenceNumber}
                  </span>
                  <StatusBadge status={req.status} />
                  <CategoryBadge category={req.category} />
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                    req.status === "awaiting_approval"
                      ? "bg-orange-100 text-orange-950"
                      : "bg-emerald-100 text-emerald-950"
                  }`}
                >
                  {req.status === "awaiting_approval"
                    ? "Estimate Sign-Off"
                    : "Deliverable Sign-Off"}
                </span>
              </div>

              <h2 className="font-display text-base font-bold text-ink">
                {req.title}
              </h2>
              <p className="text-xs text-ink/70 line-clamp-2 leading-relaxed">
                {req.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-ink/10 text-xs">
                <span className="text-ink/60">Project: <strong>{req.projectName}</strong></span>
                <Link
                  className="inline-flex items-center gap-1 font-semibold text-teal hover:underline focus-visible:outline-1 focus-visible:outline-teal"
                  href={`/portal/requests/${req.id}`}
                >
                  <span>Review & Approve</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
