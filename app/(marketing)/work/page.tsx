import type { Metadata } from 'next'
import { cache } from 'react'
import Hero from '@/components/sections/hero'
import ProjectCard from '@/components/cards/project-card'
import CtaBlock from '@/components/sections/cta-block'
import SectionHeading from '@/components/ui/section-heading'
import { getCaseStudies } from '@/lib/sanity/fetch'

const getWorkProjects = cache(getCaseStudies)

export async function generateMetadata(): Promise<Metadata> {
  const hasProjects = (await getWorkProjects()).length > 0
  return {
    title: hasProjects ? 'Website projects' : 'Work',
    description: hasProjects
      ? 'Explore project context, the work completed, and the decisions behind Chromapages projects.'
      : 'Case studies are not available here right now. Explore Chromapages services or send an inquiry about your website.',
    alternates: { canonical: '/work' },
  }
}

export default async function WorkPage() {
  const projects = await getWorkProjects()

  return (
    <>
      <Hero
        eyebrow="Work"
        title={projects.length ? "See the work behind the website." : "Looking for examples of our work?"}
        description={projects.length ? "Explore the project context, the work completed, and the decisions behind it." : "Explore our services or tell us about the website you want to improve."}
        primaryAction={{ label: 'Send an inquiry', href: '/contact' }}
        secondaryAction={{ label: 'View services', href: '/services', variant: 'secondary' }}
      />
      <section className="cp-section border-t border-outline bg-bg">
        <div className="cp-container">
          {projects.length ? (
            <SectionHeading eyebrow="Projects" title="Context, decisions, and work completed." description="Read what the project needed, what Chromapages contributed, and any documented results." />
          ) : (
            <SectionHeading eyebrow="Work" title="Case studies" />
          )}
          {projects.length > 0 ? (
            <ul role="list" className="mt-8 list-none divide-y divide-outline border-y border-outline sm:mt-12">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 text-muted">
              <p role="status">Case studies are not available here right now.</p>
            </div>
          )}
        </div>
      </section>
      <CtaBlock
        title="What needs to change on your website?"
        description="Tell us about your business and what you want your website to do better."
        primaryLabel="Send an inquiry"
        primaryHref="/contact"
      />
    </>
  )
}
