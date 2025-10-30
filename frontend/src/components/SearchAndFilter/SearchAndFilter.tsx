import { useEffect, useMemo, useState } from "react";
import type { Media, Post, Category, Tag, User } from "@/lib/payloadTypes";
import Fuse from "fuse.js";
import { Link } from "../Link";
import { cn } from "@/utils/ui";
import Image from "@/components/image/AstroImage";
import { formatDateTime } from "@/utils/formatDateTime";
import { PostCard } from "../PostCard/PostCard";
import { Pagination } from "../Pagination/Pagination";

interface SearchAndFilterProps {
  posts?: Post[];
  categories?: Category[];
  tags?: Tag[];
}

export default function SearchAndFilter({
  posts: initialPosts = [],
  categories = [],
  tags = [],
}: SearchAndFilterProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [fuse, setFuse] = useState<Fuse<Post> | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    async function loadIndex() {
      setLoading(true);
      try {
        const res = await fetch("/search-index.json");
        if (res.ok) {
          const data: Post[] = await res.json();
          setPosts(data);
          setFuse(
            new Fuse<Post>(data, {
              keys: ["title", "excerpt", "tags", "category"],
              threshold: 0.3,
              ignoreLocation: true,
            }),
          );
        } else {
          setFuse(
            new Fuse<Post>(initialPosts, {
              keys: ["title", "excerpt", "tags", "category"],
              threshold: 0.3,
              ignoreLocation: true,
            }),
          );
        }
      } catch (err) {
        console.error("Error cargando índice:", err);
      } finally {
        setLoading(false);
      }
    }
    loadIndex();
  }, [initialPosts]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  const addCategory = (category: string) => {
    if (category && !selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const clearAllFilters = () => {
    setQuery("");
    setSelectedCategories([]);
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    query || selectedCategories.length > 0 || selectedTags.length > 0;

  const filteredPosts = useMemo(() => {
    if (!fuse) return posts;
    let result: Post[] = posts;

    if (debouncedQuery) {
      result = fuse.search(debouncedQuery).map((r) => r.item);
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => {
        if (!p.categories) return false;

        return p.categories.some((c) => {
          if (typeof c === "number")
            return selectedCategories.includes(String(c));
          return c && "title" in c && selectedCategories.includes(c.title);
        });
      });
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) => {
        if (!p.tags) return false;

        return p.tags.some((t) => {
          if (typeof t === "number") return selectedTags.includes(String(t));
          return t && "title" in t && selectedTags.includes(t.title);
        });
      });
    }

    return result;
  }, [fuse, debouncedQuery, selectedCategories, selectedTags, posts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, selectedCategories, selectedTags]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from- via-[#85ccc6]  mb-4 text-[#0e3734]">
            Descubre Contenido
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explora nuestra colección de artículos
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar artículos, categorías, tags..."
              className="w-full pl-14 pr-4 py-5 text-lg bg-white dark:bg-gray-800 border-2 border-transparent rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-[#a8dad8] dark:focus:ring-[#aadbd9] focus:border-[#aadbd9] transition-all duration-300 placeholder-gray-400 dark:text-white"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <select
              value=""
              onChange={(e) => addCategory(e.target.value)}
              className="px-5 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-[#85ccc6] focus:border-[#85ccc6] focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-900 transition-all cursor-pointer shadow-sm outline-none"
            >
              <option value="">+ Categoría</option>
              {categories
                .filter((cat) => !selectedCategories.includes(cat.title))
                .map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
            </select>

            <select
              value=""
              onChange={(e) => addTag(e.target.value)}
              className="select-wrapper px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-[#85ccc6] focus:border-[#85ccc6] focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-900 transition-all cursor-pointer shadow-sm outline-none"
            >
              <option value="">+ Tag</option>
              {tags
                .filter((tag) => !selectedTags.includes(tag.title))
                .map((tag) => (
                  <option key={tag.id} value={tag.title}>
                    {tag.title}
                  </option>
                ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-all shadow-sm"
              >
                Limpiar todo
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 justify-center animate-in fade-in duration-300">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  {category}
                  <button
                    onClick={() => removeCategory(category)}
                    className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                    aria-label={`Eliminar ${category}`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}

              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                    aria-label={`Eliminar ${tag}`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-[#0e3734] dark:text-[#99a1af]">
              <span className="font-semibold text-[#0e3734] dark:text-[#99a1af]">
                {filteredPosts.length}
              </span>{" "}
              <span className="text-[#0e3734] dark:text-[#99a1af]">
                {filteredPosts.length === 1
                  ? "resultado encontrado"
                  : "resultados encontrados"}
              </span>
              {totalPages > 1 && (
                <span className="ml-2 text-[#0e3734] dark:text-[#99a1af]">
                  · Página <span className="font-semibold ">{currentPage}</span>{" "}
                  de <span className="font-semibold">{totalPages}</span>
                </span>
              )}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#85ccc6]"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Cargando contenido...
            </p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {currentPosts.map((post: Post, index: number) => {
                const { categories: postCategories, tags: postTags } = post;
                const hasCategories =
                  postCategories &&
                  Array.isArray(categories) &&
                  postCategories.length > 0;
                const hasTags =
                  postTags && Array.isArray(tags) && postTags.length > 0;
                return (
                  <PostCard
                    post={post}
                    index={index}
                    hasCategories={hasCategories!}
                    hasTags={hasTags!}
                  />
                );
              })}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No hay resultados
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Intenta ajustar tus filtros o búsqueda
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Reiniciar búsqueda
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
