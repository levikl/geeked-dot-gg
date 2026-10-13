# geeked.gg

Personal portfolio site for Geeked LLC. A small Haxe program generates the static site into
`dist/`; styling is a single hand-written stylesheet. There are no web-toolchain dependencies:
the build needs only `haxe` and `make`.

The same generator is also compiled to a single Node script, `gen/site.js`, which is committed so
that hosts without Haxe (Cloudflare) can build the site with plain `node`. See "Deploying" below.

## Prerequisites

- Haxe 4.0 or newer (the generator deliberately avoids newer syntax; CI builds with 4.3.7)
- `haxelib install hxnodejs 12.2.0` (Node externs, used only when compiling `gen/site.js`)
- GNU make
- python3, only for the local dev server; node, only for `make js-check`

## Commands

| Command         | Action                                                                      |
| :-------------- | :-------------------------------------------------------------------------- |
| `make build`    | Generate `dist/` (HTML, sitemap, robots, stylesheet, assets)                |
| `make js`       | Recompile the generator to `gen/site.js` (do this after any source change)  |
| `make js-check` | Verify `gen/site.js` has no Haxe traces and reproduces `dist/` under node   |
| `make verify URL=https://geeked.gg` | Confirm a deployment was built by the Node script at local HEAD |
| `make dev`      | Build, then serve `dist/` at `http://localhost:4321`                        |
| `make clean`    | Remove `dist/` and `dist-js/`                                               |

`make dev` does not watch for changes. Re-run `make build` in another shell, or install `entr`
and run `ls src/*.hx src/pages/*.hx res/*.html styles/*.css | entr make build`.

## Layout

```
build.hxml            haxe arguments: compile src/ and run Main under --interp
build-node.hxml       haxe arguments: compile src/ to gen/site.js for Node
gen/site.js           committed Node build of the generator; regenerate with `make js`
src/Main.hx           entry point; writes <out>/*.html, sitemap.xml, robots.txt, copies public/ and styles/
                      (<out> defaults to dist/; an optional first argument overrides it)
src/Io.hx             the only file/console access; calls Node's fs under the JS target, sys otherwise
src/Html.hx           tiny HTML builder (el / text / raw; attributes and text are escaped)
src/macro/Stealth.hx  post-generate cleanup so gen/site.js reads as hand-written Node
src/Layout.hx         <html> shell, header, footer
src/Data.hx           site constants, client logos, services
src/Seo.hx            sitemap + robots
src/pages/*.hx        one class per route, each with a static render()
res/privacy-policy.html   static body of /privacy-policy, wrapped by Layout
styles/site.css       the stylesheet: reset, tokens, one section per component, media queries
public/               copied verbatim into dist/ (favicon, logos, fonts)
scripts/jscheck.sh    the `make js-check` script
scripts/htmlnorm.py   normalizes HTML for structural diffs; used when verifying migrations
```

## Adding a page

1. Create `src/pages/NewPage.hx` with `public static function render():Html` that returns
   `Layout.page("Title", body)`.
2. In `src/Main.hx`, create the output directory, call
   `write("new-page/index.html", pages.NewPage.render())`, and add `/new-page/` to the sitemap list.
3. Add any new rules to `styles/site.css`. Class names are semantic (`.hero`, `.btn--primary`,
   `.service-card__title`); there is no utility layer.

## Styling

`styles/site.css` is copied to `dist/site.css` as-is, with no build step. It starts with a minimal
reset and a `:root` token block (backgrounds, grays, teals), then one section per component, then
the media queries. Breakpoints are 640, 768 and 1024px, plus 1280 and 1536 for `.container`. The
`.mono` class switches the Recursive variable font to its monospace axis; the font file is vendored
under `public/fonts/`.

## Deploying

Cloudflare (Pages, or Workers with static assets) builds the site from the committed Node script:

- Framework preset: none
- Build command: `node gen/site.js`
- Build output directory: `dist`
- Root directory: `/`

No `package.json` is needed; the script uses only Node's built-in `fs`. `gen/site.js` is generated
from `src/` by Haxe, so after changing anything under `src/`, `res/`, `styles/` or `public/`, run
`make js` and commit the result alongside. CI runs `make js-check`, which fails if the committed
script no longer reproduces the Haxe build.

### Build stamp

The footer carries a build stamp. Inside a Cloudflare build it reads `build <sha>` and links to
that commit on GitHub; everywhere else it reads `build local`. The generator also writes
`/build.json` with `commit`, `branch`, `url` and `source` (`cloudflare` or `local`). The values come
from the `CF_PAGES_*` (Pages) or `WORKERS_CI_*` (Workers Builds) variables Cloudflare injects, so
nothing about the stamp depends on which build of the generator ran or on the clock, and local
Haxe and local Node builds stay byte-identical. To simulate it locally:

```sh
CF_PAGES_COMMIT_SHA=$(git rev-parse HEAD) CF_PAGES_BRANCH=main make build
```

After a deploy, `make verify URL=https://geeked.gg` (or a preview URL) fetches `/build.json`,
checks the commit matches local `HEAD`, and checks the footer stamp is on the home page.

`.github/workflows/build.yml` runs the Haxe build, the `js-check`, and a compile-only check of the
JS target on current Haxe, and uploads `dist/` as an artifact.
