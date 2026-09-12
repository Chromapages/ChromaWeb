"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

import {PortalButton} from "@/components/portal/PortalButton";
import type {BusinessImpact, Project, RequestCategory, RequestPriority} from "@/lib/portal/types";

const DRAFT_STORAGE_KEY = "chromapages_new_request_draft_v1";

export default function NewRequestPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [category, setCategory] = useState<RequestCategory>("content");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [affectedUrl, setAffectedUrl] = useState("");
  const [businessImpact, setBusinessImpact] = useState<BusinessImpact>("medium");
  const [priority] = useState<RequestPriority>("normal");
  const [desiredDate, setDesiredDate] = useState("");

  // Bug specific fields
  const [expectedBehavior, setExpectedBehavior] = useState("");
  const [actualBehavior, setActualBehavior] = useState("");
  const [reproductionSteps, setReproductionSteps] = useState("");
  const [deviceBrowser, setDeviceBrowser] = useState("");

  // File attachments
  const [attachedFiles, setAttachedFiles] = useState<Array<{name: string; size: number; type: string}>>([]);
  const [fileError, setFileError] = useState("");

  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load organization projects
  useEffect(() => {
    let ignore = false;
    const loadProjects = async () => {
      try {
        const res = await fetch("/api/portal/organizations");
        const data = (await res.json()) as {projects?: Project[]};
        if (!ignore && data.projects && data.projects.length > 0) {
          setProjects(data.projects);
          setSelectedProjectId(data.projects[0]?.id || "");
        }
      } catch {
        // Fallback
      } finally {
        if (!ignore) setIsLoadingProjects(false);
      }
    };
    void loadProjects();
    return () => {
      ignore = true;
    };
  }, []);

  // Restore draft text on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Record<string, string>;
          if (parsed.title) setTitle(parsed.title);
          if (parsed.description) setDescription(parsed.description);
          if (parsed.affectedUrl) setAffectedUrl(parsed.affectedUrl);
          if (parsed.expectedBehavior) setExpectedBehavior(parsed.expectedBehavior);
          if (parsed.actualBehavior) setActualBehavior(parsed.actualBehavior);
          if (parsed.reproductionSteps) setReproductionSteps(parsed.reproductionSteps);
        }
      } catch {
        // Ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save draft text
  useEffect(() => {
    try {
      const draft = {
        title,
        description,
        affectedUrl,
        expectedBehavior,
        actualBehavior,
        reproductionSteps,
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignore
    }
  }, [title, description, affectedUrl, expectedBehavior, actualBehavior, reproductionSteps]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    if (attachedFiles.length + files.length > 5) {
      setFileError("Maximum 5 files allowed per submission.");
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp", "application/pdf", "text/plain"];
    const validFiles: Array<{name: string; size: number; type: string}> = [];

    for (const f of files) {
      if (!allowedTypes.includes(f.type)) {
        setFileError(`Disallowed file type (${f.type || "unknown"}). Only PNG, JPEG, WebP, PDF, and TXT are permitted.`);
        return;
      }
      if (f.size > 10 * 1024 * 1024) {
        setFileError(`File ${f.name} exceeds the 10 MB size limit.`);
        return;
      }
      validFiles.push({name: f.name, size: f.size, type: f.type});
    }

    setAttachedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !selectedProjectId || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        projectId: selectedProjectId,
        category,
        title: title.trim(),
        description: description.trim(),
        affectedUrl: affectedUrl.trim() || undefined,
        businessImpact,
        priority,
        desiredDate: desiredDate || undefined,
        bugDetails:
          category === "bug"
            ? {
                expectedBehavior: expectedBehavior.trim(),
                actualBehavior: actualBehavior.trim(),
                reproductionSteps: reproductionSteps.trim(),
                deviceBrowser: deviceBrowser.trim() || undefined,
              }
            : undefined,
      };

      const res = await fetch("/api/portal/requests", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {success?: boolean; error?: string; request?: {id: string}};
      if (!res.ok || !data.success || !data.request) {
        setErrorMsg(data.error || "Failed to submit request.");
        setIsSubmitting(false);
        return;
      }

      // Clear draft on successful submission
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // Ignore
      }

      router.push(`/portal/requests/${data.request.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setErrorMsg(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          className="text-xs font-semibold text-ink/60 hover:text-ink focus-visible:outline-1 focus-visible:outline-teal"
          href="/portal/requests"
        >
          &larr; Back to Requests
        </Link>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2">
          Submit New Request
        </h1>
        <p className="text-xs text-ink/65 mt-1">
          Request design updates, content modifications, technical fixes, or scope additions.
        </p>
      </div>

      <form className="space-y-6 bg-white border border-ink/15 rounded-2xl p-6 sm:p-8 shadow-xs" onSubmit={handleSubmit}>
        {/* Project Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5" htmlFor="project-select">
            Target Project <span className="text-red-600">*</span>
          </label>
          {isLoadingProjects ? (
            <div className="text-xs text-ink/50 py-2">Loading projects...</div>
          ) : (
            <select
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-canvas text-ink focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
              id="project-select"
              onChange={(e) => setSelectedProjectId(e.target.value)}
              required
              value={selectedProjectId}
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.domain ? `(${p.domain})` : ""}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Category Picker */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
            Request Category <span className="text-red-600">*</span>
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              {id: "content", label: "Content Update", desc: "Text, copy, images"},
              {id: "design", label: "Design Update", desc: "Layout, colors, visual"},
              {id: "bug", label: "Bug / Fix", desc: "Broken features, errors"},
              {id: "feature", label: "New Feature", desc: "New pages or modules"},
              {id: "service", label: "Service Scope", desc: "Strategy, advisory"},
              {id: "performance", label: "Performance / A11y", desc: "Speed, accessibility"},
              {id: "other", label: "Other", desc: "General inquiry"},
            ].map((cat) => {
              const selected = category === cat.id;
              return (
                <button
                  aria-pressed={selected}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-teal ${
                    selected
                      ? "border-teal bg-teal/10 text-ink shadow-2xs font-semibold"
                      : "border-ink/15 hover:border-ink/30 text-ink/75"
                  }`}
                  key={cat.id}
                  onClick={() => setCategory(cat.id as RequestCategory)}
                  type="button"
                >
                  <span className="block font-bold">{cat.label}</span>
                  <span className="block text-[11px] text-ink/50 mt-0.5">{cat.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5" htmlFor="request-title">
            Request Title <span className="text-red-600">*</span>
          </label>
          <input
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-canvas text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
            id="request-title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Update Executive Bio on About Page"
            required
            type="text"
            value={title}
          />
        </div>

        {/* Affected URL */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5" htmlFor="affected-url">
            Affected Webpage / URL
          </label>
          <input
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-canvas text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
            id="affected-url"
            onChange={(e) => setAffectedUrl(e.target.value)}
            placeholder="https://yourwebsite.com/page-to-change"
            type="url"
            value={affectedUrl}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5" htmlFor="request-desc">
            Detailed Description <span className="text-red-600">*</span>
          </label>
          <textarea
            className="w-full min-h-[120px] px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-canvas text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
            id="request-desc"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the requested change, context, or business objective..."
            required
            rows={4}
            value={description}
          />
          <p className="text-[11px] text-ink/50 mt-1">
            Draft text is preserved automatically in your browser.
          </p>
        </div>

        {/* Conditional Bug Details Section */}
        {category === "bug" ? (
          <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 space-y-4">
            <h3 className="font-display text-sm font-bold text-red-950 flex items-center gap-1.5">
              <span>🐞</span>
              <span>Bug Reproduction Details</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-red-950 mb-1" htmlFor="expected-behavior">
                Expected Behavior
              </label>
              <textarea
                className="w-full p-2.5 text-xs rounded-lg border border-red-300 bg-white text-ink placeholder:text-ink/40 focus:border-red-600 focus-visible:outline-hidden"
                id="expected-behavior"
                onChange={(e) => setExpectedBehavior(e.target.value)}
                placeholder="What did you expect to happen?"
                rows={2}
                value={expectedBehavior}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-red-950 mb-1" htmlFor="actual-behavior">
                Actual Behavior
              </label>
              <textarea
                className="w-full p-2.5 text-xs rounded-lg border border-red-300 bg-white text-ink placeholder:text-ink/40 focus:border-red-600 focus-visible:outline-hidden"
                id="actual-behavior"
                onChange={(e) => setActualBehavior(e.target.value)}
                placeholder="What actually occurred or failed?"
                rows={2}
                value={actualBehavior}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-red-950 mb-1" htmlFor="repro-steps">
                Steps to Reproduce
              </label>
              <textarea
                className="w-full p-2.5 text-xs rounded-lg border border-red-300 bg-white text-ink placeholder:text-ink/40 focus:border-red-600 focus-visible:outline-hidden"
                id="repro-steps"
                onChange={(e) => setReproductionSteps(e.target.value)}
                placeholder="1. Go to page...&#10;2. Click on...&#10;3. Observe error..."
                rows={3}
                value={reproductionSteps}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-red-950 mb-1" htmlFor="device-browser">
                Device / Browser (if known)
              </label>
              <input
                className="w-full px-3 py-2 text-xs rounded-lg border border-red-300 bg-white text-ink placeholder:text-ink/40 focus:border-red-600 focus-visible:outline-hidden"
                id="device-browser"
                onChange={(e) => setDeviceBrowser(e.target.value)}
                placeholder="e.g. iPhone 15 / Safari 18, Windows 11 / Chrome 128"
                type="text"
                value={deviceBrowser}
              />
            </div>
          </div>
        ) : null}

        {/* Business Impact & Priority Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5" htmlFor="business-impact">
              Business Impact
            </label>
            <select
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-canvas text-ink focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
              id="business-impact"
              onChange={(e) => setBusinessImpact(e.target.value as BusinessImpact)}
              value={businessImpact}
            >
              <option value="low">Low (Minor enhancement)</option>
              <option value="medium">Medium (Standard business priority)</option>
              <option value="high">High (High visibility or time sensitive)</option>
              <option value="critical">Critical (Blocking client operations)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5" htmlFor="desired-date">
              Desired Delivery Date
            </label>
            <input
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-ink/20 bg-canvas text-ink focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
              id="desired-date"
              onChange={(e) => setDesiredDate(e.target.value)}
              type="date"
              value={desiredDate}
            />
            <p className="text-[10px] text-ink/50 mt-1 leading-tight">
              Desired date is a requested timeline for staff triage, not a guaranteed delivery commitment.
            </p>
          </div>
        </div>

        {/* File Attachments */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink" htmlFor="file-upload">
            Attachments (PNG, JPEG, WebP, PDF, TXT &bull; Max 10MB each, up to 5 files)
          </label>
          <div className="p-4 border-2 border-dashed border-ink/20 rounded-xl bg-ink/[0.01] text-center">
            <input
              accept=".png,.jpg,.jpeg,.webp,.pdf,.txt"
              className="hidden"
              id="file-upload"
              multiple
              onChange={handleFileChange}
              type="file"
            />
            <label
              className="inline-block px-4 py-2 rounded-lg bg-ink/10 hover:bg-ink/15 text-ink text-xs font-semibold cursor-pointer focus-within:outline-2 focus-within:outline-teal"
              htmlFor="file-upload"
            >
              Choose Files to Attach
            </label>
            <span className="block text-[11px] text-ink/50 mt-1">
              Do not attach passwords or sensitive production keys.
            </span>
          </div>

          {fileError ? (
            <p className="text-xs text-red-600 font-semibold">{fileError}</p>
          ) : null}

          {attachedFiles.length > 0 ? (
            <ul className="space-y-1 pt-2">
              {attachedFiles.map((file, idx) => (
                <li
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-ink/5 border border-ink/10"
                  key={idx}
                >
                  <span className="font-medium text-ink truncate max-w-[80%]">
                    {file.name} ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                  <button
                    aria-label={`Remove ${file.name}`}
                    className="text-red-600 hover:underline font-semibold cursor-pointer"
                    onClick={() => handleRemoveFile(idx)}
                    type="button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {errorMsg ? (
          <div aria-live="assertive" className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
            {errorMsg}
          </div>
        ) : null}

        {/* Submit Actions */}
        <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
          <Link
            className="text-xs text-ink/60 hover:text-ink hover:underline focus-visible:outline-1 focus-visible:outline-teal"
            href="/portal/requests"
          >
            Cancel
          </Link>

          <PortalButton
            disabled={isSubmitting || !title.trim() || !description.trim()}
            isLoading={isSubmitting}
            size="md"
            type="submit"
            variant="primary"
          >
            Submit Request
          </PortalButton>
        </div>
      </form>
    </div>
  );
}
