import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";

export default defineConfig({
  site: "https://www.advancedcarpet.co.nz",
  output: "static",
  adapter: netlify(),
  integrations: [tina()],
  vite: {
    plugins: [tinaAdminDevRedirect()],
  },
  server: process.env.PORT ? { port: Number(process.env.PORT) } : {},
});
