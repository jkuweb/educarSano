// src/pages/api/revalidate-index.ts
export const prerender = false; // dynamic route
export const config = { isr: { expiration: 3600 } }; // revalida cada hora

export async function GET() {
  const res = await fetch(
    `${import.meta.env.PAYLOAD_URL}/api/posts?limit=1000`,
  );
  const { docs } = await res.json();

  const minimalIndex = docs.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    date: post.date,
  }));

  return new Response(JSON.stringify(minimalIndex), {
    headers: { "Content-Type": "application/json" },
  });
}
