HAXE ?= haxe

.PHONY: build html dev clean

build:
	$(HAXE) build.hxml

html: build

# Serves dist/ at http://localhost:4321. Re-run `make build` after editing sources.
dev: build
	python3 -m http.server -d dist 4321

clean:
	rm -rf dist
