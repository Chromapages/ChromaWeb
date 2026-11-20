import type { Metadata } from 'next'
import Hero from '@/components/sections/hero'
import ProjectCard from '@/components/cards/project-card'
import CtaBlock from '@/components/sections/cta-block'
import SectionHeading from '@/components/ui/section-heading'
import { getCaseStudies } from '@/lib/sanity/fetch'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies are not available here right now. Explore Chromapages services or send an inquiry about your website.',
  alternates: { canonical: '/work' },
}

export default async function WorkPage() {
  const projects = await getCaseStudies()

  return (
    <>
      <Hero
        eyebrow="Work"
        title={projects.length ? "See the work behind the website." : "Looking for examples of our work?"}
        description={projects.length ? "Explore the project context, the work completed, and the decisions behind it." : "Explore our services or tell us about the website you want to improve."}
        primaryAction={{ label: 'Send an inquiry', href: '/contact' }}
        secondaryAction={{ label: 'View services', href: '/services', variant: 'secondary' }}
      />
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          {projects.length ? (
            <SectionHeading eyebrow="Projects" title="Context, decisions, and work completed." description="Read what the project needed, what Chromapages contributed, and any documented results." />
          ) : (
            <SectionHeading eyebrow="Work" title="Case studies" />
          )}
          <div className="mt-10 grid gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
            {projects.length === 0 && (
              <p role="status">Case studies are not available here right now.</p>
            )}
          </div>
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
