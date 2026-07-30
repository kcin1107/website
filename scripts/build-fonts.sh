#!/usr/bin/env bash
#
# Regenerate the shipped woff2 fonts from the upstream variable TTFs.
#
# The upstream files live in fonts-src/ and are never deployed — only the
# subsets in public/assets/fonts/ are. Together they went from 1.36 MB to 51 KB,
# which is almost entirely a matter of dropping glyphs and weights the site
# never asks for.
#
# Run this after replacing an upstream font, or after changing the logo string
# in Layout.astro, since the Inter subset contains only that string's glyphs.
#
#   ./scripts/build-fonts.sh
#
# Requires fonttools with woff2 + brotli support:
#   pip install "fonttools[woff]" brotli

set -euo pipefail

cd "$(dirname "$0")/.."

SRC=fonts-src
OUT=public/assets/fonts
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# Inter renders exactly one string: the nav logo, at weights 300 and 700.
LOGO_TEXT="Nick Ringelmann"

# Roboto carries all body copy: Latin-1 covers English and German including the
# umlauts, plus the typographic punctuation the content actually uses (checked
# against src/ — en/em dash, curly quotes, German low quotes, ellipsis, euro).
ROBOTO_UNICODES="U+0000-00FF,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+201E,U+2022,U+2026,U+2039,U+203A,U+20AC,U+2122"

echo "==> Inter (logo only)"
fonttools varLib.instancer "$SRC/Inter-Variable.ttf" wght=300:700 \
  -o "$TMP/Inter.ttf" >/dev/null
pyftsubset "$TMP/Inter.ttf" \
  --output-file="$OUT/Inter-Variable.woff2" \
  --flavor=woff2 --with-zopfli \
  --text="$LOGO_TEXT" \
  --layout-features='' --no-hinting --desubroutinize

echo "==> Roboto (body)"
fonttools varLib.instancer "$SRC/Roboto-Variable.ttf" wght=100:700 \
  -o "$TMP/Roboto.ttf" >/dev/null
pyftsubset "$TMP/Roboto.ttf" \
  --output-file="$OUT/Roboto-Variable.woff2" \
  --flavor=woff2 --with-zopfli \
  --unicodes="$ROBOTO_UNICODES" \
  --layout-features='kern,liga,ccmp,locl,mark,mkmk' --no-hinting --desubroutinize

echo
ls -l "$OUT"
