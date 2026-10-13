/**
 * The only module that touches the filesystem or the console.
 * Under the JS target it calls Node's fs directly; everywhere else, the sys API.
 */
class Io {
	public static function read(path:String):String {
		#if js
		return js.node.Fs.readFileSync(path, {encoding: "utf8"});
		#else
		return sys.io.File.getContent(path);
		#end
	}

	public static function write(path:String, content:String):Void {
		#if js
		js.node.Fs.writeFileSync(path, content);
		#else
		sys.io.File.saveContent(path, content);
		#end
	}

	public static function exists(path:String):Bool {
		#if js
		return js.node.Fs.existsSync(path);
		#else
		return sys.FileSystem.exists(path);
		#end
	}

	public static function isDir(path:String):Bool {
		#if js
		return js.node.Fs.statSync(path).isDirectory();
		#else
		return sys.FileSystem.isDirectory(path);
		#end
	}

	public static function mkdir(path:String):Void {
		#if js
		js.node.Fs.mkdirSync(path);
		#else
		sys.FileSystem.createDirectory(path);
		#end
	}

	public static function list(path:String):Array<String> {
		#if js
		return js.node.Fs.readdirSync(path);
		#else
		return sys.FileSystem.readDirectory(path);
		#end
	}

	public static function unlink(path:String):Void {
		#if js
		js.node.Fs.unlinkSync(path);
		#else
		sys.FileSystem.deleteFile(path);
		#end
	}

	public static function rmdir(path:String):Void {
		#if js
		js.node.Fs.rmdirSync(path);
		#else
		sys.FileSystem.deleteDirectory(path);
		#end
	}

	/** Binary-safe copy (fonts, SVGs). */
	public static function copy(src:String, dst:String):Void {
		#if js
		// copyFileSync is missing from the hxnodejs 12 externs; going through
		// Buffer would drag haxe.io.Bytes into the output.
		untyped js.node.Fs.copyFileSync(src, dst);
		#else
		sys.io.File.copy(src, dst);
		#end
	}

	/** First command-line argument, or null. */
	public static function arg():String {
		#if js
		return js.Node.process.argv[2];
		#else
		var a = Sys.args();
		return a.length > 0 ? a[0] : null;
		#end
	}

	public static function log(msg:String):Void {
		#if js
		js.Node.console.log(msg);
		#else
		Sys.println(msg);
		#end
	}
}
