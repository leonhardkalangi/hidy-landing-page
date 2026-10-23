// Daily hacker loop for one repo (copied into each product repo as .github/ops/security.mjs and
// run by .github/workflows/security-daily.yml). It only reports NEW findings: everything known
// on the day it was set up lives in .github/ops/security-baseline.json, so you get no daily noise.
//
// Checks: 1) secrets committed in the last 2 days (gitleaks report), 2) Supabase security lints
// (splinter, run by a read-only `ops_auditor` role with no table access), 3) the live site's
// security headers. New findings → one GitHub issue each (label security-loop) + one email.
//
// Usage: node .github/ops/security.mjs <gitleaks.json> <splinter.tsv|-> <site-url>
//        add --baseline to write the current findings as the new baseline instead of reporting.

import fs from "node:fs";

// Resend with one retry; logs the result so a missing email is visible in the run log.
async function sendMail(subject, text) {
  if (!process.env.RESEND_API_KEY) return console.log("email skipped: no RESEND_API_KEY");
  for (let i = 0; i < 2; i++) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "Ops Guard <ops@miraihub.co>", to: ["leonhardkalangi@gmail.com"], subject, text }),
    });
    console.log(`email: HTTP ${r.status} ${(await r.text()).slice(0, 200)}`);
    if (r.ok) return;
    await new Promise((ok) => setTimeout(ok, 5000));
  }
}

const [gitleaksFile, splinterFile, site] = process.argv.slice(2);
const BASELINE = ".github/ops/security-baseline.json";
const REPO = process.env.GITHUB_REPOSITORY;
const findings = [];

// 1) leaked secrets. gitleaks writes the raw match to the runner's disk only; this script never
// prints it. Public-by-design values are dropped: Supabase anon JWTs (role "anon", shipped in every
// frontend), IndexNow keys (served publicly at /<key>.txt), and test files.
const isPublic = (l) => {
  if (/(^|\/)(test|tests|e2e|test-integration)\/|\.test\.[jt]sx?$|\.spec\.[jt]sx?$/.test(l.File)) return true;
  if (/INDEXNOW|STORAGE_KEY|MILESTONE_KEY/.test(l.Match || "")) return true;
  const jwt = (l.Secret || l.Match || "").match(/eyJ[\w-]+\.(eyJ[\w-]+)\.[\w-]+/);
  if (jwt) {
    try {
      return JSON.parse(Buffer.from(jwt[1], "base64url").toString()).role === "anon";
    } catch {}
  }
  return false;
};
for (const l of fs.existsSync(gitleaksFile) ? JSON.parse(fs.readFileSync(gitleaksFile, "utf8") || "[]") : []) {
  if (isPublic(l)) continue;
  findings.push({ key: `secret:${l.RuleID}:${l.File}:${l.Commit?.slice(0, 12)}`, severity: "critical", title: `Secret committed: ${l.RuleID} in ${l.File}`, detail: `Commit ${l.Commit} line ${l.StartLine}. Rotate this credential first, then remove it from the repo.` });
}

// 2) Supabase security lints (WARN/ERROR in the SECURITY category)
if (splinterFile && splinterFile !== "-" && fs.existsSync(splinterFile)) {
  for (const line of fs.readFileSync(splinterFile, "utf8").split("\n")) {
    const c = line.split("\t");
    if (c.length < 10 || !c[4].includes("SECURITY") || !["WARN", "ERROR"].includes(c[2])) continue;
    findings.push({ key: `db:${c[9]}`, severity: c[2] === "ERROR" ? "high" : "medium", title: `Database: ${c[1]}`, detail: `${c[6].replace(/\\`/g, "`")}\n${c[7]}` });
  }
}

// 3) live security headers
if (site) {
  const r = await fetch(site, { headers: { "User-Agent": "Mozilla/5.0 (security loop)", Accept: "text/html" } });
  const h = (n) => r.headers.get(n) || "";
  if (!/max-age=\d{6,}/.test(h("strict-transport-security"))) findings.push({ key: "hdr:hsts", severity: "medium", title: "Header missing: Strict-Transport-Security", detail: `${site} sends no HSTS header with a long max-age.` });
  if (h("x-content-type-options").toLowerCase() !== "nosniff") findings.push({ key: "hdr:nosniff", severity: "low", title: "Header missing: X-Content-Type-Options: nosniff", detail: site });
  if (!h("x-frame-options") && !/frame-ancestors/.test(h("content-security-policy"))) findings.push({ key: "hdr:framing", severity: "low", title: "No clickjacking protection (X-Frame-Options / CSP frame-ancestors)", detail: site });
}

// --baseline records today's database/header findings as known. Committed secrets are never
// baselined: on the setup run (full history) every one of them is reported.
if (process.argv.includes("--baseline")) {
  const keys = [...new Set(findings.filter((f) => !f.key.startsWith("secret:")).map((f) => f.key))].sort();
  fs.writeFileSync(BASELINE, JSON.stringify({ note: "Known findings on setup day; only findings NOT listed here are reported. Secrets are never listed.", date: new Date().toISOString().slice(0, 10), keys }, null, 1) + "\n");
  console.log(`baseline written: ${keys.length} known findings`);
}
const baseline = new Set(fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, "utf8")).keys : []);

const fresh = findings.filter((f) => !baseline.has(f.key));
console.log(`${findings.length} findings, ${fresh.length} new`);
if (!fresh.length) process.exit(0);

// Public repos (Hidy): never open issues, since anyone could read them; email the details instead.
if (process.env.PUBLIC_REPO === "1") {
  await sendMail(`SECURITY: ${fresh.length} new finding(s) in ${REPO.split("/")[1]}`, fresh.map((f) => `- [${f.severity}] ${f.title}\n  ${f.detail}`).join("\n\n") + "\n\nPublic repo, so no GitHub issue was opened.");
  process.exit(0);
}

// One issue per new finding, deduplicated by title among open security-loop issues.
const gh = (path, init = {}) => fetch(`https://api.github.com/repos/${REPO}${path}`, { ...init, headers: { Authorization: `Bearer ${process.env.GH_TOKEN}`, Accept: "application/vnd.github+json", ...init.headers } }).then((r) => r.json());
const open = await gh("/issues?labels=security-loop&state=open&per_page=100");
const titles = new Set((Array.isArray(open) ? open : []).map((i) => i.title));
const created = [];
for (const f of fresh) {
  const title = `[security] ${f.title}`.slice(0, 250);
  if (titles.has(title)) continue;
  const i = await gh("/issues", { method: "POST", body: JSON.stringify({ title, labels: ["security-loop", f.severity], body: `${f.detail}\n\nSeverity: **${f.severity}** · key \`${f.key}\`\n\nFound by the daily security loop. Close this issue once fixed, or add the key to .github/ops/security-baseline.json if it is accepted.` }) });
  created.push(`- [${f.severity}] ${f.title} ${i.html_url || ""}`);
}
if (created.length) {
  const critical = fresh.some((f) => f.severity === "critical");
  await sendMail(`${critical ? "CRITICAL" : "SECURITY"}: ${created.length} new finding(s) in ${REPO.split("/")[1]}`, `${created.join("\n")}\n\nNothing was changed automatically: these need a code or database decision.`);
}
