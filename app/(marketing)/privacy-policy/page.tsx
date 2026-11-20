import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import CtaBlock from "@/components/sections/cta-block";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Chromapages marketing website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="cp-section bg-surface-lowest">
        <div className="cp-container max-w-[68ch]">
          <BreadcrumbNav
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy" },
            ]}
          />
          <header className="mt-10 space-y-4">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">Legal</p>
            <h1 className="cp-heading-1 text-ink">Privacy Policy</h1>
            <p className="cp-intro">
              This page describes how {site.name} handles information collected through the website.
            </p>
          </header>
          <article className="mt-8 space-y-8 text-muted">
            <p>Last updated: April 3, 2026</p>
            <p>
              This website may collect information that you submit through the contact form,
              email links, analytics tools, and standard server logs. The information is used
              to respond to inquiries, improve the site, and measure performance.
            </p>
            <section className="space-y-3">
              <h2 className="cp-heading-2 text-ink">Information we collect</h2>
              <p>
                We may collect name, email address, company, website, project type, budget
                range, timeline, and message content when you use the contact form. We may also
                collect technical information such as IP address, browser type, and pages
                visited.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="cp-heading-2 text-ink">How we use information</h2>
              <p>
                Information is used to respond to inquiries, evaluate project fit, improve the
                website, and support analytics and operational needs.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="cp-heading-2 text-ink">Third-party services</h2>
              <p>
                The website may use third-party services for analytics, hosting, and form
                processing. Those providers may process information according to their own
                policies.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="cp-heading-2 text-ink">Your choices</h2>
              <p>
                You can contact the business directly if you want to review, update, or request
                deletion of information that was submitted through the website.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="cp-heading-2 text-ink">Contact</h2>
              <p>
                For questions about this policy, use the{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-primary underline underline-offset-4 hover:decoration-2"
                >
                  contact form
                </Link>{" "}
                and select Question.
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
