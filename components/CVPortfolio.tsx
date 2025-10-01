'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
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
  ExternalLink
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data - Replace with Sanity CMS data
const personalInfo = {
  name: "Your Full Name",
  title: "Full Stack Developer & Software Engineer",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "https://yourwebsite.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications using modern technologies. Expertise in React, Node.js, Python, and cloud infrastructure. Strong background in both frontend and backend development with a focus on clean code and user experience."
}

const workExperience = [
  {
    id: 1,
    company: "Tech Corp Inc.",
    position: "Senior Full Stack Developer",
    startDate: "2022-01",
    endDate: null,
    description: "Leading development of microservices architecture, mentoring junior developers, and implementing CI/CD pipelines. Built scalable React applications serving 100K+ users.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"]
  },
  {
    id: 2,
    company: "StartupXYZ",
    position: "Full Stack Developer",
    startDate: "2020-06",
    endDate: "2021-12",
    description: "Developed MVP from scratch, integrated third-party APIs, and optimized database performance. Increased application speed by 40%.",
    technologies: ["Next.js", "Python", "PostgreSQL", "Redis"]
  },
  {
    id: 3,
    company: "Digital Agency",
    position: "Frontend Developer",
    startDate: "2019-01",
    endDate: "2020-05",
    description: "Created responsive web applications for various clients, collaborated with design teams, and implemented modern JavaScript frameworks.",
    technologies: ["React", "JavaScript", "SASS", "Webpack"]
  }
]

const skills = [
  { name: "JavaScript/TypeScript", level: 95, category: "Frontend" },
  { name: "React/Next.js", level: 90, category: "Frontend" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Python", level: 80, category: "Backend" },
  { name: "Go", level: 70, category: "Backend" },
  { name: "PostgreSQL/MongoDB", level: 85, category: "Database" },
  { name: "AWS/Docker", level: 80, category: "DevOps" },
  { name: "Git/CI/CD", level: 90, category: "Tools" }
]

const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    technologies: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
    github: "https://github.com/yourusername/ecommerce",
    live: "https://ecommerce-demo.com",
    stats: { users: 5000, sales: 150000, uptime: 99.9 }
  },
  {
    id: 2,
    name: "Task Management App",
    description: "Real-time collaborative task management with team features",
    technologies: ["React", "Socket.io", "MongoDB", "Express"],
    github: "https://github.com/yourusername/taskapp",
    live: "https://taskapp-demo.com",
    stats: { users: 2500, tasks: 50000, uptime: 99.5 }
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    description: "Real-time analytics dashboard with data visualization",
    technologies: ["TypeScript", "D3.js", "Python", "FastAPI"],
    github: "https://github.com/yourusername/analytics",
    live: "https://analytics-demo.com",
    stats: { users: 1200, dataPoints: 1000000, uptime: 99.8 }
  }
]

const education = [
  {
    id: 1,
    institution: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    startDate: "2015-09",
    endDate: "2019-05",
    gpa: "3.8/4.0",
    highlights: ["Dean's List", "Computer Science Society President"]
  }
]

const certifications = [
  { name: "AWS Solutions Architect", issuer: "Amazon", year: "2023" },
  { name: "Google Cloud Professional", issuer: "Google", year: "2022" },
  { name: "React Developer Certification", issuer: "Meta", year: "2021" }
]

// Chart data
const projectStatsData = projects.map(project => ({
  name: project.name.split(' ')[0],
  users: project.stats.users,
  uptime: project.stats.uptime
}))

const skillsChartData = skills.map(skill => ({
  name: skill.name.split('/')[0],
  level: skill.level
}))

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

const CVPortfolio = () => {
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

  return (
    <div className="cv-container p-8 space-y-6">
      {/* Header Section */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 text-gray-900">{personalInfo.name}</h1>
              <h2 className="text-xl text-primary mb-4 font-medium">{personalInfo.title}</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl">{personalInfo.summary}</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <a href={personalInfo.website} className="hover:text-primary transition-colors">
                  {personalInfo.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-primary" />
                <a href={personalInfo.github} className="hover:text-primary transition-colors">
                  GitHub Profile
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-primary" />
                <a href={personalInfo.linkedin} className="hover:text-primary transition-colors">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workExperience.map((job, index) => (
                  <div key={job.id} className="timeline-item pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-lg">{job.position}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}
                        <span className="text-primary">({calculateDuration(job.startDate, job.endDate)})</span>
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

          {/* Projects Section */}
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
                  <div key={project.id} className="border-l-4 border-primary pl-4 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <div className="flex gap-2">
                        <a href={project.github} className="p-1 hover:text-primary transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                        <a href={project.live} className="p-1 hover:text-primary transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="font-semibold text-primary">{project.stats.users.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Users</div>
                        </div>
                        <div>
                          <div className="font-semibold text-primary">{project.stats.uptime}%</div>
                          <div className="text-xs text-gray-500">Uptime</div>
                        </div>
                        <div>
                          <div className="font-semibold text-primary">
                            {project.stats.sales ? `$${(project.stats.sales / 1000).toFixed(0)}k` : 
                             project.stats.tasks ? `${(project.stats.tasks / 1000).toFixed(0)}k` :
                             `${(project.stats.dataPoints / 1000000).toFixed(1)}M`}
                          </div>
                          <div className="text-xs text-gray-500">
                            {project.stats.sales ? 'Revenue' : 
                             project.stats.tasks ? 'Tasks' : 'Data Points'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Statistics Chart */}
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
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
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

          {/* Skills Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillsChartData.slice(0, 6)}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="level"
                      label={({name}) => name}
                    >
                      {skillsChartData.slice(0, 6).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              {education.map((edu) => (
                <div key={edu.id} className="space-y-2">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                    <span>GPA: {edu.gpa}</span>
                  </div>
                  <div className="space-y-1">
                    {edu.highlights.map((highlight) => (
                      <Badge key={highlight} variant="outline" className="mr-2">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-gray-500">{cert.issuer}</p>
                    </div>
                    <Badge variant="secondary">{cert.year}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CVPortfolio
