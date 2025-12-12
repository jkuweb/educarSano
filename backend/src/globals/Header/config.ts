import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'
import { NavLinks } from '@/fields/navLinks'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Encabezamiento',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        NavLinks({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
