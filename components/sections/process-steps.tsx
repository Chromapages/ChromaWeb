import Button from "@/components/ui/button";
import type { ProcessStep } from "@/types/sanity";

const homeSteps = [
  {
    title: "Scope & Goals",
    summary: "Clarify what visitors should understand or do and which pages or problems need attention.",
  },
  {
    title: "Content & Structure",
    summary: "Identify the content you have and organize it around what visitors need to find.",
  },
  {
    title: "Build & Pre-Launch QA",
    summary: "Build the site and use a staging preview to check it before it goes live.",
  },
  {
    title: "Clean Launch & Support",
    summary: "Check launch readiness and discuss any support you may need after the site goes live.",
  },
];

const homeQuestions = [
  {
    question: "What is included?",
    answer: "The pages, features, and responsibilities agreed for your project define what’s included.",
  },
  {
    question: "What happens if the scope changes?",
    answer: "Raise the change and clarify what it means for the agreed scope before deciding how to proceed.",
  },
  {
    question: "What happens after launch?",
    answer: "Website updates, fixes, and improvements are available as a separate support arrangement.",
  },
];

export default function ProcessSteps({ steps }: { steps?: ProcessStep[] }) {
  if (steps === undefined) {
    return (
      <section id="process" className="cp-section border-t border-outline bg-surface-container-low" aria-labelledby="process-title">
        <div className="cp-container cp-grid gap-y-8">
          <div className="col-span-full lg:col-span-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">How we work</p>
            <h2 id="process-title" className="cp-heading-2">Know what happens before your website goes live.</h2>
            <p className="cp-intro mt-6">Plan what the site needs to do, review a staging preview, and check that the site is ready to launch.</p>
            <Button
              href="/process"
              variant="tertiary"
              analyticsLabel="View the process"
              analyticsLocation="homepage-process"
              className="mt-4"
            >
              View the process
            </Button>
          </div>

          <div className="col-span-full lg:col-span-8">
            <ol role="list" className="grid list-none gap-6 sm:grid-cols-2">
              {homeSteps.map(({ title, summary }, index) => (
                <li key={title} className="border-t border-outline pt-4">
                  <span aria-hidden="true" className="text-xs font-semibold tracking-[0.08em] text-primary">0{index + 1}</span>
                  <h3 className="mt-2 text-lg leading-tight font-semibold">{title}</h3>
                  <p className="mt-2 text-muted">{summary}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-panel border border-outline bg-surface-container p-5">
              <h3 className="text-lg leading-tight font-semibold">Key questions answered</h3>
              <dl className="mt-4 space-y-4">
                {homeQuestions.map(({ question, answer }) => (
                  <div key={question}>
                    <dt className="font-semibold">{question}</dt>
                    <dd className="mt-1 max-w-[68ch] text-muted">{answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="process" className="cp-section bg-bg" aria-labelledby="process-title">
      <div className="cp-container">
        <div className="cp-grid border-t border-outline pt-8">
          <div className="col-span-full lg:col-span-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">Before you begin</p>
            <h2 id="process-title" className="cp-heading-2">Make the important questions clear.</h2>
          </div>

          <ol role="list" className="col-span-full list-none divide-y divide-outline border-b border-outline lg:col-span-8">
            {steps.map((step) => (
              <li key={step.title} className="grid gap-x-6 gap-y-2 py-5 first:pt-0 sm:grid-cols-[minmax(8rem,1fr)_3fr]">
                <h3 className="text-lg leading-tight font-semibold">{step.title}</h3>
                <p className="text-muted">{step.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
