import sys.FileSystem;
import sys.io.File;

/**
 * Static site generator entry point. Run from the repo root via `haxe build.hxml`.
 * Writes HTML, sitemap and robots into dist/. CSS and public/ assets are handled by make.
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
