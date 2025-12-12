import { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { isAdminFieldLevel, publicReadField } from '@/access'

export const QuoteBlock: Block = {
  slug: 'quoteBlock',
  interfaceName: 'QuoteBlock',
  labels: {
    singular: 'Cita',
    plural: 'Citas',
  },
  fields: [
    {
      name: 'richText',
      label: 'cita',
      type: 'richText',
      editor: lexicalEditor({
        admin: {
          hideGutter: true,
          hideInsertParagraphAtEnd: true,
          placeholder: 'Escribe tu contenido aquí...',
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
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
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
    },
    {
      name: 'sectionName',
      type: 'text',
      required: true,
      unique: true,
      access: {
        read: publicReadField,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
}
