/**
 * Minimal HTML builder. Everything renders straight to a String; the only
 * job of the `Html` and `Attr` abstracts is to make escaping explicit at the
 * call site (`text` vs `raw`) and keep attribute order deterministic.
 * The abstracts hold only inline members; the real work lives in `Markup`.
 */
abstract Html(String) {
	public inline function new(s:String)
		this = s;

	@:to public inline function toString():String
		return this;

	/** Trusted markup, inserted verbatim. */
	public static inline function raw(s:String):Html
		return new Html(s);

	/** Text node; escapes `&`, `<`, `>`. */
	public static inline function text(s:String):Html
		return new Html(Markup.escape(s, false));

	public static inline function empty():Html
		return new Html("");

	public static inline function doc(root:Html):Html
		return new Html("<!DOCTYPE html>" + root);
}

/** A pre-rendered ` name="value"` pair. Values are always escaped. */
abstract Attr(String) to String {
	inline function new(s:String)
		this = s;

	public static inline function attr(k:String, v:String):Attr
		return new Attr(" " + k + "=\"" + Markup.escape(v, true) + "\"");

	/** Boolean attribute, e.g. `hidden`. */
	public static inline function flag(k:String):Attr
		return new Attr(" " + k);

	public static inline function cls(v:String):Attr
		return attr("class", v);

	public static inline function href(v:String):Attr
		return attr("href", v);

	public static inline function src(v:String):Attr
		return attr("src", v);

	public static inline function alt(v:String):Attr
		return attr("alt", v);

	public static inline function id(v:String):Attr
		return attr("id", v);
}

class Markup {
	static var VOID = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"];

	public static function el(tag:String, ?attrs:Array<Attr>, ?children:Array<Html>):Html {
		var s = "<" + tag;
		if (attrs != null)
			for (a in attrs)
				s += (a : String);
		s += ">";
		if (VOID.indexOf(tag) >= 0) {
			if (children != null && children.length > 0)
				fail("void element <" + tag + "> cannot have children");
			return new Html(s);
		}
		if (children != null)
			for (c in children)
				s += (c : String);
		return new Html(s + "</" + tag + ">");
	}

	public static function frag(children:Array<Html>):Html {
		var s = "";
		for (c in children)
			s += (c : String);
		return new Html(s);
	}

	/** Escapes `&`, `<`, `>` and, with `quotes`, `"` and `'`. */
	public static function escape(s:String, quotes:Bool):String {
		s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
		if (quotes)
			s = s.split("\"").join("&quot;").split("'").join("&#039;");
		return s;
	}

	static function fail(msg:String):Void {
		#if js
		throw new js.lib.Error(msg);
		#else
		throw msg;
		#end
	}
}
