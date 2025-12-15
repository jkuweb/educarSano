import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const slug = url.searchParams.get("slug") || "";

  return redirect(`/${slug}`);
};
