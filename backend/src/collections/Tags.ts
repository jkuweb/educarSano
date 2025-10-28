import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Etiqueta',
    plural: 'Etiquetas',
  },
  access: {
    create: () => true,
    delete: () => true,
    read: () => true,
    update: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
