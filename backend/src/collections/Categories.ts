import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrUser, publicAccess } from '@/access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Categoría', plural: 'Categorías' },
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
