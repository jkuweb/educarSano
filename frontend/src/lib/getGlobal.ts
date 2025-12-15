import { getCacheKey, getFromCache, setCache } from "@/utils/cache";
import { payloadFetch } from "@/utils/payloadFetch";

export async function fetchGlobal<T>(slug: string): Promise<T | null> {
  const cacheKey = getCacheKey(`/globals/${slug}`);

  const cached = getFromCache<T>(cacheKey);
  if (cached) {
    return cached;
  }
  try {
    const response = await payloadFetch<T>(`/globals/${slug}?depth=2`);
    setCache(cacheKey, response);
    return response;
  } catch (error) {
    return null;
  }
}
