import Image from "next/image";

import {ChromaEdge} from "@/components/ui/ChromaEdge";
import {PageStack} from "@/components/ui/PageStack";
import {getCaseStudyMediaRole, type PublicCaseStudyMedia} from "@/lib/caseStudyMedia";

function MediaDetails({media, dark = false}: {media: PublicCaseStudyMedia; dark?: boolean}) {
  const role = getCaseStudyMediaRole(media.mediaRole);
  const mutedText = dark ? "text-canvas/70" : "text-ink/65";

  return (
    <figcaption className="border-t border-current/15 px-5 py-4 sm:px-6">
      <p className={`text-xs font-semibold tracking-[0.14em] uppercase ${dark ? "text-teal" : "text-indigo"}`}>{role?.label}</p>
      <p className={`mt-2 text-sm leading-6 ${mutedText}`}>{media.storytellingJob}</p>
      {media.caption ? <p className={`mt-2 text-xs leading-5 ${mutedText}`}>{media.caption}</p> : null}
    </figcaption>
  );
}

export function ProjectMediaFrame({media, dark = false, featured = false}: {media: PublicCaseStudyMedia; dark?: boolean; featured?: boolean}) {
  return (
    <PageStack ariaLabel={`Project media: ${getCaseStudyMediaRole(media.mediaRole)?.label ?? "project artifact"}`} className="w-full" dark={dark}>
      <figure className={dark ? "bg-ink" : "bg-canvas"}>
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          <Image alt={media.alt ?? ""} className="size-full object-cover" height={900} sizes="(min-width: 1024px) 50vw, 100vw" src={media.url} width={1440} />
          <ChromaEdge dark={dark} />
        </div>
        <MediaDetails dark={dark} media={media} />
      </figure>
    </PageStack>
  );
}

export function CaseStudyMediaGroup({media, title}: {media: PublicCaseStudyMedia[]; title: string}) {
  if (!media.length) return null;

  const [primary, ...secondary] = media;

  return (
    <section aria-label={title} className="bg-canvas">
      <div className="mx-auto w-full max-w-main px-6 py-12 lg:px-10 lg:py-16">
        <p className="text-xs font-semibold tracking-[0.18em] text-teal uppercase">{title}</p>
        <div className="mt-6 max-w-4xl">
          <ProjectMediaFrame media={primary} />
        </div>
        {secondary.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {secondary.map((asset) => (
              <figure key={`${asset.url}-${asset.storytellingJob}`} className="overflow-hidden border border-ink/15 bg-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image alt={asset.alt ?? ""} className="size-full object-cover" height={900} sizes="(min-width: 768px) 50vw, 100vw" src={asset.url} width={1440} />
                  <ChromaEdge />
                </div>
                <MediaDetails media={asset} />
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
