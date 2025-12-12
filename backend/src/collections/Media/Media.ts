import { isAuthenticated, publicAccess } from '@/access'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    read: publicAccess,
    update: isAuthenticated,
    delete: isAuthenticated,
    create: isAuthenticated,
  },
  admin: {
    group: 'Recursos',
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      admin: {
        description:
          'Ayuda a lectores de pantalla a describir la imagen. (No usar en imágenes decorativas)',
      },
    },
    {
      name: 'unpicUrl',
      type: 'text',
      label: 'URL optimizada (Unpic)',
      admin: {
        readOnly: true,
        description: 'URL automáticamente compatible con Unpic.',
      },
    },
  ],

  upload: {
    mimeTypes: ['image/*'],
  },

  defaultPopulate: {
    filename: true,
    url: true,
    mimeType: true,
    width: true,
    height: true,
    filesize: true,
    alt: true,
    cloudinaryUrl: true,
  },

  hooks: {
    afterRead: [
      async ({ doc }) => {
        if (doc.mimeType === 'image/svg+xml' || doc.filename?.endsWith('.svg')) {
          doc.isSVG = true
        }

        if (doc.url) {
          const baseCDN = 'https://d2kzarvvomoj6d.cloudfront.net/images/'
          const filename = doc.filename?.replace(/^undefined\//, '')

          doc.unpicUrl = `${baseCDN}${filename}`
        }

        return doc
      },
    ],
  },
}
