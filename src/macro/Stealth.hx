package macro;

import haxe.macro.Compiler;
import haxe.macro.Context;

/**
 * Post-generate cleanup for the JS target: renames the module binding that
 * the `@:jsRequire("fs")` extern produces, drops the unused `$global`
 * declaration and empty std class shells, so the output reads as plain Node.
 */
class Stealth {
	public static function use() {
		Context.onAfterGenerate(function() {
			var path = Compiler.getOutput();
			var js = sys.io.File.getContent(path);
			js = StringTools.replace(js, "js_node_Fs", "fs");
			// js-classic still declares an unused $global binding on the first line.
			var nl = js.indexOf("\n");
			if (nl > 0 && js.substr(0, nl).indexOf("$global") >= 0)
				js = js.substr(nl + 1);
			// Any hxnodejs extern that mentions Buffer drags in an empty, unreferenced
			// haxe.io.Bytes class shell. Drop empty std classes.
			js = ~/class haxe_[A-Za-z0-9_]+ \{\n\}\n/g.replace(js, "");
			sys.io.File.saveContent(path, js);
		});
	}
}
