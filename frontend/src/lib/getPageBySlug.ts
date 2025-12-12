import type { Page, PayloadResponse, Post } from "@/lib/payloadTypes";
// import { getCacheKey, getFromCache, setCache } from "../utils/cache"
import { payloadFetch } from "../utils/payloadFetch";

// export async function getPageBySlug(
// 	slug: string,
// 	options?: {
// 		depth?: number
// 		draft?: boolean
// 	}
// ): Promise<Page | null> {
// 	const { depth = 2, draft = false } = options || {}

// 	const cacheKey = getCacheKey('/pages', { slug, depth, draft })
// 	const cached = getFromCache<Page>(cacheKey)

// 	if (cached) {
// 		return cached
// 	}

// 	const params = new URLSearchParams({
// 		'where[slug][equals]': slug,
// 		limit: '1',
// 		depth: depth.toString(),
// 		...(draft && { draft: 'true' }),
// 	})

// 	const response = await payloadFetch<PayloadResponse<Page>>(`/pages?${params}`)
// 	const page = response.docs[0] || null

// 	if (page) {
// 		setCache(cacheKey, page)
// 	}

// 	return page
// }
// lib/getPageBySlug.ts

// lib/getPageBySlug.ts

// lib/getPageBySlug.ts
interface GetPageOptions {
  depth?: number;
  draft?: boolean;
}

export async function getPageBySlug(
  slug: string,
  options: GetPageOptions = {},
): Promise<Page | null> {
  const { depth = 1, draft = false } = options;

  try {
    // IMPORTANTE: El parámetro draft debe estar en la URL
    const endpoint = `/pages?where[slug][equals]=${slug}&depth=${depth}&draft=${draft}&limit=1`;
    const data = await payloadFetch<{ docs: Page[] }>(endpoint, { draft });

    return data.docs[0] || null;
  } catch (error) {
    return null;
  }
}
