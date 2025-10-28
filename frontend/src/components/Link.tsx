import { Button, type ButtonProps } from "@/components/ui/button";
import type { Page } from "@/lib/payloadTypes";
import { cn } from "@/utils/ui";
import React from "react";
import CalendlyButton from "./CalendlyButton/CalendlyButton";

// import { CalendlyButton } from '@/components/CalendlyButton/CalendlyButton';

type CMSLinkType = {
  appearance?: "inline" | ButtonProps["variant"];
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: "pages" | "posts";
    value: Page | string | number;
  } | null;
  size?: ButtonProps["size"] | null;
  type?: "custom" | "reference" | "calendly" | null;
  url?: string | null;
};

export const Link: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = "inline",
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props;

  const href =
    type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value.slug
      ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
          reference.value.slug
        }`
      : url;

  if (!href) return null;

  const size = appearance === "link" ? "clear" : sizeFromProps;
  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  if (appearance === "inline") {
    return (
      <a className={cn(className)} href={href || url || ""} {...newTabProps}>
        {label && label}
        {children && children}
      </a>
    );
  }
  if (type === "calendly") {
    return (
      <CalendlyButton
        url={url!}
        variant={appearance!}
        size={size!}
        label={label!}
        className={"w-full cursor-pointer"}
      />
    );
  }
  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <a className={cn(className)} href={href || url || ""} {...newTabProps}>
        {label && label}
        {children && children}
      </a>
    </Button>
  );
};
