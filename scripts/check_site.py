from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.anchors = []
        self.assets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("href", "").startswith("#"):
            self.anchors.append(unquote(attrs["href"][1:]))
        attribute = "href" if tag == "link" else "src"
        if tag in {"link", "script", "img"} and attrs.get(attribute):
            self.assets.append(attrs[attribute])


def check_asset(reference, page):
    url = urlsplit(reference)
    if url.scheme or url.netloc or not url.path:
        return
    path = unquote(url.path)
    target = ROOT / path.lstrip("/") if path.startswith("/") else page.parent / path
    assert target.is_file(), f"{page.relative_to(ROOT)}: missing asset {reference}"


pages = 0
for directory, directories, files in ROOT.walk():
    directories[:] = [name for name in directories if not name.startswith(".")]
    for name in files:
        if not name.endswith(".html"):
            continue
        page = directory / name
        parsed = References()
        parsed.feed(page.read_text(encoding="utf-8"))
        for anchor in parsed.anchors:
            assert not anchor or anchor in parsed.ids, f"{page.relative_to(ROOT)}: missing #{anchor}"
        for asset in parsed.assets:
            check_asset(asset, page)
        pages += 1

manifest = json.loads((ROOT / "manifest.json").read_text())
for icon in manifest["icons"]:
    check_asset(icon["src"], ROOT / "index.html")
assert pages > 0
print(f"Checked local resources and anchors in {pages} HTML pages and the manifest icons.")
