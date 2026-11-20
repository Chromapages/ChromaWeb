"use client";

import { useId } from "react";
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
  const groupName = useId();

  return (
    <section className={cn("cp-section bg-bg", className)}>
      <div className="cp-container">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10 divide-y divide-outline border-y border-outline">
          {items.map((item, index) => (
            <details
              key={item._id || `${item.question}-${index}`}
              name={groupName}
              open={index === 0}
            >
              <summary
                className="cursor-pointer list-inside py-5 font-semibold text-ink marker:text-muted hover:text-primary"
                onClick={() => {
                  trackEvent({
                    name: "faq_expand",
                    location: "faq",
                    label: item.question,
                  });
                }}
              >
                {item.question}
              </summary>
              <p className="max-w-prose pb-5 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
