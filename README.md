# geeked.gg

Static site generator for [geeked.gg](https://geeked.gg), written in Haxe. `make build` writes the
site to `dist/`. Cloudflare Pages deploys it by running `gen/site.js`, a committed Node build of the
same generator.

## Requirements

- Haxe 4.0+ (keep the code 4.0-compatible)
- `haxelib install hxnodejs 12.2.0` (only for `make js`)
- make, python3 (for `make dev`), node (for `make js-check`)

## Commands

| Command                             | Does                                                      |
| :---------------------------------- | :-------------------------------------------------------- |
| `make build`                        | Build the site into `dist/`                               |
| `make dev`                          | Build and serve at http://localhost:4321 (no auto-reload) |
| `make js`                           | Regenerate `gen/site.js`                                  |
| `make js-check`                     | Confirm `gen/site.js` reproduces `dist/` byte for byte    |
| `make verify URL=https://geeked.gg` | Confirm the live site was built from your current commit  |
| `make clean`                        | Remove build output                                       |

## Where to edit

- `src/pages/` — one class per page; `render()` returns HTML via the helpers in `src/Html.hx`
- `src/Data.hx` — site URL, services, client logos
- `styles/site.css` — all styling, copied as-is
- `public/` — images and font, copied as-is

To add a page: create `src/pages/NewPage.hx`, register it in `src/Main.hx` (mkdir, write, sitemap),
then run `make js`.

## Shipping

1. `make build`, check it in the browser.
2. `make js && make js-check`. CI runs the same check and fails on a stale `gen/site.js`.
3. Commit source **and** `gen/site.js` together, push to `main`.
4. Cloudflare deploys in about a minute. Other branches get a preview at
   `https://<branch>.geeked-dot-gg.pages.dev`.
5. `make verify URL=https://geeked.gg`. The footer and `/build.json` carry the commit the site was
   built from, set from `CF_PAGES_COMMIT_SHA`.

Cloudflare Pages build settings: framework preset None, build command `node gen/site.js`, output
directory `dist`, `NODE_VERSION=22`.
