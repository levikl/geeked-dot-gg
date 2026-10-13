# geeked.gg

Personal portfolio site for Geeked LLC. A small Haxe program generates the static site into
`dist/`; styling is a single hand-written stylesheet. There are no web-toolchain dependencies:
the build needs only `haxe` and `make`.

## Prerequisites

- Haxe 4.0 or newer (the generator deliberately avoids newer syntax; CI builds with 4.3.7)
- GNU make
- python3, only for the local dev server

## Commands

| Command      | Action                                                        |
| :----------- | :------------------------------------------------------------ |
| `make build` | Generate `dist/` (HTML, sitemap, robots, stylesheet, assets)  |
| `make dev`   | Build, then serve `dist/` at `http://localhost:4321`          |
| `make clean` | Remove `dist/`                                                |

`make dev` does not watch for changes. Re-run `make build` in another shell, or install `entr`
and run `ls src/*.hx src/pages/*.hx res/*.html styles/*.css | entr make build`.

## Layout

```
build.hxml            haxe arguments: compile src/ and run Main under --interp
src/Main.hx           entry point; writes dist/*.html, sitemap.xml, robots.txt, copies public/ and styles/
src/Html.hx           tiny HTML builder (el / text / raw; attributes and text are escaped)
src/Layout.hx         <html> shell, header, footer
src/Data.hx           site constants, client logos, services
src/Seo.hx            sitemap + robots
src/pages/*.hx        one class per route, each with a static render()
res/privacy-policy.html   static body of /privacy-policy, wrapped by Layout
styles/site.css       the stylesheet: reset, tokens, one section per component, media queries
public/               copied verbatim into dist/ (favicon, logos, fonts)
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

## Deployment

`.github/workflows/build.yml` builds `dist/` on every push and uploads it as an artifact. A GitHub
Pages deploy job is included but stays inert until the repository variable `DEPLOY_PAGES` is set to
`true` and `public/CNAME` contains the domain.
