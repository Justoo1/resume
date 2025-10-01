import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// GROQ queries
export const queries = {
  personalInfo: `*[_type == "personalInfo"][0]{
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

  workExperience: `*[_type == "workExperience"] | order(order asc){
    _id,
    company,
    position,
    startDate,
    endDate,
    description,
    technologies,
    order
  }`,

  projects: `*[_type == "project"] | order(order asc){
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

  skills: `*[_type == "skill"] | order(order asc){
    _id,
    name,
    level,
    category,
    order
  }`,

  education: `*[_type == "education"] | order(order asc){
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

  certifications: `*[_type == "certification"] | order(order asc){
    _id,
    name,
    issuer,
    year,
    credentialId,
    credentialUrl,
    expiryDate,
    order
  }`,
  caseStudies: `*[_type == "caseStudy" && isPublic == true] | order(_createdAt desc){
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
  }`
}

// Data fetching functions
export async function getPersonalInfo() {
  return await client.fetch(queries.personalInfo)
}

export async function getWorkExperience() {
  return await client.fetch(queries.workExperience)
}

export async function getProjects() {
  return await client.fetch(queries.projects)
}

export async function getSkills() {
  return await client.fetch(queries.skills)
}

export async function getEducation() {
  return await client.fetch(queries.education)
}

export async function getCertifications() {
  return await client.fetch(queries.certifications)
}

export async function getCaseStudies() {
  return await client.fetch(queries.caseStudies)
}

export async function getAllData() {
  const [
    personalInfo,
    workExperience,
    projects,
    skills,
    education,
    certifications,
    caseStudies
  ] = await Promise.all([
    getPersonalInfo(),
    getWorkExperience(),
    getProjects(),
    getSkills(),
    getEducation(),
    getCertifications(),
    getCaseStudies()
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
