"use client";
import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import AstroImage from "../image/AstroImage.tsx";

interface CalendlyButtonProps {
  url: string;
  variant?: "default" | "link" | "outline" | "secondary" | null | undefined;
  size?: "clear" | "default" | "icon" | "lg" | "sm";
  label: string;
  className?: string;
}

export const CalendlyButton: React.FC<CalendlyButtonProps> = ({
  url,
  variant = "default",
  size = "default",
  label,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setIsMobile(
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
    );
  }, []);

  const handleTrigger = (e: React.MouseEvent) => {
    console.log("Triggered");
    if (isMobile) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    setOpen(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div>
        <Button
          onClick={handleTrigger}
          variant={variant}
          size={size}
          className={className}
        >
          {label}
        </Button>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[999]" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[1000] w-[min(95%,1024px)] max-w-[1024px] h-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-lg overflow-hidden focus:outline-none"
          aria-label="Calendly scheduling dialog"
        >
          <div className="flex items-center justify-between p-6 ">
            <div className={"flex items-center justify-between w-full"}>
              <Dialog.Title className="text-lg font-medium grow">
                {label}
              </Dialog.Title>
              <AstroImage
                src={"/public/media/calendly.png"}
                alt={"cadenlyLogo"}
                width={150}
                height={150}
              />
              <Dialog.Close asChild>
                <button
                  aria-label="Close dialog"
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-x-icon lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>
          </div>
          <div className="w-full h-[calc(100%-48px)]">
            <iframe
              src={url}
              title="Calendly scheduling"
              className="w-full h-full border-0"
              allow="clipboard-write; camera; microphone; autoplay; fullscreen"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CalendlyButton;
