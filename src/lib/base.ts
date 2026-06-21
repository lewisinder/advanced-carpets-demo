// Prefix a root-absolute path with Astro's configured base path so internal
// links and assets work when the site is served from a repo subpath (GitHub
// Pages). When base is "/" (local dev, Netlify) this is a no-op.
//
// Only paths beginning with "/" are rewritten; anchors (#x), tel:/mailto: and
// absolute URLs are returned untouched.
const BASE = import.meta.env.BASE_URL; // e.g. "/advanced-carpets-demo/" or "/"

export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  const trimmed = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  return `${trimmed}${path}`;
}
