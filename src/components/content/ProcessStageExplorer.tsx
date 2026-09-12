"use client";

import {useState} from "react";

import type {ProcessStep} from "./processSteps";

export function ProcessStageExplorer({steps}: {steps: ProcessStep[]}) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!steps.length) return null;

  const active = steps[activeIndex] ?? steps[0];
  const position = String(activeIndex + 1).padStart(2, "0");
  const total = String(steps.length).padStart(2, "0");

  return (
    <section aria-labelledby="delivery-process-title" className="scroll-mt-24 bg-canvas py-14 lg:pt-6 lg:pb-6" id="delivery-process">
      <div className="mx-auto grid w-full max-w-[112rem] gap-8 px-5 sm:px-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-12 2xl:px-20">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-indigo uppercase">The process</p>
          <nav aria-label="Delivery stages" className="mt-6">
            <ol className="border-l border-indigo/20">
              {steps.map((step, index) => (
                <li className="relative" key={step.id}>
                  <button
                    aria-current={index === activeIndex ? "step" : undefined}
                    className={"flex w-full min-h-16 items-start gap-4 border-l-2 py-3 pl-4 pr-2 text-left transition-colors duration-200 hover:bg-indigo/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal motion-reduce:transition-none " + (index === activeIndex ? "border-indigo bg-indigo/5" : "border-transparent")}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  >
                    <span className="pt-0.5 text-xs font-bold tabular-nums text-indigo">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block line-clamp-2 font-display text-sm font-bold text-ink">{step.title}</span>
                      <span className="mt-1 block line-clamp-2 text-xs leading-5 text-ink/60">{step.description}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <p className="mt-8 hidden max-w-[13rem] border border-indigo/15 bg-paper p-5 text-sm leading-6 text-ink/70 lg:block">Clear stages, deliberate decisions, and a visible path to launch.</p>
        </div>

        <div className="min-w-0 rounded-xl border border-indigo/15 bg-paper p-5 sm:p-7 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-indigo uppercase">Stage {position}</p>
              <p aria-live="polite" className="sr-only">Stage {activeIndex + 1} of {steps.length}: {active.title}</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-[-0.05em] text-ink sm:text-4xl" id="delivery-process-title">{active.title}</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-ink/70">{active.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden text-xs font-semibold tracking-[0.14em] text-indigo sm:inline">{position} / {total}</span>
              <button aria-label="Previous stage" className="flex size-10 items-center justify-center rounded-full border border-indigo/20 text-indigo hover:border-indigo hover:bg-indigo/5 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" disabled={activeIndex === 0} onClick={() => setActiveIndex((value) => value - 1)} type="button">←</button>
              <button aria-label="Next stage" className="flex size-10 items-center justify-center rounded-full border border-indigo/20 text-indigo hover:border-indigo hover:bg-indigo/5 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" disabled={activeIndex === steps.length - 1} onClick={() => setActiveIndex((value) => value + 1)} type="button">→</button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-lg border border-indigo/15 bg-[#E5EBF2] p-7">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-indigo uppercase">Milestone {position}</p>
                <p className="mt-9 max-w-sm font-display text-3xl font-bold tracking-[-0.05em] text-ink">{active.title}</p>
              </div>
              <p className="max-w-sm border-t border-indigo/20 pt-5 text-sm leading-6 text-ink/70">{active.description}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 rounded-lg border border-indigo/15 p-6">
                <p className="text-xs font-bold text-ink">What happens</p>
                <p className="mt-4 text-sm leading-6 text-ink/70">{active.description}</p>
              </div>
              {active.proofPoints.length ? (
                <div className="flex-1 rounded-lg border border-indigo/15 p-6">
                  <p className="text-xs font-bold text-ink">Standards and checks</p>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/70">
                    {active.proofPoints.map((point) => <li className="flex gap-2" key={point}><span aria-hidden="true" className="text-indigo">•</span>{point}</li>)}
                  </ul>
                </div>
              ) : null}
              <div className="rounded-lg border border-indigo/15 bg-indigo/[0.03] p-6">
                <p className="text-xs font-bold text-ink">Next decision</p>
                <p className="mt-2 text-sm leading-6 text-ink/70">{activeIndex === steps.length - 1 ? "Review the launch and the priorities that follow." : `Confirm this stage before moving into ${steps[activeIndex + 1]?.title}.`}</p>
              </div>
            </div>
          </div>

          <div className="mt-9 border-t border-indigo/15 pt-7">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-indigo uppercase">All stages at a glance</p>
            <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.03em] text-ink sm:text-2xl">A clear path from first conversation to launch.</h3>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.id}>
                  <button aria-label={`View stage ${index + 1}: ${step.title}`} aria-pressed={index === activeIndex} className={"flex h-full min-h-36 w-full flex-col rounded-lg border p-4 text-left transition-colors duration-200 hover:border-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal motion-reduce:transition-none " + (index === activeIndex ? "border-indigo bg-indigo/5" : "border-indigo/15 bg-paper")} onClick={() => setActiveIndex(index)} type="button">
                    <span className="text-[10px] font-semibold tracking-[0.14em] text-indigo">{String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-4 font-display text-base font-bold text-ink">{step.title}</span>
                    <span className="mt-2 line-clamp-2 text-xs leading-5 text-ink/60">{step.description}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
