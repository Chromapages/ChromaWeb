import type { Metadata } from "next";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import CtaBlock from "@/components/sections/cta-block";
import SectionHeading from "@/components/ui/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Chromapages marketing website.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-10 md:px-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />
      </section>
      <section className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        <div className="space-y-10">
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            description={`This page describes how ${site.name} handles information collected through the website.`}
          />
          <article className="space-y-6 text-body-lg text-on-surface/78">
            <p>Last updated: April 3, 2026</p>
            <p>
              This website may collect information that you submit through the contact form,
              email links, analytics tools, and standard server logs. The information is used
              to respond to inquiries, improve the site, and measure performance.
            </p>
            <section className="space-y-3">
              <h2 className="font-display text-2xl text-on-surface">Information we collect</h2>
              <p>
                We may collect name, email address, company, website, project type, budget
                range, timeline, and message content when you use the contact form. We may also
                collect technical information such as IP address, browser type, and pages
                visited.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="font-display text-2xl text-on-surface">How we use information</h2>
              <p>
                Information is used to respond to inquiries, evaluate project fit, improve the
                website, and support analytics and operational needs.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="font-display text-2xl text-on-surface">Third-party services</h2>
              <p>
                The website may use third-party services for analytics, hosting, and form
                processing. Those providers may process information according to their own
                policies.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="font-display text-2xl text-on-surface">Your choices</h2>
              <p>
                You can contact the business directly if you want to review, update, or request
                deletion of information that was submitted through the website.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="font-display text-2xl text-on-surface">Contact</h2>
              <p>
                Questions about this policy can be sent to {site.email}.
              </p>
            </section>
          </article>
        </div>
      </section>
      <CtaBlock
        title="Need to talk about a project instead?"
        description="The contact page is the faster path if you are ready to share the details."
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}
