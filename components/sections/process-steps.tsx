"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { type ProcessStep } from "@/lib/site";
import { cn } from "@/lib/utils";

const steps: ProcessStep[] = [
  { title: "Purpose", summary: "What should visitors understand about your business, and what should they do next?" },
  { title: "Scope", summary: "What needs to change, and what belongs in this engagement?" },
  { title: "Review", summary: "Who will provide content, feedback, and decisions for your business?" },
  { title: "Launch", summary: "What needs to be checked and ready before the website goes live?" },
];

export default function ProcessSteps({
  steps: initialSteps,
}: {
  steps?: ProcessStep[];
}) {
  const [activeStep, setActiveStep] = useState(0);
  const displaySteps = initialSteps ?? steps;

  return (
    <section id="process" className="bg-surface-2 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal className="mb-20 max-w-3xl">
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-accent">Before you begin</p>
          <h2 className="font-display text-section font-extrabold text-primary">
            Make the important questions clear.
          </h2>
        </ScrollReveal>

        {/* Desktop View: Horizontal Steps */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-4 gap-12">
            {displaySteps.map((step, index) => (
              <ScrollReveal key={step.title} stagger={index * 150} className="relative z-10">
                <div className="flex flex-col items-start">
                  <div className="mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-bg border-4 border-surface-2 text-2xl font-bold font-display text-accent shadow-soft">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-6 font-display text-2xl font-bold text-primary">{step.title}</h3>
                  <p className="text-base font-medium leading-relaxed text-primary/65">{step.summary}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile View: Accordion */}
        <div className="lg:hidden space-y-4">
          {displaySteps.map((step, index) => (
            <div 
              key={step.title}
              className="overflow-hidden rounded-functional bg-bg p-2 transition-all"
            >
              <button
                onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-4">
                   <span className="font-display text-xl font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
                   <span className="font-display text-lg font-bold text-primary">{step.title}</span>
                </div>
                <span className={cn("text-accent transition-transform duration-300", activeStep === index && "rotate-180")}>
                   ▼
                </span>
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  activeStep === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="px-4 pb-6 pt-2 text-primary/65 font-medium leading-relaxed">
                  {step.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
