class Seo {
	public static function sitemap(paths:Array<String>):String {
		var buf = new StringBuf();
		buf.add('<?xml version="1.0" encoding="UTF-8"?>');
		buf.add('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
		for (p in paths)
			buf.add('<url><loc>' + Data.SITE + p + '</loc></url>');
		buf.add('</urlset>\n');
		return buf.toString();
	}

	public static function robots():String {
		return 'User-agent: *\nAllow: /\n\nSitemap: ' + Data.SITE + '/sitemap.xml\n';
	}
}
