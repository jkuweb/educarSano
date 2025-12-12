import React, { useEffect, useState } from "react";
import { Image } from "@unpic/react";

type UnpicLayout = "fullWidth" | "fixed" | "constrained";

interface MediaImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  mimeType?: string;
  layout?: UnpicLayout;
  priority?: boolean;
  background?: string;
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt = "",
  width,
  height,
  className,
  mimeType = "",
  loading = "lazy",
  layout = "constrained",
  priority = false,
  background = "",
  ...rest
}) => {
  const [svgContent, setSvgContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const isSvgFile =
    mimeType === "image/svg+xml" ||
    src?.endsWith(".svg") ||
    src?.includes(".svg?");

  // Fetch inline SVG
  useEffect(() => {
    if (isSvgFile && src) {
      setIsLoading(true);
      setError(false);
      setSvgContent("");

      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch SVG");
          return res.text();
        })
        .then((content) => {
          setSvgContent(content);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(true);
          setIsLoading(false);
        });
    }
  }, [src, isSvgFile]);

  // Render inline SVG if available
  if (isSvgFile) {
    if (isLoading) {
      return (
        <div
          className={className}
          style={{
            width,
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading SVG...
        </div>
      );
    }

    if (svgContent && !error) {
      return (
        <div
          className={className}
          style={{ width, height }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      );
    }

    if (error) {
      console.warn("Falling back to img tag for SVG:", src);
    }
  }

  if (layout === "fullWidth") {
    return (
      <Image
        src={src}
        alt={alt}
        layout="fullWidth"
        className={className}
        loading={loading}
        priority={priority}
        background={background}
        {...rest}
      />
    );
  }

  if (layout === "fixed" && width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        layout="fixed"
        width={width}
        height={height}
        className={className}
        loading={loading}
        priority={priority}
        background={background}
        {...rest}
      />
    );
  }

  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        layout="constrained"
        width={width}
        height={height}
        className={className}
        loading={loading}
        priority={priority}
        background={background}
        {...rest}
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
};

export default MediaImage;
