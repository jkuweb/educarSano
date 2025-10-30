import type { PayloadResponse, Post } from "@/lib/payloadTypes";
import { getCacheKey, getFromCache, setCache } from "../utils/cache";
import { payloadFetch } from "../utils/payloadFetch";

export async function getPostBySlug(
  slug: string,
  options?: {
    depth?: number;
    draft?: boolean;
  },
): Promise<Post | null> {
  const { depth = 2, draft = false } = options || {};

  const cacheKey = getCacheKey("/posts", { slug, depth, draft });
  const cached = getFromCache<Post>(cacheKey);

  if (cached) {
    return cached;
  }

  const params = new URLSearchParams({
    "where[slug][equals]": slug,
    limit: "1",
    depth: depth.toString(),
    ...(draft && { draft: "true" }),
  });

  const response = await payloadFetch<PayloadResponse<Post>>(
    `/posts?${params}`,
  );
  const post = response.docs[0] || null;

  if (post) {
    setCache(cacheKey, post);
  }

  return post;
}
