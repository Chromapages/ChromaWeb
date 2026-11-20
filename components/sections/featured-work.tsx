"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types/sanity";

type FeaturedProject = Pick<CaseStudy, "slug" | "title" | "excerpt" | "proofClassification"> & {
  image?: { src: string; alt: string };
};

function ProjectRow({ project }: { project: FeaturedProject }) {
  const { image, proofClassification, title, excerpt, slug } = project;
  const [failedSrc, setFailedSrc] = useState<string>();
  const visibleImage = image?.src === failedSrc ? undefined : image;
  const classification = proofClassification === "internalConcept"
    ? "Internal concept. Not commissioned client work."
    : proofClassification === "clientProject" ? "Client project" : undefined;

  return (
    <article className="cp-grid items-center border-t border-outline pt-8">
      {visibleImage && (
        <Image
          src={visibleImage.src}
          alt={visibleImage.alt}
          width={1920}
          height={1080}
          sizes="(min-width: 1440px) 843px, (min-width: 1024px) calc(66.67vw - 72px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
          className="col-span-full h-auto w-full rounded-structural lg:col-span-8"
          onError={() => setFailedSrc(visibleImage.src)}
        />
      )}
      <div className={cn("col-span-full min-w-0", visibleImage && "lg:col-span-4")}>
        {classification && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">{classification}</p>
        )}
        <h3 className="wrap-break-word text-xl font-semibold lg:text-2xl">{title}</h3>
        <p className="mt-4 max-w-[68ch] text-muted">{excerpt}</p>
        <Link href={`/work/${slug}`} className="cp-text-link mt-3">
          View project<span className="sr-only">: {title}</span>
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedWork({ projects }: { projects: FeaturedProject[] }) {
  const hasProjects = projects.length > 0;

  return (
    <section id="work" className="cp-section border-t border-outline bg-bg" aria-labelledby="work-title">
      <div className="cp-container">
        <div className="cp-grid items-center">
          <div className={cn("col-span-full", hasProjects ? "lg:col-span-8" : "lg:col-span-4")}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">Work</p>
            <h2 id="work-title" className="cp-heading-2">See the work in context.</h2>
          </div>
          {hasProjects ? (
            <Link href="/work" className="cp-text-link col-span-full justify-self-start lg:col-span-4 lg:justify-self-end">View all work</Link>
          ) : (
            <div className="col-span-full lg:col-span-8">
              <p className="max-w-[68ch] text-muted">Case studies are not available here right now. Tell us about the website you want to improve.</p>
              <Link href="/contact" className="cp-text-link mt-2">Send an inquiry</Link>
            </div>
          )}
        </div>
        {hasProjects && (
          <div className="mt-8 space-y-12">
            {projects.map((project) => <ProjectRow key={project.slug} project={project} />)}
          </div>
        )}
      </div>
    </section>
  );
}
