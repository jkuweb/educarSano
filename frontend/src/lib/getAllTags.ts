import { payloadFetch } from "@/utils/payloadFetch";
import type { PayloadResponse, Tag } from "@/lib/payloadTypes";
import { getCacheKey, getFromCache, setCache } from "@/utils/cache";

export async function getAllTags(options?: {
  limit?: number;
  page?: number;
  sort?: string;
}): Promise<Tag[]> {
  const { limit = 100, page = 1, sort = "title" } = options || {};

  const cacheKey = getCacheKey("/tags", { limit, page, sort });
  const cached = getFromCache<PayloadResponse<Tag>>(cacheKey);

  if (cached) {
    return cached.docs;
  }

  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    sort,
  });

  const response = await payloadFetch<PayloadResponse<Tag>>(
    `/tags?${params.toString()}`,
  );

  setCache(cacheKey, response);
  return response.docs;
}
