import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Hero from '@/components/sections/hero'
import CtaBlock from '@/components/sections/cta-block'
import SectionHeading from '@/components/ui/section-heading'
import RichText from '@/components/ui/rich-text'
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/sanity/fetch'
import { urlFor } from '@/lib/sanity/image'
import { cn } from '@/lib/utils'

import type { CaseStudy } from '@/types/sanity'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getCaseStudies()
  return projects.map((project: CaseStudy) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getCaseStudyBySlug(slug)

  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.title || project.label || 'Project',
    description: project.excerpt,
    alternates: { canonical: `/work/${slug}` },
  }
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const project = await getCaseStudyBySlug(slug)

  if (!project) notFound()
  const results = (Array.isArray(project.results) ? project.results : project.results ? [project.results] : [])
    .filter((result) => result.trim())
  const tags = project.tags?.filter((tag) => tag.trim())
  const hasSidebar = Boolean(results.length || tags?.length)
  const classification = project.proofClassification === 'internalConcept'
    ? 'Internal concept'
    : project.proofClassification === 'clientProject' ? 'Client project' : ''
  const { mainImage } = project
  const alt = typeof mainImage?.alt === 'string' ? mainImage.alt.trim() : ''
  let image: string | undefined
  if (mainImage?.asset?._ref && alt) {
    try {
      image = urlFor({
        asset: mainImage.asset,
        crop: mainImage.crop ?? undefined,
        hotspot: mainImage.hotspot ?? undefined,
      }).url()
    } catch {
      // Malformed media should not hide an otherwise approved project.
    }
  }

  return (
    <>
      <Hero
        eyebrow={classification}
        title={project.title || project.label || 'Case Study'}
        description={project.excerpt}
        primaryAction={{ label: 'Send an inquiry', href: '/contact' }}
        secondaryAction={{ label: 'View all work', href: '/work', variant: 'secondary' }}
      />

      <section className="cp-section border-t border-outline bg-bg">
        <div className="cp-container">
          {image ? (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-structural border border-outline bg-surface-lowest sm:mb-12">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1376px) 1280px, (min-width: 1024px) calc(100vw - 96px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                className="object-contain"
                loading="eager"
              />
            </div>
          ) : null}

          <div className="cp-grid items-start gap-y-8">
            <article className={cn('col-span-full min-w-0', hasSidebar && 'lg:col-span-8')}>
              <SectionHeading eyebrow="The work" title="Project context and decisions." className="mb-6" />
              <RichText value={project.content || []} />
            </article>

            {hasSidebar ? (
              <aside className="col-span-full min-w-0 space-y-6 lg:col-span-4">
                {results.length > 0 ? (
                  <div className="border-t border-outline pt-5">
                    <SectionHeading eyebrow="Evidence" title="Documented results" className="mb-4" />
                    <ul className="list-disc space-y-2 ps-5 text-muted">
                      {results.map((result) => <li key={result}>{result}</li>)}
                    </ul>
                  </div>
                ) : null}
                {tags?.length ? (
                  <div className="border-t border-outline pt-5">
                    <h2 className="text-xl font-semibold">Tags</h2>
                    <ul role="list" className="mt-3 flex list-none flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
                      {tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                  </div>
                ) : null}
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      <CtaBlock
        title="What needs to change on your website?"
        description="Tell us what your business needs from its website."
        primaryLabel="Send an inquiry"
        primaryHref="/contact"
      />
    </>
  )
}
