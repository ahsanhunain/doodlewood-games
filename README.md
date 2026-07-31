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

## Editing images

Source PNGs live in the old Portfolio repo. Re-export as 900px wide WebP
at quality 82 with a JPEG fallback, and keep the `width`/`height`
attributes in `index.html` matching the real pixel size.
