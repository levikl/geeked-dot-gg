typedef Logo = {imgUrl:String, title:String, wide:Bool};
typedef Service = {number:String, title:String, description:String, tags:Array<String>};

class Data {
	public static inline var SITE = "https://geeked.gg";
	public static inline var TITLE_PREFIX = "Geeked LLC | ";

	public static var brandLogos:Array<Logo> = [
		{imgUrl: "/marathon.svg", title: "Marathon", wide: false},
		{imgUrl: "/testdouble.svg", title: "Test Double", wide: false},
		{imgUrl: "/trane.svg", title: "Trane Technologies", wide: false},
		{imgUrl: "/amazon.svg", title: "Amazon", wide: false},
		{imgUrl: "/honda.svg", title: "Honda", wide: false},
		{imgUrl: "/jpmorgan.svg", title: "JPMorgan Chase & Co.", wide: true},
		{imgUrl: "/cmm.svg", title: "CoverMyMeds", wide: true},
		{imgUrl: "/bitfreighter.svg", title: "bitfreighter", wide: false},
	];

	public static var services:Array<Service> = [
		{
			number: "01",
			title: "full-stack ninja",
			description: "years of production experience across backend and frontend, from API design to component trees. comfortable wherever the problem lives.",
			tags: [".NET", "Node", "PHP", "Ruby", "Elixir", "React", "Svelte", "Vue"],
		},
		{
			number: "02",
			title: "platform migration",
			description: "here to help your team move off legacy monoliths and onto scalable, distributed services without the big-bang rewrite.",
			tags: [],
		},
		{
			number: "03",
			title: "db architecture",
			description: "schema design, query optimization, and data modeling.",
			tags: ["PostgreSQL", "MySQL", "SQLite"],
		},
	];
}
