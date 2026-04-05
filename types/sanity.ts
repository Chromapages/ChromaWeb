import type { SanityImageSource } from "@sanity/image-url"
import type { PortableTextBlock } from "@portabletext/types"

export type Partner = {
  _id?: string
  name: string
  logo: SanityImageSource
  website?: string
  orderRank?: number
}

export type PricingOffer = {
  _id?: string
  title?: string
  label?: string // Static fallback
  summary: string
  fit?: string
  features?: string[]
  includes?: string[] // Static fallback
  framing?: string
  ctaText?: string
  ctaLink?: string
  ctaLabel?: string // Static fallback
}

export type CaseStudy = {
  _id?: string
  title?: string // Maps to label in static
  label?: string // Static fallback
  slug: string // Always a string after GROQ "slug": slug.current
  client?: string
  mainImage?: SanityImageSource
  excerpt?: string // Maps to summary in static
  summary?: string // Static fallback
  content?: PortableTextBlock[]
  results?: string | string[]
  tags?: string[]
  category?: string // Static fallback
  result?: string // Static fallback
  challenge?: string // Static fallback
  approach?: string // Static fallback
  deliverables?: string[] // Static fallback
  imageAlt?: string // Static fallback
}

export type Service = {
  _id?: string
  title?: string
  label?: string // Static fallback
  slug: string // Always a string after GROQ "slug": slug.current
  icon?: string
  summary: string
  description?: PortableTextBlock[]
  features?: string[]
  price?: string
  ctaText?: string
  ctaLink?: string
  body?: string // Static fallback
  audience?: string[] // Static fallback
  outcomes?: string[] // Static fallback
  includes?: string[] // Static fallback
  faq?: { _id?: string; question: string; answer: string }[] // Static fallback
}

export type ProcessStep = {
  _id?: string
  title: string
  summary: string
}

export type NavigationItem = {
  label: string
  path: string
}
