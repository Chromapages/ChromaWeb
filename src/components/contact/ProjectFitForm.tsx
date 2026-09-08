"use client";

import {useActionState} from "react";
import {submitProjectFit, type ProjectFitState} from "@/app/contact/actions";
import {ChromaEdge} from "@/components/ui/ChromaEdge";

const initialState: ProjectFitState = {
  success: false,
};

export function ProjectFitForm({available = true, notice}: {available?: boolean; notice?: string | null}) {
  const [state, formAction, isPending] = useActionState(submitProjectFit, initialState);

  if (state.success) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-teal/40 bg-paper p-8 text-ink shadow-[0_12px_32px_rgba(35,105,140,0.08)] sm:p-12">
        <ChromaEdge />
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold tracking-wide text-teal uppercase">
            Inquiry Verified
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl text-ink">
            Project Fit Submitted.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/80">
            {state.message}
          </p>
          <div className="mt-8 rounded-lg bg-ink/[0.03] p-5 text-sm text-ink/70">
            <h3 className="font-semibold text-ink">What happens next:</h3>
            <ul className="mt-2 space-y-1.5 list-disc pl-4 text-xs">
              <li>Review current digital footprint against stated goals</li>
              <li>Evaluate scope fit & initial commercial parameters</li>
              <li>Partner direct response within 24 business hours</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} aria-describedby={available ? undefined : "project-fit-unavailable-notice"} className="relative rounded-xl border border-ink/15 bg-paper p-6 sm:p-10 shadow-[0_1px_3px_rgba(15,17,21,0.04)]">
      {/* Anti-spam Honeypot Field */}
      <input type="text" name="hpField" className="hidden" tabIndex={-1} autoComplete="off" />

      {!available ? (
        <div id="project-fit-unavailable-notice" role="status" className="mb-8 rounded-lg border border-teal/20 bg-teal/5 p-4 text-sm leading-6 text-ink/75">
          {notice ?? "Project-fit submissions are temporarily unavailable. Please check back soon."}
        </div>
      ) : null}

      {state.message && !state.success ? (
        <div role="alert" className="mb-8 rounded-lg border border-red-500/20 bg-red-50 p-4 text-sm font-medium text-red-800">
          {state.message}
        </div>
      ) : null}

      <fieldset disabled={!available} className="space-y-8 disabled:opacity-60">
        {/* Section 1: Business Context */}
        <fieldset className="grid gap-6 border-b border-ink/10 pb-8">
          <legend className="font-display text-lg font-semibold text-ink">
            01 / Business Context
          </legend>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
              Your Full Name *
              <input
                required
                name="name"
                type="text"
                placeholder="Jane Doe"
                className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              />
              {state.errors?.name ? (
                <span className="text-xs font-normal text-red-600">{state.errors.name[0]}</span>
              ) : null}
            </label>

            <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
              Work Email *
              <input
                required
                name="email"
                type="email"
                placeholder="jane@company.com"
                className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              />
              {state.errors?.email ? (
                <span className="text-xs font-normal text-red-600">{state.errors.email[0]}</span>
              ) : null}
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
              Company / Firm Name *
              <input
                required
                name="company"
                type="text"
                placeholder="Apex Advisory Group"
                className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              />
              {state.errors?.company ? (
                <span className="text-xs font-normal text-red-600">{state.errors.company[0]}</span>
              ) : null}
            </label>

            <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
              Current Website URL
              <input
                name="website"
                type="text"
                placeholder="https://company.com"
                className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              />
            </label>
          </div>

          <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
            Industry / Sector *
            <select
              required
              name="industry"
              defaultValue="accounting-advisory"
              className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            >
              <option value="accounting-advisory">Tax, Accounting & Advisory</option>
              <option value="restaurant-qsr">Restaurant & QSR Growth Brands</option>
              <option value="professional-services">B2B Professional Services / Consulting</option>
              <option value="insurance">Insurance & Financial Risk</option>
              <option value="hospitality">Multi-Location Hospitality & Venues</option>
              <option value="contractor-trades">Contractors & Trade Services (BuiltExpert)</option>
              <option value="nonprofit-church">Churches & Non-Profits (ServeStrategy)</option>
              <option value="other">Other Service Business</option>
            </select>
          </label>
        </fieldset>

        {/* Section 2: Trigger & Tension */}
        <fieldset className="grid gap-6 border-b border-ink/10 pb-8">
          <legend className="font-display text-lg font-semibold text-ink">
            02 / Trigger & Digital Mismatch
          </legend>

          <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
            What changed that makes the website important now? *
            <span className="text-[11px] font-normal normal-case text-ink/60">
              E.g., higher pricing, advisory repositioning, new locations, marketing campaigns, leadership frustration.
            </span>
            <textarea
              required
              name="trigger"
              rows={3}
              placeholder="We recently expanded into advisory services and raised our fees, but our website still looks like a basic tax filing office."
              className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            />
            {state.errors?.trigger ? (
              <span className="text-xs font-normal text-red-600">{state.errors.trigger[0]}</span>
            ) : null}
          </label>

          <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
            What should qualified visitors understand or do more clearly? *
            <textarea
              required
              name="desiredAction"
              rows={2}
              placeholder="Book a high-value consultation, understand our partner depth, and trust our pricing before the first call."
              className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            />
            {state.errors?.desiredAction ? (
              <span className="text-xs font-normal text-red-600">{state.errors.desiredAction[0]}</span>
            ) : null}
          </label>
        </fieldset>

        {/* Section 3: Engagement Scope & Parameters */}
        <fieldset className="grid gap-6 border-b border-ink/10 pb-8">
          <legend className="font-display text-lg font-semibold text-ink">
            03 / Engagement Parameters
          </legend>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
              Likely Service Interest *
              <select
                required
                name="serviceInterest"
                defaultValue="signature-website"
                className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              >
                <option value="signature-website">Signature Website ($18k–$35k)</option>
                <option value="landing-page-sprint">Landing Page Sprint ($6.5k–$12k)</option>
                <option value="digital-product-build">Digital Product Build ($40k–$100k+)</option>
                <option value="growth-partnership">Growth Partnership ($2.5k–$7.5k/mo)</option>
                <option value="digital-elevation-audit">Digital Elevation Audit ($2.5k–$5k)</option>
                <option value="unsure">Unsure / Need Advisory Guidance</option>
              </select>
            </label>

            <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
              Working Investment Range *
              <select
                required
                name="investmentRange"
                defaultValue="18k-35k"
                className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              >
                <option value="18k-35k">$18,000 – $35,000 (Signature Website)</option>
                <option value="6.5k-12k">$6,500 – $12,000 (Landing Page Sprint)</option>
                <option value="35k-75k">$35,000 – $75,000 (Multi-stage / Product)</option>
                <option value="2.5k-5k">$2,500 – $5,000 (Digital Elevation Audit)</option>
                <option value="flexible">Flexible / Scoped to Requirements</option>
              </select>
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
              Target Timeline *
              <select
                required
                name="timeline"
                defaultValue="1-3-months"
                className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              >
                <option value="immediate">Immediate (Ready to begin within 2–4 weeks)</option>
                <option value="1-3-months">1–3 Months</option>
                <option value="3-6-months">3–6 Months</option>
                <option value="exploratory">Exploratory / Planning Ahead</option>
              </select>
            </label>

            <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
              Decision Authority *
              <select
                required
                name="isDecisionMaker"
                defaultValue="yes"
                className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              >
                <option value="yes">Founder / Owner / Managing Principal</option>
                <option value="partner">Executive Partner / Leadership Committee</option>
                <option value="marketing-lead">Marketing or Operations Director</option>
                <option value="evaluating">Evaluating on behalf of leadership</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-xs font-semibold text-ink uppercase tracking-wide">
            Additional Context or Specific Notes
            <textarea
              name="notes"
              rows={2}
              placeholder="Any specific integrations, team requirements, or reference websites..."
              className="rounded-lg border border-ink/20 bg-canvas px-4 py-3 text-sm text-ink focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            />
          </label>
        </fieldset>

        {/* Submit Button */}
        <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
          <p className="text-xs text-ink/60">
            No spam. Direct review by senior partners.
          </p>
          <button
            type="submit"
            disabled={!available || isPending}
            className="inline-flex w-full items-center justify-center rounded-lg bg-teal px-8 py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-indigo disabled:opacity-50 sm:w-auto focus-visible:outline-2 focus-visible:outline-teal"
          >
            {!available ? "Inquiry form unavailable" : isPending ? "Submitting review..." : "Submit Project Fit Review →"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
