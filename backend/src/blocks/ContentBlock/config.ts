import type { Block } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { Banner } from '../Banner/config'
import { FrequentlyQuestionsBlock } from '../FrequentlyQuestionsBlock/config'

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
          placeholder: 'Excribe tu contenido aquí...',
        },
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter(
            (feature) =>
              !['superscript', 'subscript', 'inlineCode', 'indent'].includes(feature.key),
          ),
          BlocksFeature({
            blocks: [Banner, FrequentlyQuestionsBlock],
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
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
    },
    {
      name: 'bottom',
      type: 'number',
      defaultValue: 100,
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
    },
    {
      name: 'sectionName',
      type: 'text',
      unique: true,
    },
  ],
}
