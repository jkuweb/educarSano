import type { Page } from "@/lib/payloadTypes";

export function generatePageUrl(reference: {
  relationTo: "pages" | "posts";
  value: Page | string | number;
}): string {
  if (typeof reference.value !== "object" || !reference.value.slug) {
    return "#";
  }

  const slug = reference.value.slug;

  if (slug === "home") {
    return "/";
  }

  if (reference.relationTo === "posts") {
    return `/posts/${slug}`;
  }

  return `/${slug}`;
}
