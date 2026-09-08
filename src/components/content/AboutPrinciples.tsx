import {PageActionLink, type PageStep} from "./PagePrimitives";

export function AboutPrinciples({principles}: {principles?: PageStep[] | null}) {
  const items = principles?.filter((item) => item?.title?.trim()) ?? [];
  if (!items.length) return null;

  return (
    <section id="about-principles" aria-labelledby="about-principles-title" tabIndex={-1} className="scroll-mt-24 bg-ink text-canvas">
      <div className="mx-auto w-full max-w-main px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex items-center gap-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-canvas/80 uppercase">01 / Principles</p>
          <span aria-hidden="true" className="h-px w-10 bg-canvas/40" />
        </div>
        <h2 id="about-principles-title" className="mt-4 max-w-4xl font-display text-3xl leading-tight tracking-[-0.035em] text-balance sm:text-4xl lg:text-5xl">
          How the work is approached
        </h2>

        <ul role="list" className="mt-10 divide-y divide-canvas/25 border-y border-canvas/25 lg:mt-12">
          {items.map((item, index) => (
            <li key={`${item?.title}-${index}`} className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-4 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[3rem_minmax(0,4fr)_minmax(0,6fr)] lg:gap-x-10 lg:py-10">
              <span aria-hidden="true" className="pt-1 font-display text-sm font-medium text-canvas/60 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="min-w-0 font-display text-xl leading-snug tracking-[-0.02em] text-pretty wrap-break-word sm:text-2xl lg:text-3xl">
                {item?.title}
              </h3>
              {item?.description?.trim() ? (
                <p className="col-start-2 max-w-[65ch] min-w-0 whitespace-pre-line text-base leading-7 wrap-break-word text-canvas/80 lg:col-start-3 lg:text-lg lg:leading-8">
                  {item.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-canvas/70 uppercase">Principles into practice</p>
          <PageActionLink action={{label: "Explore our delivery process →", href: "/process"}} analyticsLocation="about_principles" inverse />
        </div>
      </div>
    </section>
  );
}
