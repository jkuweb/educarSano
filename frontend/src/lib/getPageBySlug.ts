import type { Page, PayloadResponse, Post } from "@/lib/payloadTypes";
import { payloadFetch } from "../utils/payloadFetch";

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
    const endpoint = `/pages?where[slug][equals]=${slug}&depth=${depth}&draft=${draft}&limit=1`;
    const data = await payloadFetch<{ docs: Page[] }>(endpoint, { draft });

    return data.docs[0] || null;
  } catch (error) {
    return null;
  }
}
