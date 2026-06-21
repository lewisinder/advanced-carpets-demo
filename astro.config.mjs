import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://www.advancedcarpet.co.nz",
  output: "static",
  server: process.env.PORT ? { port: Number(process.env.PORT) } : {},
  adapter: cloudflare()
});