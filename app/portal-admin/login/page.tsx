"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        setError(payload?.message ?? "Incorrect password.");
        setIsSubmitting(false);
        return;
      }

      router.push("/portal-admin");
    } catch (err) {
      console.error(err);
      setError("A connection error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950 px-4">
      <div className="relative w-full max-w-md">
        {/* Glow effect background */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-xl transition duration-1000"></div>

        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">ChromaPages Request Portal</h1>
            <p className="mt-2 text-sm text-slate-400">Enter your administrator password to proceed.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••••••"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                autoComplete="current-password"
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm text-red-400" role="alert">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold text-white transition-all hover:translate-y-[-1px] hover:opacity-95 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
