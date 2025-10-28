import React, { useEffect, useState } from "react";

interface MediaImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  mimeType?: string;
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt = "",
  width,
  height,
  className = "",
  loading = "lazy",
  mimeType = "",
}) => {
  const [svgContent, setSvgContent] = useState("");
  const [error, setError] = useState(false);

  const isSvgFile =
    mimeType === "image/svg+xml" ||
    src?.endsWith(".svg") ||
    src?.includes(".svg?");

  useEffect(() => {
    if (isSvgFile && src) {
      setError(false);
      setSvgContent("");

      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch SVG");
          return res.text();
        })
        .then((content) => {
          setSvgContent(content);
        })
        .catch((err) => {
          console.error("Error loading SVG:", err);
          setError(true);
        });
    }
  }, [src, isSvgFile]);

  if (isSvgFile && svgContent && !error) {
    return (
      <div
        className={className}
        style={{ width, height }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
    />
  );
};

export default MediaImage;
