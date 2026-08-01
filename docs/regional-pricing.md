# Regional pricing

## Current production design

- The LP is hosted directly on GitHub Pages at `sideclip.app`.
- The browser requests `sideclip-billing.sideclip-app.workers.dev/api/billing-market` to resolve the visitor's billing market.
- Access from Japan displays JPY. Access from outside Japan displays USD, regardless of the selected site language.
- Visitors cannot manually change the billing currency on the LP.
- A successful result is cached for one hour. If the API is unavailable, the LP uses a stale cached result and then a timezone fallback.
- While the market is being resolved, price fields use a short skeleton state so the wrong currency is not flashed.

## Analytics

The `pricing_market_view` event includes:

- `billing_market`
- `billing_currency`
- `pricing_resolution_source`
- `page_path`

`pricing_resolution_source` distinguishes the billing API, fresh or stale cache, local review override, and timezone fallback.

## SEO and crawlers

GitHub Pages cannot vary the initial HTML by visitor country. Landing and plan pages therefore include both JPY and USD Offers in JSON-LD. JPY Offers use `eligibleRegion: JP`; USD Offers use `ineligibleRegion: JP`. Visible prices still resolve to one market in the browser.

True country-specific HTML at the edge would require moving the site's DNS/proxy or hosting in front of GitHub Pages, such as through Cloudflare. That migration is intentionally separate from the LP pricing implementation and is not required for the current display behavior.

## Verification

Run the local matrix and the live endpoint check separately:

```bash
npm run check:regional
npm run check:billing-live -- --expected-market=jp
```

Run the live check from an overseas network with `--expected-market=global` before a pricing launch that changes market behavior.
