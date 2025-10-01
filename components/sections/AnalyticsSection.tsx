'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { BarChart3, TrendingUp, Activity } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'

interface Project {
  _id: string
  name: string
  stats: {
    users?: number
    uptime?: number
    sales?: number
    tasks?: number
    dataPoints?: number
  }
}

interface Skill {
  _id: string
  name: string
  level: number
  category: string
}

interface AnalyticsSectionProps {
  projects: Project[]
  skills: Skill[]
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ projects, skills }) => {
  const { t } = useLanguage()

  // Prepare chart data
  const projectStatsData = projects
    .filter(project => project.stats && project.stats.users)
    .map(project => ({
      name: project.name.split(' ')[0],
      users: project.stats.users || 0,
      uptime: project.stats.uptime || 0,
      performance: Math.floor(Math.random() * 100) + 80 // Mock performance data
    }))

  const skillsChartData = skills.slice(0, 8).map(skill => ({
    name: skill.name.split('/')[0],
    level: skill.level,
    category: skill.category
  }))

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16']

  // Mock growth data
  const growthData = [
    { month: 'Jan', projects: 2, skills: 12 },
    { month: 'Feb', projects: 3, skills: 14 },
    { month: 'Mar', projects: 4, skills: 16 },
    { month: 'Apr', projects: 5, skills: 18 },
    { month: 'May', projects: 6, skills: 20 },
    { month: 'Jun', projects: 8, skills: 22 }
  ]

  if (projectStatsData.length === 0 && skillsChartData.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-6 py-3 rounded-full mb-6">
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">{t.sections.dataInsights}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.sections.analytics}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t.sections.analyticsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Project Performance Chart */}
          {projectStatsData.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                {t.analytics.projectUserEngagement}
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectStatsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#e2e8f0', fontSize: 12 }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                    />
                    <YAxis 
                      tick={{ fill: '#e2e8f0', fontSize: 12 }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        color: '#e2e8f0'
                      }}
                    />
                    <Bar dataKey="users" fill="url(#blueGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Skills Distribution Chart */}
          {skillsChartData.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                {t.analytics.skillsProficiency}
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillsChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="level"
                      label={({ name, level }) => `${name}: ${level}%`}
                      labelLine={false}
                    >
                      {skillsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        color: '#e2e8f0'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Growth Timeline */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            Growth Timeline
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#e2e8f0', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <YAxis 
                  tick={{ fill: '#e2e8f0', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: '#e2e8f0'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projects" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  name="Projects"
                />
                <Line 
                  type="monotone" 
                  dataKey="skills" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  name="Skills"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {projects.length}
            </div>
            <div className="text-blue-200 font-medium">Total Projects</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {skills.length}
            </div>
            <div className="text-green-200 font-medium">Technical Skills</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length) || 0}%
            </div>
            <div className="text-purple-200 font-medium">Avg. Proficiency</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
            <div className="text-3xl font-bold text-orange-400 mb-2">
              {projects.reduce((acc, project) => acc + (project.stats.users || 0), 0).toLocaleString()}
            </div>
            <div className="text-orange-200 font-medium">Total Users Reached</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnalyticsSection
