'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Star, GraduationCap, Award } from 'lucide-react'

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

const SkillsEducationSection: React.FC<SkillsEducationSectionProps> = ({ 
  skills, 
  education, 
  certifications 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categoryColors = {
    'Frontend': 'from-blue-500 to-cyan-500',
    'Backend': 'from-green-500 to-emerald-500',
    'Database': 'from-purple-500 to-violet-500',
    'DevOps': 'from-orange-500 to-red-500',
    'Tools': 'from-pink-500 to-rose-500',
    'Other': 'from-gray-500 to-slate-500'
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-purple-100 text-purple-800 px-6 py-3 rounded-full mb-6">
            <Star className="w-5 h-5" />
            <span className="font-semibold">Expertise</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Skills & Education
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            My technical skills, educational background, and professional certifications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                Technical Skills
              </h3>
              
              <div className="space-y-8">
                {Object.entries(skillCategories).map(([category, categorySkills]) => (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors] || categoryColors.Other}`}></div>
                      <h4 className="text-lg font-semibold text-slate-700 uppercase tracking-wide">
                        {category}
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categorySkills.map((skill) => (
                        <div key={skill._id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-slate-700">{skill.name}</span>
                            <span className="text-sm text-slate-500 font-semibold">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${categoryColors[skill.category as keyof typeof categoryColors] || categoryColors.Other}`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-8">
            {/* Education */}
            {education.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  Education
                </h3>
                
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu._id} className="relative">
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                        <h4 className="font-bold text-slate-800 mb-1">{edu.degree}</h4>
                        {edu.field && <p className="text-sm text-slate-600 mb-2">{edu.field}</p>}
                        <p className="text-indigo-600 font-semibold mb-3">{edu.institution}</p>
                        
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-slate-500">
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </span>
                          {edu.gpa && (
                            <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                              GPA: {edu.gpa}
                            </Badge>
                          )}
                        </div>
                        
                        {edu.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {edu.highlights.map((highlight, index) => (
                              <Badge key={index} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  Certifications
                </h3>
                
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert._id} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">
                            {cert.credentialUrl ? (
                              <a 
                                href={cert.credentialUrl} 
                                className="hover:text-green-600 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {cert.name}
                              </a>
                            ) : (
                              cert.name
                            )}
                          </h4>
                          <p className="text-sm text-slate-600">{cert.issuer}</p>
                          {cert.credentialId && (
                            <p className="text-xs text-slate-400 mt-1">ID: {cert.credentialId}</p>
                          )}
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                          {cert.year}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsEducationSection
