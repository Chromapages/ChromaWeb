"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { trackEvent } from "@/lib/analytics/events";
import { requestSchema, type RequestFormValues } from "@/lib/validation/request";
import { budgetRanges, projectTypes } from "@/lib/site";

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
  const selectedBudgetRange = watch("budgetRange");

  // Sync requestType with activeTab state
  useEffect(() => {
    setValue("requestType", activeTab);
  }, [activeTab, setValue]);

  useEffect(() => {
    if (!submitError) {
      return;
    }
    const timeout = window.setTimeout(() => setSubmitError(null), 6000);
    return () => window.clearTimeout(timeout);
  }, [submitError]);

  const fieldId = (name: FieldName) => `request-${name}`;

  const handleTabChange = (tab: "prospect" | "client" | "question") => {
    setActiveTab(tab);
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    tab: "prospect" | "client" | "question"
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTabChange(tab);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const response = await fetch("/api/intake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      setSubmitError(payload?.message ?? "Something went wrong. Please try again.");
      return;
    }

    const payload = (await response.json()) as { issueIdentifier: string };

    trackEvent({
      name: "form_submit",
      location: "request-form",
      pagePath: pathname,
      pageType: "request",
      projectType: values.requestType === "prospect" ? values.projectType : undefined,
      budgetRange: values.requestType === "prospect" ? values.budgetRange || undefined : undefined,
    });

    setSuccessMessage(
      `Thank you! Your request has been queued as ticket ${payload.issueIdentifier}. We'll be in touch shortly.`
    );
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
          tabIndex={0}
          onClick={() => handleTabChange("prospect")}
          onKeyDown={(e) => handleTabKeyDown(e, "prospect")}
          className={clsx(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition duration-200 outline-none cursor-pointer text-center",
            activeTab === "prospect"
              ? "bg-surface-lowest text-primary shadow-sm font-semibold"
              : "text-on-surface/60 hover:text-on-surface hover:bg-surface-lowest/40"
          )}
        >
          Project Inquiry
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "client"}
          aria-controls="request-form"
          id="tab-client"
          tabIndex={0}
          onClick={() => handleTabChange("client")}
          onKeyDown={(e) => handleTabKeyDown(e, "client")}
          className={clsx(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition duration-200 outline-none cursor-pointer text-center",
            activeTab === "client"
              ? "bg-surface-lowest text-primary shadow-sm font-semibold"
              : "text-on-surface/60 hover:text-on-surface hover:bg-surface-lowest/40"
          )}
        >
          Client Support
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "question"}
          aria-controls="request-form"
          id="tab-question"
          tabIndex={0}
          onClick={() => handleTabChange("question")}
          onKeyDown={(e) => handleTabKeyDown(e, "question")}
          className={clsx(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition duration-200 outline-none cursor-pointer text-center",
            activeTab === "question"
              ? "bg-surface-lowest text-primary shadow-sm font-semibold"
              : "text-on-surface/60 hover:text-on-surface hover:bg-surface-lowest/40"
          )}
        >
          Quick Question
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
          <div className="rounded-structural bg-emerald-50/10 border border-emerald-500/20 p-6 text-center space-y-3">
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
            <h3 className="text-lg font-medium text-emerald-500">Submission Successful</h3>
            <p className="text-sm text-on-surface/80 max-w-md mx-auto">{successMessage}</p>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="mt-4 inline-flex items-center justify-center rounded-functional bg-surface-container px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-high transition cursor-pointer"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your Name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  id={fieldId("name")}
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </Field>

              <Field label="Email Address" error={errors.email?.message}>
                <input
                  {...register("email")}
                  id={fieldId("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Company / Organization" error={errors.company?.message}>
                <input
                  {...register("company")}
                  id={fieldId("company")}
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Corp"
                  className={inputClass}
                />
              </Field>

              {activeTab === "prospect" ? (
                <>
                  <Field label="Project Type" error={errors.projectType?.message}>
                    <select
                      {...register("projectType")}
                      id={fieldId("projectType")}
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

                  <Field label="Estimated Budget" error={errors.budgetRange?.message}>
                    <select
                      {...register("budgetRange")}
                      id={fieldId("budgetRange")}
                      className={inputClass}
                      value={selectedBudgetRange}
                    >
                      <option value="">Select a range</option>
                      {budgetRanges.map((option) => (
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
                      ? "Project Summary"
                      : activeTab === "client"
                        ? "Support Details"
                        : "Your Question"
                  }
                  error={errors.message?.message}
                >
                  <textarea
                    {...register("message")}
                    id={fieldId("message")}
                    rows={6}
                    className={inputClass}
                    placeholder={
                      activeTab === "prospect"
                        ? "Tell us what you want to build, the current site gaps, and your general timeline."
                        : activeTab === "client"
                          ? "Describe the issue, bug, content update, or support request in detail."
                          : "Ask us anything about our services, process, pricing, or previous work."
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
              {isSubmitting ? "Submitting..." : "Submit request"}
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
  children: React.ReactNode;
};

const Field = ({ label, error, children }: FieldProps) => {
  return (
    <label className="block space-y-2">
      <span className="text-label-md uppercase text-primary-container">{label}</span>
      {children}
      {error ? <span className="text-sm text-red-500">{error}</span> : null}
    </label>
  );
};

const inputClass =
  "w-full rounded-functional bg-surface-container-low px-4 py-3 text-sm text-on-surface transition placeholder:text-on-surface/35 focus:bg-surface-lowest focus:outline-none focus:ring-2 focus:ring-primary/20";
