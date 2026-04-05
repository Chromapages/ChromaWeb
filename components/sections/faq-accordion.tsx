"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/site";
import { trackEvent } from "@/lib/analytics/events";

type FaqAccordionProps = {
  items: FaqItem[];
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export default function FAQAccordion({
  items,
  eyebrow = "FAQ",
  title,
  description,
  className,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={cn("bg-surface", className)}>
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10 space-y-4">
          {items.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <article
                key={item._id || `${item.question}-${index}`}
                className="rounded-structural bg-surface-lowest shadow-ambient"
              >
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => {
                      setOpenIndex(isOpen ? null : index);
                      trackEvent({
                        name: "faq_expand",
                        location: "faq",
                        label: item.question,
                      });
                    }}
                  >
                    <span className="font-medium text-on-surface">{item.question}</span>
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-on-surface transition",
                        isOpen && "rotate-45",
                      )}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  hidden={!isOpen}
                  className="px-6 pb-5 text-sm leading-6 text-on-surface/72"
                >
                  {item.answer}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
