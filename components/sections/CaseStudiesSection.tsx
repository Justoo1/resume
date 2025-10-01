'use client'

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Briefcase, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Building2,
  Code2
} from 'lucide-react'

interface CaseStudy {
  _id: string
  title: string
  company: string
  projectType: string
  challenge: string
  solution: string
  results: string
  technologies: string[]
  metrics: {
    performanceImprovement?: number
    usersImpacted?: number
    timeReduction?: number
    costSavings?: string
  }
  duration: string
  teamSize: number
  myRole: string
  screenshots: string[]
  isPublic: boolean
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[]
}

const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ caseStudies }) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards)
    if (expandedCards.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'ai-ml': return <Code2 className="w-5 h-5" />
      case 'web-app': return <Building2 className="w-5 h-5" />
      case 'migration': return <TrendingUp className="w-5 h-5" />
      default: return <Briefcase className="w-5 h-5" />
    }
  }

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'ai-ml': return 'from-purple-500 to-pink-600'
      case 'web-app': return 'from-blue-500 to-indigo-600'
      case 'migration': return 'from-green-500 to-emerald-600'
      case 'database': return 'from-orange-500 to-red-600'
      case 'api': return 'from-teal-500 to-cyan-600'
      default: return 'from-gray-500 to-slate-600'
    }
  }

  if (caseStudies.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-6 py-3 rounded-full mb-6">
            <Briefcase className="w-5 h-5" />
            <span className="font-semibold">Professional Work</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Case Studies
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-world projects and solutions delivered for enterprise clients and organizations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy) => {
            const isExpanded = expandedCards.has(caseStudy._id)
            
            return (
              <Card key={caseStudy._id} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getProjectTypeColor(caseStudy.projectType)} flex items-center justify-center flex-shrink-0`}>
                      {getProjectTypeIcon(caseStudy.projectType)}
                    </div>
                    <Badge variant="outline" className="text-blue-300 border-blue-300">
                      {caseStudy.company}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-bold mb-2">
                    {caseStudy.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{caseStudy.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{caseStudy.teamSize} team members</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Challenge */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-red-400" />
                      <h4 className="font-semibold text-red-300">Challenge</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <h4 className="font-semibold text-yellow-300">Solution</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {isExpanded ? caseStudy.solution : `${caseStudy.solution.substring(0, 150)}...`}
                    </p>
                  </div>

                  {/* Results - Always Visible */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <h4 className="font-semibold text-green-300">Results</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {caseStudy.results}
                    </p>
                    
                    {/* Metrics */}
                    {caseStudy.metrics && (
                      <div className="grid grid-cols-2 gap-4">
                        {caseStudy.metrics.performanceImprovement && (
                          <div className="bg-green-500/20 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-green-400">
                              {caseStudy.metrics.performanceImprovement}%
                            </div>
                            <div className="text-xs text-gray-300">Performance Boost</div>
                          </div>
                        )}
                        {caseStudy.metrics.usersImpacted && (
                          <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-blue-400">
                              {caseStudy.metrics.usersImpacted.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-300">Users Impacted</div>
                          </div>
                        )}
                        {caseStudy.metrics.timeReduction && (
                          <div className="bg-purple-500/20 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-purple-400">
                              {caseStudy.metrics.timeReduction}%
                            </div>
                            <div className="text-xs text-gray-300">Time Saved</div>
                          </div>
                        )}
                        {caseStudy.metrics.costSavings && (
                          <div className="bg-orange-500/20 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-orange-400">
                              {caseStudy.metrics.costSavings}
                            </div>
                            <div className="text-xs text-gray-300">Cost Savings</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <div className="space-y-6 pt-4 border-t border-white/10">
                      {/* My Role */}
                      <div>
                        <h4 className="font-semibold text-blue-300 mb-2">My Role & Contributions</h4>
                        <p className="text-gray-300 leading-relaxed">
                          {caseStudy.myRole}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-blue-300 mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.technologies.map((tech) => (
                            <Badge key={tech} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleCard(caseStudy._id)}
                    className="w-full flex items-center justify-center gap-2 py-3 mt-4 text-blue-400 hover:text-blue-300 transition-colors border-t border-white/10"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Show More Details'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CaseStudiesSection
