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
    title: `${project.title} | Case Study`,
    description: project.excerpt || `Case study for ${project.client}`,
  }
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const project = await getCaseStudyBySlug(slug)

  if (!project) notFound()

  return (
    <>
      <Hero
        eyebrow="Case Study"
        title={project.title || project.label || 'Case Study'}
        description={project.excerpt || project.summary || `A breakdown of the work done for ${project.client || 'our client'} and the impact it had on their digital presence.`}
        primaryAction={{ label: 'Start Your Project', href: '/contact' }}
        secondaryAction={{ label: 'View All Work', href: '/work', variant: 'secondary' }}
        panelLabel="Project focus"
        panelTitle={project.client || 'Client project'}
        panelItems={project.tags || ['Web Design', 'Next.js', 'Sanity CMS']}
      />

      {project.mainImage && (
        <section className="bg-surface py-10">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="relative aspect-video overflow-hidden rounded-structural shadow-elevated border border-outline/10">
              <Image
                src={urlFor(project.mainImage).url()}
                alt={project.title || project.label || 'Project Image'}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="bg-surface py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="The work" title="Strategy and implementation." className="mb-12" />
              <RichText value={project.content || []} />
            </div>

            {/* Results Sidebar */}
            <aside className="space-y-10">
              <div className="rounded-structural bg-surface-lowest p-8 shadow-ambient border border-outline/5 transition-all hover:shadow-elevated">
                <SectionHeading eyebrow="Impact" title="Results" className="mb-6" />
                <ul className="space-y-6">
                  {(Array.isArray(project.results) ? project.results : project.results ? [project.results] : ['Improved load times', 'Better conversion', 'Clean handoff']).map(
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
              </div>

              <div className="rounded-structural bg-surface-container-high p-8 shadow-ambient border border-outline/10">
                <h4 className="text-label-lg uppercase tracking-widest text-on-surface/50 mb-4">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(project.tags || ['Next.js', 'Tailwind', 'GSAP']).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-surface-lowest text-label-md font-medium border border-outline/10 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBlock
        title="Ready to see these kinds of results for your business?"
        description="We can help you identify the biggest opportunities for improvement on your current site and map out a plan for the next version."
        primaryLabel="Book A Call"
        primaryHref="/contact"
        secondaryLabel="See all work"
        secondaryHref="/work"
      />
    </>
  )
}
