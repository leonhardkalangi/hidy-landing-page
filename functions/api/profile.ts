/**
 * GET /api/profile?key=HIDY-XXXX-XXXX-XXXX-XXXX
 *
 * The Mac app calls this after license activation to read the user's
 * name + nickname + email from the website (the website is the source of
 * truth — Hidy reads, doesn't write). Returns 404 if the user hasn't
 * registered on hidyapp.com yet.
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

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const license = (url.searchParams.get("key") || "").trim().toUpperCase();
  if (!license.startsWith("HIDY-")) {
    return json({ error: "key required" }, 400);
  }
  const raw = await env.HIDY_KV.get(`key:${license}`);
  if (!raw) {
    return json({ error: "not found" }, 404);
  }
  return new Response(raw, {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS },
  });
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}
