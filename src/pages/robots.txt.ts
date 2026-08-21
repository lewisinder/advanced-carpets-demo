import { site, siteIndexing } from "@/data/site";

export function GET() {
  const sitemap = siteIndexing.indexable ? `\nSitemap: ${site.url}/sitemap.xml\n` : "";

  return new Response(`User-agent: *\nAllow: /\n${sitemap}`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": siteIndexing.robots,
    },
  });
}
