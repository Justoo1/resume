'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

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

interface SkillsEducationSectionProps {
  skills: Skill[]
  education: Education[]
  certifications: Certification[]
}

const CATEGORY_LABELS: Record<string, string> = {
  frontend:   'Frontend Engineering',
  backend:    'Backend Development',
  ai:         'AI / Machine Learning',
  devops:     'DevOps & Cloud',
  database:   'Databases',
  enterprise: 'Enterprise & ERP',
  tools:      'Tools',
  programming:'Programming Languages',
}

// Display categories in this order
const CATEGORY_ORDER = ['frontend', 'backend', 'ai', 'devops', 'database', 'enterprise']

const SkillsEducationSection: React.FC<SkillsEducationSectionProps> = ({
  skills,
  education,
  certifications,
}) => {
  // Group skills by category
  const grouped: Record<string, Skill[]> = {}
  for (const skill of skills) {
    if (!grouped[skill.category]) grouped[skill.category] = []
    grouped[skill.category].push(skill)
  }

  // Ordered list of categories that have skills
  const orderedCategories = [
    ...CATEGORY_ORDER.filter(c => grouped[c]?.length),
    ...Object.keys(grouped).filter(c => !CATEGORY_ORDER.includes(c)),
  ]

  const endYear = (dateStr: string) => new Date(dateStr).getFullYear()

  return (
    <section className="py-24 bg-white dark:bg-slate-900" id="skills">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* ── Left: Skills ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12">
              <p className="text-sm font-bold text-brand uppercase tracking-widest mb-3">
                Capabilities
              </p>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Technical Stack
              </h2>
            </div>

            <div className="space-y-8">
              {orderedCategories.map((cat) => (
                <div key={cat}>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                    {CATEGORY_LABELS[cat] ?? cat}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {grouped[cat].map((skill) => (
                      <div
                        key={skill._id}
                        className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                      >
                        <div className="w-2 h-2 rounded-full bg-brand shrink-0" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Education + Certifications ────────────── */}
          <motion.div
            id="education"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12">
              <p className="text-sm font-bold text-brand uppercase tracking-widest mb-3">
                Academic
              </p>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Education
              </h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={edu._id}
                  className={`p-6 rounded-2xl border ${
                    index === 0
                      ? 'bg-brand/5 border-brand/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                      {edu.degree}
                    </h3>
                    <span className={`shrink-0 font-bold ${index === 0 ? 'text-brand' : 'text-slate-400'}`}>
                      {endYear(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium mb-1">
                    {edu.institution}
                  </p>
                  {edu.field && (
                    <p className="text-xs text-slate-400 uppercase tracking-tighter">
                      {edu.field}
                      {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert._id}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-brand shrink-0" />
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand transition-colors"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SkillsEducationSection
