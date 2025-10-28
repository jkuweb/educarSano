import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BoxContent: Block = {
  slug: 'boxContent',
  interfaceName: 'BoxContent',
  fields: [
    {
      name: 'boxes',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Título',
          type: 'text',
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
