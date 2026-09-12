"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";

import {
  CategoryBadge,
  CoverageBadge,
  PriorityBadge,
  StatusBadge,
} from "@/components/portal/PortalBadge";
import type {
  Organization,
  PortalRequest,
} from "@/lib/portal/types";

type QueueTab = "active" | "unassigned" | "waiting_client" | "in_review" | "completed" | "all";

export default function StaffDeliveryQueuePage() {
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeTab, setActiveTab] = useState<QueueTab>("active");

  const [orgFilter, setOrgFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load organizations for filter
  useEffect(() => {
    let ignore = false;
    const loadOrgs = async () => {
      try {
        const res = await fetch("/api/portal/organizations?all=true");
        const data = (await res.json()) as {organizations?: Organization[]};
        if (!ignore && data.organizations) setOrganizations(data.organizations);
      } catch {
        // Fallback
      }
    };
    void loadOrgs();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchQueue = async () => {
      try {
        const params = new URLSearchParams();
        params.set("view", "admin");

        if (orgFilter !== "all") params.set("orgId", orgFilter);
        if (priorityFilter !== "all") params.set("priority", priorityFilter);
        if (categoryFilter !== "all") params.set("category", categoryFilter);
        if (assigneeFilter !== "all") params.set("assigneeId", assigneeFilter);
        if (searchQuery.trim()) params.set("q", searchQuery.trim());

        const res = await fetch(`/api/portal/requests?${params.toString()}`);
        const data = (await res.json()) as {requests?: PortalRequest[]};
        if (!ignore && data.requests) {
          setRequests(data.requests);
        }
      } catch {
        // Fallback
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    void fetchQueue();
    return () => {
      ignore = true;
    };
  }, [orgFilter, priorityFilter, categoryFilter, assigneeFilter, searchQuery]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("view", "admin");

      if (orgFilter !== "all") params.set("orgId", orgFilter);
      if (priorityFilter !== "all") params.set("priority", priorityFilter);
      if (categoryFilter !== "all") params.set("category", categoryFilter);
      if (assigneeFilter !== "all") params.set("assigneeId", assigneeFilter);
      if (searchQuery.trim()) params.set("q", searchQuery.trim());

      const res = await fetch(`/api/portal/requests?${params.toString()}`);
      const data = (await res.json()) as {requests?: PortalRequest[]};
      if (data.requests) {
        setRequests(data.requests);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  // Filter requests based on selected tab
  const tabFilteredRequests = requests.filter((req) => {
    if (activeTab === "active") {
      return req.status !== "completed" && req.status !== "cancelled";
    }
    if (activeTab === "unassigned") {
      return !req.assigneeId && req.status !== "completed" && req.status !== "cancelled";
    }
    if (activeTab === "waiting_client") {
      return (
        req.status === "awaiting_approval" ||
        req.status === "ready_for_review" ||
        req.status === "needs_info"
      );
    }
    if (activeTab === "in_review") {
      return req.status === "submitted" || req.status === "in_review";
    }
    if (activeTab === "completed") {
      return req.status === "completed";
    }
    return true; // 'all'
  });

  const tabCounts = {
    active: requests.filter((r) => r.status !== "completed" && r.status !== "cancelled").length,
    unassigned: requests.filter((r) => !r.assigneeId && r.status !== "completed" && r.status !== "cancelled").length,
    waiting_client: requests.filter(
      (r) => r.status === "awaiting_approval" || r.status === "ready_for_review" || r.status === "needs_info"
    ).length,
    in_review: requests.filter((r) => r.status === "submitted" || r.status === "in_review").length,
    completed: requests.filter((r) => r.status === "completed").length,
    all: requests.length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Staff Delivery Queue</h1>
          <p className="text-xs text-ink/65 mt-0.5">
            Triage, estimate, develop, and deliver across all client organizations.
          </p>
        </div>

        <Link
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo text-white text-xs sm:text-sm font-semibold hover:bg-teal transition-colors shadow-xs shrink-0 focus-visible:outline-2 focus-visible:outline-indigo"
          href="/admin/clients"
        >
          <span>Manage Clients &amp; Projects &rarr;</span>
        </Link>
      </div>

      {/* Quick Tabs */}
      <div aria-label="Queue views" className="flex flex-wrap gap-2 border-b border-ink/10 pb-3" role="tablist">
        {[
          {id: "active", label: "All Active", count: tabCounts.active},
          {id: "unassigned", label: "Unassigned", count: tabCounts.unassigned},
          {id: "waiting_client", label: "Waiting on Client", count: tabCounts.waiting_client},
          {id: "in_review", label: "In Review / Triage", count: tabCounts.in_review},
          {id: "completed", label: "Completed", count: tabCounts.completed},
          {id: "all", label: "Everything", count: tabCounts.all},
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              aria-selected={isActive}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-indigo ${
                isActive
                  ? "bg-indigo text-white shadow-xs"
                  : "bg-ink/5 text-ink/75 hover:bg-ink/10 hover:text-ink"
              }`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id as QueueTab)}
              role="tab"
              type="button"
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-ink/10 text-ink/60"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl border border-indigo/20 bg-white space-y-3">
        <form className="flex flex-wrap gap-3 items-center" onSubmit={handleSearchSubmit}>
          <div className="flex-1 min-w-[220px]">
            <input
              aria-label="Search delivery queue"
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink placeholder:text-ink/40 focus:border-indigo focus:ring-1 focus:ring-indigo focus-visible:outline-hidden"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, title, client name, or keywords..."
              type="search"
              value={searchQuery}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter by client organization"
              className="px-3 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden cursor-pointer"
              onChange={(e) => setOrgFilter(e.target.value)}
              value={orgFilter}
            >
              <option value="all">All Clients</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by priority"
              className="px-3 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden cursor-pointer"
              onChange={(e) => setPriorityFilter(e.target.value)}
              value={priorityFilter}
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>

            <select
              aria-label="Filter by category"
              className="px-3 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden cursor-pointer"
              onChange={(e) => setCategoryFilter(e.target.value)}
              value={categoryFilter}
            >
              <option value="all">All Categories</option>
              <option value="bug">Bugs</option>
              <option value="content">Content</option>
              <option value="design">Design</option>
              <option value="feature">Features</option>
              <option value="service">Service Scope</option>
              <option value="performance">Performance</option>
            </select>

            <select
              aria-label="Filter by assignment"
              className="px-3 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden cursor-pointer"
              onChange={(e) => setAssigneeFilter(e.target.value)}
              value={assigneeFilter}
            >
              <option value="all">All Assignees</option>
              <option value="unassigned">Unassigned</option>
              <option value="user-alex-staff">Alex Morales</option>
              <option value="user-devin-admin">Devin Cross</option>
            </select>

            <button
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo text-white hover:bg-indigo/90 cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo"
              type="submit"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {/* Queue Table */}
      {isLoading ? (
        <div className="py-12 text-center text-xs text-ink/50">Loading staff queue...</div>
      ) : tabFilteredRequests.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-ink/20 rounded-xl bg-ink/[0.01]">
          <p className="text-sm font-semibold text-ink/70">No requests found in this view.</p>
          <p className="text-xs text-ink/50 mt-1">Try switching tabs or resetting filters.</p>
        </div>
      ) : (
        <div className="border border-ink/15 rounded-xl bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink">
              <thead>
                <tr className="border-b border-ink/10 bg-ink/[0.02] text-ink/50 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Ref</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Project / Client</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Coverage</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {tabFilteredRequests.map((req) => (
                  <tr className="hover:bg-indigo/[0.02] transition-colors" key={req.id}>
                    <td className="py-3 px-4 font-mono font-bold text-ink">
                      <Link
                        className="hover:text-indigo focus-visible:outline-1 focus-visible:outline-indigo"
                        href={`/admin/requests/${req.id}`}
                      >
                        {req.referenceNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-4 font-medium max-w-xs truncate">
                      <Link
                        className="hover:text-indigo focus-visible:outline-1 focus-visible:outline-indigo"
                        href={`/admin/requests/${req.id}`}
                      >
                        {req.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-ink/70 whitespace-nowrap">
                      {req.projectName}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <CategoryBadge category={req.category} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <PriorityBadge priority={req.priority} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <CoverageBadge coverage={req.coverage} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {req.assigneeName ? (
                        <span className="font-semibold text-ink">{req.assigneeName}</span>
                      ) : (
                        <span className="text-orange-700 bg-orange-100 font-semibold px-2 py-0.5 rounded text-[10px]">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        className="inline-flex items-center gap-1 font-semibold text-indigo hover:text-teal focus-visible:outline-1 focus-visible:outline-indigo"
                        href={`/admin/requests/${req.id}`}
                      >
                        <span>Triage &amp; Manage</span>
                        <span>&rarr;</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
