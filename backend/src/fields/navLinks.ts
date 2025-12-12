import { ArrayField, Field } from 'payload'
import deepMerge from '@/utilities/deepMerge'
import { link, LinkAppearances } from './link'

type NavLinksType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const NavLinks: NavLinksType = ({ overrides = {} } = {}) => {
  const generatedNavLinks: Field = {
    name: 'navLinks',
    label: 'Enlace del menú',
    type: 'array',
    maxRows: 1,
    fields: [
      {
        name: 'items',
        label: 'Ítems del menú',
        type: 'array',
        fields: [
          {
            name: 'title',
            type: 'text',
            label: 'Título',
            required: true,
          },

          link({
            appearances: false,
            disableLabel: true,
          }),
          {
            name: 'subItems',
            label: 'Subítems',
            type: 'array',
            fields: [
              {
                name: 'title',
                type: 'text',
                required: true,
              },
              {
                name: 'description',
                type: 'textarea',
                required: true,
              },
              {
                name: 'enableImage',
                label: '¿Añadir imagen?',
                type: 'checkbox',
              },
              {
                name: 'image',
                label: 'Image',
                type: 'upload',
                required: true,
                relationTo: 'media',
                admin: {
                  condition: (_, siblingData) => siblingData?.enableImage,
                },
              },
              link({ appearances: false, disableLabel: true }),
            ],
          },
        ],
      },
    ],
    admin: {
      initCollapsed: true,
    },
  }

  return deepMerge(generatedNavLinks, overrides)
}
