/**
 * Returns the base URL for images.
 *
 * In production, VITE_IMAGES_BASE_URL should point to the Azure Blob Storage
 * container URL (e.g. https://<account>.blob.core.windows.net/<container>/).
 *
 * In development, if the variable is not set, it falls back to the Vite
 * BASE_URL so that local images under public/images/ still work.
 *
 * Usage:
 *   imageUrl("images/imgBeauty/photo.jpg")
 *   // → "https://<account>.blob.core.windows.net/<container>/images/imgBeauty/photo.jpg"
 */
const base: string = (() => {
  const envUrl = import.meta.env.VITE_IMAGES_BASE_URL as string | undefined;
  if (envUrl) {
    // Ensure the base always ends with a slash
    return envUrl.endsWith("/") ? envUrl : `${envUrl}/`;
  }
  // Fallback: serve from the local public/ directory during development
  return import.meta.env.BASE_URL as string;
})();

export function imageUrl(path: string): string {
  // Strip any leading slash from the path so we never get double slashes
  const normalised = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalised}`;
}
