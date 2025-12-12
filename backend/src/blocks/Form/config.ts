import {
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { SocialMediaBlock } from '@/blocks/SocialMediaBlock/config'
import { isAdminFieldLevel, publicReadField } from '@/access'
import { isAdminConditionRoles } from '@/utilities/isAdmin'

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Bloque de formulario',
    plural: 'Bloques de formulario',
  },
  fields: [
    {
      name: 'enableHeaderText',
      label: '¿Quieres añádir texto?',
      type: 'checkbox',
    },
    {
      name: 'headerText',
      label: 'Header Text',
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
            blocks: [SocialMediaBlock],
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        condition: (_, { enableHeaderText }) => Boolean(enableHeaderText),
      },
    },
    {
      name: 'enableCompanionText',
      label: '¿Añadir un título al formulario?',
      type: 'checkbox',
    },
    {
      name: 'companionText',
      label: 'Titulo del formulario',
      type: 'richText',
      editor: lexicalEditor({}),
      admin: {
        condition: (_, { enableCompanionText }) => Boolean(enableCompanionText),
      },
    },
    {
      name: 'form',
      relationTo: 'forms',
      type: 'relationship',
      required: true,
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
  ],
}
