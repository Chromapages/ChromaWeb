import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import RequestForm from "@/components/forms/request-form";
import SectionHeading from "@/components/ui/section-heading";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Chromapages about your business, your website, and what you want to improve. Send an inquiry using the contact form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title="A short message is enough to start."
        description="Tell us what your business does, where your website falls short, and what you want visitors to do. Send your inquiry using the form below."
        primaryAction={{ label: "Go to inquiry form", href: "/contact#request-form" }}
        secondaryAction={{ label: "View services", href: "/services", variant: "secondary" }}
      />
      <section className="bg-surface-container-low">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Send an inquiry"
              title="Tell us what needs to change."
              description="Share your current website address, if you have one. A few sentences about the problem will help."
            />
            <div className="mt-8">
              <RequestForm />
            </div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-structural bg-surface-lowest p-7 shadow-ambient">
              <SectionHeading
                eyebrow="After you send"
                title="Look for your confirmation."
              />
              <div className="mt-6 space-y-4 text-sm text-on-surface/72">
                <p>After a successful submission, this form shows a confirmation and a reference number.</p>
                <Button
                  href="/contact#request-form"
                  variant="secondary"
                  analyticsLabel="Go to inquiry form"
                  analyticsLocation="contact-page"
                >
                  Go to inquiry form
                </Button>
              </div>
            </div>
            <div className="rounded-structural bg-surface-lowest p-7 shadow-ambient">
              <SectionHeading eyebrow="What to include" title="A few useful details." />
              <ul className="mt-6 space-y-3 text-sm text-on-surface/72">
                <li>What your business does</li>
                <li>What is not working on your website</li>
                <li>Any deadline or budget context you want to share</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
