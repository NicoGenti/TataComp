import { useState, useEffect } from "react";

/**
 * Hook that fetches an image and converts it to a short-lived blob URL.
 *
 * - The blob URL is valid only until ProtectedImage draws it onto the canvas,
 *   at which point ProtectedImage itself calls URL.revokeObjectURL() immediately.
 * - This means the blob:// URL is never long-lived in memory or DevTools.
 * - Falls back to the original src string on fetch error (e.g. local dev without CORS issues).
 *
 * Returns null while loading, then the blob URL when ready.
 */
export function useBlobUrl(src: string): string | null {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setBlobUrl(null);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();
    // Track the URL created in this effect so we can revoke on cleanup
    // if ProtectedImage didn't already do so (e.g. component unmounts before draw).
    let createdUrl: string | null = null;

    const fetchBlob = async () => {
      try {
        const response = await fetch(src, {
          signal: controller.signal,
          credentials: "same-origin",
          // Instruct caches not to store: each visit re-fetches so there's no
          // persistent URL for an attacker to find in browser cache entries.
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`);
        }

        const blob = await response.blob();

        if (isMounted) {
          const url = URL.createObjectURL(blob);
          createdUrl = url;
          setBlobUrl(url);
        }
      } catch (err) {
        if (isMounted && !(err instanceof Error && err.message.includes("abort"))) {
          // Fallback to original URL on error (e.g. local dev CORS)
          setBlobUrl(src);
        }
      }
    };

    fetchBlob();

    return () => {
      isMounted = false;
      controller.abort();
      // Revoke blob URL on unmount if it was not already revoked by the canvas draw
      if (createdUrl && createdUrl.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(createdUrl);
        } catch {
          // already revoked — safe to ignore
        }
      }
    };
  }, [src]);

  return blobUrl;
}
