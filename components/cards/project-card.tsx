import Image from "next/image";
import Button from "@/components/ui/button";
import type { CaseStudy } from "@/types/sanity";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: CaseStudy;
  className?: string;
};

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const { mainImage, proofClassification } = project;
  const classification = proofClassification === "internalConcept"
    ? "Internal concept"
    : proofClassification === "clientProject" ? "Client project" : null;
  const alt = typeof mainImage?.alt === "string" ? mainImage.alt.trim() : "";
  let image: string | undefined;
  if (mainImage?.asset?._ref && alt) {
    try {
      image = urlFor({
        asset: mainImage.asset,
        crop: mainImage.crop ?? undefined,
        hotspot: mainImage.hotspot ?? undefined,
      }).width(1600).height(900).url();
    } catch {
      // Malformed media should not hide an otherwise approved project.
    }
  }
  const title = project.label || project.title || "Project";
  const summary = project.summary || project.excerpt;

  return (
    <article className={cn("cp-grid items-start gap-y-5 py-6 sm:py-8", className)}>
      {image ? (
        <Image
          src={image}
          alt={alt}
          width={1600}
          height={900}
          sizes="(min-width: 1376px) 845px, (min-width: 1024px) calc(66.67vw - 72px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
          className="col-span-full h-auto w-full rounded-structural lg:col-span-8"
        />
      ) : null}

      <div className={cn("col-span-full min-w-0", image && "lg:col-span-4")}>
        {classification ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">{classification}</p>
        ) : null}
        <h3 className="wrap-break-word text-xl font-semibold lg:text-2xl">{title}</h3>
        {summary ? <p className="mt-3 max-w-[68ch] text-muted">{summary}</p> : null}
        <Button
          href={`/work/${project.slug}`}
          variant="tertiary"
          analyticsLabel={`View ${project.label || project.title}`}
          analyticsLocation="project-card"
          className="mt-2"
          aria-label={`View project: ${title}`}
        >
          View project
        </Button>
      </div>
    </article>
  );
}
