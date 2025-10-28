import type { Post } from "@/lib/payloadTypes";
import { useState, useCallback, useEffect, useRef } from "react";

interface SearchResponse {
  success: boolean;
  data: Post[];
  pagination: {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface UsePostSearchParams {
  apiUrl: string;
  initialQuery?: string;
  debounceDelay?: number;
  initialPosts?: Post[]; // 👈 nuevo
}

export function usePostSearch({
  apiUrl,
  initialQuery = "",
  debounceDelay = 500,
  initialPosts = [], // 👈 nuevo
}: UsePostSearchParams) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [posts, setPosts] = useState<Post[]>(initialPosts); // 👈 iniciamos con initialPosts
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<
    SearchResponse["pagination"] | null
  >(null);

  // 👇 Para evitar hacer fetch al montar si ya tenemos posts iniciales
  const hasFetched = useRef(false);

  const searchPosts = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "9",
        });

        if (query) params.append("q", query);
        if (category) params.append("category", category);
        if (tag) params.append("tag", tag);

        const response = await fetch(`${apiUrl}/api/search/posts?${params}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: SearchResponse = await response.json();
        if (data.success) {
          setPosts(data.data);
          setPagination(data.pagination);
          setCurrentPage(page);
        } else {
          throw new Error("La búsqueda no fue exitosa");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        setPosts([]);
        console.error("Error en la búsqueda:", err);
      } finally {
        setLoading(false);
      }
    },
    [query, category, tag, apiUrl],
  );

  // 👇 Solo hace la búsqueda automática si no hay posts iniciales
  useEffect(() => {
    if (hasFetched.current) return;
    if (initialPosts.length > 0) return; // no buscar si ya hay datos iniciales

    hasFetched.current = true;
    const timer = setTimeout(() => {
      searchPosts(1);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [query, category, tag, searchPosts, debounceDelay, initialPosts]);

  const handlePageChange = useCallback(
    (page: number) => {
      searchPosts(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [searchPosts],
  );

  const clearFilters = useCallback(() => {
    setQuery("");
    setCategory("");
    setTag("");
    setCurrentPage(1);
  }, []);

  const refetch = useCallback(() => {
    searchPosts(currentPage);
  }, [searchPosts, currentPage]);

  return {
    query,
    category,
    tag,
    posts,
    loading,
    error,
    currentPage,
    pagination,
    setQuery,
    setCategory,
    setTag,
    handlePageChange,
    clearFilters,
    refetch,
  };
}
