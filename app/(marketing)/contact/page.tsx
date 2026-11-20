import type { Metadata } from "next";
import RequestForm from "@/components/forms/request-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Chromapages about your business, your website, and what you want to improve. Send an inquiry using the contact form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="cp-section">
      <div className="cp-container">
        <header className="mb-8 max-w-[760px]">
          <h1 className="cp-heading-1">A short message is enough to start.</h1>
          <p className="cp-intro mt-4">
            Tell us what your business does, where your website falls short, and what you want visitors to do.
          </p>
        </header>

        <div className="cp-grid items-start gap-y-12">
          <div id="request-form" className="col-span-full min-w-0 scroll-mt-24 lg:col-span-8">
            <RequestForm />
          </div>

          <aside className="col-span-full lg:col-span-4" aria-labelledby="request-advice">
            <h2
              id="request-advice"
              className="text-[clamp(1.5rem,2.25vw,2rem)] leading-tight font-bold tracking-tight"
            >
              What to include
            </h2>
            <ul className="mt-4 list-disc space-y-3 ps-5 text-muted">
              <li>What your business does</li>
              <li>What is not working on your website</li>
              <li>Any deadline or budget context you want to share</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
