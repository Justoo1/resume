'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Layers } from 'lucide-react'
import { PortableText, PortableTextBlock } from 'next-sanity'

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

function formatYear(dateString: string) {
  return new Date(dateString).getFullYear()
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({ workExperience }) => {
  if (workExperience.length === 0) return null

  return (
    <section className="py-24 bg-white dark:bg-slate-900" id="experience">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-sm font-bold text-brand uppercase tracking-widest mb-3">
              Professional Journey
            </p>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Career Path
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm">
            Building high-impact solutions across various industries, from fintech to enterprise ERP.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-12">
            {workExperience.map((job, index) => (
              <motion.div
                key={job._id}
                className="relative pl-12 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
              >
                {/* Timeline icon */}
                <div
                  className={`absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ring-8 ring-white dark:ring-slate-900 ${
                    index === 0
                      ? 'bg-brand text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 group-hover:bg-brand group-hover:text-white'
                  }`}
                >
                  {index === 0 ? (
                    <Briefcase className="w-4 h-4" />
                  ) : (
                    <Layers className="w-4 h-4" />
                  )}
                </div>

                {/* Card */}
                <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {job.position}
                      </h3>
                      <p className="text-brand font-medium mt-0.5">{job.company}</p>
                    </div>
                    <span className="shrink-0 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold uppercase tracking-tight text-slate-600 dark:text-slate-300">
                      {formatYear(job.startDate)} — {job.endDate ? formatYear(job.endDate) : 'Present'}
                    </span>
                  </div>

                  {/* Description (PortableText) */}
                  <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    <PortableText value={job.description} />
                  </div>

                  {/* Tech tags */}
                  {job.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkExperienceSection
