# Webflow URL migration

The routes below come from the former site's [Webflow sitemap](https://www.advancedcarpet.co.nz/sitemap.xml). The GitHub Pages build includes immediate HTML redirect fallbacks at each path. These are useful while the site is static, but they are not HTTP 301 responses.

| Former Webflow path | Current destination |
| --- | --- |
| `/locations` | `/` (the homepage includes the service-area section) |
| `/locations/wanaka-carpet-cleaning` | `/services/carpet-cleaning/` |
| `/locations/cromwell-carpet-cleaning-services` | `/services/carpet-cleaning/` |
| `/locations/queenstown-carpet-cleaning-maintenance` | `/services/carpet-cleaning/` |
| `/locations/alexandra-carpet-repair-cleaning` | `/services/carpet-cleaning/` |
| `/locations/frankton-home-carpet-cleaning` | `/services/carpet-cleaning/` |
| `/locations/hawea-cleaning-restoration` | `/services/carpet-cleaning/` |
| `/services/hard-floor-cleaning-and-polishing` | `/services/hard-floor-cleaning-polish/` |

The six former town pages largely repeated broad carpet-cleaning and restoration information. The current regional carpet-cleaning page is the closest substantive replacement and states the service area. Do not replace these fallbacks with six near-duplicate location pages. If we later have genuinely distinct local work, photos and customer information for each town, we can build individual pages at those existing paths instead.

## At the production-domain cutover

1. Confirm the new site is served at `www.advancedcarpet.co.nz`, every destination works, and the production build no longer has `noindex`. The current GitHub Pages demo must stay `noindex` until launch.
2. Add a [Cloudflare Single Redirect](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/) for each row: match both the path shown and its trailing-slash form, point directly to the final destination on `https://www.advancedcarpet.co.nz`, choose **301 Permanent Redirect**, and preserve the query string. Apply these only when the domain serves the replacement site. A GitHub Pages HTML fallback cannot replace the Cloudflare 301.
3. Test each source URL for one direct 301 hop to a working final page, with no redirect chain. Check that the destination has a self-referencing canonical and is in the new sitemap. Keep the legacy paths out of the sitemap and new internal links.
4. Submit the new sitemap in Google Search Console and monitor old URLs, new URLs and 404 reports. Keep the 301 rules for at least a year, preferably indefinitely.

This follows [Google's site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes): map old paths to relevant final pages, use server-side permanent redirects where possible, avoid chains and irrelevant homepage redirects, and monitor the move. Google treats an instant meta refresh as a permanent redirect when server-side redirects are unavailable, but [prefers HTTP 301 redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects).
