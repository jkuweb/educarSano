import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '../../../payload-types'

const getServicePath = (slug?: string | null): string | null => {
  if (!slug) return null
  return `/services/service/${slug}`
}

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published') {
    const path = getServicePath(doc.slug)

    if (path) {
      payload.logger.info(`Revalidating service at path: ${path}`)
      revalidatePath(path)
    }

    revalidatePath('/services')
    revalidateTag('services-sitemap')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = getServicePath(previousDoc.slug)

    if (oldPath) {
      payload.logger.info(`Revalidating old service at path: ${oldPath}`)
      revalidatePath(oldPath)
    }

    revalidatePath('/services')
    revalidateTag('services-sitemap')
  }

  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { context },
}) => {
  if (context.disableRevalidate) return doc

  const path = getServicePath(doc?.slug)

  if (path) {
    revalidatePath(path)
  }

  revalidatePath('/services')
  revalidateTag('services-sitemap')

  return doc
}
