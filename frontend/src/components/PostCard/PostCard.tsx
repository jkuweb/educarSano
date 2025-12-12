import type { Media, Post, User } from "@/lib/payloadTypes";
import { formatDateTime } from "@/utils/formatDateTime";
import { Link } from "@/components/Link";
import { formatAuthors } from "@/utils/formatAuthors";
export type PosPropst = {
  post: Post;
  index: number;
  hasCategories: boolean;
  hasTags: boolean;
};

export const PostCard: React.FC<PosPropst> = ({
  post,
  index,
  hasCategories,
  hasTags,
}) => {
  const {
    meta,
    slug,
    categories: postCategories,
    tags: postTags,
    title: postTitle,
    publishedAt,
    populatedAuthors,
  } = post;
  const { description, image: metaImage } = meta;
  const { unpicUrl } = metaImage as Media;

  const hasPopularAuthors =
    populatedAuthors &&
    Array.isArray(populatedAuthors) &&
    populatedAuthors.length > 0;
  const href = `/blog/post/${slug}`;

  return (
    <article
      key={slug}
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 flex flex-col"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a")) {
          window.location.href = href;
        }
      }}
      style={{
        animation: "fadeInUp 0.6s ease-out",
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="relative h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
          style={{
            backgroundImage:
              metaImage && typeof metaImage !== "string"
                ? `url(${unpicUrl})`
                : "none",
            backgroundColor: !metaImage ? "#e5e7eb" : undefined,
          }}
        >
          {!metaImage && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <svg
                className="w-20 h-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="px-6 pt-16 pb-16 space-y-4 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-8">
          {hasPopularAuthors && (
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">
                {formatAuthors(populatedAuthors)}
              </span>
            </div>
          )}
          {publishedAt && (
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <time dateTime={publishedAt.toString()}>
                {formatDateTime(publishedAt)}
              </time>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2  dark:group-hover:text-indigo-400 transition-colors">
          {postTitle}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed flex-grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {hasCategories &&
            postCategories?.slice(0, 2).map((category, idx) => {
              if (typeof category === "object" && category) {
                return (
                  <Link key={idx} url={`/blog/category/${category.slug!}`}>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary dark:bg-blue-900/30 text-[#0e3734] dark:text-blue-300 rounded-full text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                      {category.title}
                    </span>
                  </Link>
                );
              }
              return null;
            })}
          {hasTags &&
            postTags?.slice(0, 2).map((tag, idx) => {
              if (typeof tag === "object" && tag) {
                return (
                  <Link
                    key={idx}
                    url={`/blog/tag/${encodeURIComponent(tag.slug!)}`}
                  >
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-neutral dark:bg-[emerald-900/3] text-[#513c0e] dark:text-emerald-300 rounded-full text-xs font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors">
                      #{tag.title}
                    </span>
                  </Link>
                );
              }
              return null;
            })}
        </div>
      </div>

      <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <div className="bg-primary text-white rounded-full p-2 shadow-lg">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </article>
  );
};
