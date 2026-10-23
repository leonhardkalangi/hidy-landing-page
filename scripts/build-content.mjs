// Static content generator for the Hidy Vault site.
//
// content/<section>/<slug>.html = a JSON front-matter block between two `---`
// lines, then the article body HTML. This script wraps every page in the shared
// layout (header, breadcrumbs, quick answer, CTAs, FAQ, related pages, sources,
// footer), writes the section hubs, sitemap.xml and llms.txt, and syncs the
// header/footer of the hand-written core pages. Runs before `vite build`.
//
// Body placeholders:
//   {{app}}  → tracked App Store link for this page (ct=web_g_<slug>)
//   {{cta}}  → mid-article CTA box

import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PUB = path.join(ROOT, "public");
const CONTENT = path.join(ROOT, "content");
const SITE = "https://hidyapp.com";
const AUTHOR = { "@type": "Organization", name: "Hidy", url: `${SITE}/` };
const PUBLISHER = { "@type": "Organization", name: "Hidy", url: `${SITE}/`, logo: { "@type": "ImageObject", url: `${SITE}/brand/hidy-icon.png` } };

const SECTIONS = {
  features: {
    crumb: "Features",
    title: "Hidy Vault features | Encrypted vault for iPhone",
    description: "Every Hidy Vault feature explained: pattern encryption, separate vaults, decoy vault, disguised icons, encrypted iCloud backup, sharing and more.",
    h1: "Everything Hidy Vault does, and how",
    lead: "Each feature has its own page: what it does, how it works, and where its limits are.",
  },
  compare: {
    crumb: "Compare",
    title: "Hidy Vault compared | Hidden album, vault apps and more",
    description: "Hidy Vault compared with the iPhone Hidden album, Notes lock, calculator vault apps and other photo vaults: what each one encrypts and what it doesn't.",
    h1: "How Hidy Vault compares",
    lead: "Honest comparisons with the built-in iPhone options and other vault apps. Where another option is better for you, we say so.",
  },
  scenarios: {
    crumb: "Scenarios",
    title: "Private photos on iPhone: real situations | Hidy Vault",
    description: "What to do when someone scrolls your camera roll, borrows your phone, shares your Apple Account or asks you to unlock. Practical setups for real situations.",
    h1: "Privacy for the moments that actually happen",
    lead: "Real situations where photos and documents on an iPhone get seen by the wrong person, and the setup that prevents each one.",
  },
  guides: {
    crumb: "Guides",
    title: "Hidy Vault guides | iPhone photo privacy, step by step",
    description: "Step-by-step guides to hiding and locking photos on iPhone, the Hidden album, backups, recovery and using Hidy Vault.",
    h1: "Guides",
    lead: "Step-by-step help for keeping photos, videos and documents private on iPhone.",
  },
  tools: {
    crumb: "Tools",
    title: "Free photo privacy tools that run in your browser | Hidy",
    description: "Free tools that run on your device: see and remove location and metadata from photos before you share them. No upload, no account.",
    h1: "Free tools that run on your device",
    lead: "Nothing you open here is uploaded. Each tool runs in your browser and works offline once the page has loaded.",
  },
};
const ORDER = ["features", "compare", "scenarios", "guides", "tools"];
// Cache-bust the stylesheet: Pages serves it with max-age=14400, so a changed vault.css
// would otherwise mix with fresh HTML for up to 4 hours.
const CSS_V = crypto.createHash("sha1").update(fs.readFileSync(path.join(PUB, "vault.css"))).digest("hex").slice(0, 8);
const CSS_HREF = `/vault.css?v=${CSS_V}`;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (s) => String(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const ctToken = (kind, slug) => `web_${kind}_${slug.replace(/-/g, "_")}`.slice(0, 40);
const goLink = (kind, slug, src) => `/go/app-store?ct=${ctToken(kind, slug)}&amp;src=${src}`;

function readPages() {
  const pages = [];
  for (const section of ORDER) {
    const dir = path.join(CONTENT, section);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".html")).sort()) {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!m) throw new Error(`${section}/${file}: missing front matter`);
      let meta;
      try {
        meta = JSON.parse(m[1]);
      } catch (e) {
        throw new Error(`${section}/${file}: bad front matter JSON: ${e.message}`);
      }
      const slug = file.replace(/\.html$/, "");
      for (const k of ["title", "description", "h1", "lead", "card", "updated"]) {
        if (!meta[k]) throw new Error(`${section}/${slug}: missing "${k}"`);
      }
      pages.push({ ...meta, section, slug, url: `/${section}/${slug}/`, body: m[2].trim() });
    }
  }
  return pages;
}

function header(src) {
  return `<header>
<div class="nav">
<a class="brand" href="/">
<img src="/brand/hidy-icon.webp" width="42" height="42" alt="">Hidy Vault</a>
<nav aria-label="Main navigation">
<a href="/features/">Features</a>
<a href="/#how-it-works">How it works</a>
<a href="/security/">Security</a>
<a href="/compare/">Compare</a>
<a href="/guides/">Guides</a>
<a href="/tools/">Tools</a>
</nav>
<button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch appearance">Appearance</button>
<a class="btn nav-cta" href="/go/app-store?ct=web_header_nav&amp;src=${src}">Get App</a>
</div>
</header>`;
}

function footer(pages, src) {
  const list = (section) =>
    pages
      .filter((p) => p.section === section)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.slug.localeCompare(b.slug))
      .map((p) => `<a href="${p.url}">${esc(p.short || p.h1)}</a>`)
      .join("\n");
  return `<footer>
<div class="foot-grid">
<div class="foot-brand">
<a class="brand" href="/"><img src="/brand/hidy-icon.webp" width="32" height="32" alt="">Hidy Vault</a>
<p>Encrypted vault for iPhone. No account, no analytics, no Hidy server.</p>
<a class="btn" href="/go/app-store?ct=web_footer&amp;src=${src}">Get Hidy Vault</a>
</div>
<div><h3>Features</h3>
${list("features")}
</div>
<div><h3>Compare</h3>
${list("compare")}
</div>
<div><h3>Resources</h3>
<a href="/guides/">Guides</a>
<a href="/scenarios/">Scenarios</a>
<a href="/tools/">Tools</a>
<a href="/security/">Security</a>
<a href="/support/">Support</a>
<a href="/privacy/">Privacy policy</a>
<a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">App Store EULA</a>
<a href="mailto:support@hidyapp.com">Contact</a>
</div>
</div>
<p class="foot-legal">© 2026 PT Mirai Kreasi Negeri</p>
</footer>`;
}

function head({ title, description, url, type = "article", jsonld, image }) {
  const img = image || `${SITE}/brand/hidy-icon.png`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${url}">
<link rel="icon" href="/favicon.png">
<link rel="apple-touch-icon" href="/brand/hidy-icon.png">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Hidy Vault">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}${url}">
<meta property="og:image" content="${img}">
<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<script src="/vault-theme.js"></script>
<link rel="stylesheet" href="${CSS_HREF}">
</head>`;
}

function cardImage(p, kind) {
  const rel = `/assets/cards/${p.section}-${p.slug}-${kind}.jpg`;
  return fs.existsSync(path.join(PUB, rel)) ? rel : null;
}

function renderPage(p, pages) {
  const sec = SECTIONS[p.section];
  const byUrl = Object.fromEntries(pages.map((x) => [x.url, x]));
  const og = cardImage(p, "og");
  const pin = cardImage(p, "pin");

  const midCta = `<div class="note cta-box">
<strong>${esc(p.ctaTitle || "Want photos your iPhone passcode can't open?")}</strong>
<p>${p.ctaText || "Hidy Vault keeps photos, videos and documents in encrypted vaults that open only with a pattern you draw. No account, no Hidy server. Free for 3 vaults."}</p>
<p><a class="btn" href="${goLink("g", p.slug, p.url)}">Get Hidy Vault</a></p>
</div>`;
  let body = p.body.replaceAll("{{app}}", goLink("g", p.slug, p.url)).replace("{{cta}}", midCta);
  if (!p.body.includes("{{cta}}") && p.section !== "tools") {
    // Default placement: before the second H2, where readers have the answer and are deciding.
    const idx = [...body.matchAll(/<h2/g)].map((m) => m.index);
    body = idx.length > 2 ? body.slice(0, idx[2]) + midCta + "\n" + body.slice(idx[2]) : body + "\n" + midCta;
  }

  const quick = p.quick?.length
    ? `<div class="note quick">
<strong>${esc(p.quickTitle || "Quick answer")}</strong>
<ul>
${p.quick.map((q) => `<li>${q}</li>`).join("\n")}
</ul>
</div>`
    : "";

  const faq = p.faq?.length
    ? `<h2>Frequently asked questions</h2>
${p.faq.map(([q, a]) => `<h3>${esc(q)}</h3>\n<p>${a}</p>`).join("\n")}`
    : "";

  const related = (p.related || [])
    .map((u) => byUrl[u])
    .filter(Boolean)
    .map((r) => `<a class="guide" href="${r.url}"><h3>${esc(r.h1)}</h3><p>${esc(r.card)}</p><span>Read more →</span></a>`)
    .join("\n");

  const sources = p.sources?.length
    ? `<h2>Sources</h2>
<ul class="sources">
${p.sources.map(([label, href]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`).join("\n")}
</ul>`
    : "";

  const pinBlock = pin
    ? `<figure class="pin-card"><figcaption>Save this ${p.section === "guides" ? "guide" : "page"}</figcaption><img src="${pin}" width="500" height="750" loading="lazy" alt="${esc(p.h1)}: summary card"></figure>`
    : "";

  const graph = [
    {
      "@type": p.section === "tools" ? "WebApplication" : "Article",
      ...(p.section === "tools"
        ? { name: p.h1, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, url: `${SITE}${p.url}` }
        : { headline: p.h1, description: p.description, datePublished: p.published || p.updated, dateModified: p.updated, author: AUTHOR, publisher: PUBLISHER, mainEntityOfPage: `${SITE}${p.url}`, image: og ? `${SITE}${og}` : `${SITE}/brand/hidy-icon.png` }),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Hidy Vault", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: sec.crumb, item: `${SITE}/${p.section}/` },
        { "@type": "ListItem", position: 3, name: strip(p.h1), item: `${SITE}${p.url}` },
      ],
    },
  ];
  if (p.howto) {
    graph.push({
      "@type": "HowTo",
      name: p.howto.name,
      totalTime: p.howto.totalTime || "PT5M",
      step: p.howto.steps.map(([name, text], i) => ({ "@type": "HowToStep", position: i + 1, name, text })),
    });
  }
  if (p.faq?.length) {
    graph.push({ "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: strip(a) } })) });
  }

  const date = new Date(p.updated + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const scripts = (p.scripts || []).map((s) => `<script src="${s}" defer></script>`).join("\n");

  return `${head({ title: p.title, description: p.description, url: p.url, jsonld: { "@context": "https://schema.org", "@graph": graph }, image: og ? `${SITE}${og}` : null })}
<body>
<a class="skip" href="#main">Skip to content</a>
${header(p.url)}
<main id="main">
<article class="article${p.section === "tools" ? " tool" : ""}">
<nav class="crumb" aria-label="Breadcrumb"><a href="/">Hidy Vault</a> <span>›</span> <a href="/${p.section}/">${sec.crumb}</a></nav>
<h1>${p.h1}</h1>
<p class="meta">Updated ${date} · By Hidy</p>
<p class="lead">${p.lead}</p>
${quick}
${body}
${faq}
${pinBlock}
${related ? `<h2>Related pages</h2>\n<div class="guide-grid related">\n${related}\n</div>` : ""}
${sources}
<aside class="app-banner">
<img src="/brand/hidy-icon.webp" width="56" height="56" alt="">
<div><strong>Hidy Vault</strong><span>Encrypted vault for iPhone. Free to start. Coming to the App Store.</span></div>
<a class="btn" href="${goLink("gb", p.slug, p.url)}">Get Hidy Vault</a>
</aside>
</article>
</main>
${footer(pages, p.url)}
${scripts}
</body>
</html>
`;
}

function renderHub(section, pages) {
  const sec = SECTIONS[section];
  const url = `/${section}/`;
  const list = pages
    .filter((p) => p.section === section)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.slug.localeCompare(b.slug));
  const cards = list.map((p) => `<a class="guide" href="${p.url}">\n<h3>${esc(p.h1)}</h3>\n<p>${esc(p.card)}</p>\n<span>Read more →</span>\n</a>`).join("\n");
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: sec.h1, url: `${SITE}${url}`, description: sec.description },
      { "@type": "ItemList", itemListElement: list.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}${p.url}`, name: strip(p.h1) })) },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hidy Vault", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: sec.crumb, item: `${SITE}${url}` },
        ],
      },
    ],
  };
  return `${head({ title: sec.title, description: sec.description, url, type: "website", jsonld })}
<body>
<a class="skip" href="#main">Skip to content</a>
${header(url)}
<main id="main">
<section class="hub">
<nav class="crumb" aria-label="Breadcrumb"><a href="/">Hidy Vault</a></nav>
<h1>${esc(sec.h1)}</h1>
<p class="lead">${esc(sec.lead)}</p>
<div class="guide-grid">
${cards}
</div>
</section>
</main>
${footer(pages, url)}
</body>
</html>
`;
}

// Core pages that are written by hand but share the header/footer.
const CORE = [
  { file: "index.html", url: "/" },
  { file: "public/security/index.html", url: "/security/" },
  { file: "public/support/index.html", url: "/support/" },
  { file: "public/privacy/index.html", url: "/privacy/" },
];

function syncCore(pages) {
  for (const c of CORE) {
    const f = path.join(ROOT, c.file);
    let s = fs.readFileSync(f, "utf8");
    s = s.replace(/<header>[\s\S]*?<\/header>/, header(c.url)).replace(/<footer>[\s\S]*?<\/footer>/, footer(pages, c.url));
    s = s.replace(/href="\/vault\.css(\?v=[a-f0-9]+)?"/g, `href="${CSS_HREF}"`);
    fs.writeFileSync(f, s);
  }
}

function metaOf(file) {
  const s = fs.readFileSync(path.join(ROOT, file), "utf8");
  return {
    title: s.match(/<title>(.*?)<\/title>/)[1],
    description: s.match(/<meta name="description" content="([^"]*)"/)[1],
  };
}

function writeSitemapAndLlms(pages, today) {
  const urls = [...CORE.map((c) => c.url), ...ORDER.map((s) => `/${s}/`), ...pages.map((p) => p.url)];
  const lastmod = Object.fromEntries(pages.map((p) => [p.url, p.updated]));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${lastmod[u] || today}</lastmod></url>`).join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(PUB, "sitemap.xml"), xml);

  const lines = [
    "# Hidy Vault",
    "",
    "> Hidy Vault is an encrypted vault for iPhone (iOS 16+). Photos, videos, documents and notes are encrypted on the device with AES-256-GCM and opened by a pattern you draw. Each pattern opens its own vault. No account and no Hidy server. Free plan: 3 vaults, 100 photos and 10 videos each. Publisher: PT Mirai Kreasi Negeri.",
    "",
    "## Core pages",
    "",
    ...CORE.map((c) => {
      const m = metaOf(c.file);
      return `- [${m.title}](${SITE}${c.url}): ${m.description}`;
    }),
  ];
  for (const s of ORDER) {
    lines.push("", `## ${SECTIONS[s].crumb}`, "", `- [${SECTIONS[s].h1}](${SITE}/${s}/): ${SECTIONS[s].description}`);
    for (const p of pages.filter((x) => x.section === s)) lines.push(`- [${strip(p.h1)}](${SITE}${p.url}): ${p.description}`);
  }
  fs.writeFileSync(path.join(PUB, "llms.txt"), lines.join("\n") + "\n");
}

function check(pages) {
  const known = new Set([...CORE.map((c) => c.url), ...ORDER.map((s) => `/${s}/`), ...pages.map((p) => p.url)]);
  const problems = [];
  const titles = new Map();
  for (const p of pages) {
    if (p.title.length > 65) problems.push(`${p.url}: title ${p.title.length} chars`);
    if (p.description.length > 160) problems.push(`${p.url}: description ${p.description.length} chars`);
    if (titles.has(p.title)) problems.push(`${p.url}: duplicate title with ${titles.get(p.title)}`);
    titles.set(p.title, p.url);
    for (const u of p.related || []) if (!known.has(u)) problems.push(`${p.url}: related ${u} does not exist`);
    for (const [, href] of p.body.matchAll(/href="(\/[^"#?]*)"/g)) {
      if (!known.has(href) && !fs.existsSync(path.join(PUB, href))) problems.push(`${p.url}: link ${href} does not exist`);
    }
  }
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
}

const pages = readPages();
check(pages);
for (const p of pages) {
  const dir = path.join(PUB, p.section, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderPage(p, pages));
}
for (const s of ORDER) {
  fs.mkdirSync(path.join(PUB, s), { recursive: true });
  fs.writeFileSync(path.join(PUB, s, "index.html"), renderHub(s, pages));
}
syncCore(pages);
writeSitemapAndLlms(pages, new Date().toISOString().slice(0, 10));
console.log(`content: ${pages.length} pages, ${ORDER.length} hubs`);
