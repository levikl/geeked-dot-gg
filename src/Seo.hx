class Seo {
	public static function sitemap(paths:Array<String>):String {
		var s = '<?xml version="1.0" encoding="UTF-8"?>';
		s += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
		for (p in paths)
			s += '<url><loc>' + Data.SITE + p + '</loc></url>';
		return s + '</urlset>\n';
	}

	public static function robots():String {
		return 'User-agent: *\nAllow: /\n\nSitemap: ' + Data.SITE + '/sitemap.xml\n';
	}
}
