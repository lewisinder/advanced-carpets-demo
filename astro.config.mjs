import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";

// When DEPLOY_TARGET=github-pages we build a plain static site served from a
// repo subpath (https://lewisinder.github.io/advanced-carpets-demo/). Otherwise
// we keep the Netlify adapter and serve from the production domain root.
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";

export default defineConfig({
  site: isGithubPages
    ? "https://lewisinder.github.io"
    : "https://www.advancedcarpet.co.nz",
  base: isGithubPages ? "/advanced-carpets-demo/" : "/",
  output: "static",
  ...(isGithubPages ? {} : { adapter: netlify() }),
  integrations: [tina()],
  vite: {
    plugins: [tinaAdminDevRedirect()],
  },
  server: process.env.PORT ? { port: Number(process.env.PORT) } : {},
});
