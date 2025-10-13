#!/usr/bin/env python3
"""
cards_to_table.py — Read Markdown 'card' files with YAML front matter and output a copy‑pastable table.

Usage:
  python cards_to_table.py /path/to/folder --out cards.tsv --sep tab
  python cards_to_table.py . --out cards.csv --sep comma

Notes:
- The script looks for *.md files and parses the YAML block between the first two '---' lines.
- It writes a table where columns are the union of all keys across files.
- Default output is TSV (tab‑separated), which pastes cleanly into Google Sheets/Excel.
"""

import argparse
import glob
import os
import sys
from typing import Dict, Any, List
try:
    import yaml  # PyYAML
except Exception as e:
    print("PyYAML is required. Install with: pip install pyyaml", file=sys.stderr)
    raise

import pandas as pd

PREFERRED_COLS = [
    "name","number","release_date","country","language","region",
    "set_name","series","rarity","subset","promo","first_edition",
    "holographic","missing","notes","_file"
]

def parse_front_matter(md_text: str) -> Dict[str, Any]:
    md_text = md_text.strip()
    if not md_text.startswith('---'):
        return {}
    parts = md_text.split('---', 2)
    if len(parts) < 3:
        return {}
    fm_text = parts[1]
    try:
        data = yaml.safe_load(fm_text) or {}
        return data if isinstance(data, dict) else {}
    except Exception as e:
        return {"_parse_error": str(e)}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("folder", help="Folder containing .md card files")
    ap.add_argument("--out", default="cards.tsv", help="Output file path (default: cards.tsv)")
    ap.add_argument("--sep", choices=["tab","comma"], default="tab", help="Separator: tab or comma (default: tab)")
    ap.add_argument("--pattern", default="*.md", help="Glob pattern to match files (default: *.md)")
    args = ap.parse_args()

    folder = args.folder
    paths = sorted(glob.glob(os.path.join(folder, args.pattern)))
    if not paths:
        print(f"No files match {args.pattern} in {folder}", file=sys.stderr)
        sys.exit(1)

    rows: List[Dict[str, Any]] = []
    for path in paths:
        try:
            with open(path, "r", encoding="utf-8") as f:
                txt = f.read()
        except Exception as e:
            rows.append({"_file": os.path.basename(path), "_read_error": str(e)})
            continue
        data = parse_front_matter(txt)
        data["_file"] = os.path.basename(path)
        rows.append(data)

    df = pd.DataFrame(rows)

    # Order columns: preferred first, then the rest sorted
    cols = [c for c in PREFERRED_COLS if c in df.columns] + sorted([c for c in df.columns if c not in PREFERRED_COLS])
    df = df.reindex(columns=cols)

    # Write output
    if args.sep == "tab":
        df.to_csv(args.out, sep="\t", index=False)
    else:
        df.to_csv(args.out, index=False)

    # Also print a lightweight copy‑pastable TSV preview to stdout (first 20 rows)
    preview = df.head(20).to_csv(sep="\t", index=False)
    print(preview)

    print(f"\nWrote {len(df)} rows to {args.out}", file=sys.stderr)

if __name__ == "__main__":
    main()
