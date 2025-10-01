import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string'
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gpa',
      title: 'GPA',
      type: 'string'
    }),
    defineField({
      name: 'highlights',
      title: 'Achievements/Highlights',
      type: 'array',
      of: [{type: 'string'}]
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
    },
    {
      title: 'End Date, New',
      name: 'endDateDesc',
      by: [{field: 'endDate', direction: 'desc'}]
    }
  ]
})
