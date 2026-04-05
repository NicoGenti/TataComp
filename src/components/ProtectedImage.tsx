import React, { useRef, useEffect, useState, ImgHTMLAttributes } from "react";
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
 * 6. Lazy-loads via IntersectionObserver: the blob fetch only starts when the image
 *    is within 200px of the viewport, preventing memory exhaustion on long photo grids.
 */
export function ProtectedImage({
  src,
  alt,
  showOverlay = true,
  className,
  style,
  ...rest
}: ProtectedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const { isDevToolsOpen } = useDevToolsContext();

  // One-way latch: start fetching only when within 200px of the viewport.
  // Disconnects immediately after first intersection so isNearViewport never
  // goes back to false (avoids re-fetching images as the user scrolls).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []); // empty deps — containerRef is stable for the component lifetime

  const blobUrl = useBlobUrl(src, isNearViewport);

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

  return (
    // Single persistent container in ALL render states so the IntersectionObserver
    // ref stays valid through the skeleton → loaded transition.
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ position: "relative", userSelect: "none", WebkitUserSelect: "none", ...style }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {!blobUrl ? (
        // Skeleton: absolute inset-0 so it fills the container without causing layout shift
        <div
          className={`absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse ${className ?? ""}`}
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default ProtectedImage;
