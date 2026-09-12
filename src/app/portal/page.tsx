import Link from "next/link";
import {redirect} from "next/navigation";
import React from "react";

import {CategoryBadge, PriorityBadge, StatusBadge} from "@/components/portal/PortalBadge";
import {PortalCard} from "@/components/portal/PortalCard";
import {getCurrentSession} from "@/lib/portal/auth";
import {getRequests} from "@/lib/portal/dataStore";

export default async function PortalOverviewPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login?redirect=/portal");
  }

  const allRequests = getRequests(session.organizationId);

  const needsResponse = allRequests.filter(
    (r) =>
      r.status === "awaiting_approval" ||
      r.status === "ready_for_review" ||
      r.status === "needs_info"
  );

  const activeWork = allRequests.filter(
    (r) => r.status === "in_progress" || r.status === "scheduled"
  );

  const completed = allRequests.filter((r) => r.status === "completed");

  return (
    <div className="space-y-8">
      {/* Welcome Banner & New Request Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-ink/10">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            {session.organizationName} Workspace
          </h1>
          <p className="mt-1 text-sm text-ink/70">
            Welcome back, {session.displayName}. Track active sprints, review estimates, and submit new requests.
          </p>
        </div>

        <Link
          aria-label="Create a new request"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal text-white font-semibold text-sm hover:bg-indigo transition-colors shadow-xs shrink-0 focus-visible:outline-2 focus-visible:outline-teal"
          href="/portal/requests/new"
        >
          <span aria-hidden="true" className="text-lg leading-none">+</span>
          <span>New Request</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-ink/15 bg-white shadow-2xs">
          <span className="text-xs text-ink/60 font-semibold uppercase tracking-wider">
            Total Requests
          </span>
          <span className="mt-1 block font-display text-2xl font-bold text-ink">
            {allRequests.length}
          </span>
        </div>
        <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/60 shadow-2xs">
          <span className="text-xs text-orange-800 font-semibold uppercase tracking-wider">
            Needs Your Response
          </span>
          <span className="mt-1 block font-display text-2xl font-bold text-orange-900">
            {needsResponse.length}
          </span>
        </div>
        <div className="p-4 rounded-xl border border-indigo/20 bg-indigo/5 shadow-2xs">
          <span className="text-xs text-indigo font-semibold uppercase tracking-wider">
            Active in Delivery
          </span>
          <span className="mt-1 block font-display text-2xl font-bold text-indigo">
            {activeWork.length}
          </span>
        </div>
        <div className="p-4 rounded-xl border border-green-200 bg-green-50/60 shadow-2xs">
          <span className="text-xs text-green-800 font-semibold uppercase tracking-wider">
            Completed
          </span>
          <span className="mt-1 block font-display text-2xl font-bold text-green-900">
            {completed.length}
          </span>
        </div>
      </div>

      {/* Needs Your Response Section */}
      {needsResponse.length > 0 ? (
        <section aria-labelledby="needs-response-title" className="space-y-3">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-orange-500 animate-pulse" />
            <h2 className="font-display text-lg font-bold text-ink" id="needs-response-title">
              Needs Your Response ({needsResponse.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {needsResponse.map((req) => (
              <Link
                aria-label={`View request ${req.referenceNumber}: ${req.title}`}
                className="block p-4 sm:p-5 rounded-xl border border-orange-300 bg-orange-50/40 hover:bg-orange-50/80 transition-colors focus-visible:outline-2 focus-visible:outline-teal"
                href={`/portal/requests/${req.id}`}
                key={req.id}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-orange-950">
                      {req.referenceNumber}
                    </span>
                    <StatusBadge status={req.status} />
                    <CategoryBadge category={req.category} />
                  </div>
                  <span className="text-xs font-bold text-orange-900 bg-orange-200/70 px-2 py-0.5 rounded">
                    {req.status === "awaiting_approval"
                      ? "Estimate Approval Required"
                      : req.status === "ready_for_review"
                        ? "Deliverable Review Required"
                        : "Information Requested"}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-ink">
                  {req.title}
                </h3>
                <p className="text-xs text-ink/75 mt-1 line-clamp-2 leading-relaxed">
                  {req.description}
                </p>

                <div className="flex items-center justify-between mt-3 text-xs text-ink/60 pt-2 border-t border-orange-200/60">
                  <span>Project: <strong>{req.projectName}</strong></span>
                  <span className="text-teal font-semibold">Review Request &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Active Work Section */}
      <section aria-labelledby="active-work-title" className="space-y-4">
        <h2 className="font-display text-lg font-bold text-ink" id="active-work-title">
          Active Work ({activeWork.length})
        </h2>

        {activeWork.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-ink/10 bg-ink/[0.01]">
            <p className="text-sm text-ink/60">
              No requests are currently in progress.
            </p>
            <Link
              className="mt-3 inline-block text-xs font-semibold text-teal hover:underline"
              href="/portal/requests/new"
            >
              Submit a new request &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeWork.map((req) => (
              <Link
                aria-label={`View request ${req.referenceNumber}: ${req.title}`}
                className="block p-5 rounded-xl border border-ink/15 bg-white hover:border-teal transition-colors shadow-2xs focus-visible:outline-2 focus-visible:outline-teal"
                href={`/portal/requests/${req.id}`}
                key={req.id}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-ink/70">
                      {req.referenceNumber}
                    </span>
                    <StatusBadge status={req.status} />
                  </div>
                  <PriorityBadge priority={req.priority} />
                </div>

                <h3 className="font-display text-base font-bold text-ink line-clamp-1">
                  {req.title}
                </h3>
                <p className="text-xs text-ink/70 mt-1 line-clamp-2">
                  {req.description}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink/10 text-xs text-ink/60">
                  <span>Project: {req.projectName}</span>
                  {req.scheduledDate ? (
                    <span>Delivery: <strong>{req.scheduledDate}</strong></span>
                  ) : (
                    <span>Assigned: {req.assigneeName || "Team"}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recent Requests Table */}
      <PortalCard
        headerAction={
          <Link
            className="text-xs font-semibold text-teal hover:underline focus-visible:outline-1 focus-visible:outline-teal"
            href="/portal/requests"
          >
            View All ({allRequests.length}) &rarr;
          </Link>
        }
        title="Recent Requests"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead>
              <tr className="border-b border-ink/10 text-ink/50 uppercase tracking-wider font-semibold">
                <th className="py-2.5 pr-4">Ref</th>
                <th className="py-2.5 pr-4">Title</th>
                <th className="py-2.5 pr-4">Project</th>
                <th className="py-2.5 pr-4">Status</th>
                <th className="py-2.5 pr-4">Priority</th>
                <th className="py-2.5 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {allRequests.slice(0, 5).map((req) => (
                <tr className="hover:bg-ink/[0.02]" key={req.id}>
                  <td className="py-3 pr-4 font-mono font-bold text-ink/80">
                    <Link
                      className="hover:text-teal focus-visible:outline-1 focus-visible:outline-teal"
                      href={`/portal/requests/${req.id}`}
                    >
                      {req.referenceNumber}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 font-medium">
                    <Link
                      className="hover:text-teal line-clamp-1 focus-visible:outline-1 focus-visible:outline-teal"
                      href={`/portal/requests/${req.id}`}
                    >
                      {req.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-ink/60 whitespace-nowrap">
                    {req.projectName}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <PriorityBadge priority={req.priority} />
                  </td>
                  <td className="py-3 text-right text-ink/50 whitespace-nowrap">
                    {new Date(req.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PortalCard>
    </div>
  );
}
