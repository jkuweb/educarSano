import { getPostByTag } from "./getPostByTag";

export async function getTagPageData(
  slug: string,
  page: number,
  postsPerPage = 6,
) {
  if (!slug) {
    throw new Error("❌ El slug de la categoría es obligatorio.");
  }

  const { posts, totalPages } = await getPostByTag(slug, {
    page,
    limit: postsPerPage,
  });

  return { posts, totalPages };
}
