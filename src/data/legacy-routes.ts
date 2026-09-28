// URLs from the former Webflow sitemap. Keep these fallbacks until permanent
// redirects are active on the production domain after the Cloudflare cutover.
export const legacyLocationRoutes = [
  { from: "/locations/wanaka-carpet-cleaning", to: "/services/carpet-cleaning/" },
  { from: "/locations/cromwell-carpet-cleaning-services", to: "/services/carpet-cleaning/" },
  { from: "/locations/queenstown-carpet-cleaning-maintenance", to: "/services/carpet-cleaning/" },
  { from: "/locations/alexandra-carpet-repair-cleaning", to: "/services/carpet-cleaning/" },
  { from: "/locations/frankton-home-carpet-cleaning", to: "/services/carpet-cleaning/" },
  { from: "/locations/hawea-cleaning-restoration", to: "/services/carpet-cleaning/" },
] as const;

export const legacyOtherRoutes = [
  { from: "/locations", to: "/" },
  { from: "/services/hard-floor-cleaning-and-polishing", to: "/services/hard-floor-cleaning-polish/" },
] as const;

export const legacyRoutes = [...legacyLocationRoutes, ...legacyOtherRoutes] as const;
