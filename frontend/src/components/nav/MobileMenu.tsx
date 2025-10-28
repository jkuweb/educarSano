import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, X, Menu } from "lucide-react";
import type {
  Media as MediaProps,
  Page as PageProps,
} from "@/lib/payloadTypes";
import ReactImage from "../ReactImage";

type Page = any;

export interface NavLink {
  title: string;
  link?: {
    type?: ("reference" | "custom" | "calendly") | null;
    newTab?: boolean | null;
    reference?: { relationTo: "pages"; value: number | Page } | null;
    url?: string | null;
  };
  subItems?:
    | {
        title: string;
        description?: string | null;
        enableImage?: boolean | null;
        image?: (number | null) | MediaProps;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
}

interface DropdownMenuProps {
  navLinks: NavLink[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ navLinks }) => {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
        setOpenSub(null);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setOpenSub(null);
      }
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Abrir menú"
        className="sm:hidden inline-flex items-center justify-center w-10 h-10 bg-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-[#85ccc6]"
      >
        <Menu className="w-6 h-6 text-black" />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-50 flex flex-col bg-white animate-fadeIn"
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

          <nav className="flex-1 overflow-y-auto">
            <ul className="p-6 space-y-4 text-lg text-gray-800">
              {navLinks.map((item, index) => (
                <li key={item.id || index}>
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenSub(
                            openSub === item.id ? null : item.id || `${index}`,
                          )
                        }
                        aria-haspopup="true"
                        aria-expanded={openSub === (item.id || `${index}`)}
                        className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-[#85ccc6]/20 focus:bg-[#85ccc6]/30"
                      >
                        {item.title}
                        {openSub === (item.id || `${index}`) ? (
                          <ChevronDown className="w-5 h-5 text-gray-700" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        )}
                      </button>
                      {openSub === (item.id || `${index}`) && (
                        <ul className="ml-6 mt-2 space-y-2">
                          {item.subItems.map((sub, subIndex) => (
                            <li key={sub.id || subIndex}>
                              <button className="w-full flex items-start gap-2 px-4 py-2 rounded-md hover:bg-[#85ccc6]/20">
                                {sub.enableImage &&
                                  sub.image &&
                                  typeof sub.image !== "number" && (
                                    <ReactImage
                                      src={sub.image.url!}
                                      alt={sub.image.alt || sub.title}
                                      width={40}
                                      height={40}
                                      className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                                    />
                                  )}
                                <div className="text-left">
                                  <span>{sub.title}</span>
                                  {sub.description && (
                                    <span className="block text-sm text-gray-500">
                                      {sub.description}
                                    </span>
                                  )}
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-[#85ccc6]/20 focus:bg-[#85ccc6]/30">
                      {item.title}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
