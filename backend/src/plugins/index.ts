import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { s3Storage } from '@payloadcms/storage-s3'

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
