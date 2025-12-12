import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrUser, publicAccess } from '@/access'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Etiqueta',
    plural: 'Etiquetas',
  },
  access: {
    read: publicAccess,
    create: isAdminOrUser,
    update: isAdminOrUser,
    delete: isAdminOrUser,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
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
