import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const slug = url.searchParams.get("slug");
  const secret = url.searchParams.get("secret");

  if (!secret || secret !== import.meta.env.PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  if (!slug) {
    return new Response("Slug required", { status: 400 });
  }

  return redirect(`/preview/${slug}`, 307);
};
