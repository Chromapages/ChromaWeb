"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LogOut,
  Inbox,
  Play,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Mail,
  RefreshCw,
  Clock,
  Layers,
  HelpCircle,
} from "lucide-react";
import clsx from "clsx";

type Label = { id: string; name: string; color: string };
type Comment = { id: string; body: string; createdAt: string };
type Issue = {
  id: string;
  identifier: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  state: { id: string; name: string; type: string };
  labels: { nodes: Label[] };
  comments: { nodes: Comment[] };
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "inbox" | "active" | "in_review" | "done">("all");
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  const fetchRequests = useCallback(async (showLoadingState = true) => {
    if (showLoadingState) setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/requests");

      if (response.status === 401) {
        router.push("/portal-admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch requests.");
      }

      const data = await response.json();
      setIssues(data.issues || []);
    } catch (err: unknown) {
      console.error(err);
      setError((err instanceof Error && err.message) || "An unexpected error occurred while loading requests.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchRequests();
  }, [fetchRequests]);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    fetchRequests(false);
  };

  const handleLogoutClick = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error("Logout could not be confirmed.");
      }
      router.push("/portal-admin/login");
    } catch {
      setError("Logout could not be confirmed. Please try again.");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filter: typeof statusFilter) => {
    setStatusFilter(filter);
  };

  const getIssueCategory = (issue: Issue): "inbox" | "active" | "in_review" | "done" => {
    const labelNames = issue.labels.nodes.map((n) => n.name.toLowerCase());
    const stateType = issue.state.type.toLowerCase();

    if (stateType === "completed" || stateType === "done" || stateType === "canceled") return "done";
    if (labelNames.includes("handler-failed")) return "in_review";
    if (labelNames.includes("intake/web") || labelNames.includes("cmd/intake")) return "inbox";
    if (stateType === "started" || stateType === "unstarted" || stateType === "backlog") {
      if (labelNames.some((l) => l.startsWith("cmd/"))) return "active";
      return "inbox";
    }
    return "active";
  };

  const filteredIssues = issues.filter((issue) => {
    const category = getIssueCategory(issue);
    const matchesFilter = statusFilter === "all" || category === statusFilter;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesFilter;

    const matchesSearch =
      issue.title.toLowerCase().includes(query) ||
      issue.identifier.toLowerCase().includes(query) ||
      issue.description.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const selectedIssue = issues.find((i) => i.id === selectedIssueId);

  // Compute stat counts
  const inboxCount = issues.filter((i) => getIssueCategory(i) === "inbox").length;
  const activeCount = issues.filter((i) => getIssueCategory(i) === "active").length;
  const inReviewCount = issues.filter((i) => getIssueCategory(i) === "in_review").length;
  const doneCount = issues.filter((i) => getIssueCategory(i) === "done").length;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-900 bg-slate-900/40 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
              ChromaPages
            </h2>
            <p className="text-xs text-indigo-400 font-semibold tracking-wider uppercase mt-1">Portal Admin</p>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => handleFilterChange("all")}
              className={clsx(
                "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer text-left",
                statusFilter === "all"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
              )}
            >
              <Layers className="h-4.5 w-4.5" />
              All Requests
              <span className="ml-auto text-xs bg-slate-950 px-2 py-0.5 rounded-md text-slate-400">{issues.length}</span>
            </button>
            <button
              onClick={() => handleFilterChange("inbox")}
              className={clsx(
                "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer text-left",
                statusFilter === "inbox"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
              )}
            >
              <Inbox className="h-4.5 w-4.5" />
              Inbox (New)
              <span className="ml-auto text-xs bg-slate-950 px-2 py-0.5 rounded-md text-slate-400">{inboxCount}</span>
            </button>
            <button
              onClick={() => handleFilterChange("active")}
              className={clsx(
                "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer text-left",
                statusFilter === "active"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
              )}
            >
              <Play className="h-4.5 w-4.5" />
              Active
              <span className="ml-auto text-xs bg-slate-950 px-2 py-0.5 rounded-md text-slate-400">{activeCount}</span>
            </button>
            <button
              onClick={() => handleFilterChange("in_review")}
              className={clsx(
                "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer text-left",
                statusFilter === "in_review"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
              )}
            >
              <AlertTriangle className="h-4.5 w-4.5" />
              In Review
              <span className="ml-auto text-xs bg-slate-950 px-2 py-0.5 rounded-md text-slate-400">{inReviewCount}</span>
            </button>
            <button
              onClick={() => handleFilterChange("done")}
              className={clsx(
                "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer text-left",
                statusFilter === "done"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
              )}
            >
              <CheckCircle className="h-4.5 w-4.5" />
              Done
              <span className="ml-auto text-xs bg-slate-950 px-2 py-0.5 rounded-md text-slate-400">{doneCount}</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogoutClick}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/5 hover:text-red-300 transition cursor-pointer text-left"
        >
          <LogOut className="h-4.5 w-4.5" />
          Log Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-900 px-8 flex items-center justify-between gap-4 bg-slate-950/20 backdrop-blur-md">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/40 pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshClick}
              disabled={isRefreshing}
              aria-label="Refresh list"
              className={clsx(
                "p-2 rounded-xl border border-slate-850 hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition cursor-pointer",
                isRefreshing && "animate-spin"
              )}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Inner Grid */}
        <div className="flex-1 flex overflow-hidden">
          {/* Ticket List */}
          <div className="w-1/2 overflow-y-auto border-r border-slate-900 p-6 space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin text-indigo-500" />
                <p className="text-sm">Retrieving requests from Linear...</p>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-6 text-center text-red-400">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <p className="text-sm font-semibold">Error Loading Requests</p>
                <p className="text-xs mt-1 text-red-400/80">{error}</p>
                <button
                  onClick={handleRefreshClick}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold transition cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : filteredIssues.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <Inbox className="h-12 w-12 mx-auto mb-4 stroke-1 text-slate-600" />
                <p className="text-sm font-medium">No requests found</p>
                <p className="text-xs text-slate-600 mt-1">Try adjusting your filter or search query.</p>
              </div>
            ) : (
              filteredIssues.map((issue) => {
                const category = getIssueCategory(issue);
                const isSelected = issue.id === selectedIssueId;
                const formattedDate = new Date(issue.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                });

                return (
                  <button
                    key={issue.id}
                    type="button"
                    aria-label={`${issue.identifier}: ${issue.title}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className={clsx(
                      "relative block w-full rounded-2xl border p-5 text-left transition duration-200 cursor-pointer group hover:translate-y-[-1px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
                      isSelected
                        ? "bg-slate-900/80 border-indigo-500/40 shadow-lg shadow-indigo-950/25"
                        : "bg-slate-900/30 border-slate-900 hover:border-slate-850 hover:bg-slate-900/50"
                    )}
                  >
                    {/* Glow effect for selection */}
                    {isSelected && (
                      <span aria-hidden="true" className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10 blur-sm" />
                    )}

                    <span className="relative flex justify-between items-start gap-4">
                      <span className="min-w-0 space-y-2.5">
                        <span className="text-xs font-mono font-semibold text-indigo-400 tracking-wider">
                          {issue.identifier}
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition duration-150 line-clamp-1">
                          {issue.title}
                        </span>

                        {/* Badges */}
                        <span className="flex flex-wrap gap-1.5">
                          <span
                            className={clsx(
                              "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
                              category === "inbox" && "bg-blue-500/5 text-blue-400 border-blue-500/10",
                              category === "active" && "bg-amber-500/5 text-amber-400 border-amber-500/10",
                              category === "in_review" && "bg-rose-500/5 text-rose-400 border-rose-500/10",
                              category === "done" && "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                            )}
                          >
                            {category.replace("_", " ").toUpperCase()}
                          </span>

                          {issue.labels.nodes.map((label) => {
                            if (label.name.startsWith("intake/") || label.name.startsWith("cmd/")) {
                              return (
                                <span
                                  key={label.id}
                                  className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-950 text-slate-400 border border-slate-900"
                                >
                                  {label.name}
                                </span>
                              );
                            }
                            return null;
                          })}
                        </span>
                      </span>

                      <span className="shrink-0 text-right space-y-1">
                        <span className="text-xs text-slate-500 block">{formattedDate}</span>
                        <span className="text-xs text-slate-500 block font-mono">{issue.state.name}</span>
                      </span>
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Ticket Detail Panel */}
          <div className="w-1/2 overflow-y-auto bg-slate-900/10 p-6 flex flex-col">
            {selectedIssue ? (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start border-b border-slate-900 pb-5 gap-4">
                  <div>
                    <span className="text-xs font-mono font-semibold text-indigo-400 tracking-wider">
                      {selectedIssue.identifier}
                    </span>
                    <h2 className="text-lg font-bold text-white mt-1">{selectedIssue.title}</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Submitted {new Date(selectedIssue.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={`https://linear.app/issue/${selectedIssue.identifier}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-indigo-400 hover:text-indigo-300 border border-slate-800 transition cursor-pointer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Linear Link
                    </a>
                  </div>
                </div>

                {/* Submitter Info */}
                <div className="rounded-2xl border border-slate-900 bg-slate-950/40 p-5 space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Submitter</h3>
                  {(() => {
                    const desc = selectedIssue.description;
                    const emailMatch = desc.match(/_Submitter email: (.*?)_/);
                    const email = emailMatch ? emailMatch[1] : null;

                    return (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{selectedIssue.title.split("—")[0].replace("[Intake]", "").trim()}</p>
                          {email && <p className="text-xs text-slate-500 mt-0.5">{email}</p>}
                        </div>
                        {email && (
                          <a
                            href={`mailto:${email}`}
                            className="p-2 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
                            aria-label={`Email client at ${email}`}
                          >
                            <Mail className="h-4.5 w-4.5" />
                          </a>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Form Data */}
                <div className="rounded-2xl border border-slate-900 bg-slate-950/40 p-5 space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Request Data</h3>
                  <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed font-sans prose prose-invert max-w-none">
                    {selectedIssue.description}
                  </div>
                </div>

                {/* Comments / AI Logs */}
                <div className="space-y-4 flex-1">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    AI Actions & Logs
                  </h3>

                  {selectedIssue.comments.nodes.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-850 p-6 text-center text-slate-500 text-xs">
                      No AI operations or comments logged yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedIssue.comments.nodes.map((comment) => (
                        <div key={comment.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-900/60 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-indigo-400">Hermes/Claude Code</span>
                            <span className="text-2xs text-slate-500">
                              {new Date(comment.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {comment.body}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 py-20 text-center">
                <HelpCircle className="h-16 w-16 stroke-1 text-slate-700 mb-4 animate-pulse" />
                <h3 className="text-sm font-medium">Select a request</h3>
                <p className="text-xs text-slate-650 max-w-xs mt-1">
                  Click on any ticket in the left list to review submitter details, form data, and AI dispatch logs.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
