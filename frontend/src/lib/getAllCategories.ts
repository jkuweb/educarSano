import { payloadFetch } from "@/utils/payloadFetch";
import type { PayloadResponse, Category } from "@/lib/payloadTypes";
import { getCacheKey, getFromCache, setCache } from "@/utils/cache";

export async function getAllCategories(options?: {
  limit?: number;
  page?: number;
  sort?: string;
}): Promise<Category[]> {
  const { limit = 100, page = 1, sort = "title" } = options || {};

  const cacheKey = getCacheKey("/categories", { limit, page, sort });
  const cached = getFromCache<PayloadResponse<Category>>(cacheKey);

  if (cached) {
    return cached.docs;
  }

  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    sort,
  });

  const response = await payloadFetch<PayloadResponse<Category>>(
    `/categories?${params.toString()}`,
  );

  setCache(cacheKey, response);
  return response.docs;
}
