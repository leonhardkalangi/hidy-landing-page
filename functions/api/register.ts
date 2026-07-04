/**
 * POST /api/register
 *
 * Registration form on hidyapp.com → user fills name + email + nickname
 * (after they buy + receive their license key by email from Polar).
 * Stored in KV keyed by `key:<license>` so the Mac app can look the
 * profile up after activation via GET /api/profile?key=...
 */

interface Env {
  HIDY_KV: KVNamespace;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction<Env> = () =>
  new Response(null, { status: 204, headers: CORS });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { license?: string; name?: string; email?: string; nickname?: string } = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }

  const license = (body.license || "").trim().toUpperCase();
  const email = (body.email || "").trim().toLowerCase();
  const name = (body.name || "").trim();
  const nickname = (body.nickname || "").trim();
  if (!license.startsWith("HIDY-")) {
    return json({ error: "license required (HIDY-…)" }, 400);
  }
  if (!email || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "name + valid email required" }, 400);
  }

  const record = {
    license,
    name,
    email,
    nickname: nickname || name,
    registeredAt: new Date().toISOString(),
  };
  await env.HIDY_KV.put(`key:${license}`, JSON.stringify(record));
  // Also write a reverse lookup so we can find a user by email if needed.
  await env.HIDY_KV.put(`email:${email}`, license);
  return json({ ok: true }, 200);
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}
