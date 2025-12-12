import type { CollectionConfig } from 'payload'
import { protectRoles } from '@/hooks/protectRoles'
import { isAdmin, isAdminFieldLevel, isAdminOrSelf } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Lista de usuario',
    plural: 'Lista de usuarios',
  },
  access: {
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
    read: isAdminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
    group: 'Usuarios',
  },
  auth: true,
  defaultPopulate: {
    email: true,
    name: true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      label: 'Avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'roles',
      label: 'Roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Guest', value: 'guest' },
      ],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },

      required: true,
      defaultValue: ['user'],
      hooks: {
        beforeChange: [protectRoles],
      },
    },
  ],
  timestamps: true,
}
