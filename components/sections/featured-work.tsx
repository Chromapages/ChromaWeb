import ProjectImage from "@/components/sections/project-image";
import Button from "@/components/ui/button";
import type { CaseStudy } from "@/types/sanity";

type FeaturedProject = Pick<CaseStudy, "slug" | "title" | "excerpt" | "proofClassification"> & {
  image?: { src: string; alt: string };
};

function ProjectRow({ project }: { project: FeaturedProject }) {
  const { image, proofClassification, title, excerpt, slug } = project;
  const classification = proofClassification === "internalConcept"
    ? "Internal concept. Not commissioned client work."
    : proofClassification === "clientProject" ? "Client project" : undefined;

  return (
    <article className="cp-grid group items-center border-t border-outline pt-8">
      {image && <ProjectImage src={image.src} alt={image.alt} />}
      <div className="col-span-full min-w-0 lg:group-has-[img]:col-span-4">
        {classification && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">{classification}</p>
        )}
        <h3 className="wrap-break-word text-xl font-semibold lg:text-2xl">{title}</h3>
        <p className="mt-4 max-w-[68ch] text-muted">{excerpt}</p>
        <Button
          href={`/work/${slug}`}
          variant="tertiary"
          analyticsLabel="View project"
          analyticsLocation="homepage-work"
          className="mt-3"
        >
          View project<span className="sr-only">: {title}</span>
        </Button>
      </div>
    </article>
  );
}

export default function FeaturedWork({ projects }: { projects: FeaturedProject[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="cp-section border-t border-outline bg-bg" aria-labelledby="work-title">
      <div className="cp-container">
        <div className="cp-grid items-center">
          <div className="col-span-full lg:col-span-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">Work</p>
            <h2 id="work-title" className="cp-heading-2">See the work in context.</h2>
          </div>
          <Button
            href="/work"
            variant="tertiary"
            analyticsLabel="View all work"
            analyticsLocation="homepage-work"
            className="col-span-full justify-self-start lg:col-span-4 lg:justify-self-end"
          >
            View all work
          </Button>
        </div>
        <div className="mt-8 space-y-12">
          {projects.map((project) => <ProjectRow key={project.slug} project={project} />)}
        </div>
      </div>
    </section>
  );
}
