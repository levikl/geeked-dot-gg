typedef BuildInfo = {sha:String, branch:String, url:String};

/**
 * Where this build ran. Cloudflare Pages and Workers Builds inject the commit
 * and branch into the environment; locally everything is null.
 */
class Build {
	public static function info():BuildInfo {
		return {
			sha: first(["CF_PAGES_COMMIT_SHA", "WORKERS_CI_COMMIT_SHA"]),
			branch: first(["CF_PAGES_BRANCH", "WORKERS_CI_BRANCH"]),
			url: Io.env("CF_PAGES_URL"),
		};
	}

	/** Body of build.json. Hand-built so the Node output stays free of std helpers. */
	public static function json(b:BuildInfo):String {
		return '{"commit":' + str(b.sha) + ',"branch":' + str(b.branch) + ',"url":' + str(b.url)
			+ ',"source":' + (b.sha != null ? '"cloudflare"' : '"local"') + '}\n';
	}

	static function str(s:String):String {
		return s == null ? "null" : '"' + s.split("\\").join("\\\\").split('"').join('\\"') + '"';
	}

	static function first(names:Array<String>):String {
		for (n in names) {
			var v = Io.env(n);
			if (v != null && v != "")
				return v;
		}
		return null;
	}
}
