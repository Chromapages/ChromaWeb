export function AboutPerspective({detail}: {detail?: string | null}) {
  const [lead, ...paragraphs] = (detail ?? "")
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!lead) return null;

  return (
    <section id="about-perspective" aria-labelledby="about-perspective-title" className="scroll-mt-24 bg-canvas text-ink">
      <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex items-center gap-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">02 / Studio perspective</p>
          <span aria-hidden="true" className="h-px w-10 shrink-0 bg-teal/40" />
        </div>
        <h2 id="about-perspective-title" className="mt-4 max-w-4xl font-display text-3xl leading-tight tracking-[-0.035em] text-balance sm:text-4xl lg:text-5xl">
          The operating point of view
        </h2>

        <div className="mt-10 space-y-8 lg:mt-12 lg:space-y-12">
          <p className="max-w-[65ch] whitespace-pre-line text-xl leading-relaxed wrap-break-word text-ink sm:text-2xl sm:leading-relaxed">
            {lead}
          </p>
          {paragraphs.length ? (
            <div className="space-y-6 border-l-2 border-indigo pl-6 sm:pl-8">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="max-w-[65ch] whitespace-pre-line text-base leading-7 wrap-break-word text-ink/80 sm:text-lg sm:leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
