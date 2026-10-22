# Renders a social card (1200x630, "og") and a save card (1000x1500, "pin") for
# every content page with headless Chrome, into public/assets/cards/.
# build-content.mjs picks them up automatically. Run after adding pages:
#   python3 scripts/cards.py            (only missing cards)
#   python3 scripts/cards.py --force    (re-render all)
import glob, html, json, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "assets", "cards")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ICON = "file://" + os.path.join(ROOT, "public", "brand", "hidy-icon.png")
LABEL = {"features": "Feature", "compare": "Comparison", "scenarios": "Scenario", "guides": "Guide", "tools": "Free tool"}

BASE = """<!doctype html><meta charset=utf-8><style>
*{box-sizing:border-box;margin:0}
body{width:%(w)dpx;height:%(h)dpx;font-family:-apple-system,'SF Pro Display',Inter,Helvetica,Arial,sans-serif;
background:linear-gradient(150deg,#eaf1ff 0%%,#f7f9fd 55%%,#e9e4ff 100%%);color:#15213c;padding:%(pad)dpx;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:18px;font-weight:750;font-size:%(brand)dpx}
.top img{width:%(icon)dpx;height:%(icon)dpx;border-radius:22%%}
.label{margin-top:auto;font-size:%(label)dpx;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#2462cf}
h1{font-size:%(h1)dpx;line-height:1.08;letter-spacing:-.035em;margin-top:18px;font-weight:800}
ul{list-style:none;padding:0;margin-top:48px;display:flex;flex-direction:column;gap:22px}
li{background:#fff;border:1px solid #dce3f0;border-radius:24px;padding:26px 30px;font-size:30px;line-height:1.4;color:#33415e}
li b,li strong{color:#15213c}
.foot{margin-top:auto;padding-top:36px;font-size:%(foot)dpx;color:#53627c;font-weight:600}
</style>
<div class=top><img src="%(iconsrc)s">Hidy Vault</div>
%(body)s"""


def strip(s):
    return re.sub(r"<(?!/?(b|strong)\b)[^>]+>", "", s)


def render(path, w, h, doc):
    png = path[:-4] + ".png"
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(doc)
        src = f.name
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--window-size={w},{h}",
                    "--force-device-scale-factor=1", "--user-data-dir=" + tempfile.mkdtemp(), f"--screenshot={png}", "file://" + src],
                   capture_output=True, timeout=60)
    os.unlink(src)
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "82", png, "--out", path], capture_output=True)
    os.unlink(png)


def main():
    force = "--force" in sys.argv
    os.makedirs(OUT, exist_ok=True)
    for f in sorted(glob.glob(os.path.join(ROOT, "content", "*", "*.html"))):
        section = os.path.basename(os.path.dirname(f))
        slug = os.path.basename(f)[:-5]
        meta = json.loads(open(f).read().split("\n---\n", 1)[0][4:])
        h1 = html.escape(re.sub(r"<[^>]+>", "", meta["h1"]))
        og = os.path.join(OUT, f"{section}-{slug}-og.jpg")
        pin = os.path.join(OUT, f"{section}-{slug}-pin.jpg")
        if force or not os.path.exists(og):
            body = f'<div class=label>{LABEL[section]}</div><h1>{h1}</h1><div class=foot>hidyapp.com · Encrypted vault for iPhone</div>'
            render(og, 1200, 630, BASE % dict(w=1200, h=630, pad=64, brand=30, icon=64, label=22, h1=64 if len(h1) < 60 else 54, foot=22, iconsrc=ICON, body=body))
        if (force or not os.path.exists(pin)) and meta.get("quick"):
            items = "".join(f"<li>{strip(q)}</li>" for q in meta["quick"][:3])
            body = f'<div class=label style="margin-top:72px">{LABEL[section]}</div><h1>{h1}</h1><ul>{items}</ul><div class=foot>hidyapp.com{html.escape("/" + section + "/" + slug + "/")}</div>'
            render(pin, 1000, 1500, BASE % dict(w=1000, h=1500, pad=72, brand=34, icon=72, label=24, h1=72 if len(h1) < 50 else 62, foot=24, iconsrc=ICON, body=body))
        print(section, slug)


main()
