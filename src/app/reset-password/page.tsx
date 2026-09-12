"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";

import {PortalButton} from "@/components/portal/PortalButton";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
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
            Reset Your Password
          </h1>
          <p className="mt-1 text-xs text-ink/65">
            Enter your email to receive password reset instructions
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-4 text-center">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 leading-relaxed">
              If an active account exists for <strong>{email}</strong>, a secure password reset link has been dispatched to your inbox.
            </div>
            <Link
              className="inline-block text-sm font-semibold text-teal hover:underline focus-visible:outline-2 focus-visible:outline-teal"
              href="/login"
            >
              &larr; Return to Sign In
            </Link>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1" htmlFor="reset-email">
                Account Email
              </label>
              <input
                autoComplete="email"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink/20 bg-white text-ink placeholder:text-ink/40 focus:border-teal focus:ring-1 focus:ring-teal focus-visible:outline-hidden"
                id="reset-email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                type="email"
                value={email}
              />
            </div>

            <PortalButton
              className="w-full"
              disabled={isLoading}
              isLoading={isLoading}
              size="md"
              type="submit"
              variant="primary"
            >
              Send Reset Instructions
            </PortalButton>

            <div className="text-center pt-2">
              <Link
                className="text-xs text-ink/60 hover:text-ink hover:underline focus-visible:outline-1 focus-visible:outline-teal"
                href="/login"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
