import { payloadFetch } from "@/utils/payloadFetch";
import type { Form } from "./payloadTypes";

export async function getFormBySlug(
  slug: string,
  options?: {
    draft?: boolean;
  },
): Promise<Form | null> {
  const { draft = false } = options || {};

  const slugParams = new URLSearchParams({
    "where[slug][equals]": slug,
    depth: "1",
    limit: "1",
    ...(draft && { draft: "true" }),
  });

  try {
    const slugResponse = await payloadFetch<{ docs: Form[] }>(
      `/forms?${slugParams}`,
    );
    if (slugResponse.docs.length > 0) {
      return slugResponse.docs[0];
    }

    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      const formResponse = await payloadFetch<Form>(`/forms/${slug}`);
      return formResponse;
    }

    return null;
  } catch (error) {
    console.error("Error fetching form:", error);
    return null;
  }
}
