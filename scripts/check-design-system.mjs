import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "src/data/design-system.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const failures = [];

function walk(directory, extensions) {
  const found = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...walk(full, extensions));
    else if (extensions.some((extension) => entry.name.endsWith(extension))) found.push(full);
  }
  return found;
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function fail(message) {
  failures.push(message);
}

const componentFiles = walk(path.join(root, "src/components"), [".astro"]).map(relative).sort();
const registeredFiles = registry.components.map((component) => component.file).sort();
const registeredSet = new Set(registeredFiles);
const componentSet = new Set(componentFiles);

for (const file of componentFiles) {
  if (!registeredSet.has(file)) fail(`Unregistered component: ${file}. Add it to src/data/design-system.json before using it.`);
}
for (const file of registeredFiles) {
  if (!componentSet.has(file)) fail(`Registry entry points to a missing component: ${file}.`);
}
if (registeredSet.size !== registeredFiles.length) fail("The component registry contains duplicate file entries.");

for (const component of registry.components) {
  if (!component.name || !component.category || !component.description) fail(`Incomplete registry entry for ${component.file}.`);
}

const designSystemPage = fs.readFileSync(path.join(root, registry.policy.sourceOfTruth), "utf8");
if (!designSystemPage.includes('designSystemRegistry from "@/data/design-system.json"')) {
  fail("The design-system page must import the component registry.");
}
if (!designSystemPage.includes("designSystemRegistry.components.map")) {
  fail("The design-system page must render the component registry.");
}

const processPatternClass = registry.policy.processPatternClass;
const processSurfaceMode = registry.policy.processSurfaceMode;
if (!designSystemPage.includes(processPatternClass)) {
  fail(`The design-system page must document the ${processPatternClass} process pattern.`);
}
const servicePageSource = fs.readFileSync(path.join(root, "src/components/ServicePage.astro"), "utf8");
if (!servicePageSource.includes(`class="${processPatternClass}"`)) {
  fail(`ServicePage.astro must use the registered ${processPatternClass} process pattern.`);
}
const tokenStyles = fs.readFileSync(path.join(root, registry.policy.tokenFile), "utf8");
const processSurfaceRule = `.steps-grid article {\n  position: relative;\n  border-top: 5px solid var(--taupe);\n  background: ${processSurfaceMode};`;
if (!tokenStyles.includes(processSurfaceRule)) {
  fail(`The shared process steps must use the registered ${processSurfaceMode} surface mode.`);
}
const processAccentRules = [
  "border-top: 5px solid var(--taupe)",
  "border-color: var(--clay)",
  "border-color: var(--water)",
  "border-color: var(--sage)",
];
for (const rule of processAccentRules) {
  if (!tokenStyles.includes(rule)) fail(`The shared process pattern is missing: ${rule}.`);
}
const sourceFiles = [
  ...walk(path.join(root, "src"), [".astro", ".css", ".ts", ".tsx", ".js", ".mjs"]),
  ...walk(path.join(root, "content"), [".json", ".md"]),
];
const allowedBreakpoints = new Set(registry.policy.breakpoints.map(String));
const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
const widthPattern = /@media\s*\([^)]*(?:min|max)-width:\s*(\d+)px[^)]*\)/g;
const importPattern = /from\s+["']([^"']+)["']/g;
const iconLibraryPattern = /(?:icon|icons|fortawesome|heroicons|phosphor|tabler)/i;
const publicCopyPattern = new RegExp(`\\b(?:${registry.prohibitedPublicTerms.map((term) => term.replace(" ", "\\s+")).join("|")})\\b`, "i");

for (const file of sourceFiles) {
  const rel = relative(file);
  const source = fs.readFileSync(file, "utf8");

  const isContentFile = rel.startsWith("content/");

  if (!isContentFile && rel !== registry.policy.tokenFile) {
    const colours = source.match(hexPattern);
    if (colours?.length) fail(`Raw colour value in ${rel}: ${[...new Set(colours)].join(", ")}. Add a semantic token to ${registry.policy.tokenFile}.`);
  }

  for (const match of source.matchAll(widthPattern)) {
    const value = match[1];
    if (!allowedBreakpoints.has(value)) fail(`Off-system breakpoint in ${rel}: ${value}px. Allowed values: ${[...allowedBreakpoints].join(", ")}px.`);
  }

  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1];
    if (!iconLibraryPattern.test(specifier)) continue;
    const isLucide = specifier.startsWith(registry.policy.iconSource);
    const isLocalException = specifier.startsWith("@/components/icons/");
    if (!isLucide && !isLocalException) fail(`Mixed icon source in ${rel}: ${specifier}. Use Lucide or a registered local exception.`);
  }

  if ((rel.startsWith("src/pages/") || rel.startsWith("src/components/") || rel.startsWith("content/")) && publicCopyPattern.test(source)) {
    fail(`Prohibited public wording found in ${rel}. Use enquiry-led wording.`);
  }

  for (const retired of registry.retiredPatterns) {
    const found = retired === "template-"
      ? /(?:class(?:es|:list)?=\{?["'][^"']*template-|\.template-)/.test(source)
      : source.includes(retired);
    if (found) fail(`Retired design pattern "${retired}" found in ${rel}.`);
  }
}

if (failures.length) {
  console.error("Design-system consistency check failed:\n");
  for (const issue of failures) console.error(`- ${issue}`);
  console.error("\nUpdate the design-system registry and page before introducing new shared UI.");
  process.exit(1);
}

console.log(`Design-system consistency check passed: ${componentFiles.length} registered components, Lucide icon policy, token colours, approved breakpoints and public-copy rules.`);
