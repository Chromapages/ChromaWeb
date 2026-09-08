"use client";

import {useState, useRef, useEffect} from "react";
import Link from "next/link";
import {ChromaEdge} from "@/components/ui/ChromaEdge";

interface QuestionOption {
  id: string;
  label: string;
  sublabel: string;
  isNotSure?: boolean;
}

interface Question {
  id: "timeline" | "scope" | "outcome";
  prompt: string;
  options: QuestionOption[];
}

const questions: Question[] = [
  {
    id: "timeline",
    prompt: "1. What is your target delivery timeline?",
    options: [
      {
        id: "urgent",
        label: "Urgent campaign launch in 2–3 weeks",
        sublabel: "Time-boxed conversion sprint aligned to an immediate marketing or launch date.",
      },
      {
        id: "standard",
        label: "Standard strategic rebuild in 8–12 weeks",
        sublabel: "Comprehensive strategy, custom design, engineering, and content systems.",
      },
      {
        id: "phased",
        label: "Phased milestone delivery over 3–6+ months",
        sublabel: "Paid technical discovery followed by agile sprint-based custom product releases.",
      },
      {
        id: "flexible",
        label: "Ongoing monthly capacity (Continuous retainer)",
        sublabel: "Dedicated 20–60h monthly design & engineering capacity for existing live builds.",
      },
      {
        id: "unsure",
        label: "Not sure / Timeline depends on our scope & budget",
        sublabel: "We need objective diagnostic guidance to define realistic milestones first.",
        isNotSure: true,
      },
    ],
  },
  {
    id: "scope",
    prompt: "2. How well-defined is your technical and content scope?",
    options: [
      {
        id: "landing",
        label: "Single focused offer or landing page",
        sublabel: "A tightly scoped conversion destination engineered for paid acquisition with zero distractions.",
      },
      {
        id: "full_site",
        label: "Complete multi-page company website",
        sublabel: "Brand elevation, commercial repositioning, new information architecture, and content migration.",
      },
      {
        id: "custom_app",
        label: "Custom web application, portal, or workflow tools",
        sublabel: "Authentication, proprietary client dashboards, database schemas, or third-party integrations.",
      },
      {
        id: "existing_build",
        label: "Live Chromapages build needing continuous evolution",
        sublabel: "Conversion rate optimization, A/B testing, new pages, and component library expansion.",
      },
      {
        id: "unsure",
        label: "Not sure / We need diagnostic help defining our scope",
        sublabel: "We suspect conversion leaks or technical debt but lack empirical diagnostic data.",
        isNotSure: true,
      },
    ],
  },
  {
    id: "outcome",
    prompt: "3. What is your primary commercial objective?",
    options: [
      {
        id: "campaign_roi",
        label: "Maximize conversion rate on a specific campaign",
        sublabel: "Direct traffic to an uncompromising single-funnel destination with zero leak points.",
      },
      {
        id: "market_stature",
        label: "Command higher pricing & reflect partner-level market stature",
        sublabel: "An institutional-grade flagship that builds instant executive trust and closes high-value deals.",
      },
      {
        id: "automate_systems",
        label: "Automate operations & provide client self-service tools",
        sublabel: "Custom full-stack web applications with secure role-based permissions.",
      },
      {
        id: "continuous_cro",
        label: "Continuous optimization, testing, and component evolution",
        sublabel: "Guaranteed monthly sprint capacity reserved exclusively for our codebase.",
      },
      {
        id: "unsure",
        label: "Not sure / Uncover why our current site is losing qualified deals",
        sublabel: "Forensic 28-point diagnostic across positioning, performance, and accessibility.",
        isNotSure: true,
      },
    ],
  },
];

interface RecommendationOutput {
  badge: string;
  isEscapeValve: boolean;
  title: string;
  explanation: string;
  range: string;
  timeline: string;
  ctaLabel: string;
  ctaHref: string;
  cardAnchorId: string;
}

// Decision Tree Engine with explicit Escape-Valve Routing
function evaluateDecisionTree(answers: Record<number, string>): RecommendationOutput {
  const q1 = answers[0] ?? "unsure"; // Timeline
  const q2 = answers[1] ?? "unsure"; // Scope
  const q3 = answers[2] ?? "unsure"; // Outcome

  const unsureCount = [q1 === "unsure", q2 === "unsure", q3 === "unsure"].filter(Boolean).length;

  // ESCAPE VALVE 1: Scope Uncertainty (Q2 is unsure)
  if (q2 === "unsure") {
    return {
      badge: "Escape-Valve Diagnostic Referral",
      isEscapeValve: true,
      title: "Digital Elevation Audit (Recommended First Step)",
      explanation:
        "Because your scope is currently undefined, committing to a multi-week build without diagnostic clarity creates severe budget risk. Our 10-day 28-point forensic audit evaluates your digital presence, identifies exact conversion leaks, and produces an authoritative architectural roadmap before you invest in a build.",
      range: "$2,500 – $5,000",
      timeline: "10 Business Days",
      ctaLabel: "Order 10-Day Diagnostic Audit →",
      ctaHref: "/contact?service=digital-elevation-audit",
      cardAnchorId: "offer-digital-elevation-audit",
    };
  }

  // ESCAPE VALVE 2: Multiple Uncertainties (2+ unsure answers)
  if (unsureCount >= 2) {
    return {
      badge: "Escape-Valve De-Risking Referral",
      isEscapeValve: true,
      title: "Digital Elevation Audit (Recommended First Step)",
      explanation:
        "Because your answers indicate uncertainty across your delivery timeline and commercial objectives, forcing a fixed-scope build recommendation would be premature. A structured 10-day diagnostic audit establishes empirical benchmarks across your positioning and code, eliminating guesswork before scoping a build.",
      range: "$2,500 – $5,000",
      timeline: "10 Business Days",
      ctaLabel: "Order 10-Day Diagnostic Audit →",
      ctaHref: "/contact?service=digital-elevation-audit",
      cardAnchorId: "offer-digital-elevation-audit",
    };
  }

  // ESCAPE VALVE 3: Custom Application Complexity with Unset/Urgent Timeline
  if ((q2 === "custom_app" || q3 === "automate_systems") && (q1 === "unsure" || q1 === "urgent")) {
    return {
      badge: "Escape-Valve Technical Discovery Referral",
      isEscapeValve: true,
      title: "Phase 1: Paid Technical Discovery (Digital Product Build)",
      explanation:
        "Because custom portals and software workflows involve database schemas, authentication security, and role-based permissions, quoting a monolithic build without technical scoping is irresponsible. We recommend Phase 1 Paid Technical Discovery to produce an interactive clickable prototype, schema blueprint, and fixed-bid engineering spec.",
      range: "$7,500 – $15,000",
      timeline: "2–3 Weeks",
      ctaLabel: "Book Technical Discovery Phase →",
      ctaHref: "/contact?service=digital-product-build",
      cardAnchorId: "offer-digital-product-build",
    };
  }

  // STANDARD ROUTING 1: Growth Partnership Retainer
  if (q2 === "existing_build" || q3 === "continuous_cro" || q1 === "flexible") {
    return {
      badge: "Recommended Fit: Stage 05 Continuation",
      isEscapeValve: false,
      title: "Growth Partnership: Dedicated Monthly Retainer",
      explanation:
        "Based on your requirement for ongoing design and engineering capacity on an existing production build, our dedicated monthly Growth Partnership is your exact match. You receive guaranteed monthly hours for continuous CRO, split testing, and component evolution.",
      range: "$2,500 – $7,500 / mo",
      timeline: "3-Month Minimum",
      ctaLabel: "Inquire on Retainer Capacity →",
      ctaHref: "/contact?service=growth-partnership",
      cardAnchorId: "offer-growth-partnership",
    };
  }

  // STANDARD ROUTING 2: Landing Page Sprint
  if (q2 === "landing" || (q1 === "urgent" && q3 === "campaign_roi")) {
    return {
      badge: "Recommended Fit: Stage 03 Velocity Sprint",
      isEscapeValve: false,
      title: "Landing Page Sprint: High-Velocity Funnel",
      explanation:
        "You have an urgent campaign timeline and a single-offer focus. Our 2–3 week Landing Page Sprint delivers a high-velocity, high-conversion landing destination engineered specifically to maximize ROI on paid marketing traffic.",
      range: "$6,500 – $12,000",
      timeline: "2–3 Weeks",
      ctaLabel: "Reserve Sprint Window →",
      ctaHref: "/contact?service=landing-page-sprint",
      cardAnchorId: "offer-landing-page-sprint",
    };
  }

  // STANDARD ROUTING 3: Digital Product Build (Phased)
  if ((q2 === "custom_app" || q3 === "automate_systems") && q1 === "phased") {
    return {
      badge: "Recommended Fit: Stage 04 Custom Systems",
      isEscapeValve: false,
      title: "Digital Product Build (Phased Discovery & Delivery)",
      explanation:
        "Your project scope requires custom web application architecture, secure client authentication, and proprietary workflows. Our phased delivery model gates development through paid technical discovery before deploying full-stack engineering sprints.",
      range: "Discovery: $7.5k–$15k | Build: $40k–$100k+",
      timeline: "Phased Delivery",
      ctaLabel: "Book Phase 1 Technical Discovery →",
      ctaHref: "/contact?service=digital-product-build",
      cardAnchorId: "offer-digital-product-build",
    };
  }

  // STANDARD ROUTING 4: Digital Elevation Audit (Diagnostic Objective)
  if (q3 === "unsure") {
    return {
      badge: "Recommended Fit: Stage 01 Diagnostic Entry",
      isEscapeValve: false,
      title: "Digital Elevation Audit: 28-Point Forensic Analysis",
      explanation:
        "You need objective clarity on why your current digital presence is losing qualified deals before committing to a full rebuild. Our 10-day 28-point forensic audit evaluates your positioning, performance, and accessibility to give you executive-level scope certainty.",
      range: "$2,500 – $5,000",
      timeline: "10 Business Days",
      ctaLabel: "Order 10-Day Diagnostic Audit →",
      ctaHref: "/contact?service=digital-elevation-audit",
      cardAnchorId: "offer-digital-elevation-audit",
    };
  }

  // STANDARD ROUTING 5 (DEFAULT): Signature Website Flagship Rebuild
  return {
    badge: "Recommended Fit: Stage 02 Core Flagship Foundation",
    isEscapeValve: false,
    title: "Signature Website: Complete Strategic Flagship",
    explanation:
      "Your requirements align directly with our core flagship engagement: a comprehensive strategic, visual, and architectural overhaul that elevates market stature, eliminates legacy template constraints, and converts high-value enterprise clients.",
    range: "$18,000 – $35,000",
    timeline: "8–12 Weeks",
    ctaLabel: "Plan Signature Website Build →",
    ctaHref: "/contact?service=signature-website",
    cardAnchorId: "offer-signature-website",
  };
}

export function ServiceDecisionAid() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const launchButtonRef = useRef<HTMLButtonElement>(null);
  const legendRef = useRef<HTMLLegendElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  // Manage focus transitions on step change, expand, or completion
  useEffect(() => {
    if (!isOpen) return;

    if (isCompleted) {
      resultHeadingRef.current?.focus();
    } else {
      legendRef.current?.focus();
    }
  }, [currentStep, isCompleted, isOpen]);

  const handleOpenDiagnostic = () => {
    setIsOpen(true);
  };

  const handleCloseDiagnostic = () => {
    setIsOpen(false);
    // Restore focus to the launch button after closing
    setTimeout(() => {
      launchButtonRef.current?.focus();
    }, 50);
  };

  const handleSelectOption = (targetService: string) => {
    setValidationError(null);
    setAnswers((prev) => ({
      ...prev,
      [currentStep]: targetService,
    }));
  };

  const handleAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    const currentAnswer = answers[currentStep];

    if (!currentAnswer) {
      setValidationError("Please select an option to proceed.");
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      } else {
        errorRef.current?.focus();
      }
      return;
    }

    setValidationError(null);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
    setValidationError(null);
  };

  const recommendation = evaluateDecisionTree(answers);
  const activeAnswer = answers[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const stepLabels = ["1. Timeline", "2. Scope Clarity", "3. Commercial Goal"];

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-indigo/20 bg-ink text-canvas shadow-xl p-4 sm:p-6 lg:p-8">
      <ChromaEdge dark />

      {!isOpen ? (
        /* COLLAPSED PREVIEW CARD (DEFAULT STATE): Compact Mobile-First Split Terminal */
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Left Column: Context, Problem, & Value Hook */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-teal-400 uppercase">
                Diagnostic Fit Assessment
              </span>
              <span className="h-px w-5 sm:w-6 bg-teal-400/40" />
            </div>

            <h2 className="mt-1.5 font-display text-lg sm:text-2xl font-bold tracking-tight text-canvas break-words">
              Not sure which engagement fits your commercial scope?
            </h2>

            <p className="mt-1.5 text-xs leading-relaxed text-canvas/80 sm:text-sm max-w-2xl break-words">
              Answer 3 structured questions to identify the exact engagement calibrated to your timeline urgency, scope clarity, and commercial objectives.
            </p>

            {/* Friction-Reduction Microcopy Row - Directly Adjacent to CTA */}
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-canvas/75">
              <span className="flex items-center gap-1 font-medium text-teal-300">
                <span aria-hidden="true">⏱</span> Takes 30 seconds
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="flex items-center gap-1">
                <span className="text-teal-300" aria-hidden="true">🔒</span> No email required
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-canvas/60">
                Instant recommendation
              </span>
            </div>
          </div>

          {/* Right Column: Preview Slip & Full-Width 48px Mobile CTA Target */}
          <div className="flex flex-col justify-between rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div>
              <span className="font-display text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-teal-300 uppercase block">
                3-Step Question Preview:
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] sm:text-[11px] text-canvas/80 font-medium">
                <span className="rounded-md bg-white/10 px-2 py-0.5">1. Scope Clarity</span>
                <span className="rounded-md bg-white/10 px-2 py-0.5">2. Timeline</span>
                <span className="rounded-md bg-white/10 px-2 py-0.5">3. Objective</span>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/10">
              <button
                ref={launchButtonRef}
                type="button"
                onClick={handleOpenDiagnostic}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-teal px-5 py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 shadow-md shadow-teal/20 cursor-pointer"
                aria-expanded={false}
                aria-label="Launch interactive 30-second fit diagnostic assessment"
              >
                <span>Launch Fit Diagnostic</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* EXPANDED INTERACTIVE FORM: Full 3-Step Accessible Assessment */
        <div>
          {/* Header Bar with Close Trigger */}
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-teal-400 uppercase truncate">
                    Interactive Assessment Active
                  </span>
                  <span className="h-px w-4 sm:w-6 bg-teal-400/40 shrink-0" />
                </div>
                <h2 className="mt-1 font-display text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-canvas break-words">
                  Which engagement fits your commercial scope?
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseDiagnostic}
                className="inline-flex min-h-[44px] items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-canvas/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 shrink-0"
                aria-label="Close diagnostic decision tool"
              >
                <span>Close</span>
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            {/* 3-Step Progress Preview Indicator with Assistive Tech Support */}
            {!isCompleted ? (
              <div className="mt-4 pt-3 border-t border-white/10" role="status" aria-label={`Step ${currentStep + 1} of ${questions.length}: ${stepLabels[currentStep]}`}>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {stepLabels.map((label, idx) => {
                    const isStepActive = idx === currentStep;
                    const isStepPast = idx < currentStep;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col gap-1"
                        aria-current={isStepActive ? "step" : undefined}
                      >
                        <div
                          className={`h-1.5 w-full rounded-full transition-colors ${
                            isStepPast
                              ? "bg-teal"
                              : isStepActive
                                ? "bg-teal-400 shadow-xs shadow-teal/50"
                                : "bg-white/15"
                          }`}
                        />
                        <span
                          className={`text-[9px] sm:text-xs font-semibold tracking-wide truncate ${
                            isStepActive ? "text-teal-300" : isStepPast ? "text-canvas/80" : "text-canvas/50"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {/* Form Interactive Body - Mobile-First Above-the-Keyboard Contained View */}
          <div className="mt-4 sm:mt-6">
            {!isCompleted ? (
              <form onSubmit={handleAdvance} noValidate>
                {/* Semantic Fieldset for Active Question */}
                <fieldset
                  className="border-0 p-0 m-0"
                  aria-describedby={validationError ? "step-validation-error" : undefined}
                >
                  <legend
                    ref={legendRef}
                    tabIndex={-1}
                    className="font-display text-sm sm:text-base lg:text-lg font-bold text-canvas mb-3 focus:outline-none break-words"
                  >
                    {questions[currentStep].prompt}
                  </legend>

                  {/* Mutually Exclusive Radio Choices - Contained Scrollable Area under Keyboard */}
                  <div
                    className="grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-2 max-h-[52vh] sm:max-h-none overflow-y-auto overscroll-contain pr-1"
                    role="radiogroup"
                    aria-required="true"
                  >
                    {questions[currentStep].options.map((option, idx) => {
                      const inputId = `step-${currentStep}-opt-${idx}`;
                      const descId = `step-${currentStep}-desc-${idx}`;
                      const isSelected = activeAnswer === option.id;

                      return (
                        <div key={idx} className="relative flex">
                          <input
                            type="radio"
                            id={inputId}
                            name={`diagnostic-step-${currentStep}`}
                            value={option.id}
                            checked={isSelected}
                            onChange={() => handleSelectOption(option.id)}
                            ref={idx === 0 ? firstInputRef : undefined}
                            className="peer sr-only"
                            aria-describedby={descId}
                          />
                          <label
                            htmlFor={inputId}
                            className={`flex min-h-[56px] sm:min-h-[64px] w-full flex-col justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "border-teal bg-teal/[0.12] shadow-sm shadow-teal/10"
                                : "border-white/15 bg-white/[0.04] hover:border-teal/50 hover:bg-white/[0.08]"
                            } peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal-400`}
                          >
                            <div>
                              <div className="flex items-start sm:items-center gap-2.5">
                                <span
                                  className={`mt-0.5 sm:mt-0 flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                    isSelected
                                      ? "border-teal bg-teal text-white"
                                      : "border-white/40 bg-transparent"
                                  }`}
                                  aria-hidden="true"
                                >
                                  {isSelected ? <span className="size-1.5 rounded-full bg-white" /> : null}
                                </span>
                                <span className="font-display text-xs sm:text-sm font-semibold text-canvas leading-snug break-words">
                                  {option.label}
                                </span>
                              </div>
                              <p id={descId} className="mt-1.5 pl-6.5 text-[11px] sm:text-xs text-canvas/75 leading-relaxed break-words">
                                {option.sublabel}
                              </p>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Validation Error Alert */}
                {validationError ? (
                  <p
                    id="step-validation-error"
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    className="mt-3 flex items-center gap-2 text-xs font-semibold text-rose-400 focus:outline-none"
                  >
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-300 font-bold" aria-hidden="true">
                      !
                    </span>
                    <span className="break-words">{validationError}</span>
                  </p>
                ) : null}

                {/* Navigation Action Bar - Mobile-First Layout */}
                <div className="mt-4 sm:mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-white/10">
                  {/* Back Button */}
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-canvas/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                      aria-label={`Go back to Step ${currentStep}`}
                    >
                      <span aria-hidden="true">←</span>
                      <span>Back</span>
                    </button>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {/* Action Group: CTA + Expected Time + Privacy Microcopy */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="text-center sm:text-right text-[11px] sm:text-xs text-canvas/70 leading-tight">
                      <p className="font-medium text-canvas/85">⏱ Takes 30 seconds</p>
                      <p className="text-[10px] sm:text-[11px] text-canvas/60">No email required • Instant result</p>
                    </div>

                    <button
                      type="submit"
                      className={`inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center rounded-lg px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
                        activeAnswer
                          ? "bg-teal text-white hover:bg-indigo shadow-md shadow-teal/20 cursor-pointer"
                          : "bg-white/10 text-canvas/70 cursor-not-allowed"
                      }`}
                      aria-label={isLastStep ? "See my recommended service engagement" : `Continue to Step ${currentStep + 2}`}
                    >
                      {isLastStep ? "See my recommendation →" : "Continue →"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Result Recommendation Card */
              <div
                className={`rounded-lg sm:rounded-xl border p-4 sm:p-6 lg:p-8 ${
                  recommendation.isEscapeValve
                    ? "border-indigo/40 bg-indigo/[0.08]"
                    : "border-teal/40 bg-teal/[0.06]"
                }`}
                role="region"
                aria-label="Diagnostic recommendation result"
              >
                <div className={`flex flex-wrap items-center justify-between gap-2.5 border-b pb-3.5 ${
                  recommendation.isEscapeValve ? "border-indigo/20" : "border-teal/20"
                }`}>
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex size-5 items-center justify-center rounded-full text-[11px] font-bold text-white shrink-0 ${
                        recommendation.isEscapeValve ? "bg-indigo" : "bg-teal"
                      }`}
                      aria-hidden="true"
                    >
                      {recommendation.isEscapeValve ? "!" : "✓"}
                    </span>
                    <span
                      className={`font-display text-[11px] sm:text-xs font-semibold tracking-wider uppercase break-words ${
                        recommendation.isEscapeValve ? "text-indigo-300" : "text-teal-300"
                      }`}
                    >
                      {recommendation.badge}
                    </span>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold ${
                      recommendation.isEscapeValve
                        ? "border-indigo/30 bg-indigo/20 text-indigo-200"
                        : "border-teal/30 bg-teal/20 text-teal-200"
                    }`}
                  >
                    {recommendation.range} • {recommendation.timeline}
                  </span>
                </div>

                <div className="mt-4">
                  <h3
                    ref={resultHeadingRef}
                    tabIndex={-1}
                    className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-canvas focus:outline-none break-words"
                  >
                    {recommendation.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm lg:text-base leading-relaxed text-canvas/85 max-w-2xl break-words">
                    {recommendation.explanation}
                  </p>
                </div>

                <div className={`mt-5 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-4 border-t ${
                  recommendation.isEscapeValve ? "border-indigo/20" : "border-teal/20"
                }`}>
                  <Link
                    className={`inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center rounded-lg px-5 py-2.5 text-xs sm:text-sm font-semibold text-canvas transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      recommendation.isEscapeValve
                        ? "bg-indigo hover:bg-teal focus-visible:outline-indigo-400"
                        : "bg-teal hover:bg-indigo focus-visible:outline-teal-400"
                    }`}
                    href={recommendation.ctaHref}
                    aria-label={`${recommendation.ctaLabel} for ${recommendation.title}`}
                  >
                    {recommendation.ctaLabel}
                  </Link>
                  <a
                    href={`#${recommendation.cardAnchorId}`}
                    className="inline-flex min-h-[44px] items-center justify-center text-xs font-semibold text-teal-300 hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 transition-colors"
                    aria-label={`Jump to detailed scope breakdown for ${recommendation.title} on this page`}
                  >
                    Jump to Scope Breakdown ↓
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="min-h-[44px] inline-flex items-center justify-center text-xs text-canvas/75 hover:text-canvas underline sm:ml-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    aria-label="Reset and retake diagnostic questionnaire"
                  >
                    Retake Diagnostic ↺
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseDiagnostic}
                    className="min-h-[44px] inline-flex items-center justify-center text-xs text-canvas/60 hover:text-canvas underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    aria-label="Close diagnostic assessment"
                  >
                    Done
                  </button>
                </div>

                {/* Optional Post-Result Value-Exchange Module (100% Ungated Result Above) */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3.5 sm:p-5">
                    <div className="flex items-center gap-2">
                      <span className="text-teal-400 text-xs" aria-hidden="true">📄</span>
                      <h4 className="font-display text-xs sm:text-sm font-semibold text-canvas">
                        Need to share this recommendation with your team?
                      </h4>
                    </div>
                    <p className="mt-1.5 text-[11px] sm:text-xs text-canvas/75 leading-relaxed break-words">
                      Receive a tailored Scope Brief & Procurement Checklist (PDF + Markdown) formatted for executive and stakeholder review. No spam, ever.
                    </p>

                    <ScopeBriefCapture
                      recommendationTitle={recommendation.title}
                      recommendationTier={recommendation.range}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface ScopeBriefCaptureProps {
  recommendationTitle: string;
  recommendationTier: string;
}

function ScopeBriefCapture({recommendationTitle, recommendationTier}: ScopeBriefCaptureProps) {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    // Simulate instant automated document dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div
        className="mt-3 flex items-center gap-2 text-xs font-semibold text-teal-300 bg-teal/[0.1] border border-teal/30 px-3.5 py-2.5 rounded-lg"
        role="status"
        aria-live="polite"
      >
        <span aria-hidden="true">✓</span>
        <span>
          Scope brief dispatched to <strong className="text-white">{email}</strong>. Check your inbox in 1–2 minutes.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-3.5">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <div className="relative flex-1">
          <label htmlFor="brief-email-input" className="sr-only">
            Work email address to receive scope brief for {recommendationTitle}
          </label>
          <input
            id="brief-email-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="colleague@company.com"
            disabled={isSubmitting}
            className="w-full min-h-[44px] rounded-lg border border-white/20 bg-ink px-3.5 py-2 text-xs text-canvas placeholder:text-canvas/40 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            aria-required="true"
            aria-describedby={errorMessage ? "brief-email-error" : undefined}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-canvas transition-colors hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 disabled:opacity-50 shrink-0 cursor-pointer"
          aria-label={`Email me the scope brief and procurement checklist for ${recommendationTitle}`}
        >
          {isSubmitting ? (
            <span>Sending...</span>
          ) : (
            <>
              <span>Send Scope Brief</span>
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>

      {errorMessage ? (
        <p
          id="brief-email-error"
          role="alert"
          className="mt-2 text-xs font-semibold text-rose-400"
        >
          {errorMessage}
        </p>
      ) : null}

      <p className="mt-2 text-[11px] text-canvas/50">
        Includes {recommendationTier} budget breakdown, milestone schedule, and vendor evaluation criteria.
      </p>
    </form>
  );
}
