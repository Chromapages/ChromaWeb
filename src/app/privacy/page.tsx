import type {Metadata} from "next";
import Link from "next/link";
import {buildMetadata} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Chromapages privacy policy and data governance practices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-editorial px-6 py-16 lg:px-10 lg:py-24">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">Legal & Governance</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-xs text-ink/60">Effective Date: January 1, 2026</p>

      <div className="prose prose-neutral mt-10 space-y-8 text-base leading-relaxed text-ink/80">
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">1. Information We Collect</h2>
          <p className="mt-3">
            Chromapages collects information provided directly by visitors through inquiry forms (e.g., Project Fit reviews, Digital Elevation Audit requests) and anonymous telemetry data regarding website usage when consented to.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">2. How We Use Information</h2>
          <p className="mt-3">
            We use collected data solely to evaluate commercial fit, schedule discovery consultations, deliver contracted web design and engineering services, and measure baseline website performance. We do not sell or rent personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">3. Analytics & Cookies</h2>
          <p className="mt-3">
            We utilize privacy-conscious measurement tooling (Google Analytics 4 with IP anonymization and consent gating). No telemetry cookies are loaded until explicit consent is granted via the consent banner.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">4. Contact & Inquiries</h2>
          <p className="mt-3">
            For questions regarding our privacy practices or data retention policies, please reach out through our{" "}
            <Link className="text-teal underline underline-offset-4 hover:text-indigo" href="/contact">
              Project Fit contact pathway
            </Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
