package pages;

import Html.*;
import Html.Markup.*;
import Html.Attr.*;

class Index {
	public static function render():Html {
		return Layout.page("Home", frag([hero(), carousel(), services()]));
	}

	static function hero():Html {
		return el("section", [cls("hero")], [
			el("div", [cls("dot-grid hero__dots")]),
			el("div", [cls("hero__glow hero__glow--orange")]),
			el("div", [cls("hero__glow hero__glow--amber")]),
			el("div", [cls("container hero__inner")], [
				el("p", [cls("prompt mono")], [
					el("span", [cls("prompt__cwd")], [text("~/geeked.gg")]),
					el("span", [cls("prompt__sym")], [text("$")]),
					el("span", [], [text("whoami")]),
				]),
				el("h2", [cls("hero__title")], [
					el("span", [cls("hero__greet")], [text("hey, i'm ")]),
					el("span", [cls("hero__name")], [text("Levi.")]),
					el("span", [cls("hero__caret")], [text("▊")]),
				]),
				el("div", [cls("hero__comments mono")], [
					comment("independent software consultant"),
					comment("full-stack polyglot · distributed systems · database architecture"),
				]),
				el("div", [cls("hero__actions")], [
					el("a", [href("mailto:levikl@geeked.gg"), cls("btn btn--primary mono")], [text("get in touch")]),
					el("a", [href("#services"), cls("btn btn--ghost mono")], [text("services")]),
				]),
			]),
		]);
	}

	/** A `// something` line in the hero. */
	static function comment(s:String):Html {
		return el("p", [], [el("span", [cls("comment-mark")], [text("// ")]), text(s)]);
	}

	static function carousel():Html {
		return el("section", [cls("clients")], [
			el("div", [cls("container")], [
				el("p", [cls("clients__label mono")], [text("// past clients")]),
				el("div", [cls("logo-strip")], [
					el("div", [cls("logo-strip__track")], [
						for (_ in 0...2)
							el("div", [cls("logo-strip__copy")], [
								for (l in Data.brandLogos)
									el("div", [cls(l.wide ? "logo logo--wide" : "logo")], [
										el("img", [src(l.imgUrl), alt(l.title)]),
									])
							])
					]),
				]),
				raw("<script>" + tickerScript + "</script>"),
			]),
		]);
	}

	/**
	 * Drives the logo strip from requestAnimationFrame instead of the CSS
	 * animation. Safari shows a one-frame flicker when a CSS keyframe
	 * animation wraps; stepping the transform ourselves does not. The CSS
	 * animation stays as the fallback when scripts are off. Pauses while the
	 * strip is hovered, matching the CSS fallback.
	 */
	static var tickerScript = "(function(){
var strip=document.querySelector('.logo-strip');
var track=strip.querySelector('.logo-strip__track');
var copy=track.firstElementChild.getBoundingClientRect().width;
if(!copy)return;
var lap=20000;
var x=0,last=null;
track.style.animation='none';
function step(now){
if(last!==null&&!strip.matches(':hover'))x=(x+(now-last)*copy/lap)%copy;
last=now;
track.style.transform='translate3d(-'+x+'px,0,0)';
requestAnimationFrame(step);
}
requestAnimationFrame(step);
})();";

	static function services():Html {
		return el("section", [id("services"), cls("services")], [
			el("div", [cls("container")], [
				el("p", [cls("services__label mono")], [text("// services")]),
				el("div", [cls("service-grid")], [
					for (s in Data.services)
						el("div", [cls("service-card")], [
							el("div", [cls("service-card__num mono")], [text(s.number + ".")]),
							el("h4", [cls("service-card__title")], [text(s.title)]),
							el("p", [cls("service-card__desc")], [text(s.description)]),
							el("div", [cls("service-card__tags")], [
								for (tag in s.tags)
									el("span", [cls("tag mono")], [text(tag)])
							]),
						])
				]),
			]),
		]);
	}
}
