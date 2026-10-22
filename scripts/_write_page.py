# Helper used while authoring: write(section, slug, meta, body) -> content/<section>/<slug>.html
import json, os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "content")
def write(section, slug, meta, body):
    meta.setdefault("published", "2026-10-22"); meta.setdefault("updated", "2026-10-22")
    os.makedirs(os.path.join(ROOT, section), exist_ok=True)
    with open(os.path.join(ROOT, section, slug + ".html"), "w") as f:
        f.write("---\n" + json.dumps(meta, indent=1, ensure_ascii=False) + "\n---\n" + body.strip() + "\n")
