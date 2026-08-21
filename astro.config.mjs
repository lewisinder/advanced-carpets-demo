import { defineConfig } from "astro/config";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";

// GitHub Pages serves the deployed site from the repository subpath. Local
// development stays at the domain root so Tina visual editing keeps working.
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";

export default defineConfig({
  site: isGithubPages
    ? "https://lewisinder.github.io"
    : "https://www.advancedcarpet.co.nz",
  base: isGithubPages ? "/advanced-carpets-demo/" : "/",
  output: "static",
  integrations: [tina()],
  vite: {
    plugins: [tinaAdminDevRedirect()],
  },
  server: process.env.PORT ? { port: Number(process.env.PORT) } : {},
});
