# Advanced Carpets & Restoration

Marketing site for Advanced Carpets & Restoration, serving Central Otago, Southern Lakes and the Maniototo.

Built with [Astro](https://astro.build/) and managed with [TinaCMS](https://tina.io/). Cloudflare Pages hosts the production domain; GitHub Pages remains a noindex approval site.

## Develop

```bash
npm install
npm run dev:site # Astro only, at http://127.0.0.1:4321
npm run dev      # Astro with the TinaCMS editor
npm run build    # check and build the static site to ./dist
npm run preview  # preview the production build
```

Content is stored in `content/`. The copy from the former service-page layout is preserved in `SERVICE_PAGE_CONTENT_ARCHIVE.md`.

## Design system workflow

The private `/design-system/` page is the visual source of truth. `src/data/design-system.json` is the machine-readable component registry.

For shared frontend work:

1. Add or update the component in the registry first.
2. Confirm the design-system page explains or demonstrates the pattern.
3. Implement the component using the shared tokens, Lucide icons and standard breakpoints.
4. Run `npm run check:design-system`.

`npm run build` and the GitHub Pages workflow run the same consistency check automatically, so unregistered components and off-system styling cannot deploy.

## TinaCMS

TinaCloud builds require the project client ID and read-only token. Add them to a local `.env` file when the CMS editor is needed:

```bash
NEXT_PUBLIC_TINA_CLIENT_ID=
TINA_TOKEN=
NEXT_PUBLIC_TINA_BRANCH=main
```

Run `npm run build:cms` only when those credentials are configured.

## Deploy

Pushes to `main` deploy the production site through the Cloudflare Pages Git integration. The GitHub Pages workflow also builds the same commit with the demo subpath and publishes its separate approval site.

Keep `PUBLIC_SITE_INDEXABLE=true` in the Cloudflare Pages **Production** environment, with the production branch set to `main` and `DEPLOY_TARGET` unset. The build fails rather than deploy a noindex production homepage if this setting goes missing. The GitHub Pages approval site remains noindex, and the `/service-page-template/`, `/design-system/`, `/thank-you/` and 404 pages always remain noindex.
