import type { Page, Post } from "@/lib/payloadTypes";

export function generatePageUrl(reference: {
  relationTo: "pages" | "posts";
  value: Page | Post | number;
}): string {
  if (typeof reference.value === "number") {
    return "#";
  }

  const slug = reference.value.slug;

  if (!slug) return "#";

  if (slug === "home") {
    return "/";
  }

  if (slug === "blog") {
    return `/${slug}`;
  }

  return `/page/${slug}`;
}
