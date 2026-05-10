# Hidy landing page — guidance for Claude Code

Vite + React + TypeScript + Tailwind + shadcn/ui SPA for the Hidy macOS app.
Hosted on **Cloudflare Pages** at https://hidyapp.com.

## Deploy

```bash
npm run deploy
```

Equivalent to `npm run build && wrangler pages deploy dist --project-name=hidy-landing-page --branch=main`.
Wrangler is already authenticated as `leonhardkalangi@gmail.com` (OAuth, account
`375d036fd05d786e8b508abcf6b02419`). Deploys take ~10–30 seconds.

## Why CLI and not GitHub auto-deploy

Cloudflare's dashboard "Connect to Git" flow is broken on this account — both the
classic Pages and the unified Workers Builds paths hang on the install binding.
The GitHub App is correctly installed at github.com/settings/installations/131125392
with `hidy-landing-page` access, but Cloudflare's frontend won't surface the repo
picker. Hard refresh, fresh login, and install-callback URLs all failed.

The Wrangler CLI uses the same account-level OAuth and writes straight to Pages,
sidestepping the bug entirely. Use `npm run deploy` for now. A GitHub Action that
shells out to wrangler would also work if hands-off auto-deploy is wanted later.

## Hosting setup (already done — for reference)

- Pages project: `hidy-landing-page`
- Custom domains: `hidyapp.com` (apex, CNAME-flattened) + `www.hidyapp.com`
- Single Redirect rule: `https://www.* → https://${1}` (301, preserve query string)
- Lovable's old A records (185.158.133.1) replaced; Lovable hosting is dead for this domain

## Lovable note

Lovable still has GitHub push access and may continue committing to `main`. Those
commits land on GitHub but **do NOT auto-deploy** to Cloudflare anymore. Run
`npm run deploy` after Lovable pushes if you want the change live.

To stop Lovable from pushing, disconnect the project in Lovable's dashboard.

## Important not to break

- Title meta + canonical URL must be `https://hidyapp.com/` — the `.app` TLD is
  not registered. See `index.html`.
- Pricing tier ($19.90 founding / $24.90 standard, 7-day trial, 2 Macs, lifetime)
  is in `src/components/sections/PricingSection.tsx`. Don't change without
  explicit OK from the user.
- Legal pages have a "Draft — pending counsel review" banner intentionally. Keep
  it until counsel reviews.
