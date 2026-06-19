import { services } from "@/data/services";
import { site } from "@/data/site";

const routes = [
  "/",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  "/about",
  "/contact",
];

export function GET() {
  const urls = routes.map((route) => `  <url><loc>${site.url}${route === "/" ? "/" : route}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
