
MAKEFLAGS += --warn-undefined-variables
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
.DELETE_ON_ERROR:
.SUFFIXES:

# For debugging what is set in variables
inspect.%:
	@echo $($*)

# Always run.  Useful when target is like targetname.% .
# Use $* to get the stem
FORCE:

.PHONY: all
all: apps/react/dist/app.bundle.js

libs/red-button-machine/package-lock.json: libs/red-button-machine/package.json
	(cd libs/red-button-machine/; npm install;)
	touch $@

libs/red-button-machine/dist/red-button-machine.bundle.js: libs/red-button-machine/package-lock.json $(shell find libs/red-button-machine/src/ -type f -print)
	(cd libs/red-button-machine/; npm run build)
	touch $@


apps/react/package-lock.json: apps/react/package.json
	(cd apps/react/; npm install)
	touch $@

apps/react/dist/app.bundle.js: libs/red-button-machine/dist/red-button-machine.bundle.js apps/react/package-lock.json $(shell find apps/react/src/ -type f -print)
	(cd apps/react/; npm run build)
	touch $@


