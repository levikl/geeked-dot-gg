# geeked.gg

This is the code behind [geeked.gg](https://geeked.gg), a small personal website.

The website is just a few plain files: two HTML pages, one CSS file, some logo images, and a
font. Nothing runs on a server. A little program writes those files out, and a host serves them.

The program is written in a language called **Haxe**. Haxe can be turned into other languages,
and we use that trick later on.

## The big picture

Think of it like a recipe:

1. **The ingredients** live in `src/` (the Haxe code), `res/` (a chunk of HTML), `styles/` (the
   CSS) and `public/` (images and the font).
2. **Cooking** means running the Haxe program. It mixes the ingredients and writes the finished
   website into a folder called `dist/`.
3. **Serving** means putting the `dist/` folder on the internet. A company called Cloudflare does
   that for us.

There's one twist. Cloudflare's computers don't have Haxe installed, but they do have Node (a way
to run JavaScript). So we also keep a JavaScript copy of the program, `gen/site.js`, made by Haxe
from the same source. Cloudflare runs that copy. Same recipe, different cook.

## What you need on your computer

- **Haxe**, version 4.0 or newer. The code on purpose avoids newer features so an older Haxe still
  works.
- One extra Haxe library, installed with `haxelib install hxnodejs 12.2.0`. You only need it when
  making the JavaScript copy.
- **make**, a tool that runs the commands below. Macs and Linux have it already.
- **python3**, only for looking at the site in your browser. Macs have it.
- **node**, only for the self-check described later.

## Commands

Run these from the top folder of the project.

| Type this                           | What happens                                                          |
| :---------------------------------- | :-------------------------------------------------------------------- |
| `make build`                        | Builds the website into `dist/`.                                      |
| `make dev`                          | Builds, then shows the site at http://localhost:4321 in your browser. |
| `make js`                           | Makes a fresh JavaScript copy of the program (`gen/site.js`).         |
| `make js-check`                     | Checks that the JavaScript copy builds the exact same website.        |
| `make verify URL=https://geeked.gg` | Checks that the live site was built from your latest commit.          |
| `make clean`                        | Deletes the built files.                                              |

`make dev` doesn't notice when you edit files. Change something, run `make build` again, then
refresh the browser.

## Where things are

```
src/Main.hx            Start here. Writes every file into dist/.
src/Layout.hx          The parts every page shares: the <html> wrapper, header and footer.
src/pages/Index.hx     The home page.
src/pages/PrivacyPolicy.hx   The privacy page. It just wraps res/privacy-policy.html.
src/Data.hx            Facts: the site address, client logos, the list of services.
src/Html.hx            Tiny helpers for building HTML without typos.
src/Seo.hx             The sitemap and robots.txt (things search engines read).
src/Build.hx           Reads the "build stamp" info (explained below).
src/Io.hx              The only file that reads or writes files. Works in Haxe and in Node.
src/macro/Stealth.hx   Tidies up the JavaScript copy so it reads like normal Node code.
res/privacy-policy.html    The privacy policy text, as plain HTML.
styles/site.css        All the styling.
public/                Images and the font. Copied into dist/ unchanged.
gen/site.js            The JavaScript copy of the program. Don't edit it by hand; run `make js`.
build.hxml             Tells Haxe how to run the program directly.
build-node.hxml        Tells Haxe how to make gen/site.js.
scripts/jscheck.sh     What `make js-check` runs.
scripts/verify.sh      What `make verify` runs.
scripts/htmlnorm.py    A helper for comparing two HTML files. Rarely needed.
```

## How a page is made

Each page is a Haxe class with one function, `render()`, that returns HTML. Instead of typing
raw HTML, you call small helpers:

```haxe
el("a", [href("/"), cls("btn")], [text("Home")])
```

That produces `<a href="/" class="btn">Home</a>`. The helper escapes anything that could break
the page, so a `<` in your text can't accidentally become a tag. If you really do want raw HTML
dropped in as-is, use `raw(...)`.

### Adding a new page

1. Make `src/pages/NewPage.hx`. Give it a `public static function render():Html` that returns
   `Layout.page("Page Title", yourContent)`.
2. In `src/Main.hx`, create its folder with `Io.mkdir(out + "/new-page")`, write it with
   `write("new-page/index.html", pages.NewPage.render())`, and add `"/new-page/"` to the sitemap
   list.
3. Put any new styling in `styles/site.css`. Class names describe what things are, like `.hero`
   or `.service-card__title`.
4. Run `make build` and look at it. Then `make js` so the JavaScript copy knows about the page.

## Styling

There's one CSS file and no build step for it. `styles/site.css` is copied to the website as-is.
Inside, in order: a short reset, a block of colour variables, one section per part of the page,
and the rules for different screen widths (phones first, then 640, 768 and 1024 pixels and up).

The site uses one font, Recursive, which can switch between a normal look and a monospace
(typewriter) look. The `.mono` class flips it to monospace.

## Putting it on the internet

The site lives on **Cloudflare Pages**. Cloudflare watches this GitHub repository. Every time a
commit lands on the `main` branch, Cloudflare builds the site and puts it on https://geeked.gg,
usually in under a minute. Push any other branch and Cloudflare builds a preview copy at
`https://<branch-name>.geeked-dot-gg.pages.dev` instead, so you can look before it goes live.

Cloudflare doesn't have Haxe, so it runs the JavaScript copy. These are the settings in the
Cloudflare dashboard (Workers & Pages → geeked-dot-gg → Settings → Build):

| Setting                | Value              |
| :--------------------- | :----------------- |
| Framework preset       | None               |
| Build command          | `node gen/site.js` |
| Build output directory | `dist`             |
| Root directory         | (leave empty)      |
| `NODE_VERSION`         | `22`               |

### The steps to ship a change

1. Edit the files.
2. `make build` and check it looks right (`make dev` to see it in a browser).
3. `make js`, then `make js-check`. The check fails if you forgot `make js`, so you can't ship a
   stale JavaScript copy by accident.
4. Commit your changes **and** `gen/site.js` together. Push.
5. Wait a minute, then `make verify URL=https://geeked.gg`.

GitHub also runs steps 2 and 3 automatically on every push, so you'll get a red X if something is
off.

### The build stamp

Look at the footer of the live site. It says `build` followed by a short code like `a34fd16`.
That code is the ID of the exact commit the site was built from, and it links to that commit on
GitHub. When you build on your own computer it just says `build local`.

There's also a hidden page, https://geeked.gg/build.json, with the same info written out:

```json
{"commit":"<the full id>","branch":"main","url":"https://<something>.geeked-dot-gg.pages.dev","source":"cloudflare"}
```

How does the program know? Cloudflare tells it. While building, Cloudflare sets a couple of
environment variables (`CF_PAGES_COMMIT_SHA` and `CF_PAGES_BRANCH`) and the program reads them.
On your computer those don't exist, so you get `local`. You can pretend to be Cloudflare like
this:

```sh
CF_PAGES_COMMIT_SHA=$(git rev-parse HEAD) CF_PAGES_BRANCH=main make build
```

`make verify` uses the stamp. It downloads `build.json` from the live site, checks that the commit
matches the one you have checked out, and checks the stamp is really in the footer. If all three
are true, you know the live site is your latest code and that Cloudflare built it.

## Why two copies of the program?

Fair question. Haxe is the real source. The JavaScript copy exists only because Cloudflare can run
Node but not Haxe. To make sure the copy never drifts, `make js-check` builds the site both ways
and compares every file byte for byte. It also checks the JavaScript reads like ordinary Node
code, with no leftovers from the conversion.
