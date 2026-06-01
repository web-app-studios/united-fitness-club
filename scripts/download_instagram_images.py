"""Download images from Instagram post URLs in the Apify scraper JSON export."""

from __future__ import annotations

import json
import re
import sys
import time
import urllib.request
from pathlib import Path

import instaloader
from instaloader import Post

SHORTCODE_RE = re.compile(r"instagram\.com/p/([^/?#]+)")


def shortcode_from_url(url: str) -> str | None:
    m = SHORTCODE_RE.search(url)
    return m.group(1) if m else None


def download_url(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        dest.write_bytes(resp.read())


def save_post_media(L: instaloader.Instaloader, post_url: str, out_dir: Path, index: int) -> int:
    shortcode = shortcode_from_url(post_url)
    if not shortcode:
        print(f"  skip (bad url): {post_url}")
        return 0

    try:
        post = Post.from_shortcode(L.context, shortcode)
    except Exception as exc:
        print(f"  skip {shortcode}: {exc}")
        return 0

    saved = 0
    prefix = f"{index:02d}-{shortcode}"

    if post.typename == "GraphSidecar":
        for i, node in enumerate(post.get_sidecar_nodes(), start=1):
            url = node.display_url
            if not url:
                continue
            dest = out_dir / f"{prefix}-{i}.jpg"
            if dest.exists():
                print(f"  exists {dest.name}")
                saved += 1
                continue
            download_url(url, dest)
            print(f"  saved {dest.name}")
            saved += 1
    else:
        node = post._node
        url = node.get("display_url") or node.get("thumbnail_src") or post.url
        dest = out_dir / f"{prefix}.jpg"
        if dest.exists():
            print(f"  exists {dest.name}")
            return 1
        download_url(url, dest)
        print(f"  saved {dest.name}")
        saved = 1

    return saved


def main() -> int:
    if len(sys.argv) < 3:
        print("Usage: python download_instagram_images.py <dataset.json> <output_dir>")
        return 1

    json_path = Path(sys.argv[1]).expanduser().resolve()
    out_dir = Path(sys.argv[2]).expanduser().resolve()
    out_dir.mkdir(parents=True, exist_ok=True)

    posts = json.loads(json_path.read_text(encoding="utf-8"))
    urls = [p["url"] for p in posts if p.get("url")]

    L = instaloader.Instaloader(
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
    )

    total = 0
    for i, url in enumerate(urls, start=1):
        print(f"[{i}/{len(urls)}] {url}")
        total += save_post_media(L, url, out_dir, i)
        time.sleep(1.5)

    print(f"\nDone. {total} file(s) in {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
