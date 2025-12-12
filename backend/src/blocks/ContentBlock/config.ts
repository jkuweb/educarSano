import type { Block } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { Banner } from '../Banner/config'
import { FrequentlyQuestionsBlock } from '../FrequentlyQuestionsBlock/config'
import { isAdminFieldLevel, publicReadField } from '@/access'
import { MediaBlock } from '../MediaBlock/config'
import { isAdminConditionRoles } from '@/utilities/isAdmin'

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'enableTitle',
      label: '¿Quieres añadir un Título a la sección?',
      type: 'checkbox',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.enableTitle,
      },
    },
    {
      name: 'enableImage',
      label: '¿Quieres añadir una imagen a la sección?',
      type: 'checkbox',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.enableImage,
      },
    },
    {
      name: 'enableBackgroundImage',
      label: 'Añadir imagen de fondo',
      type: 'checkbox',
    },
    {
      name: 'enableRichText',
      label: '¿Quieres añadir texto?',
      type: 'checkbox',
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        admin: {
          hideGutter: true,
          hideInsertParagraphAtEnd: true,
          placeholder: 'Escribe tu contenido aquí...',
        },
        features: ({ defaultFeatures }) => {
          const filtered = defaultFeatures.filter(
            (feature) =>
              !['superscript', 'subscript', 'inlineCode', 'indent'].includes(feature.key),
          )

          const hasLinkFeature = filtered.some((f) => f.key === 'link')

          return [
            ...filtered,
            ...(hasLinkFeature
              ? []
              : [
                  LinkFeature({
                    enabledCollections: ['documents'],
                    fields: ({ defaultFields }) => [
                      ...defaultFields,
                      {
                        name: 'relationTo',
                        type: 'text',
                        admin: {
                          hidden: true,
                        },
                        hooks: {
                          beforeChange: [() => 'media'],
                        },
                      },
                    ],
                  }),
                ]),
            BlocksFeature({
              blocks: [Banner, FrequentlyQuestionsBlock, MediaBlock],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        condition: (_, siblingData) => siblingData?.enableRichText,
      },
      label: false,
    },
    {
      name: 'enableLink',
      label: '¿Quieres añadir un enlace?',
      type: 'checkbox',
    },
    link({
      overrides: {
        admin: {
          condition: (_data, siblingData) => {
            return Boolean(siblingData?.enableLink)
          },
        },
      },
    }),
    {
      name: 'isReverse',
      type: 'checkbox',
      defaultValue: false,
      access: {
        read: publicReadField,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ req }) => req.user?.roles?.includes('admin'),
      },
    },
    {
      name: 'bottom',
      type: 'number',
      defaultValue: 100,
      access: {
        read: publicReadField,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ req }) => req.user?.roles?.includes('admin'),
      },
    },
    {
      name: 'separatorType',
      type: 'select',
      options: [
        {
          label: 'Yellow',
          value: 'separatorYellow',
        },
        {
          label: 'White',
          value: 'separatorWhite',
        },
        {
          label: 'Background',
          value: 'separatorBackground',
        },
      ],
      access: {
        read: publicReadField,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ req }) => req.user?.roles?.includes('admin'),
      },
    },
    {
      name: 'sectionName',
      type: 'text',
      unique: true,
      access: {
        read: publicReadField,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ req }) => req.user?.roles?.includes('admin'),
      },
    },
    {
      name: 'darkMode',
      type: 'select',
      access: {
        read: publicReadField,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ req }) => req.user?.roles?.includes('admin'),
      },
      options: [
        {
          label: 'Blue',
          value: 'blue',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
      ],
    },
  ],
}
