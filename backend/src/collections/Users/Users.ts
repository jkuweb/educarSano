import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: () => true,
    create: () => true,
    delete: () => true,
    read: () => true,
    update: () => true,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
