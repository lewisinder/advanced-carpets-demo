# Advanced Carpets & Restoration

Marketing site for Advanced Carpets & Restoration, serving Central Otago and the Southern Lakes.

Built with [Astro](https://astro.build/) and managed with [TinaCMS](https://tina.io/).

## Develop

```bash
npm install
npm run dev      # start Astro and TinaCMS
npm run build    # build the CMS admin and Netlify deployment to ./dist
npm run preview  # preview the production build
```

The local editor is available at `http://localhost:4321/admin/index.html`. Content is stored in `content/`. Astro generates complete HTML, metadata, and structured data for normal visitors and search crawlers.

## TinaCloud

1. Create a free TinaCloud project connected to this Git repository.
2. Copy `.env.example` to `.env` and add the project client ID and read-only token.
3. Add the same variables to the hosting provider before deploying.

Required variables:

```bash
NEXT_PUBLIC_TINA_CLIENT_ID=
TINA_TOKEN=
NEXT_PUBLIC_TINA_BRANCH=main
```

## Deploy

The Astro adapter and `netlify.toml` target Netlify. Configure the TinaCloud variables in Netlify, then deploy through the linked GitHub repository or the Netlify CLI.
