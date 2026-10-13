HAXE ?= haxe

.PHONY: build html js js-check dev clean

build:
	$(HAXE) build.hxml

html: build

# Regenerate the committed Node build of the generator (gen/site.js).
js:
	$(HAXE) build-node.hxml

# Check gen/site.js is Haxe-trace-free and reproduces dist/ exactly.
js-check: build
	sh scripts/jscheck.sh

# Serves dist/ at http://localhost:4321. Re-run `make build` after editing sources.
dev: build
	python3 -m http.server -d dist 4321

clean:
	rm -rf dist dist-js
