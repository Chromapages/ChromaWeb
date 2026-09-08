type HomeSectionData = {
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
};

type HomeSectionProps = {
  section: HomeSectionData | null | undefined;
  number: string;
  tone?: "light" | "dark";
  children?: React.ReactNode;
};

export function HomeSection({section, number, tone = "light", children}: HomeSectionProps) {
  const isDark = tone === "dark";

  return (
    <section className={isDark ? "bg-ink text-canvas" : "bg-canvas text-ink"}>
      <div className="mx-auto w-full max-w-main px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex items-center gap-3">
          <p className={isDark ? "font-body text-xs font-semibold tracking-[0.18em] text-canvas/85 uppercase" : "font-body text-xs font-semibold tracking-[0.18em] text-teal uppercase"}>{number}</p>
          <span aria-hidden="true" className={isDark ? "h-px w-8 bg-canvas/40" : "h-px w-8 bg-teal/40"} />
          {section?.eyebrow ? <p className={isDark ? "text-sm font-medium text-canvas/65" : "text-sm font-medium text-ink/65"}>{section.eyebrow}</p> : null}
        </div>
        <div className="mt-4">
          <h2 className="max-w-4xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            {section?.title}
          </h2>
          {section?.body ? (
            <p className={isDark ? "mt-6 max-w-2xl text-base leading-8 text-canvas/72 sm:text-lg" : "mt-6 max-w-2xl text-base leading-8 text-ink/72 sm:text-lg"}>
              {section.body}
            </p>
          ) : null}
          {children ? <div className="mt-12">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
