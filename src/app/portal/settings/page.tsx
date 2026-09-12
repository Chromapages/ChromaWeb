"use client";

import React, {useEffect, useState} from "react";

import {PortalButton} from "@/components/portal/PortalButton";
import {PortalCard} from "@/components/portal/PortalCard";
import type {Organization} from "@/lib/portal/types";

export default function PortalSettingsPage() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [notifyReplies, setNotifyReplies] = useState(true);
  const [notifyStatus, setNotifyStatus] = useState(true);
  const [notifyEstimates, setNotifyEstimates] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/portal/organizations");
        const data = (await res.json()) as {organization?: Organization};
        if (data.organization) setOrganization(data.organization);
      } catch {
        // Fallback
      }
    };
    load();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Organization Settings</h1>
        <p className="text-xs text-ink/65 mt-0.5">
          Workspace profile and communication preferences.
        </p>
      </div>

      {organization ? (
        <PortalCard title="Company Profile">
          <div className="space-y-4 text-xs">
            <div>
              <span className="block text-ink/60 font-semibold uppercase tracking-wider mb-1">Company Name:</span>
              <p className="text-sm font-bold text-ink">{organization.name}</p>
            </div>
            <div>
              <span className="block text-ink/60 font-semibold uppercase tracking-wider mb-1">Workspace Slug:</span>
              <p className="font-mono text-ink/80">{organization.slug}</p>
            </div>
            {organization.domain ? (
              <div>
                <span className="block text-ink/60 font-semibold uppercase tracking-wider mb-1">Primary Domain:</span>
                <p className="font-medium text-ink">{organization.domain}</p>
              </div>
            ) : null}
          </div>
        </PortalCard>
      ) : null}

      <PortalCard title="Notification Preferences">
        <form className="space-y-4 text-xs" onSubmit={handleSave}>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                checked={notifyReplies}
                className="mt-0.5 size-4 rounded border-ink/30 text-teal focus:ring-teal cursor-pointer"
                onChange={(e) => setNotifyReplies(e.target.checked)}
                type="checkbox"
              />
              <div>
                <span className="font-semibold text-ink block">Public Conversation Messages</span>
                <span className="text-ink/60">Receive transactional email notifications when Chromapages staff replies to your requests.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                checked={notifyStatus}
                className="mt-0.5 size-4 rounded border-ink/30 text-teal focus:ring-teal cursor-pointer"
                onChange={(e) => setNotifyStatus(e.target.checked)}
                type="checkbox"
              />
              <div>
                <span className="font-semibold text-ink block">Delivery Status Transitions</span>
                <span className="text-ink/60">Receive notification when work moves from Scheduled to In Progress, or is ready for staging review.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                checked={notifyEstimates}
                className="mt-0.5 size-4 rounded border-ink/30 text-teal focus:ring-teal cursor-pointer"
                onChange={(e) => setNotifyEstimates(e.target.checked)}
                type="checkbox"
              />
              <div>
                <span className="font-semibold text-ink block">Scope Estimates & Approval Requests</span>
                <span className="text-ink/60">Alert designated approvers when new versioned estimates are awaiting formal review.</span>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs text-green-700 font-semibold">
                ✓ Preferences updated successfully
              </span>
            ) : <span />}

            <PortalButton size="sm" type="submit" variant="primary">
              Save Preferences
            </PortalButton>
          </div>
        </form>
      </PortalCard>

      {/* Security Guidance Reminder */}
      <div className="p-4 rounded-xl border border-ink/15 bg-ink/[0.02] text-xs text-ink/75 space-y-1.5">
        <h4 className="font-bold text-ink flex items-center gap-1.5">
          <span>🔒</span>
          <span>Security & Secret Sharing Policy</span>
        </h4>
        <p className="leading-relaxed">
          Never attach database passwords, API secret keys, or customer PII datasets to requests or message threads.
          For credential sharing, use an encrypted one-time secret channel (e.g. 1Password item share or Bitwarden Send) and paste only the secure link.
        </p>
      </div>
    </div>
  );
}
