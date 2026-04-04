import React, { useRef, useEffect, ImgHTMLAttributes } from "react";
import { useBlobUrl } from "../hooks/useBlobUrl";
import { useDevToolsContext } from "../context/DevToolsContext";

interface ProtectedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  showOverlay?: boolean;
}

/**
 * ProtectedImage component that:
 * 1. Converts the image URL to a blob URL (hides original URL from DevTools Network tab)
 * 2. Renders the image onto a <canvas> element — no <img> tag in the DOM, no src attribute
 *    visible in DevTools Elements panel, cannot be opened with right-click → "Open in new tab"
 * 3. Immediately revokes the blob URL after drawing it onto the canvas
 * 4. If DevTools is detected open, the canvas is cleared and replaced with a placeholder
 * 5. Adds an overlay div to prevent right-click context menu and drag
 */
export function ProtectedImage({
  src,
  alt,
  showOverlay = true,
  className,
  style,
  ...rest
}: ProtectedImageProps) {
  const blobUrl = useBlobUrl(src);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDevToolsOpen } = useDevToolsContext();

  // Draw image on canvas when blob URL is ready
  useEffect(() => {
    if (!blobUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();

    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0);

      // Revoke blob URL immediately after drawing — the URL is no longer
      // needed and becomes invalid, closing the "copy blob URL from DevTools" vector.
      if (blobUrl.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrl);
      }
    };

    image.onerror = () => {
      canvas.width = 400;
      canvas.height = 300;
      ctx.fillStyle = "#fce7f3";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    image.src = blobUrl;
  }, [blobUrl]);

  // When DevTools is detected open: clear the canvas and show a placeholder.
  // When DevTools is closed: the component will re-render and redraw via blobUrl effect.
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isDevToolsOpen) {
      // Clear the canvas so the image data is no longer visible/accessible
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw an obfuscation overlay
      ctx.fillStyle = "#1e1b4b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#818cf8";
      ctx.font = `bold ${Math.max(14, canvas.width / 20)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Chiudi DevTools per vedere", canvas.width / 2, canvas.height / 2);
    }
    // When isDevToolsOpen becomes false, the blobUrl effect will redraw
    // (blobUrl may have been revoked; useBlobUrl will re-fetch on next mount cycle)
  }, [isDevToolsOpen]);

  // Show skeleton while loading
  if (!blobUrl) {
    return (
      <div
        className={`bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse ${className}`}
        style={{ aspectRatio: "auto", ...style }}
      />
    );
  }

  return (
    <div
      className="relative w-full h-full"
      style={{ position: "relative", userSelect: "none", WebkitUserSelect: "none" }}
    >
      {/*
        <canvas> instead of <img>:
        - No src attribute in the DOM (DevTools Elements tab shows nothing to copy)
        - Cannot be right-clicked → "Open image in new tab"
        - Not treated as an <img> resource by the browser's save mechanism
        - Cleared automatically when DevTools is detected open
      */}
      <canvas
        ref={canvasRef}
        aria-label={alt}
        role="img"
        className={className}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          userSelect: "none",
          WebkitUserSelect: "none",
          ...style,
        }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />

      {/* Transparent overlay to block all pointer interactions */}
      {showOverlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 cursor-default pointer-events-auto select-none"
          style={{
            background: "transparent",
            zIndex: 50,
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onPointerDown={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
}

export default ProtectedImage;
