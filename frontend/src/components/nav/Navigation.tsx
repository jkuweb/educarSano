import React, { forwardRef } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { Media, Page, Post } from "@/lib/payloadTypes";
import AstroImage from "../image/AstroImage";
import { generatePageUrl } from "@/utils/generatePageUrl";

export interface NavLink {
  title: string;
  link?: {
    type?: "reference" | "custom" | "calendly" | null;
    newTab?: boolean | null;
    reference?: {
      relationTo: "pages";
      value: number | Page | Post;
    } | null;
    url?: string | null;
  };
  subItems?:
    | {
        title: string;
        description?: string | null;
        enableImage?: boolean | null;
        image?: number | Media | null;
        link?: NavLink["link"];
        id?: string | null;
      }[]
    | null;
  id?: string | null;
}

interface NavigationProps {
  navLinks: NavLink[];
  posts: Post[];
}

interface NavigationMenuTriggerProps {
  navLink: NavLink;
  posts?: Post[];
}

const getHref = (
  item?: NavLink | NavLink["subItems"][number],
  slug?: string,
): string => {
  if (typeof slug === "string") return `/blog/post/${slug}`;

  if (!item?.link) return "#";

  const { link } = item;

  if (link.type === "calendly" && link.url) return link.url;
  if (link.type === "custom" && link.url) return link.url;

  if (link.type === "reference" && link.reference) {
    return generatePageUrl(link.reference);
  }

  return "#";
};

const NavigationMenuTrigger: React.FC<NavigationMenuTriggerProps> = ({
  navLink,
  posts,
}) => {
  const isPostsMode =
    posts &&
    posts.length > 0 &&
    (!navLink.subItems || navLink.subItems.length === 0);

  const safePosts = posts?.filter(
    (p): p is Post & { meta: NonNullable<Post["meta"]> } =>
      Boolean(p && p.meta),
  );

  const mainHref = getHref(navLink);

  const handleClick = (e: React.MouseEvent) => {
    if (mainHref && mainHref !== "#") {
      window.location.href = mainHref;
    }
  };

  return (
    <>
      <NavigationMenu.Trigger
        onPointerDown={handleClick}
        className="cursor-pointer text-xl group flex select-none items-center justify-between gap-0.5 py-2 px-6 outline-none
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black rounded-md
                   focus-visible:transition-shadow focus-visible:duration-300 text-text hover:bg-yellow-neutral dark:hover:text-[#222]"
      >
        {navLink.title}
      </NavigationMenu.Trigger>

      <NavigationMenu.Content
        className="absolute left-0 top-0 w-full sm:w-auto
                   enter-from-right enter-from-left exit-to-right exit-to-left"
      >
        {isPostsMode && <p>Últimos posts</p>}
        <ul className="m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[500px] sm:grid-rows-[0.35fr_1fr]">
          {isPostsMode
            ? safePosts?.map((post, i) => {
                const { meta, slug } = post;
                const { title, description, image } = meta;
                const { alt, unpicUrl, width, height, mimeType } =
                  (image as Media) || {};

                return (
                  <ListItem
                    key={i}
                    href={getHref(undefined, slug as string)}
                    className="hover:bg-black/5 dark:hover:bg-white/70"
                  >
                    {image && (
                      <AstroImage
                        src={unpicUrl!}
                        alt={alt!}
                        width={width!}
                        height={height!}
                        mimeType={mimeType!}
                        className="w-[120px] m-auto"
                      />
                    )}

                    <div className="mb-[5px] font-medium">{title}</div>

                    {description && (
                      <div className="leading-[1.4] text-mauve11">
                        {description}
                      </div>
                    )}
                  </ListItem>
                );
              })
            : navLink.subItems?.map((subItem) => {
                const { title, description, id } = subItem;

                return (
                  <ListItem
                    key={id || `${title}-${Math.random()}`}
                    href={getHref(subItem)}
                    className="hover:bg-black/5 dark:hover:bg-white/70"
                  >
                    <div className="font-medium grid grid-cols-[20px_auto] items-center gap-6">
                      <svg
                        width="51"
                        height="47"
                        viewBox="0 0 51 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20px]"
                      >
                        <path
                          d="M25.2175 46.1283L21.5609 42.8098C8.57403 31.0706 0 23.303 0 13.8259C0 6.0582 6.10288 0 13.8696 0C18.2576 0 22.469 2.03598 25.2175 5.22879C27.9665 2.03598 32.1778 0 36.5654 0C44.3326 0 50.435 6.0582 50.435 13.8259C50.435 23.303 41.861 31.0706 28.8741 42.8098L25.2175 46.1283Z"
                          fill="#85CCC6"
                        />
                      </svg>

                      <span>{title}</span>
                    </div>

                    {description && (
                      <div className="leading-[1.4] text-mauve11">
                        {description}
                      </div>
                    )}
                  </ListItem>
                );
              })}
        </ul>
      </NavigationMenu.Content>
    </>
  );
};

const ListItem = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ className = "", children, ...props }, ref) => (
  <li>
    <NavigationMenu.Link asChild>
      <a
        ref={ref}
        className={`block select-none rounded-md py-4 px-6 text-[15px] no-underline transition-colors
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                     focus-visible:ring-black dark:hover:text-[#1a1a1a] ${className}`}
        {...props}
      >
        {children}
      </a>
    </NavigationMenu.Link>
  </li>
));

ListItem.displayName = "ListItem";

const Navigation: React.FC<NavigationProps> = ({ navLinks = [], posts }) => {
  return (
    <NavigationMenu.Root className="relative z-10 min-[850px]:flex m-auto justify-center hidden ">
      <NavigationMenu.List className="center m-0 flex list-none rounded-md bg-white dark:bg-transparent p-1 shadow-[0_2px_10px] dark:shadow-none shadow-blackA4">
        {navLinks.map((navLink, i) => {
          const key = navLink.id || `${navLink.title}-${i}`;
          const hasDropdown =
            (navLink.subItems && navLink.subItems.length > 0) ||
            navLink.title === "Blog";

          return (
            <NavigationMenu.Item key={key}>
              {hasDropdown ? (
                <NavigationMenuTrigger navLink={navLink} posts={posts} />
              ) : (
                <NavigationMenu.Link asChild>
                  <a
                    href={getHref(navLink)}
                    target={navLink.link?.newTab ? "_blank" : undefined}
                    rel={
                      navLink.link?.newTab ? "noopener noreferrer" : undefined
                    }
                    className="block text-center text-text text-xl py-2 px-6 dark:hover:text-[#222]
                               hover:bg-[#fdd172] rounded-md transition-colors"
                  >
                    {navLink.title}
                  </a>
                </NavigationMenu.Link>
              )}
            </NavigationMenu.Item>
          );
        })}

        <NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
          <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenu.Viewport className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white dark:bg-section-color transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

export default Navigation;
