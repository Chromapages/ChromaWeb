import { groq } from 'next-sanity'

export const homePageQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  hero{
    headline,
    subheadline,
    ctaText,
    ctaLink,
    bgImage
  },
  featuredProjects[]->{
    title,
    slug,
    mainImage,
    excerpt
  }
}`

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

export const caseStudiesQuery = groq`*[_type == "caseStudy"] | order(publishedAt desc){
  title,
  "slug": slug.current,
  client,
  mainImage,
  excerpt,
  tags
}`

export const projectBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  title,
  client,
  mainImage,
  content,
  results,
  tags
}`

export const navigationQuery = groq`*[_type == "navigation"][0]{
  items[]{
    label,
    "path": select(
      _type == "reference" => @->slug.current,
      path != "" => path
    )
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

export const partnersQuery = groq`*[_type == "partner"] | order(orderRank asc){
  name,
  logo,
  website
}`
