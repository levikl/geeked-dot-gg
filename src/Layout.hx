import Html.*;
import Html.Attr.*;

class Layout {
	public static function page(title:String, body:Html):Html {
		return doc(el("html", [attr("lang", "en")], [
			el("head", [], [
				el("meta", [attr("charset", "utf-8")]),
				el("link", [attr("rel", "icon"), attr("type", "image/svg+xml"), href("/favicon.svg")]),
				el("meta", [attr("name", "viewport"), attr("content", "width=device-width")]),
				el("title", [], [text(Data.TITLE_PREFIX + title)]),
				el("link", [attr("rel", "stylesheet"), href("/site.css")]),
			]),
			el("body", [], [
				el("div", [cls("shell")], [header(), body, footer()]),
			]),
		]));
	}

	static function header():Html {
		return el("header", [cls("site-header")], [
			el("div", [cls("container site-header__inner")], [
				el("a", [href("/")], [
					el("h1", [cls("brand mono")], [
						el("span", [cls("brand__name")], [text("geeked")]),
						el("span", [cls("brand__dot")], [text(".")]),
						el("span", [cls("brand__tld")], [text("gg")]),
					]),
				]),
				el("nav", [cls("site-nav")], [
					el("a", [
						href("https://github.com/levikl"),
						attr("target", "_blank"),
						attr("rel", "noopener noreferrer"),
						attr("aria-label", "GitHub"),
					], [githubIcon()]),
				]),
			]),
		]);
	}

	static function githubIcon():Html {
		return raw('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">'
			+ '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>'
			+ '<path d="M9 18c-4.51 2-5-2-7-2"></path>'
			+ '</svg>');
	}

	static function footer():Html {
		return el("footer", [cls("site-footer")], [
			el("div", [cls("container site-footer__inner")], [
				el("div", [], [text("© Geeked LLC - Levi Klingler 2026")]),
				el("div", [], [
					el("a", [href("/privacy-policy")], [text(" Privacy Policy ")]),
				]),
			]),
		]);
	}
}
