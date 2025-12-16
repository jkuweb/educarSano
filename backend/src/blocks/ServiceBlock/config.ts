import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { isAdminFieldLevel, publicReadField } from '@/access'

export const ServiceBlock: Block = {
  slug: 'service',
  interfaceName: 'ServiceBlock',
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
    },
    {
      name: 'richText',
      label: 'Subtítulo',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        admin: {
          hideGutter: true,
          hideInsertParagraphAtEnd: true,
          placeholder: 'Excribe tu contenido aquí...',
        },
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter(
            (feature) =>
              !['superscript', 'subscript', 'inlineCode', 'indent'].includes(feature.key),
          ),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'accordions',
      label: 'Lista',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Título',
          type: 'text',
        },
        {
          name: 'content',
          label: 'Contenido',
          type: 'richText',
        },
      ],
    },
    {
      name: 'enableBackgroundImage',
      label: 'Añadir imagen de fondo',
      type: 'checkbox',
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
        condition: ({ req }) => {
          return Boolean(req?.user?.roles?.includes('admin'))
        },
      },
    },
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
        condition: ({ req }) => {
          return Boolean(req?.user?.roles?.includes('admin'))
        },
      },
    },
    {
      name: 'separatorType',
      type: 'select',
      admin: {
        condition: ({ req }) => {
          return Boolean(req?.user?.roles?.includes('admin'))
        },
      },
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
    },
    {
      name: 'sectionName',
      type: 'text',
      required: true,
      access: {
        read: publicReadField,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ req }) => {
          return Boolean(req?.user?.roles?.includes('admin'))
        },
      },
    },
    {
      name: 'darkMode',
      type: 'select',
      admin: {
        condition: ({ req }) => {
          return Boolean(req?.user?.roles?.includes('admin'))
        },
      },
      access: {
        read: publicReadField,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
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
