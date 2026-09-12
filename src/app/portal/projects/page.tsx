"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";

import {PortalCard} from "@/components/portal/PortalCard";
import type {PortalRequest, Project} from "@/lib/portal/types";

export default function PortalProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [orgRes, reqRes] = await Promise.all([
          fetch("/api/portal/organizations"),
          fetch("/api/portal/requests"),
        ]);
        const orgData = (await orgRes.json()) as {projects?: Project[]};
        const reqData = (await reqRes.json()) as {requests?: PortalRequest[]};

        if (orgData.projects) setProjects(orgData.projects);
        if (reqData.requests) setRequests(reqData.requests);
      } catch {
        // Fallback
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Websites & Projects</h1>
          <p className="text-xs text-ink/65 mt-0.5">
            Websites and digital applications supported under your Chromapages agreement.
          </p>
        </div>

        <Link
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal text-white text-xs sm:text-sm font-semibold hover:bg-indigo transition-colors focus-visible:outline-2 focus-visible:outline-teal"
          href="/portal/requests/new"
        >
          <span>+</span>
          <span>New Scope for Project</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-ink/50">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-ink/20 rounded-xl bg-ink/[0.01]">
          <p className="text-sm font-medium text-ink/70">No projects configured yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => {
            const projRequests = requests.filter((r) => r.projectId === proj.id);
            const openCount = projRequests.filter((r) => r.status !== "completed" && r.status !== "cancelled").length;

            return (
              <PortalCard
                badge={
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-green-100 text-green-800">
                    {proj.status}
                  </span>
                }
                key={proj.id}
                title={proj.name}
              >
                <div className="space-y-4">
                  {proj.domain ? (
                    <div>
                      <span className="block text-[11px] text-ink/50 uppercase font-bold">Domain:</span>
                      <a
                        className="text-xs font-semibold text-teal hover:underline focus-visible:outline-1 focus-visible:outline-teal"
                        href={`https://${proj.domain}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {proj.domain} &nearr;
                      </a>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-ink/10 text-xs">
                    <div className="p-2.5 rounded bg-ink/5">
                      <span className="text-ink/60 block">Open Work:</span>
                      <strong className="text-base font-bold text-ink">{openCount}</strong>
                    </div>
                    <div className="p-2.5 rounded bg-ink/5">
                      <span className="text-ink/60 block">Total Requests:</span>
                      <strong className="text-base font-bold text-ink">{projRequests.length}</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      className="text-xs font-semibold text-teal hover:underline"
                      href={`/portal/requests?projectId=${proj.id}`}
                    >
                      View project requests &rarr;
                    </Link>
                  </div>
                </div>
              </PortalCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
