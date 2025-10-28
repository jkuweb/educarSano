// collections/ContactMessages.ts
import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Mensaje',
    plural: 'Mensajes',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Formularios',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Asunto',
      required: false,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Mensaje',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      options: [
        {
          label: 'Nuevo',
          value: 'nuevo',
        },
        {
          label: 'Leído',
          value: 'leido',
        },
        {
          label: 'Respondido',
          value: 'respondido',
        },
      ],
      defaultValue: 'nuevo',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notas internas (solo para admin)',
      admin: {
        description: 'Usa este campo para dejar notas sobre el mensaje',
      },
    },
  ],
  timestamps: true,
}
