import type { Block } from 'payload'

export const FrequentlyQuestionsBlock: Block = {
  slug: 'frequentlyQuestionsBlock',
  interfaceName: 'FrequentlyQuestionsBlock',
  fields: [
    {
      name: 'enableImage',
      label: '¿Quieres añadir una imagen a la sección?',
      type: 'checkbox',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.enableImage,
      },
    },
    {
      name: 'questions',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'sectionName',
      type: 'text',
      unique: true,
    },
  ],
}
