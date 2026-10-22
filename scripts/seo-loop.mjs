// Daily Hidy Vault SEO loop, run by GitHub Actions (.github/workflows/seo-daily.yml) so it
// works without the Mac. One run = MEASURE (GSC) → PICK one topic → RESEARCH (Perplexity,
// optional) → WRITE (DeepSeek) → GATE (facts, links, build) → link it from a page that
// already ranks → write files. The workflow then renders cards, builds, deploys, verifies,
// commits and emails. Strategy: Vaultaire playbook (video NuYO7DWzlaM 6:26–9:51).
//
// Env: DEEPSEEK_API_KEY (required), GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN,
// PERPLEXITY_API_KEY (optional). Writes .seo-run.json for the workflow's later steps.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const rel = (...p) => path.join(ROOT, ...p);
const read = (p) => fs.readFileSync(rel(p), "utf8");
const today = new Date().toISOString().slice(0, 10);
const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
const run = { date: today, status: "skipped", notes: [] };
const done = (status, extra = {}) => {
  Object.assign(run, { status }, extra);
  fs.writeFileSync(rel(".seo-run.json"), JSON.stringify(run, null, 2));
  console.log(JSON.stringify(run, null, 2));
  process.exit(0);
};

// ---------- existing pages ----------
function pages() {
  const out = [];
  for (const section of ["features", "compare", "scenarios", "guides", "tools"]) {
    const dir = rel("content", section);
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".html"))) {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const [, fm, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      out.push({ section, slug: f.slice(0, -5), url: `/${section}/${f.slice(0, -5)}/`, file: path.join(dir, f), meta: JSON.parse(fm), body });
    }
  }
  return out;
}

// ---------- MEASURE ----------
async function gsc() {
  const { GSC_CLIENT_ID: id, GSC_CLIENT_SECRET: secret, GSC_REFRESH_TOKEN: refresh } = process.env;
  if (!id || !secret || !refresh) return { rows: [], note: "GSC secrets missing" };
  const tok = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: "refresh_token" }),
  }).then((r) => r.json());
  if (!tok.access_token) return { rows: [], note: `GSC token refresh failed: ${tok.error || "unknown"}` };
  const q = async (body) => {
    const r = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Ahidyapp.com/searchAnalytics/query", {
      method: "POST",
      headers: { Authorization: `Bearer ${tok.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60000),
    }).then((x) => x.json());
    return r.rows || [];
  };
  const rows = await q({ startDate: daysAgo(29), endDate: daysAgo(2), dimensions: ["query", "page"], rowLimit: 2000 });
  const week = await q({ startDate: daysAgo(9), endDate: daysAgo(2), rowLimit: 1 });
  return { rows, week: week[0] || null };
}

// ---------- PICK ----------
const words = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !["how", "the", "for", "and", "iphone", "with", "your"].includes(w));
function covered(query, all) {
  const qw = words(query);
  return all.some((p) => {
    const tw = new Set(words(p.meta.title + " " + p.meta.h1));
    return qw.length && qw.filter((w) => tw.has(w)).length / qw.length >= 0.75;
  });
}
function pick(all, rows) {
  const byQuery = new Map();
  for (const r of rows) {
    const [query, page] = r.keys;
    const cur = byQuery.get(query) || { query, impressions: 0, clicks: 0, position: 99, pages: [] };
    cur.impressions += r.impressions;
    cur.clicks += r.clicks;
    cur.position = Math.min(cur.position, r.position);
    cur.pages.push({ page, impressions: r.impressions });
    byQuery.set(query, cur);
  }
  const opps = [...byQuery.values()]
    .filter((o) => o.impressions >= 20 && o.position >= 8 && o.position <= 60 && o.clicks / o.impressions < 0.02 && !/hidy/i.test(o.query))
    .filter((o) => !covered(o.query, all))
    .sort((a, b) => b.impressions - a.impressions);
  if (opps.length) return { kind: "gsc", topic: opps[0].query, evidence: opps[0] };
  const backlog = read("docs/seo-backlog.md").split("\n");
  const i = backlog.findIndex((l) => l.startsWith("- [ ] ") && !/PROPOSE first/i.test(l));
  if (i < 0) return null;
  const m = backlog[i].slice(6).match(/^([a-z]+)\/([a-z0-9-]+)\s*(.*)$/);
  if (!m) return null;
  const hint = m[3].replace(/\(topic signal:[^)]*\)/, "").trim(); // competitor name stays out of the prompt
  return { kind: "backlog", line: i, section: m[1], slug: m[2], hint, topic: m[2].replace(/-/g, " ") };
}

// ---------- RESEARCH (optional, Perplexity Sonar) ----------
async function research(topic) {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) return { text: "", sources: [], note: "Perplexity: no key" };
  const r = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "sonar",
      max_tokens: 700,
      search_domain_filter: ["support.apple.com"],
      messages: [{ role: "user", content: `For an iPhone (iOS 18 and later) user: "${topic}". List the exact built-in iOS steps, setting names and limits that Apple Support documents. Facts only, short bullets, each with its support.apple.com page.` }],
    }),
  });
  if (!r.ok) return { text: "", sources: [], note: `Perplexity: HTTP ${r.status}` };
  const d = await r.json();
  const sources = (d.citations || d.search_results?.map((s) => s.url) || []).filter((u) => u.startsWith("https://support.apple.com/"));
  return { text: d.choices?.[0]?.message?.content || "", sources, note: `Perplexity: ${sources.length} Apple sources` };
}

// ---------- WRITE (DeepSeek) ----------
async function deepseek(messages, attempt = 1) {
  let r;
  try {
    r = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "deepseek-chat", temperature: 0.4, max_tokens: 8000, response_format: { type: "json_object" }, messages }),
      signal: AbortSignal.timeout(300000),
    });
  } catch (e) {
    // Network blips happen (seen: ECONNRESET during TLS). Retry twice with a pause.
    if (attempt < 3) return new Promise((ok) => setTimeout(ok, 15000 * attempt)).then(() => deepseek(messages, attempt + 1));
    throw e;
  }
  if (r.status >= 500 && attempt < 3) return new Promise((ok) => setTimeout(ok, 15000 * attempt)).then(() => deepseek(messages, attempt + 1));
  if (!r.ok) throw new Error(`DeepSeek HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return JSON.parse((await r.json()).choices[0].message.content);
}

function systemPrompt(all) {
  const example = read("content/guides/hide-vault-app-iphone.html");
  return `You write ONE page for hidyapp.com, the site of Hidy Vault (encrypted vault for iPhone).
Quality over volume: real substance, honest limits, no filler, plain US English, sentences under 25 words.

HARD RULES
- Hidy claims: ONLY from HIDY FACTS below. Never invent features (no Face ID unlock for Hidy, no break-in photos, no ratings, no audits, no App Store link).
- iOS claims: ONLY from APPLE FACTS or RESEARCH below, and cite the support.apple.com URL in "sources".
- Never mention or link the old Mac app. Never copy text from other sites.
- Internal links: only URLs from EXISTING PAGES. Use {{app}} once as the href where the reader would install Hidy.
- Title ≤ 60 chars (keyword first), description ≤ 155 chars, h1 contains the keyword.

OUTPUT: a JSON object {"section","slug","meta","body","link_from"}.
- section: one of guides|scenarios|compare|features. slug: lowercase-hyphen.
- meta: {"title","description","h1","lead","card","quick":[3 short HTML bullets],"faq":[[q,a] x3-5],"related":[4 existing URLs],"sources":[[label,url]],"order":30,"howto"?:{"name","totalTime":"PT5M","steps":[[name,text]]}} (howto only for step-by-step guides; "short" for features/compare).
- lead: answers the query directly in 1-2 sentences.
- body: 800-1400 words of HTML: <h2> question-led sections, <ol> for steps, <ul>, <p>, a short table if comparing, one honest "limits" section. No <h1>, no FAQ (meta.faq renders it), no CTA box (the template adds it).
- link_from: [{"url": existing page URL that best relates, "sentence": "one sentence of HTML containing <a href=\\"NEW_URL\\">keyword anchor</a>"}] x1-2.

EXAMPLE FILE (format reference only):
${example}

HIDY FACTS:
${read("docs/hidy-facts.md")}

APPLE FACTS:
${read("docs/apple-facts.md")}

EXISTING PAGES:
${all.map((p) => `${p.url} — ${p.meta.h1}`).join("\n")}`;
}

// ---------- GATE ----------
const FORBIDDEN = [/(unlock|open)s? (hidy|the vault|your vault|a vault) (with|using) (face|touch) id/i, /hidy (supports|uses|offers|has) (face|touch) id/i, /break-?in/i, /\b(independently )?audited\b/i, /\b\d(\.\d)? stars?\b/i, /apps\.apple\.com\/[^"]*hidy/i, /\bmac(os)? app\b/i, /\bblur\b/i];
async function gate(page, all) {
  const errs = [];
  const m = page.meta || {};
  if (!["guides", "scenarios", "compare", "features"].includes(page.section)) errs.push("bad section");
  if (!/^[a-z0-9-]{3,60}$/.test(page.slug || "")) errs.push("bad slug");
  if (all.some((p) => p.slug === page.slug)) errs.push("slug already exists");
  if (!m.title || m.title.length > 65) errs.push("title missing or > 65 chars");
  if (!m.description || m.description.length > 160) errs.push("description missing or > 160 chars");
  const text = (page.body || "").replace(/<[^>]+>/g, " ");
  const n = text.split(/\s+/).filter(Boolean).length;
  if (n < 650) errs.push(`body only ${n} words (need 800+)`);
  if (!page.body?.includes("{{app}}")) errs.push("body must contain {{app}} once");
  const all_text = JSON.stringify(m) + page.body;
  for (const re of FORBIDDEN) if (re.test(all_text)) errs.push(`forbidden claim pattern ${re}`);
  for (const [, u] of m.sources || []) {
    if (!/^https:\/\/(support\.apple\.com|apps\.apple\.com)\//.test(u)) errs.push(`source not Apple: ${u}`);
    else {
      const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" }).catch(() => null);
      if (!r || r.status !== 200) errs.push(`source not reachable: ${u}`);
    }
  }
  if (/support\.apple\.com|ios/i.test(text) && !(m.sources || []).length) errs.push("iOS claims need sources");
  return errs;
}

// ---------- REVIEW (second DeepSeek call as a fact-checker, like STE's reviewer gate) ----------
async function review(page) {
  const verdict = await deepseek([
    {
      role: "system",
      content: `You are a strict fact-checker for hidyapp.com. You get a draft page and the ONLY allowed facts.
Flag ONLY material claims: a statement that adds a NEW fact about iOS/Apple or Hidy Vault that the allowed facts do not contain — e.g. a UI path or button name not in the facts, what Apple does or does not encrypt, how a reset/recovery works, a number, price, limit, or a feature/behaviour.
Do NOT flag: paraphrases or reasonable restatements of an allowed fact, combinations of two allowed facts, general advice, opinions, or claims you consider supported. Never include an item you think is fine.
Return JSON {"unsupported":[{"quote":"exact words from the draft","why":"which new fact it adds"}]} — an empty list when clean.

HIDY FACTS:
${read("docs/hidy-facts.md")}

APPLE FACTS:
${read("docs/apple-facts.md")}

RESEARCH:
${run.research || "(none)"}`,
    },
    { role: "user", content: JSON.stringify({ meta: page.meta, body: page.body }) },
  ]);
  // Belt and braces: drop items the reviewer itself marked as fine.
  return (verdict.unsupported || []).filter((u) => u && u.quote && !/no issue|^supported|is supported|reasonable restatement|opinion|not a new fact|— omit/i.test(u.why || ""));
}

// Remove flagged claims mechanically: the <li>/<p> sentence that contains the quote, and any
// quick bullet or FAQ entry that contains it. Never adds text.
function cutClaims(page, bad) {
  const norm = (t) => t.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").toLowerCase();
  let body = page.body;
  for (const { quote } of bad) {
    const q = norm(quote).slice(0, 80);
    if (!q) continue;
    body = body.replace(/<li>[\s\S]*?<\/li>/g, (li) => (norm(li).includes(q) ? "" : li));
    body = body.replace(/<p>[\s\S]*?<\/p>/g, (para) => {
      if (!norm(para).includes(q)) return para;
      const kept = para.replace(/^<p>|<\/p>$/g, "").split(/(?<=[.!?])\s+/).filter((sent) => !norm(sent).includes(q.slice(0, 40)));
      return kept.length ? `<p>${kept.join(" ")}</p>` : "";
    });
    page.meta.quick = (page.meta.quick || []).filter((b) => !norm(b).includes(q));
    page.meta.faq = (page.meta.faq || []).filter(([fq, fa]) => !norm(fq + " " + fa).includes(q));
  }
  page.body = body.replace(/<ul>\s*<\/ul>|<ol>\s*<\/ol>/g, "");
  return page;
}

// ---------- MAIN ----------
const all = pages();
const measured = await gsc().catch((e) => ({ rows: [], note: `GSC error: ${e.message}` }));
run.gsc = { rows: measured.rows.length, week: measured.week, note: measured.note };
const choice = pick(all, measured.rows);
if (!choice) done("skipped", { reason: "backlog empty and no GSC opportunity" });
run.choice = choice;
const res = await research(choice.topic).catch((e) => ({ text: "", sources: [], note: `Perplexity error: ${e.message}` }));
run.notes.push(res.note);
run.research = res.text;

const user = `TOPIC: ${choice.topic}
${choice.kind === "backlog" ? `Use section "${choice.section}" and slug "${choice.slug}". Hint: ${choice.hint}` : `GSC query with ${choice.evidence.impressions} impressions, best position ${choice.evidence.position.toFixed(1)}, ${choice.evidence.clicks} clicks. Pages already showing for it: ${choice.evidence.pages.map((p) => p.page).join(", ")}. Put one of those in link_from.`}
RESEARCH (Perplexity, Apple-only):
${res.text || "(none — rely on APPLE FACTS; if the topic needs iOS facts not listed there, keep the iOS part general and short)"}
Research sources: ${res.sources.join(", ") || "none"}`;

const messages = [{ role: "system", content: systemPrompt(all) }, { role: "user", content: user }];
let page = await deepseek(messages);
let errs = await gate(page, all);
if (errs.length) {
  messages.push({ role: "assistant", content: JSON.stringify(page) }, { role: "user", content: `Fix these problems and return the full JSON again:\n- ${errs.join("\n- ")}` });
  page = await deepseek(messages);
  errs = await gate(page, all);
}
if (errs.length) done("rejected", { reason: errs });

// fact-check: up to two fix rounds, then reject rather than publish an unsupported claim
for (let round = 1; ; round++) {
  const bad = await review(page);
  run.notes.push(`review round ${round}: ${bad.length} unsupported`, ...bad.map((b) => `  - ${b.quote} | ${b.why}`.slice(0, 220)));
  if (!bad.length) break;
  if (round >= 3 && round <= 6) {
    // Last resort that can only shrink the page: cut each flagged sentence/item ourselves.
    page = cutClaims(page, bad);
    errs = await gate(page, all);
    if (errs.length) done("rejected", { reason: errs });
    continue;
  }
  if (round > 6) done("rejected", { reason: bad.map((b) => `unsupported: ${b.quote} (${b.why})`) });
  messages.push(
    { role: "assistant", content: JSON.stringify(page) },
    { role: "user", content: `A fact-checker found claims not supported by the allowed facts. Remove or reword ONLY these, so each says no more than HIDY FACTS / APPLE FACTS / RESEARCH support (it is fine to say less). Do NOT add any new sentences, steps, tips or claims anywhere else while fixing. Return the full JSON again.\n${bad.map((b) => `- "${b.quote}": ${b.why}`).join("\n")}` }
  );
  page = await deepseek(messages);
  errs = await gate(page, all);
  if (errs.length) done("rejected", { reason: errs });
}
delete run.research;

// write the page
const url = `/${page.section}/${page.slug}/`;
const meta = { ...page.meta, published: today, updated: today };
const file = rel("content", page.section, `${page.slug}.html`);
fs.writeFileSync(file, `---\n${JSON.stringify(meta, null, 1)}\n---\n${page.body.trim()}\n`);
const touched = [file];

// internal links from pages that already rank (video: "high traffic webpage → internal links")
for (const lf of (page.link_from || []).slice(0, 2)) {
  const src = all.find((p) => p.url === lf.url);
  if (!src || !lf.sentence?.includes(url)) continue;
  const raw = fs.readFileSync(src.file, "utf8");
  const [, fm, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const m = JSON.parse(fm);
  m.related = [...new Set([...(m.related || []), url])].slice(-6);
  m.updated = today;
  const idx = body.lastIndexOf("</p>");
  const newBody = idx > 0 ? body.slice(0, idx + 4) + `\n<p>${lf.sentence.replace(/^<p>|<\/p>$/g, "")}</p>` + body.slice(idx + 4) : body + `\n<p>${lf.sentence}</p>`;
  fs.writeFileSync(src.file, `---\n${JSON.stringify(m, null, 1)}\n---\n${newBody}`);
  touched.push(src.file);
}

// build check (generator fails on broken links / long titles) — revert on failure
try {
  execFileSync("node", ["scripts/build-content.mjs"], { cwd: ROOT, stdio: "pipe" });
} catch (e) {
  execFileSync("git", ["checkout", "--", "content"], { cwd: ROOT });
  fs.rmSync(file, { force: true });
  done("rejected", { reason: [`generator: ${String(e.stderr || e.message).slice(0, 400)}`] });
}

// mark backlog + site log
if (choice.kind === "backlog") {
  const b = read("docs/seo-backlog.md").split("\n");
  b[choice.line] = b[choice.line].replace("- [ ] ", `- [x] ${today} `);
  fs.writeFileSync(rel("docs/seo-backlog.md"), b.join("\n"));
}
fs.appendFileSync(
  rel("docs/SEO-LOG.md"),
  `| ${today} | ${choice.topic} | ${url} | ${measured.rows.length} GSC rows${choice.kind === "gsc" ? `; ${choice.evidence.impressions} impr` : ""} | ${(page.link_from || []).map((l) => l.url).join(", ")} | cloud loop (DeepSeek); ${res.note} |\n`
);
done("published", { url, title: meta.title, links_from: (page.link_from || []).map((l) => l.url), touched: touched.map((t) => path.relative(ROOT, t)) });
