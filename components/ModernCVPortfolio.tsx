'use client'

import React, { useEffect, useState } from 'react'
import HeroSection from './sections/HeroSection'
import WorkExperienceSection from './sections/WorkExperienceSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsEducationSection from './sections/SkillsEducationSection'
import AnalyticsSection from './sections/AnalyticsSection'
import { getAllData } from '@/lib/sanity'
import CaseStudiesSection from './sections/CaseStudiesSection'
import ProcessDocumentationSection from './sections/ProcessDocumentationSection'

// Types
interface PersonalInfo {
  name: string
  title: string
  email: string
  phone?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  summary: string
  profileImageUrl?: string
}

interface WorkExperience {
  _id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  technologies: string[]
  order: number
}

interface Project {
  _id: string
  name: string
  description: string
  technologies: string[]
  github?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
  stats: {
    users?: number
    uptime?: number
    sales?: number
    tasks?: number
    dataPoints?: number
  }
  order: number
}

interface Skill {
  _id: string
  name: string
  level: number
  category: string
  order: number
}

interface Education {
  _id: string
  institution: string
  degree: string
  field?: string
  startDate: string
  endDate: string
  gpa?: string
  highlights: string[]
  order: number
}

interface Certification {
  _id: string
  name: string
  issuer: string
  year: string
  credentialId?: string
  credentialUrl?: string
  expiryDate?: string
  order: number
}

interface CaseStudy {
  _id: string
  title: string
  company: string
  projectType: string
  challenge: string
  solution: string
  results: string
  technologies: string[]
  metrics: {
    performanceImprovement?: number
    usersImpacted?: number
    timeReduction?: number
    costSavings?: string
  }
  duration: string
  teamSize: number
  myRole: string
  screenshots: string[]
  isPublic: boolean
}

interface CVData {
  personalInfo: PersonalInfo | null
  workExperience: WorkExperience[]
  projects: Project[]
  skills: Skill[]
  education: Education[]
  certifications: Certification[]
  caseStudies: CaseStudy[]
}

const ModernCVPortfolio = () => {
  const [data, setData] = useState<CVData>({
    personalInfo: null,
    workExperience: [],
    projects: [],
    skills: [],
    education: [],
    certifications: [],
    caseStudies: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cvData = await getAllData()
        setData(cvData)
      } catch (err) {
        console.error('Error fetching CV data:', err)
        setError('Failed to load CV data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-600 text-xl font-medium">Loading your professional portfolio...</p>
          <p className="text-gray-500 text-sm mt-2">Fetching data from Sanity CMS</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md">
          <div className="text-red-500 text-8xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-red-600 mb-6 text-lg">{error}</p>
          <div className="text-left bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">To fix this:</p>
            <ul className="space-y-1">
              <li>• Check your Sanity configuration</li>
              <li>• Verify your project ID in .env.local</li>
              <li>• Ensure Sanity schemas are deployed</li>
              <li>• Add some content via Sanity Studio</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const { personalInfo, workExperience, projects, skills, education, certifications, caseStudies } = data

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection personalInfo={personalInfo} onPrint={handlePrint} />
      
      {/* Work Experience Section */}
      <WorkExperienceSection workExperience={workExperience} />
      
      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Case Studies Section */}
      <CaseStudiesSection caseStudies={caseStudies} />
      
      {/* Process Documentation Section */}
      <ProcessDocumentationSection />
      
      {/* Skills & Education Section */}
      <SkillsEducationSection 
        skills={skills} 
        education={education} 
        certifications={certifications} 
      />
      
      {/* Analytics Section */}
      <AnalyticsSection projects={projects} skills={skills} />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">
              {personalInfo?.name || 'Your Name'}
            </h3>
            <p className="text-slate-300">
              {personalInfo?.title || 'Your Professional Title'}
            </p>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            {personalInfo?.email && (
              <a 
                href={`mailto:${personalInfo.email}`}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {personalInfo.email}
              </a>
            )}
            {personalInfo?.github && (
              <a 
                href={personalInfo.github}
                className="text-slate-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
            {personalInfo?.linkedin && (
              <a 
                href={personalInfo.linkedin}
                className="text-slate-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            )}
          </div>
          
          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} {personalInfo?.name || 'Your Name'}. 
              Built with Next.js, TypeScript, and Sanity CMS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ModernCVPortfolio
