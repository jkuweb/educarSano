import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from 'node_modules/@payloadcms/plugin-seo/dist/types'
import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Educar Sano` : 'Educar Sano'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

// Helper para detectar MIME type por extensión
const getMimeTypeFromFilename = (filename: string): string => {
  const ext = path.extname(filename).toLowerCase()

  const mimeTypes: Record<string, string> = {
    // Imágenes
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.avif': 'image/avif',

    // Videos
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',

    // Documentos
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
  }

  return mimeTypes[ext] || 'application/octet-stream'
}

export const plugins: Plugin[] = [
  seoPlugin({
    uploadsCollection: 'media',
    generateTitle: ({ doc }) => {
      if (doc.slug?.value === 'home') {
        return doc.title?.value || 'Educar Sano'
      }
      return `${doc.title?.value} | Educar Sano`
    },
    generateDescription: ({ doc }) => doc.excerpt?.value || doc.content?.value?.slice(0, 160),
    generateURL: ({ doc }) => {
      const baseUrl = 'https://educarsano.com'
      const slug = doc.slug?.value

      if (slug === 'home') return baseUrl

      return `${baseUrl}/${slug}`
    },
    generateImage: ({ doc }) => {
      const image = doc.featuredImage?.value || doc.meta?.image?.value

      if (!image) return 'https://educarsano.com/default-og.jpg'

      // if (typeof image === 'object' && image.url) {
      //   return `https://educarsano.com${image.url}` // URL completa
      // }

      if (typeof image === 'object' && image.unpicUrl) {
        return image.unpicUrl
      }

      return 'https://educarsano.com/default-og.jpg'
    },
    tabbedUI: true,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
      select: true,
      country: false,
      date: false,
      state: false,
      number: false,
      radio: {
        fields: [
          {
            name: 'options',
            type: 'array',
            label: 'Radio Options',
            required: true,
            minRows: 1,
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Display Label',
                  },
                  {
                    name: 'value',
                    type: 'text',
                    required: true,
                    label: 'Value',
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'image',
                    label: 'Imagen',
                    type: 'upload',
                    relationTo: 'media',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    formOverrides: {
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
      ],
    },
  }),
  s3Storage({
    collections: {
      media: {
        prefix: 'images',
        generateFileURL: ({ filename, prefix }) => {
          return `${process.env.CLOUDFRONT_URL}/${prefix}/${filename}`
        },
      },
      videos: {
        prefix: 'videos',
        generateFileURL: ({ filename, prefix }) => {
          return `${process.env.CLOUDFRONT_URL}/${prefix}/${filename}`
        },
        signedDownloads: {
          shouldUseSignedURL: ({ filename }) => filename.endsWith('.mp4'),
          expiresIn: 3600,
        },
      },
      documents: {
        prefix: 'documents',
        generateFileURL: ({ filename, prefix }) => {
          return `${process.env.CLOUDFRONT_URL}/${prefix}/${filename}`
        },
      },
    },
    bucket: process.env.S3_BUCKET || '',
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
      region: process.env.S3_REGION || '',
    },
    // disablePayloadAccessControl: true,
  }),
]
