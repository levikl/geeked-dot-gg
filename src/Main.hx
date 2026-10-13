import sys.FileSystem;
import sys.io.File;

/**
 * Static site generator entry point. Run from the repo root via `haxe build.hxml`.
 * Writes HTML, sitemap and robots into dist/, then copies public/ and the stylesheet in.
 */
class Main {
	static inline var OUT = "dist";

	static function main() {
		rmrf(OUT);
		FileSystem.createDirectory(OUT);
		FileSystem.createDirectory(OUT + "/privacy-policy");

		write("index.html", pages.Index.render());
		write("privacy-policy/index.html", pages.PrivacyPolicy.render());
		write("sitemap.xml", Seo.sitemap(["/", "/privacy-policy/"]));
		write("robots.txt", Seo.robots());

		copyDir("public", OUT);
		copy("styles/site.css", OUT + "/site.css");
	}

	static function copyDir(from:String, to:String) {
		if (!FileSystem.exists(to))
			FileSystem.createDirectory(to);
		for (name in FileSystem.readDirectory(from)) {
			if (name.charAt(0) == ".")
				continue;
			var s = from + "/" + name;
			var d = to + "/" + name;
			if (FileSystem.isDirectory(s))
				copyDir(s, d);
			else
				copy(s, d);
		}
	}

	static function copy(s:String, d:String) {
		File.copy(s, d);
		Sys.println("copied " + d);
	}

	static function write(rel:String, content:String) {
		File.saveContent(OUT + "/" + rel, content);
		Sys.println("wrote " + OUT + "/" + rel);
	}

	static function rmrf(path:String) {
		if (!FileSystem.exists(path))
			return;
		if (FileSystem.isDirectory(path)) {
			for (entry in FileSystem.readDirectory(path))
				rmrf(path + "/" + entry);
			FileSystem.deleteDirectory(path);
		} else {
			FileSystem.deleteFile(path);
		}
	}
}
