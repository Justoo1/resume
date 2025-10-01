import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url'
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url'
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'stats',
      title: 'Project Statistics',
      type: 'object',
      fields: [
        {
          name: 'users',
          title: 'Number of Users',
          type: 'number'
        },
        {
          name: 'uptime',
          title: 'Uptime Percentage',
          type: 'number',
          validation: Rule => Rule.min(0).max(100)
        },
        {
          name: 'sales',
          title: 'Sales/Revenue',
          type: 'number'
        },
        {
          name: 'tasks',
          title: 'Tasks/Items Processed',
          type: 'number'
        },
        {
          name: 'dataPoints',
          title: 'Data Points',
          type: 'number'
        }
      ]
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required()
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    }
  ]
})
