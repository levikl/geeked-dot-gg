package pages;

import Html.*;
import Html.Attr.*;

class Index {
	public static function render():Html {
		return Layout.page("Home", frag([hero(), carousel(), services()]));
	}

	static function hero():Html {
		return el("section", [cls("relative bg-gray-950 text-white flex items-center overflow-hidden")], [
			el("div", [cls("dot-grid absolute inset-0 pointer-events-none")]),
			el("div", [cls("absolute top-1/3 -left-40 w-[600px] h-[600px] bg-teal-500/[0.06] rounded-full blur-[140px] pointer-events-none")]),
			el("div", [cls("absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[100px] pointer-events-none")]),
			el("div", [cls("relative container mx-auto px-4 py-10 md:py-14")], [
				el("p", [cls("mono text-teal-400 text-sm mb-6 flex items-center gap-2")], [
					el("span", [cls("text-gray-600")], [text("~/geeked.gg")]),
					el("span", [cls("text-gray-500")], [text("$")]),
					el("span", [], [text("whoami")]),
				]),
				el("h2", [cls("text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] mb-6 whitespace-nowrap cursor-default")], [
					el("span", [cls("text-gray-100")], [text("hey, i'm ")]),
					el("span", [cls("text-teal-400")], [text("Levi.")]),
					el("span", [cls("text-teal-400 animate-blink ml-1.5 inline-block -translate-y-[0.05em] scale-y-[0.9] scale-x-[0.85]")], [text("▊")]),
				]),
				el("div", [cls("mono text-gray-400 text-sm md:text-base mb-8 space-y-1")], [
					comment("independent software consultant"),
					comment("full-stack polyglot · distributed systems · database architecture"),
				]),
				el("div", [cls("flex flex-wrap gap-4 items-center")], [
					el("a", [
						href("mailto:levikl@geeked.gg"),
						cls("mono flex justify-center items-center align-middle bg-teal-500 hover:bg-teal-400 border border-teal-500 hover:border-teal-400 text-gray-950 font-bold px-6 py-3 text-sm transition-colors duration-200"),
					], [text("get in touch")]),
					el("a", [
						href("#services"),
						cls("mono flex items-center justify-center align-middle border border-gray-700 hover:border-teal-500/50 text-gray-400 hover:text-white px-6 py-3 text-sm font-bold transition-colors duration-200"),
					], [text("services")]),
				]),
			]),
		]);
	}

	/** A `// something` line in the hero. */
	static function comment(s:String):Html {
		return el("p", [], [el("span", [cls("text-gray-600")], [text("// ")]), text(s)]);
	}

	static function carousel():Html {
		return el("section", [cls("bg-gray-950 border-y border-gray-800/60")], [
			el("div", [cls("container mx-auto px-4")], [
				el("p", [cls("mono text-teal-400/50 text-xs tracking-widest pt-8 pb-2")], [text("// past clients")]),
				el("div", [cls("relative h-[170px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]")], [
					el("div", [cls("flex h-full w-max animate-slide hover:[animation-play-state:paused]")], [
						for (_ in 0...4)
							for (l in Data.brandLogos)
								el("div", [cls("flex items-center mx-10"), attr("style", "filter:saturate(0%) brightness(0.55)")], [
									el("img", [src(l.imgUrl), alt(l.title), cls(l.className)]),
								])
					]),
				]),
			]),
		]);
	}

	static function services():Html {
		return el("section", [id("services"), cls("py-24 bg-gray-950 text-gray-300")], [
			el("div", [cls("container mx-auto px-4")], [
				el("div", [cls("mb-12")], [
					el("p", [cls("mono text-teal-400 text-sm mb-3")], [text("// services")]),
				]),
				el("div", [cls("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800/40 border border-gray-800/40")], [
					for (s in Data.services)
						el("div", [cls("group bg-gray-950 p-8 hover:bg-gray-900/60 transition-colors duration-300")], [
							el("div", [cls("mono text-teal-500/50 text-xs mb-5")], [text(s.number + ".")]),
							el("h4", [cls("text-lg font-bold text-white mb-3")], [text(s.title)]),
							el("p", [cls("text-sm text-gray-400 leading-relaxed mb-6")], [text(s.description)]),
							el("div", [cls("flex flex-wrap gap-2")], [
								for (tag in s.tags)
									el("span", [cls("mono text-xs text-teal-400/60 border border-teal-500/20 bg-teal-500/[0.04] px-2 py-0.5")], [text(tag)])
							]),
						])
				]),
			]),
		]);
	}
}
