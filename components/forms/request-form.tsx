"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/events";
import { intakeResponseSchema, requestSchema, type RequestFormValues } from "@/lib/validation/request";

const requestTypes = {
  prospect: {
    label: "Project inquiry",
    messageLabel: "What needs to change?",
    messageHelp: "Tell us about your business, your current website, and what you would like it to do better.",
    submitLabel: "Send inquiry",
  },
  client: {
    label: "Client support",
    messageLabel: "Support request",
    messageHelp: "Describe the issue or update and include the page address, if relevant. Do not include passwords or payment details.",
    submitLabel: "Send support request",
  },
  question: {
    label: "Question",
    messageLabel: "Your question",
    messageHelp: "What would you like to know?",
    submitLabel: "Send question",
  },
};

const defaultValues: RequestFormValues = {
  name: "",
  email: "",
  company: "",
  requestType: "prospect",
  message: "",
  honeypot: "",
};

const requestOptions = Object.entries(requestTypes);
const fields = ["requestType", "name", "email", "company", "message"] as const;
type FieldName = (typeof fields)[number];

const fieldId = (name: FieldName) => `request-${name}`;
const unconfirmed = "We couldn’t confirm receipt. Your entries are still in this form. Please try again later.";
const headingClass = "text-[clamp(1.5rem,2.25vw,2rem)] leading-tight font-bold tracking-tight";

// Keep the server markup and the first hydration render disabled.
const subscribeToHydration = () => () => {};
const hydratedOnClient = () => true;
const hydratedOnServer = () => false;

export default function RequestForm() {
  const pathname = usePathname();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const hydrated = useSyncExternalStore(subscribeToHydration, hydratedOnClient, hydratedOnServer);
  const formStarted = useRef(false);
  const submission = useRef<"idle" | "submitting" | "accepted">("idle");
  const errorSummary = useRef<HTMLDivElement>(null);
  const receiptHeading = useRef<HTMLHeadingElement>(null);
  const focusRequestType = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, submitCount },
    reset,
    setFocus,
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues,
    shouldFocusError: false,
    reValidateMode: "onChange",
  });

  const copy = requestTypes[watch("requestType")];
  const invalidFields = fields.filter((name) => errors[name]?.message);

  useEffect(() => {
    if (submitCount) {
      errorSummary.current?.focus();
    }
  }, [submitCount]);

  useEffect(() => {
    if (receipt) {
      receiptHeading.current?.focus();
    } else if (focusRequestType.current) {
      focusRequestType.current = false;
      setFocus("requestType");
    }
  }, [receipt, setFocus]);

  const submitRequest = handleSubmit(async (values) => {
    const body = JSON.stringify(values);
    setPending(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(15_000),
      });
      const accepted = intakeResponseSchema.safeParse(response.ok ? await response.json() : null);
      if (!accepted.success) {
        setSubmitError(unconfirmed);
        return;
      }

      submission.current = "accepted";
      setReceipt(accepted.data.issueIdentifier);
    } catch {
      setSubmitError(unconfirmed);
      return;
    }

    trackEvent({
      name: "form_submit",
      location: "request-form",
      pagePath: pathname,
      pageType: "request",
    });
  });

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hydrated || submission.current !== "idle") {
      return;
    }

    // Take the lock before React Hook Form's asynchronous resolver can yield.
    submission.current = "submitting";
    try {
      await submitRequest();
    } finally {
      if (submission.current === "submitting") {
        submission.current = "idle";
      }
      setPending(false);
    }
  };

  const validationProps = (name: FieldName, help = false) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby":
      [
        help ? `${fieldId(name)}-help` : null,
        errors[name] ? `${fieldId(name)}-error` : null,
      ].filter(Boolean).join(" ") || undefined,
  });

  const inputProps = (name: FieldName, help = false) => ({
    ...register(name),
    ...validationProps(name, help),
    id: fieldId(name),
    className: inputClass,
  });

  return (
    <div className="w-full max-w-[640px] rounded-panel border border-outline bg-surface-lowest p-6 sm:p-8">
      {receipt ? (
        <>
          <h2
            id="request-heading"
            aria-describedby="request-reference"
            ref={receiptHeading}
            tabIndex={-1}
            className={`${headingClass} scroll-mt-24 text-success`}
          >
            Your request was received.
          </h2>
          <p id="request-reference" className="mt-4 wrap-anywhere">Reference: {receipt}</p>
          <Button
            type="button"
            variant="tertiary"
            className="cp-text-link mt-4"
            onClick={() => {
              reset();
              submission.current = "idle";
              focusRequestType.current = true;
              setReceipt(null);
            }}
          >
            Send another request
          </Button>
        </>
      ) : (
        <>
          <h2 id="request-heading" className={headingClass}>Tell us what needs to change.</h2>
          <p className="mt-4 text-muted">
            Share your current website address, if you have one. A few sentences about the problem will help.
          </p>
          <noscript>JavaScript is required to submit this form.</noscript>

          <form
            className="mt-8 space-y-6"
            method="post"
            noValidate
            aria-labelledby="request-heading"
            aria-busy={pending}
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
          >
            {invalidFields.length > 0 ? (
              <div
                ref={errorSummary}
                role="group"
                aria-labelledby="request-errors-heading"
                tabIndex={-1}
                className="scroll-mt-24 rounded-functional border border-error p-4 text-error"
              >
                <p id="request-errors-heading" className="font-semibold">Check your answers</p>
                <ul className="mt-2">
                  {invalidFields.map((name) => (
                    <li key={name}>
                      <a
                        href={`#${fieldId(name)}`}
                        onClick={(event) => {
                          event.preventDefault();
                          setFocus(name);
                        }}
                        className="inline-flex min-h-11 items-center underline underline-offset-4"
                      >
                        {errors[name]?.message}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <fieldset disabled={!hydrated || pending} className="min-w-0 space-y-6">
              <fieldset className="min-w-0">
                <legend className="mb-3 font-semibold">Request type</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {requestOptions.map(([value, option]) => {
                    const isDefault = value === defaultValues.requestType;
                    return (
                      <label
                        key={value}
                        className="flex min-h-12 cursor-pointer items-center gap-2 rounded-functional border border-control px-3 py-2 text-sm has-checked:border-accent has-checked:bg-bg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent has-disabled:cursor-default"
                      >
                        <input
                          {...register("requestType")}
                          {...validationProps("requestType")}
                          id={isDefault ? fieldId("requestType") : `request-type-${value}`}
                          type="radio"
                          value={value}
                          defaultChecked={isDefault}
                          required
                          className="size-4 shrink-0 scroll-mt-24 accent-accent"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
                {errors.requestType?.message ? (
                  <p id={`${fieldId("requestType")}-error`} className="mt-2 text-sm text-error">
                    {errors.requestType.message}
                  </p>
                ) : null}
              </fieldset>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field name="name" label="Your name" required error={errors.name?.message}>
                  <input {...inputProps("name")} type="text" autoComplete="name" required />
                </Field>
                <Field name="email" label="Email address" required error={errors.email?.message}>
                  <input {...inputProps("email")} type="email" autoComplete="email" required />
                </Field>
                <Field name="company" label="Business name" error={errors.company?.message}>
                  <input {...inputProps("company")} type="text" autoComplete="organization" maxLength={120} />
                </Field>
                <Field
                  name="message"
                  label={copy.messageLabel}
                  help={copy.messageHelp}
                  required
                  error={errors.message?.message}
                >
                  <textarea {...inputProps("message", true)} rows={6} required />
                </Field>
              </div>

              <div className="sr-only" aria-hidden="true">
                <label htmlFor="request-honeypot">Leave this field empty</label>
                <input {...register("honeypot")} id="request-honeypot" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            </fieldset>

            <p className="text-sm text-muted">
              Before sending, read the <Link href="/privacy-policy" className="cp-text-link">Privacy policy</Link>.
            </p>
            {submitError ? (
              <p role="alert" className="rounded-functional border border-error p-4 text-sm text-error">
                {submitError}
              </p>
            ) : null}
            <Button
              type="submit"
              disabled={!hydrated}
              aria-disabled={pending || undefined}
              className="w-full aria-disabled:cursor-wait aria-disabled:hover:bg-outline aria-disabled:active:bg-outline"
            >
              {pending ? "Sending…" : copy.submitLabel}
            </Button>
          </form>

          <p role="status" className="sr-only">{pending ? "Sending…" : ""}</p>
        </>
      )}
    </div>
  );
}

type FieldProps = {
  name: Exclude<FieldName, "requestType">;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ name, label, required, help, error, children }: FieldProps) {
  const id = fieldId(name);
  return (
    <div className={`min-w-0 space-y-2 ${name === "company" || name === "message" ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="block font-semibold">
        {label} <span className="font-normal text-muted">({required ? "required" : "optional"})</span>
      </label>
      {children}
      {help ? <p id={`${id}-help`} className="text-sm text-muted">{help}</p> : null}
      {error ? <p id={`${id}-error`} className="text-sm text-error">{error}</p> : null}
    </div>
  );
}

const inputClass =
  "min-h-12 w-full min-w-0 scroll-mt-24 rounded-functional border border-control bg-surface-lowest px-4 py-3 text-[1rem] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-error disabled:bg-bg";
