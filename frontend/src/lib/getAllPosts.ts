import { payloadFetch } from "@/utils/payloadFetch";
import type { PayloadResponse, Post } from "./payloadTypes";
import { getCacheKey, getFromCache, setCache } from "@/utils/cache";

export async function getAllPosts(options?: {
  limit?: number;
  page?: number;
  status?: "draft" | "published";
  sort?: string;
}): Promise<Post[]> {
  const {
    limit = 100,
    page = 1,
    status = "published",
    sort = "-publishedAt",
  } = options || {};

  const cacheKey = getCacheKey("/posts", { limit, page, status, sort });
  const cached = getFromCache<PayloadResponse<Post>>(cacheKey);

  if (cached) {
    return cached.docs;
  }

  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    sort,
    ...(status && { "where[_status][equals]": status }),
  });

  const response = await payloadFetch<PayloadResponse<Post>>(
    `/posts?${params.toString()}`,
  );

  setCache(cacheKey, response);
  return response.docs;
}
