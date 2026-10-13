class Data {
}
class Markup {
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
			var this1 = s;
			return this1;
		}
		if(children != null) {
			var _g1 = 0;
			while(_g1 < children.length) {
				var c = children[_g1];
				++_g1;
				s += c;
			}
		}
		var this2 = s + "</" + tag + ">";
		return this2;
	}
	static frag(children) {
		var s = "";
		var _g = 0;
		while(_g < children.length) {
			var c = children[_g];
			++_g;
			s += c;
		}
		var this1 = s;
		return this1;
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
		var this1 = " " + "lang" + "=\"" + Markup.escape("en",true) + "\"";
		var this2 = " " + "charset" + "=\"" + Markup.escape("utf-8",true) + "\"";
		var root = Markup.el("meta",[this2]);
		var this3 = " " + "rel" + "=\"" + Markup.escape("icon",true) + "\"";
		var this4 = " " + "type" + "=\"" + Markup.escape("image/svg+xml",true) + "\"";
		var this5 = " " + "href" + "=\"" + Markup.escape("/favicon.svg",true) + "\"";
		var root1 = Markup.el("link",[this3,this4,this5]);
		var this6 = " " + "name" + "=\"" + Markup.escape("viewport",true) + "\"";
		var this7 = " " + "content" + "=\"" + Markup.escape("width=device-width",true) + "\"";
		var root2 = Markup.el("meta",[this6,this7]);
		var this8 = Markup.escape("Geeked LLC | " + title,false);
		var root3 = Markup.el("title",[],[this8]);
		var this9 = " " + "rel" + "=\"" + Markup.escape("stylesheet",true) + "\"";
		var this10 = " " + "href" + "=\"" + Markup.escape("/site.css",true) + "\"";
		var root4 = Markup.el("head",[],[root,root1,root2,root3,Markup.el("link",[this9,this10])]);
		var this11 = " " + "class" + "=\"" + Markup.escape("shell",true) + "\"";
		var this12 = "<!DOCTYPE html>" + Markup.el("html",[this1],[root4,Markup.el("body",[],[Markup.el("div",[this11],[Layout.header(),body,Layout.footer()])])]);
		return this12;
	}
	static header() {
		var this1 = " " + "class" + "=\"" + Markup.escape("site-header",true) + "\"";
		var this2 = " " + "class" + "=\"" + Markup.escape("container site-header__inner",true) + "\"";
		var this3 = " " + "href" + "=\"" + Markup.escape("/",true) + "\"";
		var this4 = " " + "class" + "=\"" + Markup.escape("brand mono",true) + "\"";
		var this5 = " " + "class" + "=\"" + Markup.escape("brand__name",true) + "\"";
		var this6 = Markup.escape("geeked",false);
		var tmp = Markup.el("span",[this5],[this6]);
		var this7 = " " + "class" + "=\"" + Markup.escape("brand__dot",true) + "\"";
		var this8 = Markup.escape(".",false);
		var tmp1 = Markup.el("span",[this7],[this8]);
		var this9 = " " + "class" + "=\"" + Markup.escape("brand__tld",true) + "\"";
		var this10 = Markup.escape("gg",false);
		var tmp2 = Markup.el("a",[this3],[Markup.el("h1",[this4],[tmp,tmp1,Markup.el("span",[this9],[this10])])]);
		var this11 = " " + "class" + "=\"" + Markup.escape("site-nav",true) + "\"";
		var this12 = " " + "href" + "=\"" + Markup.escape("https://github.com/levikl",true) + "\"";
		var this13 = " " + "target" + "=\"" + Markup.escape("_blank",true) + "\"";
		var this14 = " " + "rel" + "=\"" + Markup.escape("noopener noreferrer",true) + "\"";
		var this15 = " " + "aria-label" + "=\"" + Markup.escape("GitHub",true) + "\"";
		return Markup.el("header",[this1],[Markup.el("div",[this2],[tmp2,Markup.el("nav",[this11],[Markup.el("a",[this12,this13,this14,this15],[Layout.githubIcon()])])])]);
	}
	static githubIcon() {
		var this1 = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"icon\">" + "<path d=\"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4\"></path>" + "<path d=\"M9 18c-4.51 2-5-2-7-2\"></path>" + "</svg>";
		return this1;
	}
	static footer() {
		var this1 = " " + "class" + "=\"" + Markup.escape("site-footer",true) + "\"";
		var this2 = " " + "class" + "=\"" + Markup.escape("container site-footer__inner",true) + "\"";
		var this3 = Markup.escape("© Geeked LLC - Levi Klingler 2026",false);
		var tmp = Markup.el("div",[],[this3]);
		var this4 = " " + "href" + "=\"" + Markup.escape("/privacy-policy",true) + "\"";
		var this5 = Markup.escape(" Privacy Policy ",false);
		return Markup.el("footer",[this1],[Markup.el("div",[this2],[tmp,Markup.el("div",[],[Markup.el("a",[this4],[this5])])])]);
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
		var this1 = " " + "class" + "=\"" + Markup.escape("hero",true) + "\"";
		var this2 = " " + "class" + "=\"" + Markup.escape("dot-grid hero__dots",true) + "\"";
		var tmp = Markup.el("div",[this2]);
		var this3 = " " + "class" + "=\"" + Markup.escape("hero__glow hero__glow--teal",true) + "\"";
		var tmp1 = Markup.el("div",[this3]);
		var this4 = " " + "class" + "=\"" + Markup.escape("hero__glow hero__glow--cyan",true) + "\"";
		var tmp2 = Markup.el("div",[this4]);
		var this5 = " " + "class" + "=\"" + Markup.escape("container hero__inner",true) + "\"";
		var this6 = " " + "class" + "=\"" + Markup.escape("prompt mono",true) + "\"";
		var this7 = " " + "class" + "=\"" + Markup.escape("prompt__cwd",true) + "\"";
		var this8 = Markup.escape("~/geeked.gg",false);
		var tmp3 = Markup.el("span",[this7],[this8]);
		var this9 = " " + "class" + "=\"" + Markup.escape("prompt__sym",true) + "\"";
		var this10 = Markup.escape("$",false);
		var tmp4 = Markup.el("span",[this9],[this10]);
		var this11 = Markup.escape("whoami",false);
		var tmp5 = Markup.el("p",[this6],[tmp3,tmp4,Markup.el("span",[],[this11])]);
		var this12 = " " + "class" + "=\"" + Markup.escape("hero__title",true) + "\"";
		var this13 = " " + "class" + "=\"" + Markup.escape("hero__greet",true) + "\"";
		var this14 = Markup.escape("hey, i'm ",false);
		var tmp6 = Markup.el("span",[this13],[this14]);
		var this15 = " " + "class" + "=\"" + Markup.escape("hero__name",true) + "\"";
		var this16 = Markup.escape("Levi.",false);
		var tmp7 = Markup.el("span",[this15],[this16]);
		var this17 = " " + "class" + "=\"" + Markup.escape("hero__caret",true) + "\"";
		var this18 = Markup.escape("▊",false);
		var tmp8 = Markup.el("h2",[this12],[tmp6,tmp7,Markup.el("span",[this17],[this18])]);
		var this19 = " " + "class" + "=\"" + Markup.escape("hero__comments mono",true) + "\"";
		var tmp9 = Markup.el("div",[this19],[pages_Index.comment("independent software consultant"),pages_Index.comment("full-stack polyglot · distributed systems · database architecture")]);
		var this20 = " " + "class" + "=\"" + Markup.escape("hero__actions",true) + "\"";
		var this21 = " " + "href" + "=\"" + Markup.escape("mailto:levikl@geeked.gg",true) + "\"";
		var this22 = " " + "class" + "=\"" + Markup.escape("btn btn--primary mono",true) + "\"";
		var this23 = Markup.escape("get in touch",false);
		var tmp10 = Markup.el("a",[this21,this22],[this23]);
		var this24 = " " + "href" + "=\"" + Markup.escape("#services",true) + "\"";
		var this25 = " " + "class" + "=\"" + Markup.escape("btn btn--ghost mono",true) + "\"";
		var this26 = Markup.escape("services",false);
		return Markup.el("section",[this1],[tmp,tmp1,tmp2,Markup.el("div",[this5],[tmp5,tmp8,tmp9,Markup.el("div",[this20],[tmp10,Markup.el("a",[this24,this25],[this26])])])]);
	}
	static comment(s) {
		var this1 = " " + "class" + "=\"" + Markup.escape("comment-mark",true) + "\"";
		var this2 = Markup.escape("// ",false);
		var tmp = Markup.el("span",[this1],[this2]);
		var this3 = Markup.escape(s,false);
		return Markup.el("p",[],[tmp,this3]);
	}
	static carousel() {
		var this1 = " " + "class" + "=\"" + Markup.escape("clients",true) + "\"";
		var tmp = [this1];
		var this2 = " " + "class" + "=\"" + Markup.escape("container",true) + "\"";
		var tmp1 = [this2];
		var this3 = " " + "class" + "=\"" + Markup.escape("clients__label mono",true) + "\"";
		var this4 = Markup.escape("// past clients",false);
		var tmp2 = Markup.el("p",[this3],[this4]);
		var this5 = " " + "class" + "=\"" + Markup.escape("logo-strip",true) + "\"";
		var tmp3 = [this5];
		var this6 = " " + "class" + "=\"" + Markup.escape("logo-strip__track",true) + "\"";
		var tmp4 = [this6];
		var _g = [];
		var _g1 = 0;
		var _g2 = Data.brandLogos;
		while(_g1 < _g2.length) {
			var l = _g2[_g1];
			++_g1;
			var this7 = " " + "class" + "=\"" + Markup.escape(l.wide ? "logo logo--wide" : "logo",true) + "\"";
			var this8 = " " + "src" + "=\"" + Markup.escape(l.imgUrl,true) + "\"";
			var this9 = " " + "alt" + "=\"" + Markup.escape(l.title,true) + "\"";
			_g.push(Markup.el("div",[this7],[Markup.el("img",[this8,this9])]));
		}
		var _g11 = 0;
		var _g21 = Data.brandLogos;
		while(_g11 < _g21.length) {
			var l1 = _g21[_g11];
			++_g11;
			var this10 = " " + "class" + "=\"" + Markup.escape(l1.wide ? "logo logo--wide" : "logo",true) + "\"";
			var this11 = " " + "src" + "=\"" + Markup.escape(l1.imgUrl,true) + "\"";
			var this12 = " " + "alt" + "=\"" + Markup.escape(l1.title,true) + "\"";
			_g.push(Markup.el("div",[this10],[Markup.el("img",[this11,this12])]));
		}
		var _g12 = 0;
		var _g22 = Data.brandLogos;
		while(_g12 < _g22.length) {
			var l2 = _g22[_g12];
			++_g12;
			var this13 = " " + "class" + "=\"" + Markup.escape(l2.wide ? "logo logo--wide" : "logo",true) + "\"";
			var this14 = " " + "src" + "=\"" + Markup.escape(l2.imgUrl,true) + "\"";
			var this15 = " " + "alt" + "=\"" + Markup.escape(l2.title,true) + "\"";
			_g.push(Markup.el("div",[this13],[Markup.el("img",[this14,this15])]));
		}
		var _g13 = 0;
		var _g23 = Data.brandLogos;
		while(_g13 < _g23.length) {
			var l3 = _g23[_g13];
			++_g13;
			var this16 = " " + "class" + "=\"" + Markup.escape(l3.wide ? "logo logo--wide" : "logo",true) + "\"";
			var this17 = " " + "src" + "=\"" + Markup.escape(l3.imgUrl,true) + "\"";
			var this18 = " " + "alt" + "=\"" + Markup.escape(l3.title,true) + "\"";
			_g.push(Markup.el("div",[this16],[Markup.el("img",[this17,this18])]));
		}
		return Markup.el("section",tmp,[Markup.el("div",tmp1,[tmp2,Markup.el("div",tmp3,[Markup.el("div",tmp4,_g)])])]);
	}
	static services() {
		var this1 = " " + "id" + "=\"" + Markup.escape("services",true) + "\"";
		var this2 = " " + "class" + "=\"" + Markup.escape("services",true) + "\"";
		var tmp = [this1,this2];
		var this3 = " " + "class" + "=\"" + Markup.escape("container",true) + "\"";
		var tmp1 = [this3];
		var this4 = " " + "class" + "=\"" + Markup.escape("services__label mono",true) + "\"";
		var this5 = Markup.escape("// services",false);
		var tmp2 = Markup.el("p",[this4],[this5]);
		var this6 = " " + "class" + "=\"" + Markup.escape("service-grid",true) + "\"";
		var tmp3 = [this6];
		var _g = [];
		var _g1 = 0;
		var _g2 = Data.services;
		while(_g1 < _g2.length) {
			var s = _g2[_g1];
			++_g1;
			var this7 = " " + "class" + "=\"" + Markup.escape("service-card",true) + "\"";
			var tmp4 = [this7];
			var this8 = " " + "class" + "=\"" + Markup.escape("service-card__num mono",true) + "\"";
			var this9 = Markup.escape(s.number + ".",false);
			var tmp5 = Markup.el("div",[this8],[this9]);
			var this10 = " " + "class" + "=\"" + Markup.escape("service-card__title",true) + "\"";
			var this11 = Markup.escape(s.title,false);
			var tmp6 = Markup.el("h4",[this10],[this11]);
			var this12 = " " + "class" + "=\"" + Markup.escape("service-card__desc",true) + "\"";
			var this13 = Markup.escape(s.description,false);
			var tmp7 = Markup.el("p",[this12],[this13]);
			var this14 = " " + "class" + "=\"" + Markup.escape("service-card__tags",true) + "\"";
			var tmp8 = [this14];
			var _g11 = [];
			var _g21 = 0;
			var _g3 = s.tags;
			while(_g21 < _g3.length) {
				var tag = _g3[_g21];
				++_g21;
				var this15 = " " + "class" + "=\"" + Markup.escape("tag mono",true) + "\"";
				var this16 = Markup.escape(tag,false);
				_g11.push(Markup.el("span",[this15],[this16]));
			}
			_g.push(Markup.el("div",tmp4,[tmp5,tmp6,tmp7,Markup.el("div",tmp8,_g11)]));
		}
		return Markup.el("section",tmp,[Markup.el("div",tmp1,[tmp2,Markup.el("div",tmp3,_g)])]);
	}
}
class pages_PrivacyPolicy {
	static render() {
		var this1 = Io.read("res/privacy-policy.html");
		return Layout.page("Privacy Policy",this1);
	}
}
Data.brandLogos = [{ imgUrl : "/marathon.svg", title : "Marathon", wide : false},{ imgUrl : "/testdouble.svg", title : "Test Double", wide : false},{ imgUrl : "/trane.svg", title : "Trane Technologies", wide : false},{ imgUrl : "/amazon.svg", title : "Amazon", wide : false},{ imgUrl : "/honda.svg", title : "Honda", wide : false},{ imgUrl : "/jpmorgan.svg", title : "JPMorgan Chase & Co.", wide : true},{ imgUrl : "/cmm.svg", title : "CoverMyMeds", wide : true},{ imgUrl : "/bitfreighter.svg", title : "bitfreighter", wide : false}];
Data.services = [{ number : "01", title : "full-stack ninja", description : "years of production experience across backend and frontend, from API design to component trees. comfortable wherever the problem lives.", tags : [".NET","Node","PHP","Ruby","Elixir","React","Svelte","Vue"]},{ number : "02", title : "platform migration", description : "here to help your team move off legacy monoliths and onto scalable, distributed services without the big-bang rewrite.", tags : []},{ number : "03", title : "db architecture", description : "schema design, query optimization, and data modeling.", tags : ["PostgreSQL","MySQL","SQLite"]}];
Markup.VOID = ["area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr"];
Main.out = "dist";
Main.main();
