import { isAdminFieldLevel, publicReadField } from '@/access'
import { isAdminConditionRoles } from '@/utilities/isAdmin'
import type { Block } from 'payload'

export const FrequentlyQuestionsBlock: Block = {
  slug: 'frequentlyQuestionsBlock',
  interfaceName: 'FrequentlyQuestionsBlock',
  fields: [
    {
      name: 'enableTitle',
      label: '¿Quieres añadir un título?',
      type: 'checkbox',
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.enableTitle,
      },
    },
    {
      name: 'enableText',
      label: '¿Quieres añadir texto?',
      type: 'checkbox',
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        condition: (_, siblingData) => siblingData?.enableText,
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
      name: 'questions',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'text',
          required: true,
        },
      ],
      required: true,
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
  ],
}
