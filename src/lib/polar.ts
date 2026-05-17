// Hardcoded Polar.sh checkout link for the Hidy product. Single source of
// truth so the URL never drifts across CTAs. Replace in one place if the
// product ever moves to a new Polar org or checkout link.

export const POLAR_CHECKOUT_URL =
  "https://buy.polar.sh/polar_cl_gKeh1GERZbnpd3M3X0xywULHUJoGzhvypU0i72O8kzV";

export const POLAR_CUSTOMER_PORTAL_URL = "https://polar.sh/hidy/portal";

// Direct DMG download hosted as a release asset on the landing repo. Bump
// the tag (v1.0.0-app, v1.0.1-app, ...) and update this URL when shipping
// a new build. The DMG is built via scripts/build-dmg-signed.sh in the
// hidy app repo (Developer ID signed + notarized) and uploaded with
// `gh release create`.
export const HIDY_DMG_DOWNLOAD_URL =
  "https://github.com/leonhardkalangi/hidy-landing-page/releases/download/v1.0.1-app/Hidy-1.0.1.dmg";
