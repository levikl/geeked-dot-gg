import Html.*;
import Html.Attr.*;

class Layout {
	public static function page(title:String, body:Html):Html {
		return doc(el("html", [attr("lang", "en"), cls("dark")], [
			el("head", [], [
				el("meta", [attr("charset", "utf-8")]),
				el("link", [attr("rel", "icon"), attr("type", "image/svg+xml"), href("/favicon.svg")]),
				el("meta", [attr("name", "viewport"), attr("content", "width=device-width")]),
				el("title", [], [text(Data.TITLE_PREFIX + title)]),
				el("link", [attr("rel", "stylesheet"), href("/styles.css")]),
			]),
			el("body", [], [
				el("div", [cls("min-h-screen transition-colors duration-300")], [header(), body, footer()]),
			]),
		]));
	}

	static function header():Html {
		return el("header", [cls("sticky top-0 z-50 py-4 bg-gray-950/70 backdrop-blur-md border-b border-white/[0.06]")], [
			el("div", [cls("container mx-auto px-4 flex justify-between items-center")], [
				el("a", [href("/")], [
					el("h1", [cls("mono text-lg sm:text-xl font-medium cursor-pointer tracking-tight")], [
						el("span", [cls("bg-gradient-to-r from-teal-500 to-teal-200 bg-clip-text text-transparent")], [text("geeked")]),
						el("span", [cls("text-teal-100")], [text(".")]),
						el("span", [cls("bg-gradient-to-r from-teal-100 to-gray-50 bg-clip-text text-transparent")], [text("gg")]),
					]),
				]),
				el("div", [cls("flex items-center space-x-4")], [
					el("nav", [], [
						el("ul", [cls("flex items-center justify-center space-x-4 text-xs sm:text-sm lg:text-base")], [
							el("a", [
								href("https://github.com/levikl"),
								attr("target", "_blank"),
								attr("rel", "noopener noreferrer"),
								attr("aria-label", "GitHub"),
							], [githubIcon()]),
						]),
					]),
				]),
			]),
		]);
	}

	static function githubIcon():Html {
		return raw('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 sm:size-5 lg:size-6 text-gray-300 hover:text-teal-100">'
			+ '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>'
			+ '<path d="M9 18c-4.51 2-5-2-7-2"></path>'
			+ '</svg>');
	}

	static function footer():Html {
		return el("footer", [cls("bg-background text-white py-8")], [
			el("div", [cls("container mx-auto px-4")], [
				el("div", [cls("flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0")], [
					el("div", [cls("text-xs md:text-sm")], [text("© Geeked LLC - Levi Klingler 2026")]),
					el("div", [cls("text-xs md:text-sm")], [
						el("a", [href("/privacy-policy"), cls("hover:underline")], [text(" Privacy Policy ")]),
					]),
				]),
			]),
		]);
	}
}
