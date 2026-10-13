/**
 * Static site generator entry point. Run from the repo root.
 * Writes HTML, sitemap and robots into the output directory (default dist/),
 * then copies public/ and the stylesheet in. The Node build accepts an
 * optional first argument that overrides the output directory.
 */
class Main {
	static var out = "dist";

	static function main() {
		var o = Io.arg();
		if (o != null)
			out = o;

		rmrf(out);
		Io.mkdir(out);
		Io.mkdir(out + "/privacy-policy");

		Layout.cssVersion = hash(Io.read("styles/site.css"));
		write("index.html", pages.Index.render());
		write("privacy-policy/index.html", pages.PrivacyPolicy.render());
		write("sitemap.xml", Seo.sitemap(["/", "/privacy-policy/"]));
		write("robots.txt", Seo.robots());

		copyDir("public", out);
		copy("styles/site.css", out + "/site.css");
	}

	static function write(rel:String, content:String) {
		Io.write(out + "/" + rel, content);
		Io.log("wrote " + out + "/" + rel);
	}

	static function rmrf(path:String) {
		if (!Io.exists(path))
			return;
		if (Io.isDir(path)) {
			for (entry in Io.list(path))
				rmrf(path + "/" + entry);
			Io.rmdir(path);
		} else {
			Io.unlink(path);
		}
	}

	static function copyDir(from:String, to:String) {
		if (!Io.exists(to))
			Io.mkdir(to);
		for (name in Io.list(from)) {
			if (name.charAt(0) == ".")
				continue;
			var s = from + "/" + name;
			var d = to + "/" + name;
			if (Io.isDir(s))
				copyDir(s, d);
			else
				copy(s, d);
		}
	}

	static function copy(s:String, d:String) {
		Io.copy(s, d);
		Io.log("copied " + d);
	}

	/**
	 * Short content hash used to version the stylesheet URL. The state is kept
	 * to 24 bits so the arithmetic never overflows on the interp or the JS
	 * target, and the output is written by hand to avoid pulling std classes
	 * into gen/site.js.
	 */
	static function hash(s:String):String {
		var h = 0;
		for (i in 0...s.length)
			h = (h * 31 + charCode(s, i)) & 0xffffff;
		var hex = "";
		for (_ in 0...6) {
			hex = "0123456789abcdef".charAt(h & 15) + hex;
			h >>= 4;
		}
		return hex;
	}

	static inline function charCode(s:String, i:Int):Int {
		#if js
		// Plain charCodeAt; the typed call would drag HxOverrides into the output.
		return js.Syntax.code("{0}.charCodeAt({1})", s, i);
		#else
		return s.charCodeAt(i);
		#end
	}
}
