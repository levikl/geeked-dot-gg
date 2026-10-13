/**
 * Minimal HTML builder. Everything renders straight to a String; the only
 * job of the `Html` and `Attr` abstracts is to make escaping explicit at the
 * call site (`text` vs `raw`) and keep attribute order deterministic.
 */
abstract Html(String) {
	inline function new(s:String)
		this = s;

	@:to public inline function toString():String
		return this;

	/** Trusted markup, inserted verbatim. */
	public static inline function raw(s:String):Html
		return new Html(s);

	/** Text node; escapes `&`, `<`, `>`. */
	public static inline function text(s:String):Html
		return new Html(StringTools.htmlEscape(s));

	public static inline function empty():Html
		return new Html("");

	public static inline function frag(children:Array<Html>):Html
		return new Html((cast children : Array<String>).join(""));

	public static inline function doc(root:Html):Html
		return new Html("<!DOCTYPE html>" + root);

	static var VOID = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"];

	public static function el(tag:String, ?attrs:Array<Attr>, ?children:Array<Html>):Html {
		var buf = new StringBuf();
		buf.add("<");
		buf.add(tag);
		if (attrs != null)
			for (a in attrs)
				buf.add((a : String));
		buf.add(">");
		if (VOID.indexOf(tag) >= 0) {
			if (children != null && children.length > 0)
				throw 'void element <$tag> cannot have children';
			return new Html(buf.toString());
		}
		if (children != null)
			for (c in children)
				buf.add((c : String));
		buf.add("</");
		buf.add(tag);
		buf.add(">");
		return new Html(buf.toString());
	}
}

/** A pre-rendered ` name="value"` pair. Values are always escaped. */
abstract Attr(String) to String {
	inline function new(s:String)
		this = s;

	public static inline function attr(k:String, v:String):Attr
		return new Attr(" " + k + "=\"" + StringTools.htmlEscape(v, true) + "\"");

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
