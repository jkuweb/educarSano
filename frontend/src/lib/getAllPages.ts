import { payloadFetch } from "@/utils/payloadFetch"
import type { Page, PayloadResponse, Post } from "./payloadTypes"
import { getCacheKey, getFromCache, setCache } from "@/utils/cache"

export async function getAllPages(options?: {
	limit?: number
	page?: number
	status?: 'draft' | 'published'
	sort?: string
}): Promise<Page[]> {
	const { limit = 100, page = 1, status = 'published', sort = '-publishedAt' } = options || {}

	const cacheKey = getCacheKey('/pages', { limit, page, status, sort })
	const cached = getFromCache<PayloadResponse<Page>>(cacheKey)

	if (cached) {
		return cached.docs
	}

	const params = new URLSearchParams({
		limit: limit.toString(),
		page: page.toString(),
		sort,
		...(status && { 'where[_status][equals]': status }),
	})

	const response = await payloadFetch<PayloadResponse<Page>>(`/pages`)

	setCache(cacheKey, response)
	return response.docs
}