'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'

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

interface ProjectsSectionProps {
  projects: Project[]
}

function getCategory(technologies: string[]): string {
  const t = technologies.join(' ').toLowerCase()
  if (/langchain|openai|llm|rag|ollama|deepseek|mlflow/.test(t)) return 'AI / ML'
  if (/fastapi|microservice|kubernetes/.test(t)) return 'Architecture'
  if (/mobile money|pwa/.test(t)) return 'FinTech'
  if (/figma|branding|ui design/.test(t)) return 'Product'
  if (/odoo/.test(t)) return 'Enterprise'
  if (/sanity/.test(t)) return 'CMS'
  return 'Full-Stack'
}

const GRADIENTS = [
  'from-blue-900 via-blue-800 to-blue-700',
  'from-slate-800 via-slate-700 to-slate-600',
  'from-emerald-900 via-teal-800 to-teal-600',
  'from-violet-900 via-purple-800 to-purple-600',
  'from-orange-900 via-amber-800 to-amber-600',
  'from-cyan-900 via-sky-800 to-sky-600',
  'from-rose-900 via-red-800 to-red-600',
  'from-indigo-900 via-indigo-800 to-blue-700',
  'from-green-900 via-emerald-800 to-emerald-600',
]

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  if (projects.length === 0) return null

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800/20" id="projects">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16">
          <p className="text-sm font-bold text-brand uppercase tracking-widest mb-3">
            Portfolio Highlights
          </p>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Featured Projects
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            >
              {/* Image / gradient placeholder */}
              <div className="relative h-56 overflow-hidden">
                {project.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                  >
                    <span className="text-white/20 text-8xl font-black select-none">
                      {project.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                        title="View Code"
                      >
                        <GithubIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black bg-brand/10 text-brand px-2 py-0.5 rounded uppercase tracking-tighter">
                    {getCategory(project.technologies)}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded uppercase tracking-tighter">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
