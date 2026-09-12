"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";

import {PortalButton} from "@/components/portal/PortalButton";
import {PortalCard} from "@/components/portal/PortalCard";
import {PortalModal} from "@/components/portal/PortalModal";
import type {Organization} from "@/lib/portal/types";

export default function StaffClientsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Organization Modal
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgDomain, setNewOrgDomain] = useState("");
  const [isSubmittingOrg, setIsSubmittingOrg] = useState(false);

  // New Project Modal
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);
  const [targetOrgId, setTargetOrgId] = useState("");
  const [newProjName, setNewProjName] = useState("");
  const [newProjDomain, setNewProjDomain] = useState("");
  const [isSubmittingProj, setIsSubmittingProj] = useState(false);

  const loadData = async () => {
    try {
      const orgRes = await fetch("/api/portal/organizations?all=true");
      const orgData = (await orgRes.json()) as {organizations?: Organization[]};
      if (orgData.organizations) {
        setOrganizations(orgData.organizations);
        if (orgData.organizations.length > 0) {
          setTargetOrgId(orgData.organizations[0]?.id || "");
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchClients = async () => {
      try {
        const orgRes = await fetch("/api/portal/organizations?all=true");
        const orgData = (await orgRes.json()) as {organizations?: Organization[]};
        if (!ignore && orgData.organizations) {
          setOrganizations(orgData.organizations);
          if (orgData.organizations.length > 0) {
            setTargetOrgId(orgData.organizations[0]?.id || "");
          }
        }
      } catch {
        // Fallback
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    void fetchClients();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName.trim() || isSubmittingOrg) return;

    setIsSubmittingOrg(true);
    try {
      const res = await fetch("/api/portal/organizations", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "create_org",
          name: newOrgName.trim(),
          domain: newOrgDomain.trim() || undefined,
        }),
      });

      const data = (await res.json()) as {success?: boolean; error?: string};
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to create organization");
        return;
      }

      setIsOrgModalOpen(false);
      setNewOrgName("");
      setNewOrgDomain("");
      await loadData();
    } catch {
      alert("Network error creating organization.");
    } finally {
      setIsSubmittingOrg(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim() || !targetOrgId || isSubmittingProj) return;

    setIsSubmittingProj(true);
    try {
      const res = await fetch("/api/portal/organizations", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "create_project",
          organizationId: targetOrgId,
          name: newProjName.trim(),
          domain: newProjDomain.trim() || undefined,
        }),
      });

      const data = (await res.json()) as {success?: boolean; error?: string};
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to add project");
        return;
      }

      setIsProjModalOpen(false);
      setNewProjName("");
      setNewProjDomain("");
      await loadData();
    } catch {
      alert("Network error creating project.");
    } finally {
      setIsSubmittingProj(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Client Organizations</h1>
          <p className="text-xs text-ink/65 mt-0.5">
            Provision and configure client accounts and digital project targets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PortalButton
            onClick={() => setIsOrgModalOpen(true)}
            size="sm"
            variant="outline"
          >
            + New Client
          </PortalButton>
          <PortalButton
            onClick={() => setIsProjModalOpen(true)}
            size="sm"
            variant="primary"
          >
            + Add Project
          </PortalButton>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-ink/50">Loading clients...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {organizations.map((org) => (
            <PortalCard
              badge={
                <span className="font-mono text-[10px] text-indigo bg-indigo/10 border border-indigo/20 px-2 py-0.5 rounded">
                  {org.slug}
                </span>
              }
              headerAction={
                <Link
                  className="text-xs font-semibold text-indigo hover:underline"
                  href={`/admin?orgId=${org.id}`}
                >
                  View Queue &rarr;
                </Link>
              }
              key={org.id}
              subtitle={`Created ${new Date(org.createdAt).toLocaleDateString()}`}
              title={org.name}
            >
              <div className="space-y-3 text-xs">
                {org.domain ? (
                  <div>
                    <span className="text-ink/50 block uppercase font-bold text-[10px]">Domain:</span>
                    <span className="font-semibold text-ink">{org.domain}</span>
                  </div>
                ) : null}

                <div className="pt-2 border-t border-ink/10 flex items-center justify-between">
                  <span className="text-ink/60">Organization ID:</span>
                  <span className="font-mono text-[11px] text-ink/80">{org.id}</span>
                </div>
              </div>
            </PortalCard>
          ))}
        </div>
      )}

      {/* Create Org Modal */}
      <PortalModal
        description="Set up a new client workspace to invite stakeholder contacts."
        isOpen={isOrgModalOpen}
        onClose={() => setIsOrgModalOpen(false)}
        title="Provision New Client Organization"
      >
        <form className="space-y-4 text-xs" onSubmit={handleCreateOrg}>
          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="org-name">
              Organization Name <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="org-name"
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="e.g. Sterling Architectural Group"
              required
              type="text"
              value={newOrgName}
            />
          </div>

          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="org-domain">
              Primary Domain
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="org-domain"
              onChange={(e) => setNewOrgDomain(e.target.value)}
              placeholder="sterlingarchitects.com"
              type="text"
              value={newOrgDomain}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-ink/10">
            <PortalButton
              disabled={isSubmittingOrg}
              onClick={() => setIsOrgModalOpen(false)}
              size="sm"
              variant="ghost"
            >
              Cancel
            </PortalButton>
            <PortalButton
              disabled={!newOrgName.trim() || isSubmittingOrg}
              isLoading={isSubmittingOrg}
              size="sm"
              type="submit"
              variant="primary"
            >
              Create Organization
            </PortalButton>
          </div>
        </form>
      </PortalModal>

      {/* Add Project Modal */}
      <PortalModal
        description="Attach an active website or application deliverable to a client organization."
        isOpen={isProjModalOpen}
        onClose={() => setIsProjModalOpen(false)}
        title="Add Website or Project Target"
      >
        <form className="space-y-4 text-xs" onSubmit={handleCreateProject}>
          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="proj-org">
              Client Organization <span className="text-red-600">*</span>
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="proj-org"
              onChange={(e) => setTargetOrgId(e.target.value)}
              value={targetOrgId}
            >
              {organizations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="proj-name">
              Project / Website Name <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="proj-name"
              onChange={(e) => setNewProjName(e.target.value)}
              placeholder="e.g. Marketing Redesign & CMS"
              required
              type="text"
              value={newProjName}
            />
          </div>

          <div>
            <label className="block font-semibold text-ink mb-1" htmlFor="proj-domain">
              Project Domain
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-ink/20 bg-canvas text-ink focus:border-indigo focus-visible:outline-hidden"
              id="proj-domain"
              onChange={(e) => setNewProjDomain(e.target.value)}
              placeholder="staging.client.com"
              type="text"
              value={newProjDomain}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-ink/10">
            <PortalButton
              disabled={isSubmittingProj}
              onClick={() => setIsProjModalOpen(false)}
              size="sm"
              variant="ghost"
            >
              Cancel
            </PortalButton>
            <PortalButton
              disabled={!newProjName.trim() || !targetOrgId || isSubmittingProj}
              isLoading={isSubmittingProj}
              size="sm"
              type="submit"
              variant="primary"
            >
              Add Project
            </PortalButton>
          </div>
        </form>
      </PortalModal>
    </div>
  );
}
