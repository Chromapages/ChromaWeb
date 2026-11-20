import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Hero from '@/components/sections/hero'
import CtaBlock from '@/components/sections/cta-block'
import SectionHeading from '@/components/ui/section-heading'
import RichText from '@/components/ui/rich-text'
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/sanity/fetch'
import { urlFor } from '@/lib/sanity/image'

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
  const classification = project.proofClassification === 'internalConcept' ? 'Internal concept' : 'Client project'
  const { mainImage } = project
  const alt = typeof mainImage?.alt === 'string' ? mainImage.alt.trim() : ''

  return (
    <>
      <Hero
        eyebrow={classification}
        title={project.title || project.label || 'Case Study'}
        description={project.excerpt}
        primaryAction={{ label: 'Send an inquiry', href: '/contact' }}
        secondaryAction={{ label: 'View all work', href: '/work', variant: 'secondary' }}
      />

      {mainImage?.asset && alt ? (
        <section className="bg-surface py-10">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="relative aspect-video overflow-hidden rounded-structural shadow-elevated border border-outline/10">
              <Image
                src={urlFor({
                  asset: mainImage.asset,
                  crop: mainImage.crop ?? undefined,
                  hotspot: mainImage.hotspot ?? undefined,
                }).url()}
                alt={alt}
                fill
                sizes="(min-width: 1280px) 1216px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 48px)"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-surface py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="The work" title="Project context and decisions." className="mb-12" />
              <RichText value={project.content || []} />
            </div>

            {/* Results Sidebar */}
            <aside className="space-y-10">
              {results.length > 0 && <div className="rounded-structural bg-surface-lowest p-8 shadow-ambient border border-outline/5 transition-all hover:shadow-elevated">
                <SectionHeading eyebrow="Evidence" title="Documented results" className="mb-6" />
                <ul className="space-y-6">
                  {results.map(
                    (result: string) => (
                      <li key={result} className="group">
                        <div className="flex items-start gap-4">
                          <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <p className="text-body-lg text-on-surface/90 font-medium leading-snug">
                            {result}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>}

              {Boolean(project.tags?.length) && <div className="rounded-structural bg-surface-container-high p-8 shadow-ambient border border-outline/10">
                <h4 className="text-label-lg uppercase tracking-widest text-on-surface/50 mb-4">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-surface-lowest text-label-md font-medium border border-outline/10 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>}
            </aside>
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
