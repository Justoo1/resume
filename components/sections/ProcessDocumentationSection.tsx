'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  GitBranch,
  FileText,
  Settings,
  Users,
  Zap,
  Shield,
  Database,
  CheckCircle,
  AlertCircle,
  Target,
  Layers,
  Code,
  TestTube,
  Rocket
} from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const ProcessDocumentationSection: React.FC = () => {
  const { t } = useLanguage()
  const [activeProcess, setActiveProcess] = useState('development')

  const processes = {
    development: {
      title: "Development Workflow",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600",
      description: "My structured approach to software development from planning to deployment",
      steps: [
        {
          title: "Requirements Analysis",
          icon: <FileText className="w-5 h-5" />,
          description: "Gather and document functional and non-functional requirements",
          details: [
            "Stakeholder interviews and requirement gathering",
            "User story creation with acceptance criteria",
            "Technical feasibility assessment",
            "Risk analysis and mitigation planning",
            "Timeline and resource estimation"
          ],
          tools: ["Notion", "Figma", "User Story Mapping"]
        },
        {
          title: "System Design & Architecture",
          icon: <Layers className="w-5 h-5" />,
          description: "Design scalable and maintainable system architecture",
          details: [
            "Database schema design and optimization",
            "API design and documentation",
            "Technology stack selection",
            "Security architecture planning",
            "Performance and scalability considerations"
          ],
          tools: ["Draw.io", "Database Design Tools", "API Documentation"]
        },
        {
          title: "Development & Implementation",
          icon: <Code className="w-5 h-5" />,
          description: "Agile development with continuous integration",
          details: [
            "Feature-based development with Git flow",
            "Test-driven development (TDD) approach",
            "Code review and pair programming",
            "Continuous integration and automated testing",
            "Documentation and code commenting"
          ],
          tools: ["Git", "VS Code", "Jest", "CI/CD Pipelines"]
        },
        {
          title: "Testing & Quality Assurance",
          icon: <TestTube className="w-5 h-5" />,
          description: "Comprehensive testing strategy for reliability",
          details: [
            "Unit testing for individual components",
            "Integration testing for system interactions",
            "User acceptance testing with stakeholders",
            "Performance testing and optimization",
            "Security testing and vulnerability assessment"
          ],
          tools: ["Jest", "Cypress", "Postman", "Security Scanners"]
        },
        {
          title: "Deployment & Monitoring",
          icon: <Rocket className="w-5 h-5" />,
          description: "Automated deployment with continuous monitoring",
          details: [
            "Automated deployment pipelines",
            "Environment configuration management",
            "Performance monitoring and alerting",
            "Error tracking and logging",
            "Post-deployment validation and rollback procedures"
          ],
          tools: ["Vercel", "Docker", "Monitoring Tools", "Log Management"]
        }
      ]
    },
    
    migration: {
      title: "System Migration Process",
      icon: <GitBranch className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
      description: "Systematic approach to migrating legacy systems to modern architectures",
      steps: [
        {
          title: "Legacy System Assessment",
          icon: <Database className="w-5 h-5" />,
          description: "Comprehensive analysis of existing system",
          details: [
            "Code base analysis and documentation review",
            "Database schema and data flow mapping",
            "Performance bottleneck identification",
            "Security vulnerability assessment",
            "Integration point documentation"
          ],
          tools: ["Code Analysis Tools", "Database ERD Tools", "Performance Profilers"]
        },
        {
          title: "Migration Strategy Planning",
          icon: <Target className="w-5 h-5" />,
          description: "Develop comprehensive migration roadmap",
          details: [
            "Technology stack selection and comparison",
            "Data migration strategy and validation",
            "Phased migration timeline and milestones",
            "Risk assessment and contingency planning",
            "Resource allocation and team coordination"
          ],
          tools: ["Project Planning Tools", "Risk Assessment Matrices"]
        },
        {
          title: "Parallel Development",
          icon: <Layers className="w-5 h-5" />,
          description: "Build new system alongside legacy system",
          details: [
            "Modern architecture implementation",
            "API-first development approach",
            "Data synchronization mechanisms",
            "Feature parity validation",
            "Performance optimization and testing"
          ],
          tools: ["Next.js", "TypeScript", "Database Migration Tools"]
        },
        {
          title: "Data Migration & Validation",
          icon: <Shield className="w-5 h-5" />,
          description: "Secure and accurate data transfer",
          details: [
            "Data extraction and transformation scripts",
            "Data integrity validation and verification",
            "Incremental migration with rollback capability",
            "User acceptance testing with real data",
            "Performance testing under production load"
          ],
          tools: ["ETL Tools", "Data Validation Scripts", "Testing Frameworks"]
        },
        {
          title: "Go-Live & Support",
          icon: <Rocket className="w-5 h-5" />,
          description: "Smooth transition with minimal downtime",
          details: [
            "Blue-green deployment strategy",
            "DNS cutover and traffic routing",
            "Real-time monitoring and alerting",
            "User training and documentation",
            "24/7 support during transition period"
          ],
          tools: ["Deployment Tools", "Monitoring Dashboards", "Documentation"]
        }
      ]
    },

    ai_integration: {
      title: "AI Integration Methodology",
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
      description: "Structured approach to integrating AI/ML capabilities into applications",
      steps: [
        {
          title: "Use Case Definition",
          icon: <Target className="w-5 h-5" />,
          description: "Identify and validate AI application opportunities",
          details: [
            "Business problem identification and analysis",
            "AI feasibility assessment and ROI calculation",
            "Data availability and quality evaluation",
            "Success metrics and KPI definition",
            "Ethical considerations and compliance review"
          ],
          tools: ["Business Analysis", "Data Assessment Tools"]
        },
        {
          title: "Model Selection & Setup",
          icon: <Settings className="w-5 h-5" />,
          description: "Choose and configure appropriate AI models",
          details: [
            "Model architecture evaluation and selection",
            "Local vs cloud deployment considerations",
            "Training data preparation and preprocessing",
            "Model fine-tuning and optimization",
            "Performance benchmarking and validation"
          ],
          tools: ["Ollama", "LangChain", "Model Libraries"]
        },
        {
          title: "Integration Development",
          icon: <Code className="w-5 h-5" />,
          description: "Seamless AI integration into existing systems",
          details: [
            "API wrapper development for model access",
            "Error handling and fallback mechanisms",
            "Response caching and optimization",
            "User interface design for AI features",
            "Real-time processing pipeline implementation"
          ],
          tools: ["Python", "FastAPI", "Queue Systems"]
        },
        {
          title: "Testing & Validation",
          icon: <TestTube className="w-5 h-5" />,
          description: "Comprehensive AI system testing",
          details: [
            "Model accuracy and performance testing",
            "Edge case handling and error scenarios",
            "Load testing for concurrent AI requests",
            "User acceptance testing for AI features",
            "Bias detection and fairness evaluation"
          ],
          tools: ["Testing Frameworks", "Model Validation Tools"]
        },
        {
          title: "Monitoring & Optimization",
          icon: <AlertCircle className="w-5 h-5" />,
          description: "Continuous AI system monitoring and improvement",
          details: [
            "Model performance monitoring and drift detection",
            "Usage analytics and user feedback collection",
            "Continuous model improvement and retraining",
            "Cost optimization and resource management",
            "Compliance monitoring and audit trails"
          ],
          tools: ["Monitoring Tools", "Analytics Platforms"]
        }
      ]
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-6 py-3 rounded-full mb-6">
            <Settings className="w-5 h-5" />
            <span className="font-semibold">{t.sections.methodology}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {t.sections.methodologyTitle}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t.sections.methodologySubtitle}
          </p>
        </div>

        {/* Process Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(processes).map(([key, process]) => (
            <button
              key={key}
              onClick={() => setActiveProcess(key)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeProcess === key
                  ? `bg-gradient-to-r ${process.color} text-white shadow-lg`
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {process.icon}
              <span className="font-semibold">{process.title}</span>
            </button>
          ))}
        </div>

        {/* Active Process Display */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className={`bg-gradient-to-r ${processes[activeProcess as keyof typeof processes].color} text-white p-8`}>
            <div className="flex items-center gap-4 mb-4">
              {processes[activeProcess as keyof typeof processes].icon}
              <h3 className="text-3xl font-bold">
                {processes[activeProcess as keyof typeof processes].title}
              </h3>
            </div>
            <p className="text-xl opacity-90">
              {processes[activeProcess as keyof typeof processes].description}
            </p>
          </div>

          <div className="p-8">
            <div className="space-y-8">
              {processes[activeProcess as keyof typeof processes].steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Number and Connector */}
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${processes[activeProcess as keyof typeof processes].color} flex items-center justify-center text-white font-bold`}>
                        {index + 1}
                      </div>
                      {index < processes[activeProcess as keyof typeof processes].steps.length - 1 && (
                        <div className="w-0.5 h-16 bg-gradient-to-b from-slate-300 dark:from-slate-600 to-transparent mt-4"></div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pb-8">
                      <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-900 hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                              {step.icon}
                            </div>
                            <CardTitle className="text-xl text-slate-800 dark:text-slate-100">
                              {step.title}
                            </CardTitle>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300">{step.description}</p>
                        </CardHeader>

                        <CardContent>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Details */}
                            <div className="lg:col-span-2">
                              <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Key Activities:</h4>
                              <ul className="space-y-2">
                                {step.details.map((detail, detailIndex) => (
                                  <li key={detailIndex} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Tools */}
                            <div>
                              <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Tools & Technologies:</h4>
                              <div className="flex flex-wrap gap-2">
                                {step.tools.map((tool, toolIndex) => (
                                  <Badge key={toolIndex} variant="outline" className="text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Collaboration First</h3>
            <p className="text-slate-600 dark:text-slate-300">Continuous stakeholder engagement and transparent communication throughout the project lifecycle.</p>
          </Card>

          <Card className="text-center p-6 border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Quality & Security</h3>
            <p className="text-slate-600 dark:text-slate-300">Rigorous testing, code review, and security-first approach ensuring robust and reliable solutions.</p>
          </Card>

          <Card className="text-center p-6 border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Continuous Improvement</h3>
            <p className="text-slate-600 dark:text-slate-300">Iterative development with continuous learning, optimization, and adaptation to changing requirements.</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ProcessDocumentationSection
