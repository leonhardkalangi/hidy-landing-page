/**
 * GET /api/testimonials
 *
 * Returns all feedback submissions from KV, newest first. Used by the
 * /testimonials page to display reviews. In production you'd want to
 * curate (only approved ones) — for now everyone sees everything since
 * only paying users with a license key can submit.
 */

interface Env {
  HIDY_KV: KVNamespace;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction<Env> = () =>
  new Response(null, { status: 204, headers: CORS });

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  // KV list with prefix to grab only feedback entries (key shape:
  // feedback:<timestamp>:<email>). Limit to 100 for now.
  const list = await env.HIDY_KV.list({ prefix: "feedback:", limit: 100 });
  const items: Array<{ name: string; comment: string; submittedAt: string; rating?: number }> = [];
  for (const k of list.keys) {
    const raw = await env.HIDY_KV.get(k.name);
    if (!raw) continue;
    try {
      const r = JSON.parse(raw);
      items.push({
        name: r.name || "anonymous",
        comment: r.comment || "",
        submittedAt: r.submittedAt || "",
        rating: r.rating || undefined,
      });
    } catch {
      // skip malformed
    }
  }
  // Sort newest first by submittedAt.
  items.sort((a, b) => (b.submittedAt || "").localeCompare(a.submittedAt || ""));

  return new Response(JSON.stringify({ items }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS },
  });
};
