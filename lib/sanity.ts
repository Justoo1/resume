import { createClient } from 'next-sanity'
import { Locale } from '@/lib/i18n'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// GROQ queries with locale support
export const queries = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  personalInfo: (locale: string) => `*[_type == "personalInfo" && language == $locale][0]{
    name,
    title,
    email,
    phone,
    location,
    website,
    github,
    linkedin,
    summary,
    "profileImageUrl": profileImage.asset->url
  }`,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  workExperience: (locale: string) => `*[_type == "workExperience" && language == $locale] | order(order asc){
    _id,
    company,
    position,
    startDate,
    endDate,
    description,
    technologies,
    order
  }`,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  projects: (locale: string) => `*[_type == "project" && language == $locale] | order(order asc){
    _id,
    name,
    description,
    technologies,
    github,
    liveUrl,
    "imageUrl": image.asset->url,
    featured,
    stats,
    order
  }`,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  skills: (locale: string) => `*[_type == "skill" && language == $locale] | order(order asc){
    _id,
    name,
    level,
    category,
    order
  }`,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  education: (locale: string) => `*[_type == "education" && language == $locale] | order(order asc){
    _id,
    institution,
    degree,
    field,
    startDate,
    endDate,
    gpa,
    highlights,
    order
  }`,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  certifications: (locale: string) => `*[_type == "certification" && language == $locale] | order(order asc){
    _id,
    name,
    issuer,
    year,
    credentialId,
    credentialUrl,
    expiryDate,
    order
  }`,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  caseStudies: (locale: string) => `*[_type == "caseStudy" && language == $locale && isPublic == true] | order(_createdAt desc){
    _id,
    title,
    company,
    projectType,
    challenge,
    solution,
    results,
    technologies,
    metrics,
    duration,
    teamSize,
    myRole,
    "screenshots": screenshots[].asset->url,
    isPublic
  }`,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  blogPosts: (locale: string) => `*[_type == "blogPost" && language == $locale && published == true] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImageUrl": coverImage.asset->url,
    author,
    category,
    tags,
    publishedAt,
    readingTime
  }`,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  blogPost: (locale: string) => `*[_type == "blogPost" && language == $locale && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImageUrl": coverImage.asset->url,
    content,
    author,
    category,
    tags,
    publishedAt,
    readingTime
  }`
}

// Data fetching functions with locale support
export async function getPersonalInfo(locale: Locale = 'en') {
  return await client.fetch(queries.personalInfo(locale), { locale })
}

export async function getWorkExperience(locale: Locale = 'en') {
  return await client.fetch(queries.workExperience(locale), { locale })
}

export async function getProjects(locale: Locale = 'en') {
  return await client.fetch(queries.projects(locale), { locale })
}

export async function getSkills(locale: Locale = 'en') {
  return await client.fetch(queries.skills(locale), { locale })
}

export async function getEducation(locale: Locale = 'en') {
  return await client.fetch(queries.education(locale), { locale })
}

export async function getCertifications(locale: Locale = 'en') {
  return await client.fetch(queries.certifications(locale), { locale })
}

export async function getCaseStudies(locale: Locale = 'en') {
  return await client.fetch(queries.caseStudies(locale), { locale })
}

export async function getBlogPosts(locale: Locale = 'en') {
  return await client.fetch(queries.blogPosts(locale), { locale })
}

export async function getBlogPost(slug: string, locale: Locale = 'en') {
  return await client.fetch(queries.blogPost(locale), { slug, locale })
}

export async function getAllData(locale: Locale = 'en') {
  const [
    personalInfo,
    workExperience,
    projects,
    skills,
    education,
    certifications,
    caseStudies
  ] = await Promise.all([
    getPersonalInfo(locale),
    getWorkExperience(locale),
    getProjects(locale),
    getSkills(locale),
    getEducation(locale),
    getCertifications(locale),
    getCaseStudies(locale)
  ])

  return {
    personalInfo,
    workExperience,
    projects,
    skills,
    education,
    certifications,
    caseStudies
  }
}
