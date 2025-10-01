'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Building, Calendar } from 'lucide-react'
import { PortableText, PortableTextBlock } from 'next-sanity'
import { useLanguage } from '@/components/providers/LanguageProvider'

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

interface WorkExperienceSectionProps {
  workExperience: WorkExperience[]
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({ workExperience }) => {
  const { t, locale } = useLanguage()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const localeMap: Record<string, string> = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE'
    }
    return date.toLocaleDateString(localeMap[locale] || 'en-US', { month: 'short', year: 'numeric' })
  }

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (years === 0) return `${remainingMonths} months`
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} months`
  }

  if (workExperience.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-6 py-3 rounded-full mb-6">
            <Building className="w-5 h-5" />
            <span className="font-semibold">{t.sections.professionalJourney}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {t.sections.workExperience}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t.sections.workExperienceSubtitle}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 dark:from-blue-700 dark:via-blue-600 dark:to-blue-700 hidden lg:block"></div>

          <div className="space-y-12">
            {workExperience.map((job) => (
              <div key={job._id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg hidden lg:block z-10">
                  <div className="absolute -inset-2 bg-blue-200 dark:bg-blue-800 rounded-full animate-ping opacity-20"></div>
                </div>

                <div className="lg:ml-20">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{job.position}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold text-xl">{job.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-start lg:items-end gap-2">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : t.common.present}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950">
                          {calculateDuration(job.startDate, job.endDate || null)}
                        </Badge>
                      </div>
                    </div>

                    {/* <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                      {job.description}
                    </p> */}
                    <div className="prose-sm dark:prose-invert pb-2">
                      <PortableText value={job.description}  />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkExperienceSection
