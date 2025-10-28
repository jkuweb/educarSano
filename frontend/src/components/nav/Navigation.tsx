import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React, { Fragment, forwardRef } from "react";
import type { Media, Page } from "@/lib/payloadTypes";
import AstroImage from "../image/AstroImage";
import "./styles/animation.css";

export interface NavLink {
  title: string;
  link?: {
    type?: "reference" | "custom" | "calendly" | null;
    newTab?: boolean | null;
    reference?: {
      relationTo: "pages";
      value: number | Page;
    } | null;
    url?: string | null;
  };
  subItems?:
    | {
        title: string;
        description?: string | null;
        enableImage?: boolean | null;
        image?: number | Media | null;
        link?: {
          type?: "reference" | "custom" | "calendly" | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: "pages";
            value: number | Page;
          } | null;
          url?: string | null;
        };
        id?: string | null;
      }[]
    | null;
  id?: string | null;
}

const getHref = (item: NavLink | NonNullable<NavLink["subItems"]>[number]) => {
  if (!item || !item.link) return "#";

  const { link } = item;
  if (link.type === "calendly" && link.url) return link.url;
  if (link.type === "custom" && link.url) return link.url;

  if (link.type === "reference" && link.reference) {
    const { value } = link.reference;
    if (typeof value === "object" && value !== null && "slug" in value) {
      return `/${value.slug}`;
    }
    console.warn("Page reference not populated, cannot generate href");
  }
  return "#";
};

interface NavigationProps {
  navLinks: NavLink[];
}

const NavigationMenuTrigger = ({ navLink }: { navLink: NavLink }) => {
  return (
    <>
      <NavigationMenu.Trigger
        className="uppercase group flex select-none items-center justify-between gap-0.5 p-4 text-base font-medium leading-none outline-none
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black rounded-md
                   focus-visible:transition-shadow focus-visible:duration-300"
      >
        {navLink.title}
      </NavigationMenu.Trigger>

      <NavigationMenu.Content
        className="absolute left-0 top-0 w-full sm:w-auto
                   enter-from-right enter-from-left exit-to-right exit-to-left"
      >
        <ul className="m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
          {navLink.subItems?.map((subItem) => {
            const { title, description, enableImage, id, image } = subItem;
            const mediaData =
              image && typeof image === "object" ? (image as Media) : null;
            const { alt, url, width, height, mimeType } = mediaData || {};
            const key = id || `${title}-${Math.random()}`;

            return (
              <ListItem
                key={key}
                href={getHref(subItem)}
                className="hover:bg-[#fdd172]"
              >
                {/* 1. Imagen primero */}
                {enableImage && image && (
                  <AstroImage
                    src={url!}
                    alt={alt!}
                    width={width!}
                    height={height!}
                    mimeType={mimeType!}
                    className="mb-2 rounded h-20 w-full object-cover"
                  />
                )}

                {/* 2. Título */}
                <div className="mb-[5px] font-medium leading-[1.2]">
                  {title}
                </div>

                {/* 3. Descripción */}
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
>(({ className, children, ...props }, ref) => (
  <li>
    <NavigationMenu.Link asChild>
      <a
        className={`block select-none rounded-md p-3 text-[15px] leading-none no-underline transition-colors
                    hover:bg-[#fdd172] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    focus-visible:ring-black focus-visible:transition-shadow focus-visible:duration-300 ${className || ""}`}
        {...props}
        ref={ref}
      >
        {children}
      </a>
    </NavigationMenu.Link>
  </li>
));
ListItem.displayName = "ListItem";

const Navigation: React.FC<NavigationProps> = ({ navLinks = [] }) => {
  return (
    <NavigationMenu.Root className="relative z-10 flex justify-center max-sm:hidden grow">
      <NavigationMenu.List className="grid grid-cols-6 auto-cols-fr h-16 gap-4 uppercase text-[#08201e] m-0 list-none p-1">
        {navLinks.map((navLink, i) => {
          const key = navLink.id || `${navLink.title}-${i}`;
          return (
            <NavigationMenu.Item
              key={key}
              className="flex items-center justify-center ease-in-out duration-300
                         hover:bg-[#fdd172] focus-within:outline-none focus-within:ring-2
                         focus-within:ring-offset-2 focus-within:ring-black rounded-md"
            >
              {navLink.subItems && navLink.subItems.length > 0 ? (
                <NavigationMenuTrigger navLink={navLink} />
              ) : (
                <NavigationMenu.Link asChild>
                  <a
                    href={getHref(navLink)}
                    target={navLink.link?.newTab ? "_blank" : undefined}
                    rel={
                      navLink.link?.newTab ? "noopener noreferrer" : undefined
                    }
                    className="block p-4 text-center rounded-md transition-colors
                               hover:bg-[#fdd172] focus:outline-none focus-visible:ring-2
                               focus-visible:ring-offset-2 focus-visible:ring-black
                               focus-visible:transition-shadow focus-visible:duration-300"
                  >
                    {navLink.title}
                  </a>
                </NavigationMenu.Link>
              )}
            </NavigationMenu.Item>
          );
        })}

        {/* Buscador */}
        <NavigationMenu.Link asChild>
          <a
            href="/search"
            className="flex items-center justify-center p-4 rounded-md transition-colors
                       hover:bg-[#fdd172] focus:outline-none focus-visible:ring-2
                       focus-visible:ring-offset-2 focus-visible:ring-black
                       focus-visible:transition-shadow focus-visible:duration-300"
          >
            <span className="sr-only">Buscador</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </a>
        </NavigationMenu.Link>

        <NavigationMenu.Indicator
          className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden
                     transition-[width,transform_250ms_ease] fade-in fade-out"
        >
          <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="absolute left-0 top-full flex w-full justify-center perspective-[2000px]">
        <NavigationMenu.Viewport
          className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)]
                     w-full origin-[top_center] overflow-hidden rounded-md bg-white
                     transition-[width,_height] duration-300
                     sm:w-[var(--radix-navigation-menu-viewport-width)]
                     scale-in scale-out"
        />
      </div>
    </NavigationMenu.Root>
  );
};

export default Navigation;
