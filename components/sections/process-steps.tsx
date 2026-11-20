import Link from "next/link";
import type { ProcessStep } from "@/types/sanity";

const projectQuestions = [
  "What is included in the engagement?",
  "What happens if the scope changes?",
  "What happens after launch?",
];

export default function ProcessSteps({ steps }: { steps?: ProcessStep[] }) {
  const isHome = steps === undefined;

  return (
    <section id="process" className="cp-section bg-bg" aria-labelledby="process-title">
      <div className="cp-container">
        <div className="cp-grid border-t border-outline pt-8">
          <div className="col-span-full lg:col-span-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              {isHome ? "How we work" : "Before you begin"}
            </p>
            <h2 id="process-title" className="cp-heading-2">
              {isHome ? "Know what happens before your website goes live." : "Make the important questions clear."}
            </h2>
          </div>

          {isHome ? (
            <div className="col-span-full lg:col-span-8">
              <p className="text-muted">Include your questions about scope, reviews, or launch in your inquiry.</p>
              <ul role="list" className="mt-6 max-w-[68ch] list-none">
                {projectQuestions.map((question) => <li key={question} className="border-t border-outline py-6">{question}</li>)}
              </ul>
              <Link href="/process" className="cp-text-link">View the process</Link>
            </div>
          ) : (
            <ol role="list" className="col-span-full list-none divide-y divide-outline border-b border-outline lg:col-span-8">
              {steps.map((step) => (
                <li key={step.title} className="grid gap-x-6 gap-y-2 py-5 first:pt-0 sm:grid-cols-[minmax(8rem,1fr)_3fr]">
                  <h3 className="text-lg leading-tight font-semibold">{step.title}</h3>
                  <p className="text-muted">{step.summary}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
