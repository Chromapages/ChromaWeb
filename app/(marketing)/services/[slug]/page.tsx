import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Hero from '@/components/sections/hero'
import CtaBlock from '@/components/sections/cta-block'
import SectionHeading from '@/components/ui/section-heading'
import RichText from '@/components/ui/rich-text'
import { getServiceBySlug, getServices } from '@/lib/sanity/fetch'
import Button from '@/components/ui/button'

import type { Service } from '@/types/sanity'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service: Service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) return { title: 'Service Not Found' }

  return {
    title: `${service.title || service.label || 'Service'} | Chromapages`,
    description: service.summary,
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) notFound()

  return (
    <>
      <Hero
        eyebrow="Service Detail"
        title={service.title || service.label || 'Service'}
        description={service.summary}
        primaryAction={{
          label: service.ctaText || 'Get Started',
          href: service.ctaLink || '/contact',
        }}
        secondaryAction={{ label: 'Back to Services', href: '/services', variant: 'secondary' }}
        panelLabel="Offer path"
        panelTitle={service.price || 'Inquire for pricing'}
        panelItems={service.features || ['Focused execution', 'Clear deliverables', 'Launch-ready QA']}
      />

      <section className="bg-surface py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="Deep dive" title="Exactly what is included." className="mb-12" />
              <RichText value={service.description || []} />
            </div>

            {/* Sidebar / Features */}
            <aside className="space-y-10">
              <div className="rounded-structural bg-surface-lowest p-8 shadow-ambient border border-outline/5 transition-all hover:shadow-elevated">
                <h3 className="text-headline-xs font-display mb-6">Key Deliverables</h3>
                <ul className="space-y-4">
                  {(service.features || ['Design Audit', 'Development', 'QA']).map((feature: string) => (
                    <li key={feature} className="flex items-start gap-3 text-body-md text-on-surface/80">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-structural bg-primary p-8 text-on-primary shadow-elevated transition-transform hover:-translate-y-1">
                <h3 className="text-headline-xs font-display mb-4">Ready to move?</h3>
                <p className="text-body-md mb-8 opacity-90 leading-relaxed">
                  If this fits your current project needs, the best next step is a quick call to confirm
                  the timeline and details.
                </p>
                <Button href="/contact" variant="primary" className="w-full bg-white text-primary hover:bg-white/90 shadow-lg">
                  Book A Call
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBlock
        title={`Still deciding if ${(service.title || 'the service').toLowerCase()} is the right fit?`}
        description="We can help you compare our offer paths and decide which one provides the best ROI for your current stage."
        primaryLabel="Compare services"
        primaryHref="/services"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
      />
    </>
  )
}
