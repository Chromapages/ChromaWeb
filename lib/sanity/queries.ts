import { groq } from 'next-sanity'

export const servicesQuery = groq`*[_type == "service"] | order(orderRank asc){
  title,
  "slug": slug.current,
  icon,
  summary,
  price
}`

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  icon,
  summary,
  description,
  features,
  price,
  ctaText,
  ctaLink
}`

// Approval covers the narrative and any optional results; never publish placeholder proof.
const approvedCaseStudy = groq`_type == "caseStudy" && proofStatus == "approved"
  && proofClassification in ["internalConcept", "clientProject"]
  && length(slug.current) > 0 && length(title) > 0 && length(excerpt) > 0
  && length(pt::text(content)) > 0`

export const caseStudiesQuery = groq`*[${approvedCaseStudy}] | order(publishedAt desc){
  title,
  "slug": slug.current,
  client,
  proofClassification,
  mainImage{asset, crop, hotspot, alt},
  excerpt,
  tags
}`

export const projectBySlugQuery = groq`*[${approvedCaseStudy} && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  excerpt,
  client,
  proofClassification,
  mainImage{asset, crop, hotspot, alt},
  content,
  results,
  tags
}`

export const navigationQuery = groq`*[_type == "navigation"][0]{
  items[length(path) > 0]{
    label,
    "href": path
  }
}`

export const processStepsQuery = groq`*[_type == "processStep"] | order(orderRank asc){
  title,
  summary
}`

export const pricingServicesQuery = groq`*[_type == "service"] | order(orderRank asc){
  title,
  summary,
  fit,
  features,
  framing,
  ctaText,
  ctaLink
}`
