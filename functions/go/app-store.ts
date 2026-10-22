// /go/app-store?ct=<campaign>&src=<page>
// Every Vault CTA goes through here so App Store Connect attributes installs
// per guide (campaign token `ct` + provider token `pt`) without any analytics
// on the website. Until Apple releases the app, the App Store URL 404s, so we
// send visitors to the homepage instead. The switch flips by itself once the
// iTunes lookup API returns the app.

const APP_ID = "6824915908";
const PROVIDER_TOKEN = "128916850";
const FALLBACK = "/#how-it-works";

async function isLive(): Promise<boolean> {
  const cache = caches.default;
  const key = new Request("https://hidyapp.com/__appstore-live");
  const hit = await cache.match(key);
  if (hit) return (await hit.text()) === "1";

  let live = false;
  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${APP_ID}`);
    const data = (await res.json()) as { resultCount?: number };
    live = (data.resultCount ?? 0) > 0;
  } catch {
    live = false;
  }
  await cache.put(
    key,
    new Response(live ? "1" : "0", { headers: { "Cache-Control": "max-age=600" } }),
  );
  return live;
}

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  // Apple allows up to 40 characters for a campaign token.
  const ct = (url.searchParams.get("ct") || "web_unknown").replace(/[^a-z0-9_]/gi, "").slice(0, 40);

  if (!(await isLive())) {
    return Response.redirect(new URL(FALLBACK, url.origin).toString(), 302);
  }
  const target = `https://apps.apple.com/app/apple-store/id${APP_ID}?pt=${PROVIDER_TOKEN}&ct=${ct}&mt=8`;
  return new Response(null, {
    status: 302,
    headers: { Location: target, "Cache-Control": "no-store" },
  });
};
