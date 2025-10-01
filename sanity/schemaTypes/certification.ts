import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
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
      title: 'Certification Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'year',
      title: 'Year Obtained',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string'
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url'
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
      description: 'Leave empty if certification does not expire'
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
      title: 'Year, Recent',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}]
    }
  ]
})
