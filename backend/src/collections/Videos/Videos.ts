import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  upload: {
    mimeTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
  },
  access: {
    read: ({ req: { user } }) => {
      return !!user
    },
  },
  admin: {
    group: 'Recursos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Duración en segundos',
      },
    },
  ],
}
