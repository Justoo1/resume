'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
// import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Calendar,
  Building,
  GraduationCap,
  Award,
  Code,
  BarChart3,
  ExternalLink,
  Download,
  User
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { getAllData } from '@/lib/sanity'

// Types for Sanity data
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

interface CVData {
  personalInfo: PersonalInfo | null
  workExperience: WorkExperience[]
  projects: Project[]
  skills: Skill[]
  education: Education[]
  certifications: Certification[]
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

const CVPortfolioWithSanity = () => {
  const [data, setData] = useState<CVData>({
    personalInfo: null,
    workExperience: [],
    projects: [],
    skills: [],
    education: [],
    certifications: []
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
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

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your CV...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Please check your Sanity configuration and try again.</p>
        </div>
      </div>
    )
  }

  const { personalInfo, workExperience, projects, skills, education, certifications } = data

  // Prepare chart data
  const projectStatsData = projects.map(project => ({
    name: project.name.split(' ')[0],
    users: project.stats.users || 0,
    uptime: project.stats.uptime || 0
  }))

  const skillsChartData = skills.slice(0, 6).map(skill => ({
    name: skill.name.split('/')[0],
    level: skill.level
  }))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Print Button */}
      <div className="max-w-4xl mx-auto mb-4 px-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download/Print CV
        </button>
      </div>

      <div className="cv-container p-8 space-y-6">
        {/* Header Section */}
        <Card className="border-none shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex items-start gap-6 flex-1">
                {personalInfo?.profileImageUrl && (
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={personalInfo.profileImageUrl} alt={personalInfo.name} />
                    <AvatarFallback>
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2 text-gray-900">
                    {personalInfo?.name || 'Your Name'}
                  </h1>
                  <h2 className="text-xl text-primary mb-4 font-medium">
                    {personalInfo?.title || 'Your Professional Title'}
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    {personalInfo?.summary || 'Your professional summary will appear here.'}
                  </p>
                </div>
              </div>
              
              {personalInfo && (
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{personalInfo.email}</span>
                  </div>
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <a href={personalInfo.website} className="hover:text-primary transition-colors">
                        {personalInfo.website}
                      </a>
                    </div>
                  )}
                  {personalInfo.github && (
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-primary" />
                      <a href={personalInfo.github} className="hover:text-primary transition-colors">
                        GitHub Profile
                      </a>
                    </div>
                  )}
                  {personalInfo.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-primary" />
                      <a href={personalInfo.linkedin} className="hover:text-primary transition-colors">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Work Experience */}
            {workExperience.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {workExperience.map((job) => (
                      <div key={job._id} className="timeline-item pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="font-semibold text-lg">{job.position}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}
                            <span className="text-primary">({calculateDuration(job.startDate, job.endDate || '')})</span>
                          </div>
                        </div>
                        <p className="text-primary font-medium mb-2">{job.company}</p>
                        <p className="text-gray-600 mb-3 leading-relaxed">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Featured Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div key={project._id} className="border-l-4 border-primary pl-4 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <div className="flex gap-2">
                            {project.github && (
                              <a href={project.github} className="p-1 hover:text-primary transition-colors">
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a href={project.liveUrl} className="p-1 hover:text-primary transition-colors">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                        {project.stats && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              {project.stats.users && (
                                <div>
                                  <div className="font-semibold text-primary">{project.stats.users.toLocaleString()}</div>
                                  <div className="text-xs text-gray-500">Users</div>
                                </div>
                              )}
                              {project.stats.uptime && (
                                <div>
                                  <div className="font-semibold text-primary">{project.stats.uptime}%</div>
                                  <div className="text-xs text-gray-500">Uptime</div>
                                </div>
                              )}
                              {(project.stats.sales || project.stats.tasks || project.stats.dataPoints) && (
                                <div>
                                  <div className="font-semibold text-primary">
                                    {project.stats.sales ? `$${(project.stats.sales / 1000).toFixed(0)}k` : 
                                     project.stats.tasks ? `${(project.stats.tasks / 1000).toFixed(0)}k` :
                                     project.stats.dataPoints ? `${(project.stats.dataPoints / 1000000).toFixed(1)}M` : ''}
                                  </div>
                                  <div className="text-xs text-gray-500">
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
                </CardContent>
              </Card>
            )}

            {/* Project Statistics Chart */}
            {projectStatsData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Project Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projectStatsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#3b82f6" name="Users" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            {skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill._id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skills Chart */}
            {skillsChartData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={skillsChartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="level"
                          label={({name}) => name}
                        >
                          {skillsChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {education.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu._id} className="space-y-2">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                        <p className="text-primary font-medium">{edu.institution}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                          {edu.gpa && <span>GPA: {edu.gpa}</span>}
                        </div>
                        {edu.highlights.length > 0 && (
                          <div className="space-y-1">
                            {edu.highlights.map((highlight, index) => (
                              <Badge key={index} variant="outline" className="mr-2">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <div key={cert._id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            {cert.credentialUrl ? (
                              <a href={cert.credentialUrl} className="hover:text-primary transition-colors">
                                {cert.name}
                              </a>
                            ) : (
                              cert.name
                            )}
                          </p>
                          <p className="text-sm text-gray-500">{cert.issuer}</p>
                          {cert.credentialId && (
                            <p className="text-xs text-gray-400">ID: {cert.credentialId}</p>
                          )}
                        </div>
                        <Badge variant="secondary">{cert.year}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVPortfolioWithSanity
