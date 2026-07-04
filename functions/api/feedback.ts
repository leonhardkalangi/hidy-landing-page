/**
 * POST /api/feedback
 *
 * Captures the user's testimonial / bug report submitted from inside Hidy
 * (either via the 30-min auto-prompt or the manual dashboard button).
 * Stored in KV, key = `feedback:<timestamp>:<email>`.
 *
 * Same KV namespace as register: HIDY_KV.
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
  let body: { name?: string; email?: string; comment?: string; rating?: number; appVersion?: string } = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }

  const comment = (body.comment || "").trim();
  if (!comment) {
    return json({ error: "comment required" }, 400);
  }
  const email = (body.email || "anonymous").trim().toLowerCase();
  const name = (body.name || "anonymous").trim();

  const record = {
    name,
    email,
    comment,
    rating: body.rating || 0,
    appVersion: body.appVersion || "unknown",
    submittedAt: new Date().toISOString(),
  };
  const ts = Date.now();
  await env.HIDY_KV.put(`feedback:${ts}:${email}`, JSON.stringify(record));
  return json({ ok: true }, 200);
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}
