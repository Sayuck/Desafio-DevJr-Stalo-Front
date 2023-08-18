/**
 * Sanitize given URL string by removing trailing slash and
 * adding starting slash if not present.
 */
export function sanitizeURL(url?: string) {
  if (!url) return "";

  let sanitizedResourceURL = url;

  // Remove trailing slash
  if (sanitizedResourceURL?.endsWith("/"))
    sanitizedResourceURL = sanitizedResourceURL.slice(
      0,
      -1
    );

  // Add starting slash if not present
  if (!sanitizedResourceURL.startsWith("/"))
    return `/${sanitizedResourceURL}`;

  return sanitizedResourceURL;
}
