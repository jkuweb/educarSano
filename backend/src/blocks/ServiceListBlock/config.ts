import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { isAdminFieldLevel, publicReadField } from '@/access'
import { link } from '@/fields/link'
import { isAdminCondition, isAdminConditionRoles } from '@/utilities/isAdmin'

const columnFields: Field[] = [
  {
    name: 'enableFiledTitle',
    label: '¿Quieres añadir un Título?',
    type: 'checkbox',
  },
  {
    name: 'fieldTitle',
    label: 'Título',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.enableFiledTitle,
    },
  },
  {
    name: 'enableIcon',
    label: '¿Quieres añadir un Icono?',
    type: 'checkbox',
  },
  {
    name: 'media',
    label: 'icono',
    type: 'upload',
    relationTo: 'media',

    admin: {
      condition: (_, siblingData) => siblingData?.enableIcon,
    },
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
          (feature) => !['superscript', 'subscript', 'inlineCode', 'indent'].includes(feature.key),
        ),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    admin: {
      condition: (_, siblingData) => siblingData?.enableRichText,
    },
    label: false,
  },
  link(),
]

export const ServiceListBlock: Block = {
  slug: 'serviceListBlock',
  interfaceName: 'ServiceListBlock',
  fields: [
    {
      name: 'enableTitle',
      label: '¿Quieres añadir un título a la sección?',
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
      name: 'enableBackgroundImage',
      label: 'Añadir imagen de fondo',
      type: 'checkbox',
    },
    {
      name: 'blocks',
      label: 'Bloques',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
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
        condition: isAdminConditionRoles,
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
        condition: isAdminConditionRoles,
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
        condition: isAdminConditionRoles,
      },
    },
    {
      name: 'sectionName',
      type: 'text',
      required: true,
      admin: {
        condition: isAdminConditionRoles,
      },
      unique: true,
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
        condition: isAdminConditionRoles,
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
