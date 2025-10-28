import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from 'node_modules/@payloadcms/plugin-seo/dist/types'
import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { cloudinaryStorage } from 'payload-storage-cloudinary'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { BeforeEmail } from 'node_modules/@payloadcms/plugin-form-builder/dist/types'
import { contactFormSchema } from '@/validation/contactForm'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
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
        // {
        //   name: 'notificationEmail',
        //   type: 'email',
        //   label: 'Email de Notificación',
        //   admin: {
        //     description: 'Email donde se enviarán las notificaciones de nuevos envíos',
        //     position: 'sidebar',
        //   },
        // },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
      ],
    },

    // formSubmissionOverrides: {
    //   fields: ({ defaultFields }) => [
    //     ...defaultFields,
    //     {
    //       name: 'ipAddress',
    //       type: 'text',
    //       label: 'Dirección IP',
    //       admin: {
    //         readOnly: true,
    //         position: 'sidebar',
    //       },
    //     },
    //     {
    //       name: 'userAgent',
    //       type: 'text',
    //       label: 'Navegador',
    //       admin: {
    //         readOnly: true,
    //         position: 'sidebar',
    //       },
    //     },
    // ],

    // hooks: {
    //   beforeChange: [
    //     async ({ data, req, operation }) => {
    //       if (operation === 'create' && !data.ipAddress) {
    //         const ip =
    //           req.headers.get?.('x-forwarded-for')?.split(',')[0]?.trim() ||
    //           req.headers.get?.('x-real-ip') ||
    //           'unknown'

    //         const userAgent = req.headers.get?.('user-agent') || 'unknown'

    //         data.ipAddress = ip
    //         data.userAgent = userAgent
    //       }

    //       return data
    //     },
    //   ],

    //     afterChange: [
    //       async ({ doc, req }) => {
    //         // Envía email de notificación usando Resend
    //         await req.payload.sendEmail({
    //           to: process.env.DEFAULT_EMAIL,
    //           subject: `Nuevo formulario enviado: ${doc.form?.title || 'Sin título'}`,
    //           html: `
    //                         <h2>Nuevo mensaje</h2>
    //                         <p><strong>Formulario:</strong> ${doc.form?.title}</p>
    //                         <p><strong>Datos:</strong></p>
    //                         <pre>${JSON.stringify(doc.submissionData, null, 2)}</pre>
    //                       `,
    //         })
    //       },
    //     ],
    //   },
    // },
  }),

  cloudinaryStorage({
    cloudConfig: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    },

    collections: {
      media: {
        folder: {
          path: 'website/',
          fieldName: 'Carpetas',
          skipFieldCreation: false,
        },

        transformations: {
          default: {
            quality: 'auto',
            fetch_format: 'auto',
          },
          enablePresetSelection: true,
          preserveOriginal: true,
        },
      },
    },
  }),
]
