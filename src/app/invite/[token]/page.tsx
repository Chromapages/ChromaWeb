"use client";

import Image from "next/image";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import React, {useState} from "react";

import {PortalButton} from "@/components/portal/PortalButton";

export default function AcceptInvitationPage() {
  const params = useParams<{token: string}>();
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/portal/invitations/accept", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          token: params.token,
          displayName: displayName.trim(),
          password,
        }),
      });

      const data = (await res.json()) as {success?: boolean; error?: string};
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to accept invitation.");
        return;
      }

      router.push("/portal");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-canvas">
      <div className="w-full max-w-md bg-canvas border border-ink/15 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <Link className="inline-block focus-visible:outline-2 focus-visible:outline-teal" href="/">
            <Image
              alt="Chromapages"
              className="h-7 w-auto mx-auto"
              height={28}
              priority
              src="/brand/chromapages-logo.svg"
              width={140}
            />
          </Link>
          <h1 className="mt-4 font-display text-xl font-bold text-ink">
            Join Your Workspace
          </h1>
          <p className="mt-1 text-xs text-ink/65">
            Accept invitation and establish your account credentials
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1" htmlFor="display-name">
              Full Name
            </label>
            <input
              autoComplete="name"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-white text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
              id="display-name"
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Claire Tanaka"
              required
              type="text"
              value={displayName}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1" htmlFor="new-password">
              Create Password (min. 8 characters)
            </label>
            <input
              autoComplete="new-password"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-white text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
              id="new-password"
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              type="password"
              value={password}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              autoComplete="new-password"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-white text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
              id="confirm-password"
              minLength={8}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              type="password"
              value={confirmPassword}
            />
          </div>

          {errorMsg ? (
            <div
              aria-live="assertive"
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium"
            >
              {errorMsg}
            </div>
          ) : null}

          <PortalButton
            className="w-full"
            disabled={isLoading}
            isLoading={isLoading}
            size="md"
            type="submit"
            variant="primary"
          >
            Accept Invitation & Open Workspace
          </PortalButton>
        </form>
      </div>
    </main>
  );
}
