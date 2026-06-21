import type { APIRoute } from "astro";
import { experimental_createIslandRoute } from "@tinacms/astro/experimental";
import { islands } from "@/lib/tina/islands";

// This server route only powers TinaCMS live visual editing. The GitHub Pages
// build is fully static (no adapter), so we prerender it to nothing there.
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";

export const prerender = isGithubPages;
export function getStaticPaths() {
  return [];
}
export const ALL: APIRoute = experimental_createIslandRoute(islands);
