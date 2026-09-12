import React from "react";

import type {BusinessImpact, CoverageState, RequestCategory, RequestPriority, RequestStatus} from "@/lib/portal/types";

interface BadgeProps {
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<{status: RequestStatus} & BadgeProps> = ({status, className = ""}) => {
  let colorClasses = "bg-ink/10 text-ink border-ink/20";
  let label = status.replace("_", " ");

  if (status === "submitted") {
    colorClasses = "bg-blue-100 text-blue-900 border-blue-300";
    label = "Submitted";
  } else if (status === "in_review") {
    colorClasses = "bg-purple-100 text-purple-900 border-purple-300";
    label = "In Review";
  } else if (status === "needs_info") {
    colorClasses = "bg-amber-100 text-amber-900 border-amber-300";
    label = "Needs Info";
  } else if (status === "awaiting_approval") {
    colorClasses = "bg-orange-100 text-orange-900 border-orange-300";
    label = "Awaiting Approval";
  } else if (status === "scheduled") {
    colorClasses = "bg-teal/15 text-teal border-teal/30";
    label = "Scheduled";
  } else if (status === "in_progress") {
    colorClasses = "bg-indigo/15 text-indigo border-indigo/30";
    label = "In Progress";
  } else if (status === "ready_for_review") {
    colorClasses = "bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold";
    label = "Ready for Review";
  } else if (status === "revision_requested") {
    colorClasses = "bg-amber-100 text-amber-900 border-amber-300";
    label = "Revision Requested";
  } else if (status === "completed") {
    colorClasses = "bg-green-100 text-green-900 border-green-300";
    label = "Completed";
  } else if (status === "cancelled") {
    colorClasses = "bg-gray-100 text-gray-700 border-gray-300";
    label = "Cancelled";
  }

  return (
    <span
      aria-label={`Status: ${label}`}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses} ${className}`}
      tabIndex={0}
    >
      {label}
    </span>
  );
};

export const PriorityBadge: React.FC<{priority: RequestPriority} & BadgeProps> = ({priority, className = ""}) => {
  let colorClasses = "bg-gray-100 text-gray-700 border-gray-300";
  let label = "Normal";

  if (priority === "low") {
    colorClasses = "bg-gray-100 text-gray-600 border-gray-200";
    label = "Low";
  } else if (priority === "normal") {
    colorClasses = "bg-blue-50 text-blue-700 border-blue-200";
    label = "Normal";
  } else if (priority === "high") {
    colorClasses = "bg-orange-100 text-orange-800 border-orange-300 font-medium";
    label = "High";
  } else if (priority === "urgent") {
    colorClasses = "bg-red-100 text-red-900 border-red-300 font-semibold";
    label = "Urgent";
  }

  return (
    <span
      aria-label={`Priority: ${label}`}
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colorClasses} ${className}`}
      tabIndex={0}
    >
      {label}
    </span>
  );
};

export const CategoryBadge: React.FC<{category: RequestCategory} & BadgeProps> = ({category, className = ""}) => {
  const categoryLabels: Record<RequestCategory, string> = {
    service: "Service Scope",
    bug: "Bug / Fix",
    content: "Content Update",
    design: "Design Update",
    feature: "Feature / Integration",
    performance: "Performance / A11y",
    other: "Other",
  };

  const label = categoryLabels[category] ?? "General";

  return (
    <span
      aria-label={`Category: ${label}`}
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-ink/5 text-ink border border-ink/15 ${className}`}
      tabIndex={0}
    >
      {label}
    </span>
  );
};

export const ImpactBadge: React.FC<{impact: BusinessImpact}> = ({impact}) => {
  let color = "bg-gray-100 text-gray-700";
  if (impact === "critical") color = "bg-red-100 text-red-900 font-semibold";
  if (impact === "high") color = "bg-orange-100 text-orange-900";
  if (impact === "medium") color = "bg-amber-100 text-amber-900";

  return (
    <span
      aria-label={`Business impact: ${impact}`}
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${color}`}
      tabIndex={0}
    >
      {impact} impact
    </span>
  );
};

export const CoverageBadge: React.FC<{coverage: CoverageState}> = ({coverage}) => {
  let color = "bg-gray-100 text-gray-600";
  let label = "Unreviewed";

  if (coverage === "included") {
    color = "bg-green-100 text-green-800";
    label = "Included in Plan";
  } else if (coverage === "additional_estimate") {
    color = "bg-indigo/15 text-indigo font-medium";
    label = "Additional Estimate";
  } else if (coverage === "declined") {
    color = "bg-red-50 text-red-700";
    label = "Declined";
  }

  return (
    <span
      aria-label={`Coverage: ${label}`}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
      tabIndex={0}
    >
      {label}
    </span>
  );
};
