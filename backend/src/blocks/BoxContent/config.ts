import { publicAccess, isAdmin, isAdminOrUser } from '@/access'
import type { Block } from 'payload'

export const BoxContent: Block = {
  slug: 'boxContent',
  interfaceName: 'BoxContent',
  fields: [
    {
      name: 'boxes',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'enableTitle',
          label: '¿Quieres añadir un título?',
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
          name: 'richText',
          label: 'Mensaje',
          type: 'text',
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
