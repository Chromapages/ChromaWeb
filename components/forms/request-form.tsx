"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { trackEvent } from "@/lib/analytics/events";
import { intakeResponseSchema, requestSchema, type RequestFormValues } from "@/lib/validation/request";
import { projectTypes } from "@/lib/site";

type FieldName = keyof RequestFormValues;

export default function RequestForm() {
  const pathname = usePathname();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"prospect" | "client" | "question">("prospect");
  const formStarted = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      requestType: "prospect",
      projectType: projectTypes[0],
      budgetRange: "",
      message: "",
      honeypot: "",
    },
  });

  const selectedProjectType = watch("projectType");

  // Sync requestType with activeTab state
  useEffect(() => {
    setValue("requestType", activeTab);
  }, [activeTab, setValue]);

  const fieldId = (name: FieldName) => `request-${name}`;

  const handleTabChange = (tab: "prospect" | "client" | "question") => {
    setActiveTab(tab);
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    tab: "prospect" | "client" | "question"
  ) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const tabs = ["prospect", "client", "question"] as const;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(tabs.indexOf(tab) + direction + tabs.length) % tabs.length];
      handleTabChange(next);
      document.getElementById(`tab-${next}`)?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTabChange(tab);
      event.currentTarget.focus();
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setSubmitError("We couldn’t confirm receipt. Your entries are still in this form. Please try again later.");
        return;
      }

      const accepted = intakeResponseSchema.safeParse(await response.json().catch(() => null));
      if (!accepted.success) {
        setSubmitError("We couldn’t confirm receipt. Your entries are still in this form. Please try again later.");
        return;
      }

      trackEvent({
        name: "form_submit",
        location: "request-form",
        pagePath: pathname,
        pageType: "request",
        projectType: values.requestType === "prospect" ? values.projectType : undefined,
        budgetRange: values.requestType === "prospect" ? values.budgetRange || undefined : undefined,
      });

      setSuccessMessage(`Reference: ${accepted.data.issueIdentifier}`);
      reset({
        name: "",
        email: "",
        company: "",
        requestType: activeTab,
        projectType: projectTypes[0],
        budgetRange: "",
        message: "",
        honeypot: "",
      });
    } catch {
      setSubmitError("We couldn’t confirm receipt. Your entries are still in this form. Please try again later.");
    }
  });

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Request types"
        className="flex space-x-1 rounded-xl bg-surface-container-low p-1.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "prospect"}
          aria-controls="request-form"
          id="tab-prospect"
          tabIndex={activeTab === "prospect" ? 0 : -1}
          onClick={() => handleTabChange("prospect")}
          onKeyDown={(e) => handleTabKeyDown(e, "prospect")}
          className={clsx(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer text-center",
            activeTab === "prospect"
              ? "bg-surface-lowest text-primary shadow-sm font-semibold"
              : "text-on-surface/60 hover:text-on-surface hover:bg-surface-lowest/40"
          )}
        >
          Project inquiry
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "client"}
          aria-controls="request-form"
          id="tab-client"
          tabIndex={activeTab === "client" ? 0 : -1}
          onClick={() => handleTabChange("client")}
          onKeyDown={(e) => handleTabKeyDown(e, "client")}
          className={clsx(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer text-center",
            activeTab === "client"
              ? "bg-surface-lowest text-primary shadow-sm font-semibold"
              : "text-on-surface/60 hover:text-on-surface hover:bg-surface-lowest/40"
          )}
        >
          Client support
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "question"}
          aria-controls="request-form"
          id="tab-question"
          tabIndex={activeTab === "question" ? 0 : -1}
          onClick={() => handleTabChange("question")}
          onKeyDown={(e) => handleTabKeyDown(e, "question")}
          className={clsx(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer text-center",
            activeTab === "question"
              ? "bg-surface-lowest text-primary shadow-sm font-semibold"
              : "text-on-surface/60 hover:text-on-surface hover:bg-surface-lowest/40"
          )}
        >
          Question
        </button>
      </div>

      <form
        id="request-form"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="space-y-6 rounded-structural bg-surface-lowest p-6 shadow-ambient md:p-8"
        onSubmit={onSubmit}
        onFocusCapture={() => {
          if (formStarted.current) {
            return;
          }
          formStarted.current = true;
          trackEvent({
            name: "form_start",
            location: "request-form",
            pagePath: pathname,
            pageType: "request",
          });
        }}
        noValidate
      >
        {successMessage ? (
          <div role="status" className="rounded-structural bg-emerald-50/10 border border-emerald-500/20 p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-emerald-500">Your request was received.</h3>
            <p className="text-sm text-on-surface/80 max-w-md mx-auto">{successMessage}</p>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="mt-4 inline-flex items-center justify-center rounded-functional bg-surface-container px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-high transition cursor-pointer"
            >
              Send another request
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your name (required)" error={errors.name?.message} errorId="request-name-error">
                <input
                  {...register("name")}
                  id={fieldId("name")}
                  aria-invalid={Boolean(errors.name) || undefined}
                  aria-describedby={errors.name ? "request-name-error" : undefined}
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </Field>

              <Field label="Email address (required)" error={errors.email?.message} errorId="request-email-error">
                <input
                  {...register("email")}
                  id={fieldId("email")}
                  aria-invalid={Boolean(errors.email) || undefined}
                  aria-describedby={errors.email ? "request-email-error" : undefined}
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Business name (optional)" error={errors.company?.message} errorId="request-company-error">
                <input
                  {...register("company")}
                  id={fieldId("company")}
                  aria-invalid={Boolean(errors.company) || undefined}
                  aria-describedby={errors.company ? "request-company-error" : undefined}
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Corp"
                  className={inputClass}
                />
              </Field>

              {activeTab === "prospect" ? (
                <>
                  <Field label="Project type (optional)" error={errors.projectType?.message} errorId="request-projectType-error">
                    <select
                      {...register("projectType")}
                      id={fieldId("projectType")}
                      aria-invalid={Boolean(errors.projectType) || undefined}
                      aria-describedby={errors.projectType ? "request-projectType-error" : undefined}
                      className={inputClass}
                      value={selectedProjectType}
                    >
                      {projectTypes.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              ) : null}

              <div className="md:col-span-2">
                <Field
                  label={
                    activeTab === "prospect"
                      ? "What needs to change? (required)"
                      : activeTab === "client"
                        ? "Support request (required)"
                        : "Your question (required)"
                  }
                  error={errors.message?.message}
                  errorId="request-message-error"
                >
                  <textarea
                    {...register("message")}
                    id={fieldId("message")}
                    aria-invalid={Boolean(errors.message) || undefined}
                    aria-describedby={errors.message ? "request-message-error" : undefined}
                    rows={6}
                    className={inputClass}
                    placeholder={
                      activeTab === "prospect"
                        ? "Tell us about your business, your current website, and what you would like it to do better."
                        : activeTab === "client"
                          ? "Describe the issue or update and include the page address, if relevant. Do not include passwords or payment details."
                          : "What would you like to know?"
                    }
                  />
                </Field>
              </div>
            </div>

            <div className="sr-only">
              <label htmlFor={fieldId("honeypot")}>Leave this field empty</label>
              <input {...register("honeypot")} id={fieldId("honeypot")} type="text" tabIndex={-1} />
            </div>

            {submitError ? (
              <p
                className="rounded-structural bg-red-50/10 border border-red-500/20 px-4 py-3 text-sm text-red-500"
                role="alert"
              >
                {submitError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-11 items-center justify-center rounded-functional gradient-primary px-5 py-3 text-sm font-medium text-white transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? "Sending…" : activeTab === "prospect" ? "Send inquiry" : activeTab === "client" ? "Send support request" : "Send question"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
};

const Field = ({ label, error, errorId, children }: FieldProps) => {
  return (
    <label className="block space-y-2">
      <span className="text-label-md uppercase text-primary-container">{label}</span>
      {children}
      {error ? <span id={errorId} className="text-sm text-red-500">{error}</span> : null}
    </label>
  );
};

const inputClass =
  "w-full rounded-functional bg-surface-container-low px-4 py-3 text-sm text-on-surface transition placeholder:text-on-surface/35 focus:bg-surface-lowest focus:outline-none focus:ring-2 focus:ring-primary/20";
