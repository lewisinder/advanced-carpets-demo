import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.advancedcarpet.co.nz",
  output: "static",
  server: process.env.PORT ? { port: Number(process.env.PORT) } : {},
});
