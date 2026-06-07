"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import Button from "@/components/ui/button";
import { featuredProjects, type ProjectItem } from "@/lib/site";
import { cn } from "@/lib/utils";

type DisplayProject = ProjectItem & { span?: string };

const fallbackProjects: DisplayProject[] = featuredProjects.map((project, i) => ({
  ...project,
  span: i === 0 ? "lg:col-span-2" : "lg:col-span-1",
}));

export default function FeaturedWork({
  projects: initialProjects,
}: {
  projects?: DisplayProject[];
}) {
  const displayProjects = initialProjects ?? fallbackProjects;

  return (
    <section id="work" className="bg-bg py-24 lg:py-32 border-t border-primary/5">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <ScrollReveal className="max-w-2xl">
            <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-accent">Featured Work</p>
            <h2 className="font-display text-section font-extrabold text-primary">
              Selected work.
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger={200}>
            <Button href="/work" variant="secondary" className="px-8">
              View all case studies
            </Button>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project: DisplayProject, index: number) => (
            <ScrollReveal
              key={project.slug}
              stagger={index * 150}
              className={cn(
                "group relative overflow-hidden rounded-structural bg-surface-2 p-8 lg:p-10 transition-all duration-300 hover:bg-surface-3",
                project.span
              )}
            >
              <div className="flex flex-col h-full min-h-[240px]">
                <div className="mb-4 inline-flex text-xs font-bold uppercase tracking-widest text-primary/40">
                  {project.category}
                </div>

                <h3 className="mb-4 font-display text-2xl font-bold text-primary lg:text-3xl">
                  {project.label}
                </h3>

                <p className="mb-8 text-base font-medium leading-relaxed text-primary/65">
                  {project.result}
                </p>

                <div className="mt-auto opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                   <Button href={`/work/${project.slug}`} variant="tertiary" className="text-accent font-bold">
                     View Case Study →
                   </Button>
                </div>
              </div>

              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
