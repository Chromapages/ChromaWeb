"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";

import {CategoryBadge, PriorityBadge, StatusBadge} from "@/components/portal/PortalBadge";
import type {PortalRequest} from "@/lib/portal/types";

export default function PortalRequestsListPage() {
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchRequests = async () => {
      try {
        const params = new URLSearchParams();
        if (statusFilter !== "all") params.set("status", statusFilter);
        if (categoryFilter !== "all") params.set("category", categoryFilter);
        if (searchQuery.trim()) params.set("q", searchQuery.trim());

        const res = await fetch(`/api/portal/requests?${params.toString()}`);
        const data = (await res.json()) as {requests?: PortalRequest[]};
        if (!ignore && data.requests) {
          setRequests(data.requests);
        }
      } catch {
        // Keep previous list on error
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    void fetchRequests();
    return () => {
      ignore = true;
    };
  }, [statusFilter, categoryFilter, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Requests Directory</h1>
          <p className="text-xs text-ink/65 mt-0.5">
            Browse, search, and track all submitted scopes and fixes for your organization.
          </p>
        </div>

        <Link
          aria-label="Submit new request"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-teal text-white font-semibold text-xs sm:text-sm hover:bg-indigo transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-teal"
          href="/portal/requests/new"
        >
          <span>+</span>
          <span>New Request</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl border border-ink/15 bg-white space-y-3">
        <form className="flex flex-wrap gap-3 items-center" onSubmit={handleSearchSubmit}>
          <div className="flex-1 min-w-[220px]">
            <input
              aria-label="Search requests"
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ref number, title, or keywords..."
              type="search"
              value={searchQuery}
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              aria-label="Filter by status"
              className="px-3 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink focus:border-teal focus-visible:outline-hidden cursor-pointer"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="in_review">In Review</option>
              <option value="awaiting_approval">Awaiting Approval</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="ready_for_review">Ready for Review</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              aria-label="Filter by category"
              className="px-3 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink focus:border-teal focus-visible:outline-hidden cursor-pointer"
              onChange={(e) => setCategoryFilter(e.target.value)}
              value={categoryFilter}
            >
              <option value="all">All Categories</option>
              <option value="service">Service Scope</option>
              <option value="bug">Bug / Fix</option>
              <option value="content">Content Update</option>
              <option value="design">Design Update</option>
              <option value="feature">Feature / Integration</option>
              <option value="performance">Performance / A11y</option>
              <option value="other">Other</option>
            </select>

            <button
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-ink text-canvas hover:bg-ink/85 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Requests List */}
      {isLoading ? (
        <div className="py-12 text-center text-xs text-ink/50">Loading requests...</div>
      ) : requests.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-ink/20 rounded-xl bg-ink/[0.01]">
          <p className="text-sm font-semibold text-ink/70">No matching requests found.</p>
          <p className="text-xs text-ink/50 mt-1">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {requests.map((req) => (
            <Link
              aria-label={`Open request ${req.referenceNumber}: ${req.title}`}
              className="p-5 rounded-xl border border-ink/15 bg-white hover:border-teal hover:shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-teal block"
              href={`/portal/requests/${req.id}`}
              key={req.id}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-ink/80 bg-ink/5 px-2 py-0.5 rounded border border-ink/10">
                    {req.referenceNumber}
                  </span>
                  <StatusBadge status={req.status} />
                  <CategoryBadge category={req.category} />
                </div>

                <div className="flex items-center gap-2">
                  <PriorityBadge priority={req.priority} />
                  <span className="text-[11px] text-ink/50">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <h2 className="font-display text-base font-bold text-ink">
                {req.title}
              </h2>
              <p className="text-xs text-ink/70 mt-1 line-clamp-2 leading-relaxed">
                {req.description}
              </p>

              <div className="mt-4 pt-3 border-t border-ink/10 flex flex-wrap items-center justify-between text-xs text-ink/60 gap-2">
                <span>Project: <strong className="text-ink">{req.projectName}</strong></span>
                {req.desiredDate ? (
                  <span>Requested Date: {req.desiredDate}</span>
                ) : null}
                <span className="text-teal font-semibold">View Detail &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
