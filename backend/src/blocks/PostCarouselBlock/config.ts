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
      name: 'isReverse',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'bottom',
      type: 'number',
      defaultValue: 100,
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
    },
  ],
}
