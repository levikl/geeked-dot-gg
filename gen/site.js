class Data {
}
class Markup {
	static attr(k,v) {
		return " " + k + "=\"" + Markup.escape(v,true) + "\"";
	}
	static el(tag,attrs,children) {
		var s = "<" + tag;
		if(attrs != null) {
			var _g = 0;
			while(_g < attrs.length) {
				var a = attrs[_g];
				++_g;
				s += a;
			}
		}
		s += ">";
		if(Markup.VOID.indexOf(tag) >= 0) {
			if(children != null && children.length > 0) {
				Markup.fail("void element <" + tag + "> cannot have children");
			}
			return s;
		}
		if(children != null) {
			var _g1 = 0;
			while(_g1 < children.length) {
				var c = children[_g1];
				++_g1;
				s += c;
			}
		}
		return s + "</" + tag + ">";
	}
	static frag(children) {
		var s = "";
		var _g = 0;
		while(_g < children.length) {
			var c = children[_g];
			++_g;
			s += c;
		}
		return s;
	}
	static escape(s,quotes) {
		s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
		if(quotes) {
			s = s.split("\"").join("&quot;").split("'").join("&#039;");
		}
		return s;
	}
	static fail(msg) {
		throw new Error(msg);
	}
}
class Io {
	static read(path) {
		return fs.readFileSync(path,{ encoding : "utf8"});
	}
	static write(path,content) {
		fs.writeFileSync(path,content);
	}
	static exists(path) {
		return fs.existsSync(path);
	}
	static isDir(path) {
		return fs.statSync(path).isDirectory();
	}
	static mkdir(path) {
		fs.mkdirSync(path);
	}
	static list(path) {
		return fs.readdirSync(path);
	}
	static unlink(path) {
		fs.unlinkSync(path);
	}
	static rmdir(path) {
		fs.rmdirSync(path);
	}
	static copy(src,dst) {
		fs.copyFileSync(src,dst);
	}
	static arg() {
		return process.argv[2];
	}
	static log(msg) {
		console.log(msg);
	}
}
class Layout {
	static page(title,body) {
		return "<!DOCTYPE html>" + Markup.el("html",[Markup.attr("lang","en")],[Markup.el("head",[],[Markup.el("meta",[Markup.attr("charset","utf-8")]),Markup.el("link",[Markup.attr("rel","icon"),Markup.attr("type","image/svg+xml"),Markup.attr("href","/favicon.svg")]),Markup.el("meta",[Markup.attr("name","viewport"),Markup.attr("content","width=device-width")]),Markup.el("title",[],[Markup.escape("Geeked LLC | " + title,false)]),Markup.el("link",[Markup.attr("rel","stylesheet"),Markup.attr("href","/site.css")])]),Markup.el("body",[],[Markup.el("div",[Markup.attr("class","shell")],[Layout.header(),body,Layout.footer()])])]);
	}
	static header() {
		return Markup.el("header",[Markup.attr("class","site-header")],[Markup.el("div",[Markup.attr("class","container site-header__inner")],[Markup.el("a",[Markup.attr("href","/")],[Markup.el("h1",[Markup.attr("class","brand mono")],[Markup.el("span",[Markup.attr("class","brand__name")],[Markup.escape("geeked",false)]),Markup.el("span",[Markup.attr("class","brand__dot")],[Markup.escape(".",false)]),Markup.el("span",[Markup.attr("class","brand__tld")],[Markup.escape("gg",false)])])]),Markup.el("nav",[Markup.attr("class","site-nav")],[Markup.el("a",[Markup.attr("href","https://github.com/levikl"),Markup.attr("target","_blank"),Markup.attr("rel","noopener noreferrer"),Markup.attr("aria-label","GitHub")],[Layout.githubIcon()])])])]);
	}
	static githubIcon() {
		return "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"icon\">" + "<path d=\"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4\"></path>" + "<path d=\"M9 18c-4.51 2-5-2-7-2\"></path>" + "</svg>";
	}
	static footer() {
		return Markup.el("footer",[Markup.attr("class","site-footer")],[Markup.el("div",[Markup.attr("class","container site-footer__inner")],[Markup.el("div",[],[Markup.escape("© Geeked LLC - Levi Klingler 2026",false)]),Markup.el("div",[],[Markup.el("a",[Markup.attr("href","/privacy-policy")],[Markup.escape(" Privacy Policy ",false)])])])]);
	}
}
class Main {
	static main() {
		var o = Io.arg();
		if(o != null) {
			Main.out = o;
		}
		Main.rmrf(Main.out);
		Io.mkdir(Main.out);
		Io.mkdir(Main.out + "/privacy-policy");
		Main.write("index.html",pages_Index.render());
		Main.write("privacy-policy/index.html",pages_PrivacyPolicy.render());
		Main.write("sitemap.xml",Seo.sitemap(["/","/privacy-policy/"]));
		Main.write("robots.txt",Seo.robots());
		Main.copyDir("public",Main.out);
		Main.copy("styles/site.css",Main.out + "/site.css");
	}
	static write(rel,content) {
		Io.write(Main.out + "/" + rel,content);
		Io.log("wrote " + Main.out + "/" + rel);
	}
	static rmrf(path) {
		if(!Io.exists(path)) {
			return;
		}
		if(Io.isDir(path)) {
			var _g = 0;
			var _g1 = Io.list(path);
			while(_g < _g1.length) {
				var entry = _g1[_g];
				++_g;
				Main.rmrf(path + "/" + entry);
			}
			Io.rmdir(path);
		} else {
			Io.unlink(path);
		}
	}
	static copyDir(from,to) {
		if(!Io.exists(to)) {
			Io.mkdir(to);
		}
		var _g = 0;
		var _g1 = Io.list(from);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			if(name.charAt(0) == ".") {
				continue;
			}
			var s = from + "/" + name;
			var d = to + "/" + name;
			if(Io.isDir(s)) {
				Main.copyDir(s,d);
			} else {
				Main.copy(s,d);
			}
		}
	}
	static copy(s,d) {
		Io.copy(s,d);
		Io.log("copied " + d);
	}
}
class Seo {
	static sitemap(paths) {
		var s = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		s += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
		var _g = 0;
		while(_g < paths.length) {
			var p = paths[_g];
			++_g;
			s += "<url><loc>" + "https://geeked.gg" + p + "</loc></url>";
		}
		return s + "</urlset>\n";
	}
	static robots() {
		return "User-agent: *\nAllow: /\n\nSitemap: " + "https://geeked.gg" + "/sitemap.xml\n";
	}
}
var fs = require("fs");
class pages_Index {
	static render() {
		return Layout.page("Home",Markup.frag([pages_Index.hero(),pages_Index.carousel(),pages_Index.services()]));
	}
	static hero() {
		return Markup.el("section",[Markup.attr("class","hero")],[Markup.el("div",[Markup.attr("class","dot-grid hero__dots")]),Markup.el("div",[Markup.attr("class","hero__glow hero__glow--orange")]),Markup.el("div",[Markup.attr("class","hero__glow hero__glow--amber")]),Markup.el("div",[Markup.attr("class","container hero__inner")],[Markup.el("p",[Markup.attr("class","prompt mono")],[Markup.el("span",[Markup.attr("class","prompt__cwd")],[Markup.escape("~/geeked.gg",false)]),Markup.el("span",[Markup.attr("class","prompt__sym")],[Markup.escape("$",false)]),Markup.el("span",[],[Markup.escape("whoami",false)])]),Markup.el("h2",[Markup.attr("class","hero__title")],[Markup.el("span",[Markup.attr("class","hero__greet")],[Markup.escape("hey, i'm ",false)]),Markup.el("span",[Markup.attr("class","hero__name")],[Markup.escape("Levi.",false)]),Markup.el("span",[Markup.attr("class","hero__caret")],[Markup.escape("▊",false)])]),Markup.el("div",[Markup.attr("class","hero__comments mono")],[pages_Index.comment("independent software consultant"),pages_Index.comment("full-stack polyglot · distributed systems · database architecture")]),Markup.el("div",[Markup.attr("class","hero__actions")],[Markup.el("a",[Markup.attr("href","mailto:levikl@geeked.gg"),Markup.attr("class","btn btn--primary mono")],[Markup.escape("get in touch",false)]),Markup.el("a",[Markup.attr("href","#services"),Markup.attr("class","btn btn--ghost mono")],[Markup.escape("services",false)])])])]);
	}
	static comment(s) {
		return Markup.el("p",[],[Markup.el("span",[Markup.attr("class","comment-mark")],[Markup.escape("// ",false)]),Markup.escape(s,false)]);
	}
	static carousel() {
		var tmp = [Markup.attr("class","clients")];
		var tmp1 = [Markup.attr("class","container")];
		var tmp2 = Markup.el("p",[Markup.attr("class","clients__label mono")],[Markup.escape("// past clients",false)]);
		var tmp3 = [Markup.attr("class","logo-strip")];
		var tmp4 = [Markup.attr("class","logo-strip__track")];
		var _g = [];
		var tmp5 = [Markup.attr("class","logo-strip__copy")];
		var _g1 = [];
		var _g2 = 0;
		var _g3 = Data.brandLogos;
		while(_g2 < _g3.length) {
			var l = _g3[_g2];
			++_g2;
			_g1.push(Markup.el("div",[Markup.attr("class",l.wide ? "logo logo--wide" : "logo")],[Markup.el("img",[Markup.attr("src",l.imgUrl),Markup.attr("alt",l.title)])]));
		}
		_g.push(Markup.el("div",tmp5,_g1));
		var tmp6 = [Markup.attr("class","logo-strip__copy")];
		var _g11 = [];
		var _g21 = 0;
		var _g31 = Data.brandLogos;
		while(_g21 < _g31.length) {
			var l1 = _g31[_g21];
			++_g21;
			_g11.push(Markup.el("div",[Markup.attr("class",l1.wide ? "logo logo--wide" : "logo")],[Markup.el("img",[Markup.attr("src",l1.imgUrl),Markup.attr("alt",l1.title)])]));
		}
		_g.push(Markup.el("div",tmp6,_g11));
		return Markup.el("section",tmp,[Markup.el("div",tmp1,[tmp2,Markup.el("div",tmp3,[Markup.el("div",tmp4,_g)])])]);
	}
	static services() {
		var tmp = [Markup.attr("id","services"),Markup.attr("class","services")];
		var tmp1 = [Markup.attr("class","container")];
		var tmp2 = Markup.el("p",[Markup.attr("class","services__label mono")],[Markup.escape("// services",false)]);
		var tmp3 = [Markup.attr("class","service-grid")];
		var _g = [];
		var _g1 = 0;
		var _g2 = Data.services;
		while(_g1 < _g2.length) {
			var s = _g2[_g1];
			++_g1;
			var tmp4 = [Markup.attr("class","service-card")];
			var tmp5 = Markup.el("div",[Markup.attr("class","service-card__num mono")],[Markup.escape(s.number + ".",false)]);
			var tmp6 = Markup.el("h4",[Markup.attr("class","service-card__title")],[Markup.escape(s.title,false)]);
			var tmp7 = Markup.el("p",[Markup.attr("class","service-card__desc")],[Markup.escape(s.description,false)]);
			var tmp8 = [Markup.attr("class","service-card__tags")];
			var _g11 = [];
			var _g21 = 0;
			var _g3 = s.tags;
			while(_g21 < _g3.length) {
				var tag = _g3[_g21];
				++_g21;
				_g11.push(Markup.el("span",[Markup.attr("class","tag mono")],[Markup.escape(tag,false)]));
			}
			_g.push(Markup.el("div",tmp4,[tmp5,tmp6,tmp7,Markup.el("div",tmp8,_g11)]));
		}
		return Markup.el("section",tmp,[Markup.el("div",tmp1,[tmp2,Markup.el("div",tmp3,_g)])]);
	}
}
class pages_PrivacyPolicy {
	static render() {
		return Layout.page("Privacy Policy",Io.read("res/privacy-policy.html"));
	}
}
Data.brandLogos = [{ imgUrl : "/marathon.svg", title : "Marathon", wide : false},{ imgUrl : "/testdouble.svg", title : "Test Double", wide : false},{ imgUrl : "/trane.svg", title : "Trane Technologies", wide : false},{ imgUrl : "/amazon.svg", title : "Amazon", wide : false},{ imgUrl : "/honda.svg", title : "Honda", wide : false},{ imgUrl : "/jpmorgan.svg", title : "JPMorgan Chase & Co.", wide : true},{ imgUrl : "/cmm.svg", title : "CoverMyMeds", wide : true},{ imgUrl : "/bitfreighter.svg", title : "bitfreighter", wide : false}];
Data.services = [{ number : "01", title : "full-stack ninja", description : "years of production experience across backend and frontend, from API design to component trees. comfortable wherever the problem lives.", tags : [".NET","Node","PHP","Ruby","Elixir","React","Svelte","Vue"]},{ number : "02", title : "platform migration", description : "here to help your team move off legacy monoliths and onto scalable, distributed services without the big-bang rewrite.", tags : []},{ number : "03", title : "db architecture", description : "schema design, query optimization, and data modeling.", tags : ["PostgreSQL","MySQL","SQLite"]}];
Markup.VOID = ["area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr"];
Main.out = "dist";
Main.main();
