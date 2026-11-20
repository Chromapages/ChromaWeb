import Button from "@/components/ui/button";

type CtaBlockProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CtaBlock({
  title = "What needs to change on your website?",
  description = "Tell us where your website falls short and what your business needs from it next.",
  primaryLabel = "Send an inquiry",
  primaryHref = "/contact",
}: CtaBlockProps) {
  return (
    <section className="cp-dark cp-section" aria-labelledby="cta-title">
      <div className="cp-container">
        <h2 id="cta-title" className="cp-heading-2">{title}</h2>
        <p className="cp-intro mt-6">{description}</p>
        <Button
          href={primaryHref}
          className="mt-8 min-h-14 w-full px-6 text-[0.9375rem] sm:w-auto"
          analyticsLabel="Bottom CTA"
          analyticsLocation="homepage-bottom"
        >
          {primaryLabel}
        </Button>
      </div>
    </section>
  );
}
