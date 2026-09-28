import { readFileSync } from "node:fs";
import { join } from "node:path";

const isCloudflareProduction = process.env.CF_PAGES === "1" && process.env.CF_PAGES_BRANCH === "main";
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";
const indexable = process.env.PUBLIC_SITE_INDEXABLE === "true";

function fail(message) {
  console.error(`Indexability check failed: ${message}`);
  process.exitCode = 1;
}

function readBuiltFile(path) {
  return readFileSync(join("dist", path), "utf8");
}

if (isCloudflareProduction && !indexable) {
  fail("Cloudflare production on main requires PUBLIC_SITE_INDEXABLE=true. Refusing to deploy a noindex site.");
}

if (isCloudflareProduction && isGithubPages) {
  fail("Cloudflare production must not use the GitHub Pages subpath build.");
}

if (isGithubPages && indexable) {
  fail("The GitHub Pages demo must remain noindex.");
}

const home = readBuiltFile("index.html");
const robots = readBuiltFile("robots.txt");
const sitemap = readBuiltFile("sitemap.xml");
const expectedRobots = indexable ? "index, follow" : "noindex, nofollow";

if (!home.includes(`<meta name="robots" content="${expectedRobots}"`)) {
  fail(`The built homepage does not contain the expected ${expectedRobots} robots directive.`);
}

if (robots.includes("Sitemap: https://www.advancedcarpet.co.nz/sitemap.xml") !== indexable) {
  fail("The built robots.txt sitemap entry does not match the indexability setting.");
}

const publicUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const titles = new Set();
const descriptions = new Set();
const headings = new Set();

if (publicUrls.length === 0) fail("The sitemap has no public pages.");

for (const url of publicUrls) {
  const pathname = new URL(url).pathname;
  const html = readBuiltFile(pathname === "/" ? "index.html" : `${pathname.slice(1)}index.html`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  const heading = h1[0]?.[1];

  if (!html.includes(`<meta name="robots" content="${expectedRobots}"`)) {
    fail(`${pathname} does not contain the expected ${expectedRobots} robots directive.`);
  }
  if (!html.includes(`<link rel="canonical" href="${url}"`)) {
    fail(`${pathname} does not have a self-referencing canonical URL.`);
  }
  if (!title || titles.has(title)) fail(`${pathname} has a missing or duplicate SEO title.`);
  if (!description || descriptions.has(description)) fail(`${pathname} has a missing or duplicate meta description.`);
  if (h1.length !== 1 || headings.has(heading)) fail(`${pathname} needs one unique H1.`);

  titles.add(title);
  descriptions.add(description);
  headings.add(heading);
}

for (const path of ["design-system/index.html", "service-page-template/index.html", "thank-you/index.html", "404.html"]) {
  const html = readBuiltFile(path);
  if (!html.includes('<meta name="robots" content="noindex, nofollow"')) {
    fail(`${path} must remain noindex.`);
  }
}

if (!process.exitCode) {
  console.log(`Indexability check passed: ${publicUrls.length} public pages ${expectedRobots} with unique SEO fields; private and utility pages noindex.`);
}
