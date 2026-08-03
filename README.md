# DoodleWood Games

Studio site for **DoodleWood Games** — https://doodlewoodgames.com

Static HTML, CSS and JS. No build step.

## Structure

```
index.html          single page
css/style.css       all styles, self-hosted @font-face
js/main.js          fireflies + scroll nav
fonts/              Baloo 2, Nunito (woff2, latin subset)
img/games/          game screenshots (webp + jpg fallback)
img/brand/          icons and social card
_headers            Cloudflare Pages security + cache headers
```

## Deploy

Connected to Cloudflare Pages. Every push to `main` deploys automatically.
Build command: none. Output directory: `/`.

## After editing css/style.css or js/main.js

Bump the `?v=` number on the `<link>` and `<script>` tags in `index.html`.
Browsers key their cache on the full URL, so without a bump a returning
visitor can keep serving the old file.

## Replacing an image

`/img/*` is served with a one year immutable cache, so overwriting a file
is not enough — returning visitors keep the old one. Either rename the
file or bump the `?v=` on its URL in `index.html`.

## Editing images

Source PNGs live in the old Portfolio repo. Re-export as 900px wide WebP
at quality 82 with a JPEG fallback, and keep the `width`/`height`
attributes in `index.html` matching the real pixel size.
