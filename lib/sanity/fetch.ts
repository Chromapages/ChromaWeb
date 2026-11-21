import { client } from './client'
import {
  caseStudiesQuery,
  navigationQuery,
  projectBySlugQuery,
  serviceBySlugQuery,
  servicesQuery,
  processStepsQuery,
  pricingServicesQuery,
} from './queries'
import { navigation as staticNavigation, services as staticServices, pricingOffers as staticPricingOffers, processSteps as staticProcessSteps } from '../site'
import type { CaseStudy, NavigationItem, Service, PricingOffer, ProcessStep } from '@/types/sanity'

export async function getNavigation(): Promise<NavigationItem[]> {
  if (!client) return staticNavigation
  try {
    const data = await client.fetch<{ items: NavigationItem[] | null } | null>(navigationQuery)
    const items = data?.items?.filter(({ label, href }) =>
      typeof label === 'string' && label.trim() &&
      typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') &&
      !/[\s\\]/.test(href),
    )
    return items?.length ? items : staticNavigation
  } catch (error) {
    console.warn('Failed to fetch navigation from Sanity, falling back to static data', error)
    return staticNavigation
  }
}

export async function getServices(): Promise<Service[]> {
  if (!client) return staticServices
  try {
    const data = await client.fetch<Service[]>(servicesQuery)
    return data?.length ? data : staticServices
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
    const data = await client.fetch<CaseStudy[]>(caseStudiesQuery)
    return data || []
  } catch (error) {
    console.warn('Failed to fetch case studies from Sanity', error)
    return []
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!client) return null
  try {
    const data = await client.fetch<CaseStudy | null>(projectBySlugQuery, { slug })
    return data
  } catch (error) {
    console.warn(`Failed to fetch case study for ${slug}`, error)
    return null
  }
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  if (!client) return staticProcessSteps
  try {
    const data = await client.fetch<ProcessStep[]>(processStepsQuery)
    return data?.length ? data : staticProcessSteps
  } catch (error) {
    console.warn('Failed to fetch process steps from Sanity, falling back to static data', error)
    return staticProcessSteps
  }
}

export async function getPricingServices(): Promise<PricingOffer[]> {
  if (!client) return staticPricingOffers
  try {
    const data = await client.fetch<PricingOffer[]>(pricingServicesQuery)
    return data?.length ? data : staticPricingOffers
  } catch (error) {
    console.warn('Failed to fetch pricing services from Sanity, falling back to static data', error)
    return staticPricingOffers
  }
}
