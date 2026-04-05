import SectionHeading from "@/components/ui/section-heading";
import { processSteps as staticSteps } from "@/lib/site";

type ProcessStep = {
  _id?: string;
  title: string;
  summary: string;
};

type ProcessStepsProps = {
  steps?: ProcessStep[];
};

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  const displaySteps = steps && steps.length > 0 ? (steps as ProcessStep[]) : (staticSteps as ProcessStep[]);

  return (
    <section className="bg-surface-container-low">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Process"
          title="A clear path from first conversation to launch."
          description="The work is organized so the project stays understandable, fast-moving, and easy to review at each stage."
        />
        <ol className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {displaySteps.map((step, index) => (
            <li
              key={step._id || step.title || index}
              className="rounded-structural bg-surface-lowest p-7 shadow-ambient"
            >
              <p className="text-label-md uppercase text-primary-container">
                Step {index + 1}
              </p>
              <h3 className="mt-4 font-display text-2xl text-on-surface">{step.title}</h3>
              <p className="mt-4 text-body-lg text-on-surface/72">{step.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
