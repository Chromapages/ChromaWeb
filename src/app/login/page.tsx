"use client";

import Image from "next/image";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useState, Suspense} from "react";

import {PortalButton} from "@/components/portal/PortalButton";

const LoginFormInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: email.trim(), password}),
      });

      const data = (await res.json()) as {success?: boolean; error?: string; session?: {isStaff?: boolean}};
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Login failed. Please check your credentials.");
        return;
      }

      // If user is staff and no specific redirect was requested, direct to /admin
      let destination = redirectUrl;
      if (destination === "/portal" && data.session?.isStaff) {
        destination = "/admin";
      }

      router.push(destination);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword("password123");
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <Link
          aria-label="Back to ChromaPages main website"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-ink/70 hover:text-teal hover:bg-ink/5 transition-colors focus-visible:outline-2 focus-visible:outline-teal"
          href="/"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back to website</span>
        </Link>
      </div>

      <div className="bg-canvas border border-ink/15 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <Link
            aria-label="Chromapages homepage"
            className="inline-block focus-visible:outline-2 focus-visible:outline-teal rounded-lg"
            href="/"
          >
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
            Workspace Sign In
          </h1>
          <p className="mt-1 text-xs text-ink/65">
            Access your client portal or staff delivery queue
          </p>
        </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold text-ink mb-1" htmlFor="email-input">
            Email Address
          </label>
          <input
            autoComplete="email"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-white text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
            id="email-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            type="email"
            value={email}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-ink" htmlFor="password-input">
              Password
            </label>
            <Link
              className="text-xs text-teal hover:underline focus-visible:outline-1 focus-visible:outline-teal"
              href="/reset-password"
            >
              Forgot password?
            </Link>
          </div>
          <input
            autoComplete="current-password"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-white text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
            id="password-input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            type="password"
            value={password}
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
          Sign In
        </PortalButton>
      </form>

      {/* Development Quick Role Switcher */}
      <div className="mt-8 pt-6 border-t border-ink/10">
        <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50 text-center mb-2.5">
          Quick-Fill Test Accounts
        </p>
        <div className="grid grid-cols-1 gap-1.5 text-left text-xs">
          <button
            className="px-2.5 py-1.5 rounded-md border border-ink/10 hover:bg-ink/5 text-ink/80 flex items-center justify-between cursor-pointer"
            onClick={() => handleQuickLogin("sarah.jenkins@apexlegal.example.com")}
            type="button"
          >
            <span>Sarah Jenkins (Apex Owner)</span>
            <span className="text-[10px] text-teal font-semibold">Client Owner</span>
          </button>
          <button
            className="px-2.5 py-1.5 rounded-md border border-ink/10 hover:bg-ink/5 text-ink/80 flex items-center justify-between cursor-pointer"
            onClick={() => handleQuickLogin("marcus.vance@apexlegal.example.com")}
            type="button"
          >
            <span>Marcus Vance (Apex Member)</span>
            <span className="text-[10px] text-ink/60 font-semibold">Client Member</span>
          </button>
          <button
            className="px-2.5 py-1.5 rounded-md border border-ink/10 hover:bg-ink/5 text-ink/80 flex items-center justify-between cursor-pointer"
            onClick={() => handleQuickLogin("elena.rostova@beaconwealth.example.com")}
            type="button"
          >
            <span>Elena Rostova (Beacon Wealth)</span>
            <span className="text-[10px] text-purple-700 font-semibold">Org B Owner</span>
          </button>
          <button
            className="px-2.5 py-1.5 rounded-md border border-ink/10 hover:bg-ink/5 text-ink/80 flex items-center justify-between cursor-pointer"
            onClick={() => handleQuickLogin("alex.morales@chromapages.com")}
            type="button"
          >
            <span>Alex Morales (Staff Delivery)</span>
            <span className="text-[10px] text-indigo font-semibold">Studio Staff</span>
          </button>
          <button
            className="px-2.5 py-1.5 rounded-md border border-ink/10 hover:bg-ink/5 text-ink/80 flex items-center justify-between cursor-pointer"
            onClick={() => handleQuickLogin("devin.cross@chromapages.com")}
            type="button"
          >
            <span>Devin Cross (Admin Lead)</span>
            <span className="text-[10px] text-indigo font-bold">Studio Admin</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

const LoginPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-canvas">
      <Suspense fallback={<div className="text-xs text-ink/50">Loading sign in...</div>}>
        <LoginFormInner />
      </Suspense>
    </main>
  );
};

export default LoginPage;
