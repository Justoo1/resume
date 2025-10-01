'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Code, Github, ExternalLink, Target, Zap, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/utils'

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

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  if (projects.length === 0) return null
  console.log({projects})
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-6 py-3 rounded-full mb-6">
            <Code className="w-5 h-5" />
            <span className="font-semibold">Portfolio</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A showcase of my latest work and technical achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project._id} 
              className={`bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Project Header */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {project.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          ⭐ Featured
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">{project.name}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{project.description}</p>
                  </div>
                  
                  <div className="flex gap-3 ml-6">
                    {project.github && (
                      <a 
                        href={project.github} 
                        className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {project.imageUrl && <Image src={urlFor(project.imageUrl).url()} alt='project image' width={1000} height={800} className='w-full object-cover' />}

              {/* Project Stats */}
              {project.stats && Object.values(project.stats).some(stat => stat && stat > 0) && (
                <div className="p-8">
                  <h4 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                    Project Impact
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-6">
                    {project.stats.users && (
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          <span className="font-bold text-blue-600 text-2xl">
                            {project.stats.users.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">Users</div>
                      </div>
                    )}
                    
                    {project.stats.uptime && (
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Zap className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-green-600 text-2xl">{project.stats.uptime}%</span>
                        </div>
                        <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">Uptime</div>
                      </div>
                    )}
                    
                    {(project.stats.sales || project.stats.tasks || project.stats.dataPoints) && (
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                          <span className="font-bold text-purple-600 text-2xl">
                            {project.stats.sales ? `$${(project.stats.sales / 1000).toFixed(0)}k` : 
                             project.stats.tasks ? `${(project.stats.tasks / 1000).toFixed(0)}k` :
                             project.stats.dataPoints ? `${(project.stats.dataPoints / 1000000).toFixed(1)}M` : ''}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                          {project.stats.sales ? 'Revenue' : 
                           project.stats.tasks ? 'Tasks' : 
                           project.stats.dataPoints ? 'Data Points' : ''}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
