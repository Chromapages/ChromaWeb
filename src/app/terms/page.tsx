import type {Metadata} from "next";
import Link from "next/link";
import {buildMetadata} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Chromapages commercial terms of service and engagement standards.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-editorial px-6 py-16 lg:px-10 lg:py-24">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">Legal & Commercial Terms</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-xs text-ink/60">Effective Date: January 1, 2026</p>

      <div className="prose prose-neutral mt-10 space-y-8 text-base leading-relaxed text-ink/80">
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">1. Engagement Boundaries</h2>
          <p className="mt-3">
            All professional engagements with Chromapages (Signature Websites, Landing Page Sprints, Digital Product Builds, Growth Partnerships, and Digital Elevation Audits) operate under defined scopes of work, structured approval gates, and calibrated milestone timelines.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">2. Proof & Claims Doctrine</h2>
          <p className="mt-3">
            Chromapages operates under an &ldquo;Evidence Before Adjectives&rdquo; doctrine. Case study classifications, metrics, and technical demonstrations reflect documented realities. Performance benchmarks and search visibility are not sold as fixed or permanent guarantees.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">3. Intellectual Property</h2>
          <p className="mt-3">
            Upon final project completion and full payment, clients receive full ownership of agreed design deliverables and bespoke codebases, subject to standard open-source framework licenses.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">4. Initiation & Project Fit</h2>
          <p className="mt-3">
            Engagements begin with a structured{" "}
            <Link className="text-teal underline underline-offset-4 hover:text-indigo" href="/contact">
              Project Fit Review
            </Link>{" "}
            to determine scope alignment and commercial suitability.
          </p>
        </section>
      </div>
    </main>
  );
}
