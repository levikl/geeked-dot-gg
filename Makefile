TW_VERSION := 3.4.19
TW         := tools/tailwindcss
UNAME_S    := $(shell uname -s)
UNAME_M    := $(shell uname -m)
TW_OS      := $(if $(filter Darwin,$(UNAME_S)),macos,linux)
TW_ARCH    := $(if $(filter arm64 aarch64,$(UNAME_M)),arm64,x64)
TW_ASSET   := tailwindcss-$(TW_OS)-$(TW_ARCH)
TW_BASE    := https://github.com/tailwindlabs/tailwindcss/releases/download/v$(TW_VERSION)
export BROWSERSLIST_IGNORE_OLD_DATA := 1
TW_FLAGS   := -c tailwind.config.js -i styles/globals.css -o dist/styles.css
HAXE       ?= haxe

.PHONY: build html css assets dev clean distclean

# html wipes dist/, so it must run before css and assets.
build: html css assets

html:
	$(HAXE) build.hxml

css: $(TW)
	$(TW) $(TW_FLAGS) --minify

assets:
	mkdir -p dist && cp -R public/. dist/

clean:
	rm -rf dist

distclean: clean
	rm -rf tools

$(TW):
	mkdir -p tools
	curl -fsSL -o $@ $(TW_BASE)/$(TW_ASSET)
	curl -fsSL -o tools/sha256sums.txt $(TW_BASE)/sha256sums.txt
	test "$$(grep '$(TW_ASSET)$$' tools/sha256sums.txt | awk '{print $$1}')" = "$$(shasum -a 256 $@ | awk '{print $$1}')"
	chmod +x $@

# Rebuilds once, then watches CSS and serves dist/. Re-run `make html` after editing .hx files.
dev: build
	@trap 'kill 0' INT TERM EXIT; \
	$(TW) $(TW_FLAGS) --watch & \
	python3 -m http.server -d dist 4321
