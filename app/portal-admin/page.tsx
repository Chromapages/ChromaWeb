"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { IntakeRequest, IntakeRequestType, IntakeStatus } from "@/types/intake";

const statusLabels = {
  new: "New",
  active: "Active",
  in_review: "In Review",
  done: "Done",
} as const satisfies Record<IntakeStatus, string>;

const requestTypeLabels = {
  prospect: "Project inquiry",
  client: "Client support",
  question: "Question",
} as const satisfies Record<IntakeRequestType, string>;

const requestTextFields = [
  "id", "reference", "name", "email", "company", "projectType", "budgetRange",
  "message", "notes", "createdAt", "updatedAt",
] as const;

type RequestPatch = Partial<Pick<IntakeRequest, "status" | "notes">>;
type SaveState = {
  id: string;
  field: "status" | "notes";
  phase: "pending" | "saved" | "error";
};
type Filter = "all" | IntakeStatus;

const statuses = Object.keys(statusLabels) as IntakeStatus[];
const filters: Filter[] = ["all", ...statuses];
const requestWindow = 50;
const notesLimit = 5000;
const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });
const timestampFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });
const actionClass = "inline-flex min-h-11 items-center justify-center rounded-functional border border-muted-dark px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60";
const inputClass = "w-full min-w-0 rounded-functional border border-muted-dark bg-slate-950 px-3 py-2 text-base text-white disabled:opacity-60";
const cardClass = "rounded-panel border border-outline-dark bg-slate-900 p-4 sm:p-5";
const badgeClass = "inline-block rounded-functional border border-outline-dark px-2 py-0.5 text-sm font-semibold text-muted-dark";

function isIntakeRequest(value: unknown): value is IntakeRequest {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return requestTextFields.every((field) => typeof row[field] === "string")
    && typeof row.status === "string" && Object.hasOwn(statusLabels, row.status)
    && typeof row.requestType === "string" && Object.hasOwn(requestTypeLabels, row.requestType);
}

function formatDate(value: string, format = dateFormat) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unavailable" : format.format(date);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<IntakeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [save, setSave] = useState<SaveState | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const busy = useRef(false);

  const loadRequests = useCallback(async (signal?: AbortSignal) => {
    const timeout = AbortSignal.timeout(15_000);
    try {
      const response = await fetch("/api/admin/requests", {
        cache: "no-store",
        signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
      });
      if (signal?.aborted) return;
      if (response.status === 401) {
        router.replace("/portal-admin/login");
        return;
      }
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (data?.success !== true || !Array.isArray(data.requests) || !data.requests.every(isIntakeRequest)) {
        throw new Error();
      }
      if (!signal?.aborted) setRequests(data.requests);
    } catch {
      if (!signal?.aborted) setError("Couldn’t load requests. Try refreshing the list.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const controller = new AbortController();
    void loadRequests(controller.signal);
    return () => controller.abort();
  }, [loadRequests]);

  function refresh() {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    setError(null);
    setSave(null);
    void loadRequests().finally(() => { busy.current = false; });
  }

  async function logout() {
    if (busy.current) return;
    busy.current = true;
    setLoggingOut(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        signal: AbortSignal.timeout(15_000),
      });
      const data = await response.json();
      if (!response.ok || data?.success !== true) throw new Error();
      router.replace("/portal-admin/login");
    } catch {
      busy.current = false;
      setLoggingOut(false);
      setError("Couldn’t confirm logout. Try again.");
    }
  }

  async function saveRequest(id: string, patch: RequestPatch) {
    if (busy.current) return;
    busy.current = true;
    const field = patch.status === undefined ? "notes" : "status";
    setSave({ id, field, phase: "pending" });
    try {
      const response = await fetch(`/api/admin/requests/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
        signal: AbortSignal.timeout(15_000),
      });
      if (response.status === 401) {
        router.replace("/portal-admin/login");
        return;
      }
      if (!response.ok) throw new Error();
      const data = await response.json();
      const updated: unknown = data?.request;
      if (data?.success !== true || !isIntakeRequest(updated) || updated.id !== id) throw new Error();
      setRequests((rows) => rows.map((row) => row.id === id ? updated : row));
      if (patch.notes !== undefined) {
        setDrafts((current) => {
          if (current[id] !== patch.notes) return current;
          const next = { ...current };
          delete next[id];
          return next;
        });
      }
      setSave({ id, field, phase: "saved" });
    } catch {
      setSave({ id, field, phase: "error" });
    } finally {
      busy.current = false;
    }
  }

  const counts = { all: requests.length, new: 0, active: 0, in_review: 0, done: 0 };
  const query = search.trim().toLowerCase();
  const matches: IntakeRequest[] = [];
  let selected: IntakeRequest | undefined;
  for (const request of requests) {
    counts[request.status]++;
    if (request.id === selectedId) selected = request;
    if (filter !== "all" && request.status !== filter) continue;
    if (!query || [
      request.reference, request.name, request.email, request.company,
      request.requestType, requestTypeLabels[request.requestType], request.message,
    ].some((value) => value.toLowerCase().includes(query))) {
      matches.push(request);
    }
  }
  const saving = save?.phase === "pending";
  const controlsDisabled = loading || saving || loggingOut;
  const draft = selected ? drafts[selected.id] ?? selected.notes : "";

  return (
    <div className="cp-dark min-h-screen">
      <div className="cp-container grid gap-6 py-6 lg:grid-cols-[12rem_minmax(0,1fr)]">
        <aside aria-label="Request filters" className="min-w-0">
          <p className="font-semibold text-white">Chromapages</p>
          <p className="text-sm text-muted-dark">Portal Admin</p>
          <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
            {filters.map((value) => (
              <li key={value}>
                <button
                  type="button"
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                  className="flex min-h-11 w-full items-center justify-between gap-3 rounded-functional border border-transparent px-3 py-2 text-left text-sm font-semibold text-white hover:bg-white/10 aria-pressed:border-muted-dark aria-pressed:bg-slate-800"
                >
                  {value === "all" ? "All Requests" : statusLabels[value]}
                  <span className="text-muted-dark tabular-nums">{counts[value]}</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={logout} disabled={controlsDisabled} className={`${actionClass} mt-4`}>
            {loggingOut ? "Logging out…" : "Log Out"}
          </button>
        </aside>

        <main id="main-content" tabIndex={-1} className="min-w-0">
          <header className="border-b border-outline-dark pb-4">
            <h1 className="font-body text-2xl font-bold text-white">Intake requests</h1>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <div className="min-w-0 grow sm:max-w-md">
                <label htmlFor="request-search" className="mb-1 block text-sm font-semibold">Search requests</label>
                <input
                  type="search"
                  id="request-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className={`${inputClass} min-h-11`}
                />
              </div>
              <button type="button" onClick={refresh} disabled={controlsDisabled} className={actionClass}>
                Refresh list
              </button>
            </div>
            {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
          </header>

          <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <section aria-labelledby="request-list-title" className="min-w-0">
              <h2 id="request-list-title" className="font-body text-lg font-semibold text-white">Requests</h2>
              <p role="status" className="mt-2 text-sm text-muted-dark">
                {loading ? (requests.length ? "Refreshing requests…" : "Loading requests...") : (
                  matches.length ? `${matches.length} ${matches.length === 1 ? "request" : "requests"}` : !error ? (
                    query || filter !== "all" ? "No requests match this filter or search." : "No requests yet."
                  ) : null
                )}
                {requests.length >= requestWindow && (
                  <span className="block">Search and filters cover the {requestWindow} most recent requests.</span>
                )}
              </p>
              <ul className="mt-2 max-h-[28rem] space-y-2 overflow-y-auto p-1 xl:max-h-[calc(100dvh-12rem)]">
                {matches.map((request) => (
                  <li key={request.id}>
                    <button
                      type="button"
                      aria-pressed={request.id === selectedId}
                      onClick={() => setSelectedId(request.id)}
                      className="block w-full min-w-0 rounded-panel border border-outline-dark bg-slate-900 px-4 py-3 text-left wrap-anywhere hover:bg-slate-800 aria-pressed:border-accent-bright aria-pressed:bg-slate-800"
                    >
                      <span className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
                        <span className="font-semibold text-accent-bright tabular-nums">{request.reference}</span>
                        <time dateTime={request.createdAt} className="text-muted-dark">{formatDate(request.createdAt)}</time>
                      </span>
                      <span className="mt-1 block font-semibold text-white">{request.name}</span>
                      {request.company && <span className="block text-sm text-muted-dark">{request.company}</span>}
                      <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-dark">
                        <span className={badgeClass}>{statusLabels[request.status]}</span>
                        {requestTypeLabels[request.requestType]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {selected ? (
              <RequestDetails
                request={selected}
                draft={draft}
                save={save?.id === selected.id ? save : null}
                disabled={controlsDisabled}
                onDraft={(value) => setDrafts((current) => ({ ...current, [selected.id]: value }))}
                onSave={(patch) => void saveRequest(selected.id, patch)}
              />
            ) : (
              <p className={`${cardClass} text-muted-dark`}>Select a request to review the message and manage its status and notes.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function RequestDetails({
  request,
  draft,
  save,
  disabled,
  onDraft,
  onSave,
}: {
  request: IntakeRequest;
  draft: string;
  save: SaveState | null;
  disabled: boolean;
  onDraft: (value: string) => void;
  onSave: (patch: RequestPatch) => void;
}) {
  const statusFeedback = save?.field === "status" ? save.phase : null;
  const notesFeedback = save?.field === "notes" ? save.phase : null;
  return (
    <section aria-labelledby="request-detail-title" className="min-w-0 space-y-4">
      <header className="border-b border-outline-dark pb-4">
        <p className="text-sm font-semibold text-accent-bright tabular-nums">{request.reference}</p>
        <h2 id="request-detail-title" className="mt-1 font-body text-xl font-bold wrap-anywhere text-white">{request.name}</h2>
        {request.company && <p className="wrap-anywhere text-muted-dark">{request.company}</p>}
        <p className={`${badgeClass} mt-2`}>{requestTypeLabels[request.requestType]}</p>
        <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm text-muted-dark sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-white">Submitted</dt>
            <dd><time dateTime={request.createdAt}>{formatDate(request.createdAt, timestampFormat)}</time></dd>
          </div>
          <div>
            <dt className="font-semibold text-white">Updated</dt>
            <dd><time dateTime={request.updatedAt}>{formatDate(request.updatedAt, timestampFormat)}</time></dd>
          </div>
        </dl>
        <div className="mt-4 sm:max-w-52">
          <label htmlFor="request-status" className="mb-1 block text-sm font-semibold">Status</label>
          <select
            id="request-status"
            value={request.status}
            disabled={disabled}
            onChange={(event) => onSave({ status: event.target.value as IntakeStatus })}
            className={`${inputClass} min-h-11 scheme-dark`}
          >
            {statuses.map((status) => <option value={status} key={status}>{statusLabels[status]}</option>)}
          </select>
        </div>
        <p role="status" className="text-sm text-muted-dark">
          {statusFeedback === "pending" ? "Saving status…" : statusFeedback === "saved" ? "Status saved." : null}
        </p>
        {statusFeedback === "error" && <p role="alert" className="mt-2 text-sm text-red-300">Couldn’t confirm the status change. Refresh to check, then try again.</p>}
      </header>

      <div className={cardClass}>
        <h3 className="font-body font-semibold text-white">Submitter</h3>
        <dl className="mt-3 space-y-2 text-sm wrap-anywhere">
          <div>
            <dt className="text-muted-dark">Name</dt>
            <dd>{request.name}</dd>
          </div>
          <div>
            <dt className="text-muted-dark">Email</dt>
            <dd>{request.email}</dd>
          </div>
          {request.company && (
            <div><dt className="text-muted-dark">Company</dt><dd>{request.company}</dd></div>
          )}
          {[
            ["Project type", request.projectType],
            ["Budget range", request.budgetRange],
          ].map(([label, value]) => {
            const answer = value.trim();
            return answer && answer.toUpperCase() !== "N/A" ? (
              <div key={label}><dt className="text-muted-dark">{label}</dt><dd>{answer}</dd></div>
            ) : null;
          })}
        </dl>
        <a
          href={`mailto:${encodeURIComponent(request.email).replace("%40", "@")}`}
          aria-label={`Email ${request.name} at ${request.email}`}
          className={`${actionClass} mt-4`}
        >
          Email submitter
        </a>
      </div>

      <div className={cardClass}>
        <h3 className="font-body font-semibold text-white">Message</h3>
        <p className="mt-3 whitespace-pre-wrap wrap-anywhere">{request.message}</p>
      </div>

      <div className={cardClass}>
        <h3 className="font-body font-semibold text-white">Internal notes</h3>
        <label htmlFor="request-notes" className="mt-3 mb-1 block text-sm font-semibold">Notes</label>
        <textarea
          id="request-notes"
          rows={5}
          maxLength={notesLimit}
          value={draft}
          aria-describedby="request-notes-limit"
          onChange={(event) => onDraft(event.target.value)}
          className={`${inputClass} resize-y`}
        />
        <p id="request-notes-limit" className="text-sm text-muted-dark">Up to 5,000 characters.</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className={actionClass}
            disabled={disabled || draft === request.notes || draft.length > notesLimit}
            onClick={() => onSave({ notes: draft })}
          >
            Save notes
          </button>
          <p role="status" className="text-sm text-muted-dark">
            {notesFeedback === "pending" ? "Saving notes…" : notesFeedback === "saved" ? "Notes saved." : null}
          </p>
        </div>
        {notesFeedback === "error" && <p role="alert" className="mt-2 text-sm text-red-300">Couldn’t confirm the save. Your draft is still here. Refresh to check, then try again.</p>}
      </div>
    </section>
  );
}
