import { isAdminFieldLevel, publicReadField } from '@/access'
import type { Block } from 'payload'

export const PostCarouselBlock: Block = {
  slug: 'postCarouselBlock',
  interfaceName: 'PostCarouselBlock',
  labels: {
    singular: 'Carrusel de Posts',
    plural: 'Carruseles de Posts',
  },
  fields: [
    {
      name: 'enableBackgroundImage',
      label: 'Añadir imagen de fondo',
      type: 'checkbox',
    },
    {
      name: 'isReverse',
      type: 'checkbox',
      admin: {
        condition: ({ req }) => req.user?.roles?.includes('admin'),
      },
      defaultValue: false,
      access: {
        read: publicReadField,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
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
        condition: ({ req }) => req.user?.roles?.includes('admin'),
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
      admin: {
        condition: ({ req }) => req.user?.roles?.includes('admin'),
      },
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
  ],
}
