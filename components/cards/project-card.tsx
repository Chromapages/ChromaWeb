import Button from "@/components/ui/button";
import type { CaseStudy } from "@/types/sanity";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: CaseStudy;
  className?: string;
};

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-structural bg-surface-lowest shadow-ambient transition duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-surface-container-low p-7">
          <p className="text-label-md uppercase text-primary-container">{project.category || "Case Study"}</p>
          <h3 className="mt-4 font-display text-2xl text-on-surface">{project.label || project.title || "Project"}</h3>
          <p className="mt-4 text-body-lg text-on-surface/72">{project.summary || project.excerpt || ""}</p>
          <p className="mt-6 text-sm text-on-surface/72">
            <span className="font-medium text-on-surface">Result:</span> {project.result || (Array.isArray(project.results) ? project.results[0] : project.results) || "See Case Study"}
          </p>
          <div className="mt-7">
            <Button
              href={`/work/${project.slug}`}
              variant="tertiary"
              analyticsLabel={`View ${project.label || project.title}`}
              analyticsLocation="project-card"
            >
              View case study
            </Button>
          </div>
        </div>
        <div className="flex min-h-[16rem] flex-col justify-between bg-[linear-gradient(135deg,rgba(17,30,124,0.12),rgba(44,56,146,0.06))] p-7">
          <div className="rounded-structural bg-surface-lowest/90 p-5 shadow-ambient">
            <p className="text-label-md uppercase text-primary-container">Focus</p>
            <p className="mt-3 text-sm leading-6 text-on-surface/72">{project.challenge || "Digital Transformation"}</p>
          </div>
          <div className="mt-8">
            <p className="text-label-md uppercase text-primary-container">Deliverables</p>
            <ul className="mt-4 space-y-2 text-sm text-on-surface/72">
              {(project.deliverables || project.tags || ["Development", "Design"]).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
