import { useRef, useEffect, useState, ImgHTMLAttributes } from "react";
import { useBlobUrl } from "../hooks/useBlobUrl";

interface ProtectedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  showOverlay?: boolean;
}

/**
 * ProtectedImage component that:
 * 1. Converts the image URL to a blob URL (hides the original Azure/CDN URL from
 *    DevTools Network tab — only a blob:// reference is visible)
 * 2. Renders with a standard <img> tag for native browser rendering (no canvas bugs)
 * 3. Revokes the blob URL immediately after the image loads
 * 4. Lazy-loads via IntersectionObserver: the blob fetch only starts when the image
 *    is within 200px of the viewport, preventing memory exhaustion on long photo grids
 * 5. Blocks right-click, drag, and pointer interactions via a transparent overlay
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
  const [isNearViewport, setIsNearViewport] = useState(false);

  // One-way latch: start fetching blob URL only when within 200px of the viewport.
  // Disconnects immediately after first intersection so isNearViewport never goes
  // back to false (avoids re-fetching images as the user scrolls back up).
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

  return (
    // Single persistent container in ALL render states so the IntersectionObserver
    // ref stays valid through the skeleton → loaded transition.
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ userSelect: "none", WebkitUserSelect: "none", ...style }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {!blobUrl ? (
        // Skeleton: shown while blob URL is being fetched
        <div
          className={`absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse ${className ?? ""}`}
        />
      ) : (
        <img
          src={blobUrl}
          alt={alt}
          draggable={false}
          className={className}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            userSelect: "none",
            pointerEvents: "none",
          }}
          // Revoke blob URL immediately after the browser has loaded the image data.
          // The <img> continues to display because the decoded data is in browser cache.
          onLoad={() => { if (blobUrl.startsWith("blob:")) URL.revokeObjectURL(blobUrl); }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      )}

      {/* Transparent overlay to block right-click, drag, and pointer interactions */}
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
