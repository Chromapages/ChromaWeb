"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics/events";
import { contactSchema, type ContactFormValues } from "@/lib/validation/contact";
import { budgetRanges, projectTypes, timelineOptions } from "@/lib/site";

type FieldName = keyof ContactFormValues;

export default function ContactForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formStarted = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
      projectType: projectTypes[0],
      budgetRange: "",
      timeline: "",
      message: "",
      honeypot: "",
    },
  });

  useEffect(() => {
    if (!submitError) {
      return;
    }

    const timeout = window.setTimeout(() => setSubmitError(null), 6000);
    return () => window.clearTimeout(timeout);
  }, [submitError]);

  const fieldId = (name: FieldName) => `contact-${name}`;

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;
      setSubmitError(payload?.message ?? "Something went wrong. Please try again.");
      return;
    }

    trackEvent({
      name: "form_submit",
      location: "contact-form",
      pagePath: pathname,
      pageType: "contact",
      projectType: values.projectType,
      budgetRange: values.budgetRange || undefined,
      timeline: values.timeline || undefined,
    });

    router.push("/thank-you");
  });

  return (
    <form
      className="space-y-6 rounded-structural bg-surface-lowest p-6 shadow-ambient md:p-8"
      onSubmit={onSubmit}
      onFocusCapture={() => {
        if (formStarted.current) {
          return;
        }

        formStarted.current = true;
        trackEvent({
          name: "form_start",
          location: "contact-form",
          pagePath: pathname,
          pageType: "contact",
        });
      }}
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            id={fieldId("name")}
            type="text"
            autoComplete="name"
            className={inputClass}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            id={fieldId("email")}
            type="email"
            autoComplete="email"
            className={inputClass}
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input
            {...register("company")}
            id={fieldId("company")}
            type="text"
            autoComplete="organization"
            className={inputClass}
          />
        </Field>
        <Field label="Website" error={errors.website?.message}>
          <input
            {...register("website")}
            id={fieldId("website")}
            type="url"
            autoComplete="url"
            placeholder="https://"
            className={inputClass}
          />
        </Field>
        <Field label="Project Type" error={errors.projectType?.message}>
          <select {...register("projectType")} id={fieldId("projectType")} className={inputClass}>
            {projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget Range" error={errors.budgetRange?.message}>
          <select {...register("budgetRange")} id={fieldId("budgetRange")} className={inputClass}>
            <option value="">Select one</option>
            {budgetRanges.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" error={errors.timeline?.message}>
          <select {...register("timeline")} id={fieldId("timeline")} className={inputClass}>
            <option value="">Select one</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field label="Message" error={errors.message?.message}>
            <textarea
              {...register("message")}
              id={fieldId("message")}
              rows={6}
              className={inputClass}
              placeholder="Tell us what you need, what is not working, and what the site should do better."
            />
          </Field>
        </div>
      </div>

      <div className="sr-only">
        <label htmlFor={fieldId("honeypot")}>Leave this field empty</label>
        <input {...register("honeypot")} id={fieldId("honeypot")} type="text" tabIndex={-1} />
      </div>

      {submitError ? (
        <p className="rounded-structural bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-11 items-center justify-center rounded-functional gradient-primary px-5 py-3 text-sm font-medium text-white transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-label-md uppercase text-primary-container">{label}</span>
      {children}
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-functional bg-surface-container-low px-4 py-3 text-sm text-on-surface transition placeholder:text-on-surface/35 focus:bg-surface-lowest focus:outline-none focus:ring-2 focus:ring-primary/20";
