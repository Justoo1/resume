// Example case study structure for your Sanity CMS
import {defineField, defineType} from 'sanity'

export default defineType ({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          {title: 'Web Application', value: 'web-app'},
          {title: 'Mobile Application', value: 'mobile-app'},
          {title: 'System Migration', value: 'migration'},
          {title: 'AI/ML Integration', value: 'ai-ml'},
          {title: 'Database System', value: 'database'},
          {title: 'API Development', value: 'api'}
        ]
      }
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge/Problem Statement',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'solution',
      title: 'Solution Approach',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'results',
      title: 'Results & Impact',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'object',
      fields: [
        {name: 'performanceImprovement', title: 'Performance Improvement %', type: 'number'},
        {name: 'usersImpacted', title: 'Users Impacted', type: 'number'},
        {name: 'timeReduction', title: 'Time Reduction %', type: 'number'},
        {name: 'costSavings', title: 'Cost Savings', type: 'string'}
      ]
    }),
    defineField({
      name: 'duration',
      title: 'Project Duration',
      type: 'string'
    }),
    defineField({
      name: 'teamSize',
      title: 'Team Size',
      type: 'number'
    }),
    defineField({
      name: 'myRole',
      title: 'My Role & Responsibilities',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots/Mockups',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true}
      }]
    }),
    defineField({
      name: 'isPublic',
      title: 'Can be shown publicly',
      type: 'boolean',
      initialValue: true
    })
  ]
})
