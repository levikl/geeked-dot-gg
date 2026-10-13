typedef Logo = {imgUrl:String, title:String, className:String};
typedef Service = {number:String, title:String, description:String, tags:Array<String>};

class Data {
	public static inline var SITE = "https://geeked.gg";
	public static inline var TITLE_PREFIX = "Geeked LLC | ";

	public static var brandLogos:Array<Logo> = [
		{imgUrl: "/marathon.svg", title: "Marathon", className: "min-w-[100px] w-[100px]"},
		{imgUrl: "/testdouble.svg", title: "Test Double", className: "min-w-[100px] w-[100px]"},
		{imgUrl: "/trane.svg", title: "Trane Technologies", className: "min-w-[100px] w-[100px]"},
		{imgUrl: "/amazon.svg", title: "Amazon", className: "min-w-[100px] w-[100px]"},
		{imgUrl: "/honda.svg", title: "Honda", className: "min-w-[100px] w-[100px]"},
		{imgUrl: "/jpmorgan.svg", title: "JPMorgan Chase & Co.", className: "min-w-[200px] w-[200px]"},
		{imgUrl: "/cmm.svg", title: "CoverMyMeds", className: "min-w-[100px] w-[200px]"},
		{imgUrl: "/bitfreighter.svg", title: "bitfreighter", className: "min-w-[100px] w-[100px]"},
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
