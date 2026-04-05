import type { Metadata } from 'next'
import Hero from '@/components/sections/hero'
import ProjectCard from '@/components/cards/project-card'
import CtaBlock from '@/components/sections/cta-block'
import SectionHeading from '@/components/ui/section-heading'
import { getCaseStudies } from '@/lib/sanity/fetch'
import { featuredProjects as staticProjects } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'See how Chromapages structures websites and landing pages around clarity, trust, and conversion.',
}

import type { CaseStudy } from '@/types/sanity'

export default async function WorkPage() {
  const sanityProjects = await getCaseStudies()
  // Combine or prefer Sanity, but keep static as backup if sanity returns empty
  const projects: CaseStudy[] = sanityProjects.length > 0 ? sanityProjects : (staticProjects as unknown as CaseStudy[])

  return (
    <>
      <Hero
        eyebrow="Work"
        title="Selected projects that show what a cleaner digital experience can do."
        description="These examples are built to demonstrate the kind of thinking Chromapages brings to structure, messaging, and the path to action."
        primaryAction={{ label: 'Book A Call', href: '/contact' }}
        secondaryAction={{ label: 'View Services', href: '/services', variant: 'secondary' }}
        panelLabel="What to look for"
        panelTitle="Simple hierarchy, fewer distractions, stronger CTA paths."
        panelItems={[
          'How the message is positioned',
          'Where trust is introduced',
          'How quickly the visitor gets to the next step',
        ]}
      />
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <SectionHeading
            eyebrow="Project list"
            title="A small set of examples is enough to show the standard."
            description="Each project card is designed to be readable at a glance and strong enough to earn the click into the full case study."
          />
          <div className="mt-10 grid gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
      <CtaBlock
        title="If you want the same level of clarity on your site, we should talk."
        description="We can review your current structure, identify the weak spots, and decide whether the first move is a redesign, a landing page, or a tighter offer."
        primaryLabel="Book A Call"
        primaryHref="/contact"
      />
    </>
  )
}
