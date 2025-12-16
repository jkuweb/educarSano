import { payloadFetch } from "@/utils/payloadFetch";
import { getCacheKey, getFromCache, setCache } from "@/utils/cache";
import type { PayloadResponse, Service } from "./payloadTypes";

export async function getAllServices(options?: {
  limit?: number;
  page?: number;
  status?: "draft" | "published";
  sort?: string;
}): Promise<Service[]> {
  const {
    limit = 100,
    page = 1,
    status = "published",
    sort = "-publishedAt",
  } = options || {};

  const cacheKey = getCacheKey("/services", { limit, page, status, sort });
  const cached = getFromCache<PayloadResponse<Service>>(cacheKey);
  if (cached) {
    return cached.docs;
  }

  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    sort,
    ...(status && { "where[_status][equals]": status }),
  });

  const response = await payloadFetch<PayloadResponse<Service>>(
    `/services?${params.toString()}`,
  );

  setCache(cacheKey, response);

  return response.docs;
}

export async function getServiceBySlug(
  slug: string,
  depth = 2,
): Promise<Service | null> {
  const cacheKey = getCacheKey(`/services/${slug}`, { depth });
  const cached = getFromCache<Service>(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    depth: depth.toString(),
    "where[slug][equals]": slug,
  });

  const response = await payloadFetch<PayloadResponse<Service>>(
    `/services?${params.toString()}`,
  );
  const service = response.docs[0] ?? null;

  if (service) {
    setCache(cacheKey, service);
  }

  return service;
}
