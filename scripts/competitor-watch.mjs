// Competitor topic watch. Reads competitors' PUBLIC sitemaps and turns the slugs of their guide /
// blog / compare pages into topic ideas for docs/seo-backlog.md. Topic signal only: it never
// downloads their articles, and the writer never sees their text or URLs (Hidy pages are written
// from docs/hidy-facts.md). New pages since the last run go to the TOP of the backlog (freshly
// targeted keywords); the first run seeds the rest into a pool section at the bottom.
//
// State: docs/competitor-topics.json { seen: { url: firstSeenDate } }.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const rel = (...p) => path.join(ROOT, ...p);
const today = new Date().toISOString().slice(0, 10);

const COMPETITORS = [
  { name: "Vaultaire", sitemap: "https://vaultaire.app/sitemap.xml", content: /^https:\/\/vaultaire\.app\/(guides|scenarios)\/[^/]+\/$/ },
  { name: "Keepsafe", sitemap: "https://www.getkeepsafe.com/sitemap.xml", content: /^https:\/\/www\.getkeepsafe\.com\/blog\/[^/]+\/?$/ },
  { name: "Private Photo Vault", sitemap: "https://privatephotovault.com/sitemap.xml", content: /^https:\/\/privatephotovault\.com\/(blog|compare|guides?|articles?)\/[^/]+\/?$/ },
  { name: "Encamera", sitemap: "https://www.encamera.app/sitemap.xml", content: /^https:\/\/www\.encamera\.app\/blog\/[^/]+\/?$/ },
];

const RELEVANT = /(photo|picture|video|hide|hidden|lock|vault|privat|secret|album|encrypt|iphone|ios|icloud|backup|pattern|decoy|duress|metadata|exif|location|screenshot|camera|document|passport|\bid\b|password|passcode|face-id|delete|share|sharing|calculator|app-icon|disguise|snoop|partner|border|repair|sell|trade-in|stolen|lost)/;
const OFF_TOPIC = /(android|samsung|windows|chromebook|galaxy|pixel|valentine|v-day|giveaway|press|careers|pricing|terms|privacy-policy|about|contact|download|login|signup|review$|acquire|presenting|introduc|announc|launch|lineup|why-we|we-built|season|holiday|^our-|-we-|team|update|version|release)/;
const BRANDS = /(vaultaire|keepsafe|private-photo-vault|privatephotovault|encamera|pic-safe)/g;

async function get(url) {
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (HidySEO topic watch)" }, signal: AbortSignal.timeout(30000) });
    return r.ok ? await r.text() : "";
  } catch {
    return "";
  }
}
async function locs(url, depth = 0) {
  const xml = await get(url);
  const list = [...xml.matchAll(/<loc>\s*([^<\s]+)/g)].map((m) => m[1]);
  if (xml.includes("<sitemapindex") && depth < 2) {
    const nested = [];
    for (const sm of list.slice(0, 30)) nested.push(...(await locs(sm, depth + 1)));
    return nested;
  }
  return list;
}

function topicOf(url) {
  const slug = url.replace(/\/$/, "").split("/").pop().toLowerCase().replace(/\.html?$/, "");
  const vs = slug.match(/^(?:vaultaire|keepsafe|private-photo-vault)-vs-(.+)$/);
  if (vs) return { section: "compare", slug: `hidy-vs-${vs[1]}`.slice(0, 60) };
  const section = /\/scenarios\//.test(url) ? "scenarios" : /\/compare\//.test(url) ? "compare" : "guides";
  const clean = slug.replace(BRANDS, "").replace(/-?(20\d\d|guide|complete|step-by-step|tested)-?/g, "-").replace(/--+/g, "-").replace(/^-|-$/g, "");
  // Cut long blog slugs at a word boundary (max 60 chars) so topics stay readable.
  const cut = clean.length > 60 ? clean.slice(0, 60).replace(/-[^-]*$/, "") : clean;
  return { section, slug: cut };
}

const words = (s) => new Set(s.split(/[-\s]+/).filter((w) => w.length > 2 && !["how", "the", "and", "for", "iphone", "your", "with", "what", "you"].includes(w)));
function similar(a, b) {
  const A = words(a), B = words(b);
  if (!A.size || !B.size) return false;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / Math.min(A.size, B.size) >= 0.6;
}

const statePath = rel("docs/competitor-topics.json");
const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, "utf8")) : { seen: {} };
const firstRun = Object.keys(state.seen).length === 0;

const existing = [];
for (const s of ["features", "compare", "scenarios", "guides", "tools"]) {
  for (const f of fs.readdirSync(rel("content", s))) if (f.endsWith(".html")) existing.push(f.slice(0, -5));
}
const backlogPath = rel("docs/seo-backlog.md");
let backlog = fs.readFileSync(backlogPath, "utf8").split("\n");
const inBacklog = () => backlog.map((l) => l.match(/^- \[[ x]\] (?:\S+ )?([a-z]+)\/([a-z0-9-]+)/)).filter(Boolean).map((m) => m[2]);

const fresh = [], pool = [];
const summary = [];
for (const c of COMPETITORS) {
  const urls = (await locs(c.sitemap)).filter((u) => c.content.test(u));
  let added = 0;
  for (const u of urls) {
    if (state.seen[u]) continue;
    state.seen[u] = today;
    const t = topicOf(u);
    if (!t.slug || !RELEVANT.test(t.slug) || OFF_TOPIC.test(t.slug)) continue;
    // Comparisons need the rival's own App Store facts, which the writer doesn't have: skip for now.
    if (t.section === "compare") continue;
    const taken = [...existing, ...inBacklog(), ...fresh.map((x) => x.slug), ...pool.map((x) => x.slug)];
    if (taken.some((s) => s === t.slug || similar(s, t.slug))) continue;
    (firstRun ? pool : fresh).push({ ...t, from: c.name });
    added++;
  }
  summary.push(`${c.name}: ${urls.length} pages, ${added} new topics`);
}

const line = (t) => `- [ ] ${t.section}/${t.slug} (topic signal: ${t.from})`;
if (fresh.length) {
  const firstOpen = backlog.findIndex((l) => l.startsWith("- [ ] "));
  backlog.splice(firstOpen < 0 ? backlog.length : firstOpen, 0, ...fresh.map(line));
}
if (pool.length) {
  if (!backlog.some((l) => l.startsWith("## Competitor topic pool"))) backlog.push("", "## Competitor topic pool (seeded once; ideas only, write from Hidy facts)");
  backlog.push(...pool.map(line));
}
fs.writeFileSync(backlogPath, backlog.join("\n").replace(/\n*$/, "\n"));
fs.writeFileSync(statePath, JSON.stringify(state, null, 1) + "\n");
console.log([...summary, `fresh → top of backlog: ${fresh.length}`, `seeded into pool: ${pool.length}`].join("\n"));
