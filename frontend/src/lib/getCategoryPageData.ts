import { getPostsByCategory } from "./getPostsByCategory";

export async function getCategoryPageData(
  slug: string,
  page: number,
  postsPerPage = 6,
) {
  if (!slug) {
    throw new Error("❌ El slug de la categoría es obligatorio.");
  }

  const { posts, totalPages } = await getPostsByCategory(slug, {
    page,
    limit: postsPerPage,
  });

  return { posts, totalPages };
}
