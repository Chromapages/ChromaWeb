import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import ContactForm from "@/components/forms/contact-form";
import SectionHeading from "@/components/ui/section-heading";
import Button from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Chromapages about a website, landing page, web app, or ongoing support project.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title="Tell us what you need, and we will help sort out the next step."
        description="If the project is still fuzzy, that is fine. Share what is not working, what you want the site to do, and where you think the current gap is."
        primaryAction={{ label: site.bookingLabel, href: site.bookingHref }}
        secondaryAction={{ label: "View Services", href: "/services", variant: "secondary" }}
        panelLabel="Before you send it"
        panelTitle="A short message is enough to start."
        panelItems={[
          "What you are building or improving",
          "What the current site is missing",
          "Any timeline or budget context that helps",
        ]}
      />
      <section className="bg-surface-container-low">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Send an inquiry"
              title="The form is short on purpose."
              description="We only ask for the details that help qualify the project and keep the first conversation useful."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-structural bg-surface-lowest p-7 shadow-ambient">
              <SectionHeading
                eyebrow="Direct contact"
                title="If you prefer email, use this address."
              />
              <div className="mt-6 space-y-4 text-sm text-on-surface/72">
                <p>{site.email}</p>
                <p>We aim to respond thoughtfully after we review the fit.</p>
                <Button
                  href={`mailto:${site.email}`}
                  variant="secondary"
                  analyticsLabel="Email us"
                  analyticsLocation="contact-page"
                >
                  Email us
                </Button>
              </div>
            </div>
            <div className="rounded-structural bg-surface-lowest p-7 shadow-ambient">
              <SectionHeading eyebrow="What to include" title="A few useful details." />
              <ul className="mt-6 space-y-3 text-sm text-on-surface/72">
                <li>What type of project you need</li>
                <li>What the site should do better</li>
                <li>Whether you are working to a deadline</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
