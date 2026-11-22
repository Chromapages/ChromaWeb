import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaBlockProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showPrepChecklist?: boolean;
};

const prepChecklist = [
  "Current website URL, if you have one",
  "A few sentences on what needs to change",
  "Instant reference ID (REQ-…) on submit",
];

export default function CtaBlock({
  title = "What needs to change on your website?",
  description = "Tell us where your website falls short and what your business needs from it next.",
  primaryLabel = "Send an inquiry",
  primaryHref = "/contact",
  showPrepChecklist = false,
}: CtaBlockProps) {
  return (
    <section className="cp-dark cp-section" aria-labelledby="cta-title">
      <div className={cn("cp-container", showPrepChecklist && "cp-grid lg:items-start")}>
        <div className={showPrepChecklist ? "col-span-full lg:col-span-7" : undefined}>
          <h2 id="cta-title" className="cp-heading-2">{title}</h2>
          <p className="cp-intro mt-6">{description}</p>
          <Button
            href={primaryHref}
            prefetch={primaryHref === "/contact" ? false : undefined}
            className="mt-8 min-h-14 w-full px-6 text-[0.9375rem] sm:w-auto"
            analyticsLabel="Bottom CTA"
            analyticsLocation="homepage-bottom"
          >
            {primaryLabel}
          </Button>
        </div>
        {showPrepChecklist && (
          <div className="col-span-full rounded-panel border border-outline-dark bg-white/[0.03] p-6 lg:col-span-5">
            <h3 className="font-display text-lg font-semibold">What to share in your inquiry</h3>
            <ul role="list" className="mt-3 list-none space-y-2 text-muted-dark">
              {prepChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="mt-1 size-4 shrink-0 text-accent-bright">
                    <path d="m3.5 8 3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
