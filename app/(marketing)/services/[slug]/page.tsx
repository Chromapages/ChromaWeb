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
    title: service.title || service.label || 'Service',
    description: service.summary,
    alternates: { canonical: `/services/${slug}` },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) notFound()
  const features = service.features?.filter((feature) => feature.trim())

  return (
    <>
      <Hero
        eyebrow="Services"
        title={service.title || service.label || 'Service'}
        description={service.summary}
        primaryAction={{ label: 'Send an inquiry', href: '/contact' }}
        secondaryAction={{ label: 'Back to services', href: '/services', variant: 'secondary' }}
      />

      <section className="cp-section border-t border-outline bg-bg">
        <div className="cp-container cp-grid items-start gap-y-8">
          <article className="col-span-full min-w-0 lg:col-span-8">
            <SectionHeading eyebrow="The service" title="About this service." className="mb-6" />
            {service.description?.length ? (
              <RichText value={service.description} />
            ) : (
              <p className="max-w-[68ch] text-muted">{service.body || service.summary}</p>
            )}
          </article>

          <aside className="col-span-full min-w-0 space-y-6 lg:col-span-4">
            {features?.length ? (
              <div className="border-t border-outline pt-5">
                <h2 className="text-xl font-semibold">Key Deliverables</h2>
                <ul className="mt-4 list-disc space-y-2 ps-5 text-muted">
                  {features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
            ) : null}

            <div className="rounded-panel border border-outline bg-surface-lowest p-6">
              <h2 className="text-xl font-semibold">Have a question about this service?</h2>
              <p className="mt-3 text-muted">
                Tell us what needs to change and which service you are considering.
              </p>
              <Button href="/contact" variant="primary" className="mt-5">
                Send an inquiry
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <CtaBlock
        title="Is this the right service for your website?"
        description="Start with the problem you want to solve."
        primaryLabel="Send an inquiry"
        primaryHref="/contact"
      />
    </>
  )
}
