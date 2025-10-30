import { payloadFetch } from "../utils/payloadFetch";
import type { PayloadResponse, Post } from "@/lib/payloadTypes";
import { getCacheKey, getFromCache, setCache } from "../utils/cache";

export async function getPostByTag(
  slug: string,
  options?: {
    limit?: number;
    page?: number;
    sort?: string;
    depth?: number;
  },
): Promise<{ posts: Post[]; totalPages: number; totalDocs: number }> {
  const {
    limit = 6,
    page = 1,
    sort = "-publishedAt",
    depth = 2,
  } = options || {};

  const cacheKey = getCacheKey("posts-by-tag", { slug, limit, page, sort });
  const cached = getFromCache<PayloadResponse<Post>>(cacheKey);
  if (cached) {
    return {
      posts: cached.docs,
      totalPages: cached.totalPages ?? 1,
      totalDocs: cached.totalDocs ?? cached.docs.length,
    };
  }

  const params = new URLSearchParams({
    "where[tags.slug][equals]": slug,
    limit: limit.toString(),
    page: page.toString(),
    sort,
    depth: depth.toString(),
  });

  const response = await payloadFetch<PayloadResponse<Post>>(
    `/posts?${params}`,
  );
  setCache(cacheKey, response);

  return {
    posts: response.docs,
    totalPages: response.totalPages ?? 1,
    totalDocs: response.totalDocs ?? response.docs.length,
  };
}
