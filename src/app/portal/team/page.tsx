"use client";

import React, {useEffect, useState} from "react";

import {PortalButton} from "@/components/portal/PortalButton";
import {PortalCard} from "@/components/portal/PortalCard";
import {PortalModal} from "@/components/portal/PortalModal";
import type {Invitation, Membership, UserRole} from "@/lib/portal/types";

export default function PortalTeamPage() {
  const [members, setMembers] = useState<Membership[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("client_member");
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [inviteError, setInviteError] = useState("");

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const [orgRes, invRes] = await Promise.all([
          fetch("/api/portal/organizations"),
          fetch("/api/portal/invitations"),
        ]);

        const orgData = (await orgRes.json()) as {members?: Membership[]};
        const invData = (await invRes.json()) as {invitations?: Invitation[]};

        if (!ignore && orgData.members) setMembers(orgData.members);
        if (!ignore && invData.invitations) setInvitations(invData.invitations);
      } catch {
        // Fallback
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    void load();
    return () => {
      ignore = true;
    };
  }, []);

  const refreshTeamData = async () => {
    try {
      const [orgRes, invRes] = await Promise.all([
        fetch("/api/portal/organizations"),
        fetch("/api/portal/invitations"),
      ]);

      const orgData = (await orgRes.json()) as {members?: Membership[]};
      const invData = (await invRes.json()) as {invitations?: Invitation[]};

      if (orgData.members) setMembers(orgData.members);
      if (invData.invitations) setInvitations(invData.invitations);
    } catch {
      // Fallback
    }
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || isSendingInvite) return;

    setIsSendingInvite(true);
    setInviteError("");

    try {
      const res = await fetch("/api/portal/invitations", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: inviteEmail.trim(), role: inviteRole}),
      });

      const data = (await res.json()) as {success?: boolean; error?: string};
      if (!res.ok || !data.success) {
        setInviteError(data.error || "Failed to dispatch invitation.");
        return;
      }

      setIsInviteModalOpen(false);
      setInviteEmail("");
      await refreshTeamData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setInviteError(msg);
    } finally {
      setIsSendingInvite(false);
    }
  };

  const handleRevoke = async (invitationId: string) => {
    if (!confirm("Are you sure you want to revoke this invitation?")) return;

    try {
      await fetch("/api/portal/invitations", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({action: "revoke", invitationId}),
      });
      await refreshTeamData();
    } catch {
      alert("Failed to revoke invitation.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Team & Access</h1>
          <p className="text-xs text-ink/65 mt-0.5">
            Manage client organization members, approvers, and pending access invitations.
          </p>
        </div>

        <PortalButton
          onClick={() => setIsInviteModalOpen(true)}
          size="sm"
          variant="primary"
        >
          <span>+</span>
          <span>Invite Member</span>
        </PortalButton>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-ink/50">Loading team roster...</div>
      ) : (
        <div className="space-y-6">
          {/* Active Members Card */}
          <PortalCard title={`Active Members (${members.length})`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-ink/10 text-ink/50 uppercase tracking-wider font-semibold">
                    <th className="py-2.5 pr-4">Name</th>
                    <th className="py-2.5 pr-4">Email</th>
                    <th className="py-2.5 pr-4">Role</th>
                    <th className="py-2.5 text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {members.map((m) => (
                    <tr className="hover:bg-ink/[0.02]" key={m.id}>
                      <td className="py-3 pr-4 font-bold text-ink">{m.displayName}</td>
                      <td className="py-3 pr-4 text-ink/70 font-mono text-[11px]">{m.email}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            m.role === "client_owner"
                              ? "bg-teal/15 text-teal border border-teal/20"
                              : "bg-ink/5 text-ink/70 border border-ink/10"
                          }`}
                        >
                          {m.role === "client_owner" ? "Client Owner / Approver" : "Member"}
                        </span>
                      </td>
                      <td className="py-3 text-right text-ink/50">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PortalCard>

          {/* Pending Invitations Card */}
          <PortalCard
            subtitle="Single-use, expiring invitations dispatched to prospective members."
            title={`Pending Invitations (${invitations.length})`}
          >
            {invitations.length === 0 ? (
              <p className="text-xs text-ink/50 italic py-2">No pending invitations.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-ink/10 text-ink/50 uppercase tracking-wider font-semibold">
                      <th className="py-2.5 pr-4">Invited Email</th>
                      <th className="py-2.5 pr-4">Intended Role</th>
                      <th className="py-2.5 pr-4">Expires</th>
                      <th className="py-2.5 pr-4">Invited By</th>
                      <th className="py-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {invitations.map((inv) => (
                      <tr className="hover:bg-ink/[0.02]" key={inv.id}>
                        <td className="py-3 pr-4 font-mono text-[11px] font-bold text-ink">{inv.invitedEmail}</td>
                        <td className="py-3 pr-4 capitalize">{inv.role.replace("_", " ")}</td>
                        <td className="py-3 pr-4 text-ink/60">
                          {new Date(inv.expiresAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 pr-4 text-ink/60">{inv.createdByName}</td>
                        <td className="py-3 text-right">
                          <button
                            className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                            onClick={() => handleRevoke(inv.id)}
                            type="button"
                          >
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </PortalCard>
        </div>
      )}

      {/* Invite Member Modal */}
      <PortalModal
        description="Invited contacts will receive a secure email invitation with a one-time onboarding link."
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite New Team Member"
      >
        <form className="space-y-4" onSubmit={handleSendInvite}>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1" htmlFor="invite-email">
              Colleague Email Address <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink placeholder:text-ink/40 focus:border-teal focus-visible:outline-hidden"
              id="invite-email"
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@yourcompany.com"
              required
              type="email"
              value={inviteEmail}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1" htmlFor="invite-role">
              Permissions Role
            </label>
            <select
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-ink/20 bg-canvas text-ink focus:border-teal focus-visible:outline-hidden"
              id="invite-role"
              onChange={(e) => setInviteRole(e.target.value as UserRole)}
              value={inviteRole}
            >
              <option value="client_member">Client Member (Submit, discuss, track work)</option>
              <option value="client_owner">Client Owner / Approver (Can approve estimates & deliverables)</option>
            </select>
          </div>

          {inviteError ? (
            <p className="text-xs text-red-600 font-semibold">{inviteError}</p>
          ) : null}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-ink/10">
            <PortalButton
              disabled={isSendingInvite}
              onClick={() => setIsInviteModalOpen(false)}
              size="sm"
              variant="ghost"
            >
              Cancel
            </PortalButton>
            <PortalButton
              disabled={!inviteEmail.trim() || isSendingInvite}
              isLoading={isSendingInvite}
              size="sm"
              type="submit"
              variant="primary"
            >
              Dispatch Invitation
            </PortalButton>
          </div>
        </form>
      </PortalModal>
    </div>
  );
}
