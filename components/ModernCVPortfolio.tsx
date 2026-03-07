'use client'

import React, { useEffect, useState } from 'react'
import { Terminal, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'
import Link from 'next/link'
import NavBar from './NavBar'
import HeroSection from './sections/HeroSection'
import WorkExperienceSection from './sections/WorkExperienceSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsEducationSection from './sections/SkillsEducationSection'
import AnalyticsSection from './sections/AnalyticsSection'
import { getAllData } from '@/lib/sanity'
import { useLanguage } from './providers/LanguageProvider'
import { PortableTextBlock } from 'next-sanity'

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
  bioLong?: string
  profileImageUrl?: string
}

interface WorkExperience {
  _id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: PortableTextBlock[]
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

interface CVData {
  personalInfo: PersonalInfo | null
  workExperience: WorkExperience[]
  projects: Project[]
  skills: Skill[]
  education: Education[]
  certifications: Certification[]
  caseStudies: unknown[]
}

function computeStats(data: CVData) {
  const yearsExp = data.workExperience.length > 0
    ? new Date().getFullYear() - new Date(
        data.workExperience[data.workExperience.length - 1].startDate
      ).getFullYear()
    : 0

  return [
    { value: `${yearsExp}+`, label: 'Years Experience' },
    { value: `${data.projects.length}+`, label: 'Projects Shipped' },
    { value: '99.9%', label: 'Uptime Record' },
    { value: `${data.skills.length}+`, label: 'Technologies' },
  ]
}

const ModernCVPortfolio = () => {
  const { locale } = useLanguage()
  const [data, setData] = useState<CVData>({
    personalInfo: null,
    workExperience: [],
    projects: [],
    skills: [],
    education: [],
    certifications: [],
    caseStudies: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const cvData = await getAllData(locale)
        setData(cvData)
      } catch (err) {
        console.error('Error fetching CV data:', err)
        setError('Failed to load CV data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [locale])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading portfolio…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-900">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">Could not load data</p>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  const { personalInfo, workExperience, projects, skills, education, certifications } = data
  const stats = computeStats(data)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
      <NavBar personalInfo={personalInfo} />

      {/* Hero */}
      <HeroSection personalInfo={personalInfo} />

      {/* Stats strip */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-black text-brand mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <WorkExperienceSection workExperience={workExperience} />

      {/* Projects */}
      <ProjectsSection projects={projects} />

      {/* Skills & Education */}
      <SkillsEducationSection
        skills={skills}
        education={education}
        certifications={certifications}
      />

      {/* Analytics / Impact */}
      <AnalyticsSection />

      {/* CTA */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Let&apos;s build something{' '}
            <span className="relative inline-block">
              extraordinary.
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-brand rounded-full" />
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 leading-relaxed">
            Open to senior engineering roles, technical leadership, and impactful projects.
            Let&apos;s talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {personalInfo?.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 h-12 px-8 bg-brand text-white rounded-lg font-bold hover:bg-brand/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Send an Email
              </a>
            )}
            {personalInfo?.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 h-12 px-8 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
                View GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-brand p-2 rounded-lg">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">{personalInfo?.name || 'Portfolio'}</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              {personalInfo?.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {personalInfo?.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} {personalInfo?.name || 'Portfolio'}. Built with Next.js &amp; Sanity CMS.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ModernCVPortfolio
