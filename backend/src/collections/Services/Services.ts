import type { CollectionConfig } from 'payload'

import { hero } from '@/hero/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import {
  OverviewField,
  MetaTitleField,
  MetaImageField,
  MetaDescriptionField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { isAdmin, isAdminOrUser, publicAccess } from '@/access'
import { ServiceBlock } from '@/blocks/ServiceBlock/config'
import { revalidateService, revalidateServiceDelete } from './hooks/revalidateService'

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: { singular: 'Servicios', plural: ' Lista de Servicios' },
  access: {
    read: publicAccess,
    create: isAdmin,
    update: isAdminOrUser,
    delete: isAdmin,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4321'
      return `${frontendUrl}/api/preview?slug=${doc.slug}&secret=${process.env.PREVIEW_SECRET}`
    },
    useAsTitle: 'title',
    group: 'Servicios',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [ServiceBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateService],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateServiceDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 5000,
      },
      schedulePublish: false,
    },
    maxPerDoc: 10,
  },
}
