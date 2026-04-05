import { client } from './client'
import {
  caseStudiesQuery,
  homePageQuery,
  navigationQuery,
  projectBySlugQuery,
  serviceBySlugQuery,
  servicesQuery,
  processStepsQuery,
  pricingServicesQuery,
  partnersQuery,
} from './queries'
import { navigation as staticNavigation, site as staticSite, services as staticServices, processSteps as staticProcessSteps } from '../site'
import type { CaseStudy, Service, Partner, PricingOffer, ProcessStep } from '@/types/sanity'

export async function getHomePageData() {
  if (!client) {
    console.warn('Sanity client not configured, falling back to static data')
    return {
      title: staticSite.name,
      description: staticSite.description,
      hero: {
        headline: 'Websites that help you get more customers.',
        subheadline: staticSite.description,
        ctaText: staticSite.bookingLabel,
        ctaLink: staticSite.bookingHref,
      },
      featuredProjects: [],
    }
  }
  try {
    const data = await client.fetch(homePageQuery)
    if (!data) throw new Error('No data found')
    return data
  } catch (error) {
    console.warn('Failed to fetch home page data from Sanity, falling back to static data', error)
    return {
      title: staticSite.name,
      description: staticSite.description,
      hero: {
        headline: 'Websites that help you get more customers.',
        subheadline: staticSite.description,
        ctaText: staticSite.bookingLabel,
        ctaLink: staticSite.bookingHref
      },
      featuredProjects: [] // Fallback for projects if needed
    }
  }
}

export async function getNavigation() {
  if (!client) return staticNavigation
  try {
    const data = await client.fetch(navigationQuery)
    if (!data?.items) throw new Error('No navigation data found')
    return data.items
  } catch (error) {
    console.warn('Failed to fetch navigation from Sanity, falling back to static data', error)
    return staticNavigation
  }
}

export async function getServices(): Promise<Service[]> {
  if (!client) return staticServices as unknown as Service[]
  try {
    const data = await client.fetch(servicesQuery)
    if (!data) throw new Error('No services found')
    return data
  } catch (error) {
    console.warn('Failed to fetch services from Sanity, falling back to static data', error)
    return staticServices
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  if (!client) return staticServices.find((s) => s.slug === slug) as unknown as Service
  try {
    const data = await client.fetch(serviceBySlugQuery, { slug })
    if (!data) return staticServices.find((s) => s.slug === slug) as unknown as Service
    return data
  } catch (error) {
    console.warn(`Failed to fetch service detail for ${slug}, falling back.`, error)
    return staticServices.find((s) => s.slug === slug)
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!client) return []
  try {
    const data = await client.fetch(caseStudiesQuery)
    return data || []
  } catch (error) {
    console.warn('Failed to fetch case studies from Sanity', error)
    return []
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!client) return null
  try {
    const data = await client.fetch(projectBySlugQuery, { slug })
    return data
  } catch (error) {
    console.warn(`Failed to fetch case study for ${slug}`, error)
    return null
  }
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  if (!client) return staticProcessSteps as unknown as ProcessStep[]
  try {
    const data = await client.fetch(processStepsQuery)
    if (!data) throw new Error('No process steps found')
    return data
  } catch (error) {
    console.warn('Failed to fetch process steps from Sanity, falling back to static data', error)
    return staticProcessSteps
  }
}

export async function getPricingServices(): Promise<PricingOffer[]> {
  if (!client) return staticServices as unknown as PricingOffer[]
  try {
    const data = await client.fetch(pricingServicesQuery)
    if (!data) throw new Error('No pricing services found')
    return data
  } catch (error) {
    console.warn('Failed to fetch pricing services from Sanity, falling back to static data', error)
    return staticServices
  }
}

export async function getPartners(): Promise<Partner[]> {
  if (!client) return []
  try {
    const data = await client.fetch(partnersQuery)
    return data || []
  } catch (error) {
    console.warn('Failed to fetch partners from Sanity, falling back to empty array', error)
    return []
  }
}
