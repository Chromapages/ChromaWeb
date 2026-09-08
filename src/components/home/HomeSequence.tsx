type HomeSequenceProps = {
  steps?: Array<{title?: string | null; description?: string | null} | null> | null;
  dark?: boolean;
};

export function HomeSequence({steps, dark = false}: HomeSequenceProps) {
  if (!steps?.length) {
    return null;
  }

  return (
    <ol className="grid gap-px border border-current/15 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={`${step?.title ?? "step"}-${index}`} className="min-h-40 p-6">
          <p className={dark ? "font-body text-xs font-semibold tracking-[0.18em] text-canvas/85" : "font-body text-xs font-semibold tracking-[0.18em] text-teal"}>{String(index + 1).padStart(2, "0")}</p>
          {step?.title ? <h3 className="mt-6 font-display text-xl font-semibold">{step.title}</h3> : null}
          {step?.description ? <p className={dark ? "mt-3 text-sm leading-6 text-canvas/65" : "mt-3 text-sm leading-6 text-ink/65"}>{step.description}</p> : null}
        </li>
      ))}
    </ol>
  );
}
