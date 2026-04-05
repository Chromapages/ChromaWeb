import SectionHeading from "@/components/ui/section-heading";
import ProjectCard from "@/components/cards/project-card";
import Button from "@/components/ui/button";
import { featuredProjects as staticProjects } from "@/lib/site";

type FeaturedWorkProps = {
  projects?: typeof staticProjects;
};

export default function FeaturedWork({ projects = staticProjects }: FeaturedWorkProps) {
  // Use projects if provided, otherwise fallback to static projects
  const displayProjects = projects && projects.length > 0 ? projects : staticProjects;

  return (
    <section id="work" className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Featured Work"
          title="Selected projects built around clarity, trust, and the next step."
          description="These examples show how a tighter hierarchy, stronger messaging, and a better mobile experience can make a site feel much more convincing."
        />
        <div className="mt-10 grid gap-5">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project._id || project.slug || index} project={project} />
          ))}
        </div>
        <div className="mt-10 pt-5 border-t border-on-surface/5">
          <Button
            href="/work"
            variant="secondary"
            analyticsLabel="View all work"
            analyticsLocation="featured-work"
          >
            View all work
          </Button>
        </div>
      </div>
    </section>
  );
}
