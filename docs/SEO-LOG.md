# Hidy Vault SEO log

Playbook: https://claude.ai/artifact/AvgFLWzhhz4sKFhCV6672m (one quality guide per day, internal links from high-traffic pages).

| Date | Keyword | URL | GSC baseline | Inbound links added | Notes |
| --- | --- | --- | --- | --- | --- |
| 2026-10-22 | how to lock photos on iphone | /guides/lock-photos-iphone/ | No non-brand data yet (site switched to Vault 2026-10-22) | Homepage guide grid, /guides/, /guides/get-started/ | Pillar #1. Facts: Apple 104987, iphb4defbde9, iph00f208d05; Hidy features checked in ~/Code/hidy-vault. Deploy 0819f0cd. |
| 2026-10-22 | (CTA + technical) | all guides | n/a | n/a | /go/app-store redirect (functions/go/app-store.ts; ct per guide, pt 128916850, app 6824915908; falls back to /#how-it-works until the iTunes lookup returns the app). App banner on 4 guides. robots.txt: AI bots allowed, /go/ disallowed. llms.txt added. Privacy meta description de-duplicated. Article #1: Quick answer, HowTo + BreadcrumbList, 2026 title. Deploy 9c5a4673. |
| 2026-10-22 | secret folder iphone | /guides/secret-folder-iphone/ | n/a (GSC brand-only) | n/a | Loop run: backlog #1 skipped (compare/hidy-vs-apple-hidden-album covers it) -> secret-folder-iphone. Hidden album, locked Files app, locked notes vs one encrypted vault. In-body link from /guides/hide-photos-iphone/; related on features/documents-and-notes + hidden-vaults. Deploy 4703235f. |

When the app is released: replace "Coming to the App Store" in public/guides/*/index.html banners with "Free on the App Store".

Next: see ~/loops/hidy-seo/backlog.md (loop picks the next unchecked line).
