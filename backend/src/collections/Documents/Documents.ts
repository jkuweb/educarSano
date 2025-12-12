import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Documento',
    plural: 'Documentos',
  },
  upload: {
    mimeTypes: ['application/pdf'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
  },
  admin: {
    group: 'Recursos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'docUrl',
      type: 'text',
      label: 'URL S3',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc }) => {
        if (doc.url) {
          const baseCDN = 'https://d2kzarvvomoj6d.cloudfront.net/documents/'
          doc.docUrl = `${baseCDN}${doc.filename}`
        }

        return doc
      },
    ],
  },
}
