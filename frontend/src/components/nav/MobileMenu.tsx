import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, X, Menu } from "lucide-react";
import type { Media, Page as PageProps, Post } from "@/lib/payloadTypes";
import AstroImage from "../image/AstroImage";

export interface NavLink {
  title: string;
  link?: {
    type?: "reference" | "custom" | "calendly" | null;
    newTab?: boolean | null;
    reference?: { relationTo: "pages"; value: number | PageProps } | null;
    url?: string | null;
  };
  subItems?:
    | {
        title: string;
        description?: string | null;
        enableImage?: boolean | null;
        image?: Media | null;
        link?: {
          type?: "reference" | "custom" | "calendly" | null;
          newTab?: boolean | null;
          reference?: { relationTo: "pages"; value: number | PageProps } | null;
          url?: string | null;
        };
        id?: string | null;
      }[]
    | null;
  id?: string | null;
}

interface DropdownMenuProps {
  navLinks: NavLink[];
  posts?: Post[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ navLinks, posts }) => {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        setOpenSub(null);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenSub(null);
      }
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Resolve link
  function resolveLink(link?: NavLink["link"]): string | null {
    if (!link) return null;

    if (link.type === "custom" && link.url) return link.url;
    if (link.type === "calendly" && link.url) return link.url;
    if (link.type === "reference" && link.reference?.value) {
      const page = link.reference.value as PageProps;
      let url = `/${page.slug}`;
      if (link.url?.startsWith("#")) url += link.url;
      return url;
    }

    return null;
  }

  function handleClick(url: string | null, newTab?: boolean) {
    if (!url) return;

    if (url.startsWith("#")) {
      const el = document.getElementById(url.substring(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
      return;
    }

    const [path, hash] = url.split("#");
    if (hash && !newTab) {
      window.location.href = path;
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    if (newTab) {
      window.open(url, "_blank");
      return;
    }

    window.location.href = url;
    setOpen(false);
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Abrir menú"
        className="min-[850px]:hidden inline-flex items-center justify-center w-10 h-10 focus:outline-none focus:ring-2 focus:ring-[#85ccc6]"
      >
        <Menu className="w-6 h-6 text-black dark:text-primary" />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute inset-0 z-50 flex flex-col bg-white dark:bg-blue-900 animate-fadeIn"
        >
          <div className="flex justify-end p-4 border-b">
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="p-2 rounded-full hover:bg-[#85ccc6]/20 focus:outline-none focus:ring-2 focus:ring-[#85ccc6]"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <nav className="flex-1 dark:bg-blue-900 h-auto bg-white min-h-dvh">
            <ul className="p-6 space-y-4 text-lg text-gray-800 dark:text-text bg-white">
              {navLinks.map((item, index) => {
                const url = resolveLink(item.link);
                const keyId = item.id ?? `item-${index}`;

                const hasSubmenu =
                  (item.subItems && item.subItems.length > 0) ||
                  (item.title.toLowerCase() === "blog" && posts?.length);

                return (
                  <li key={keyId}>
                    {hasSubmenu ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenSub(openSub === keyId ? null : keyId)
                          }
                          aria-expanded={openSub === keyId}
                          className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-[#85ccc6]/20"
                        >
                          {item.title}
                          {openSub === keyId ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>

                        {openSub === keyId && (
                          <ul className="ml-4 mt-2 space-y-2 dark:bg-blue-900">
                            {/* BLOG: mostrar posts */}
                            {item.title.toLowerCase() === "blog" && posts
                              ? posts.map((post, pIdx) => {
                                  const url = `/blog/post/${post.slug}`;
                                  const { meta } = post as Post;
                                  const { title, description, image } = meta;
                                  const {
                                    unpicUrl,
                                    width,
                                    height,
                                    mimeType,
                                    alt,
                                  } = image as Media;
                                  return (
                                    <li key={post.id ?? pIdx} className="pb-4">
                                      <button
                                        onClick={() => handleClick(url)}
                                        className="w-full flex items-start gap-4 rounded-md hover:bg-[#85ccc6]/20 text-left"
                                      >
                                        <div className="flex flex-col">
                                          {image && (
                                            <AstroImage
                                              src={unpicUrl!}
                                              alt={alt!}
                                              width={width!}
                                              height={height!}
                                              mimeType={mimeType!}
                                              className="mb-2 w-[120px]"
                                            />
                                          )}
                                          <span className="text-primary font-bold">
                                            {title ?? "Sin título"}
                                          </span>
                                        </div>
                                      </button>
                                      <span className="block text-sm text-gray-500 dark:text-text">
                                        {description ?? "Sin descripción"}
                                      </span>
                                    </li>
                                  );
                                })
                              : item.subItems?.map((sub, subIndex) => {
                                  const subUrl =
                                    resolveLink(sub.link) ||
                                    (sub.id ? `#${sub.id}` : null);
                                  const { enableImage, image } = sub;
                                  const {
                                    unpicUrl,
                                    alt,
                                    width,
                                    height,
                                    mimeType,
                                  } = image as Media;
                                  return (
                                    <li key={sub.id ?? subIndex}>
                                      <button
                                        onClick={() =>
                                          handleClick(subUrl, sub.link?.newTab)
                                        }
                                        className="w-full flex items-start gap-2 px-4 py-2 rounded-md text-left"
                                      >
                                        <div>
                                          <div className="flex items-center gap-2">
                                            {enableImage && (
                                              <AstroImage
                                                src={unpicUrl!}
                                                alt={alt!}
                                                width={width!}
                                                height={height!}
                                                mimeType={mimeType!}
                                                className="w-[20px]"
                                              />
                                            )}
                                            <span className="text-primary font-bold">
                                              {sub.title}
                                            </span>
                                          </div>
                                          {sub.description && (
                                            <span className="block text-sm text-gray-500 dark:text-text">
                                              {sub.description}
                                            </span>
                                          )}
                                        </div>
                                      </button>
                                    </li>
                                  );
                                })}
                          </ul>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => handleClick(url, item.link?.newTab)}
                        className="w-full block text-left px-4 py-2 rounded-md hover:bg-[#85ccc6]/20"
                      >
                        {item.title}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
