import type { CollectionConfig } from 'payload'

import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { ContentBlock } from '@/blocks/ContentBlock/config'
import {
  OverviewField,
  MetaTitleField,
  MetaImageField,
  MetaDescriptionField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { ListContentBlock } from '@/blocks/ListContentBlock/config'
import { SocialMediaBlock } from '@/blocks/SocialMediaBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { BoxContent } from '@/blocks/BoxContent/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { SimpleListBlock } from '@/blocks/SimpleListBlock/config'
import { QuoteBlock } from '@/blocks/QuoteBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { PostCarouselBlock } from '@/blocks/PostCarouselBlock/config'
import { FrequentlyQuestionsBlock } from '@/blocks/FrequentlyQuestionsBlock/config'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { revalidatePage } from './hooks/revalidatePage'
import { revalidateDelete } from '../Posts/hooks/revalidatePost'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
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
              blocks: [
                CallToAction,
                ContentBlock,
                MediaBlock,
                ListContentBlock,
                FormBlock,
                SocialMediaBlock,
                SimpleListBlock,
                QuoteBlock,
                BoxContent,
                PostCarouselBlock,
                FrequentlyQuestionsBlock,
              ],
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
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
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
