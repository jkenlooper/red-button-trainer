
MAKEFLAGS += --warn-undefined-variables
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
.DELETE_ON_ERROR:
.SUFFIXES:

objects := .index-page .red-button-machine .red-button-trainer-components

# For debugging what is set in variables
inspect.%:
	@echo $($*)

# Always run.  Useful when target is like targetname.% .
# Use $* to get the stem
FORCE:

.PHONY: all
all: $(objects) libs/red-button-trainer-components/package-lock.json apps/react/dist/app.bundle.js

.PHONY: test
test: test-red-button-machine

.PHONY: test-red-button-machine
test-red-button-machine: .red-button-machine
	(cd libs/red-button-machine/; npm test;)

# All child apps and libs within this project should have the same version as
# the parent.
.PHONY: version
version: version-red-button-machine version-digit-to-7segment version-red-button-trainer-components version-utility-redbutton-css version-apps-react

.PHONY: version-red-button-machine
version-red-button-machine:
	(cd libs/red-button-machine/; npm version `jq -r '.version' ../../package.json`;)

.PHONY: version-digit-to-7segment
version-digit-to-7segment:
	(cd libs/digit-to-7segment/; npm version `jq -r '.version' ../../package.json`;)

.PHONY: version-red-button-trainer-components
version-red-button-trainer-components:
	(cd libs/red-button-trainer-components/; npm version `jq -r '.version' ../../package.json`;)

.PHONY: version-utility-redbutton-css
version-utility-redbutton-css:
	(cd libs/utility-redbutton-css/; npm version `jq -r '.version' ../../package.json`;)

.PHONY: version-apps-react
version-apps-react:
	(cd apps/react/; npm version `jq -r '.version' ../../package.json`;)


.index-page: dist/utility-redbutton.css

objects += node_modules
dist/utility-redbutton.css: node_modules
	mkdir -p dist;
	cp node_modules/utility-redbutton-css/utility-redbutton.css $@;

.red-button-trainer-components: libs/red-button-trainer-components/dist
	touch $@

libs/red-button-trainer-components/dist: libs/red-button-trainer-components/package.json $(shell find libs/red-button-trainer-components/components/ -type f -print)
	(cd libs/red-button-trainer-components/; npm install;)
	touch $@

.red-button-machine: libs/red-button-machine/dist/red-button-machine.bundle.js libs/red-button-machine/red-button-machine.state-diagram.svg
	touch $@

libs/red-button-machine/red-button-machine.state-diagram.svg: libs/red-button-machine/red-button-machine.state-diagram.mmd
	(cd libs/red-button-machine/; npm run mmdc -- --input red-button-machine.state-diagram.mmd --output red-button-machine.state-diagram.svg -p puppeteer.config.json)

objects += libs/red-button-machine/node_modules
libs/red-button-machine/node_modules: libs/red-button-machine/package.json
	(cd libs/red-button-machine/; npm install;)
	touch $@

objects += libs/red-button-machine/dist/red-button-machine.bundle.js
libs/red-button-machine/dist/red-button-machine.bundle.js: libs/red-button-machine/node_modules $(shell find libs/red-button-machine/src/ -type f -print)
	(cd libs/red-button-machine/; npm run build;)
	touch $@

libs/red-button-trainer-components/package-lock.json: libs/red-button-trainer-components/package.json
	(cd libs/red-button-trainer-components/; npm install;)

apps/react/package-lock.json: apps/react/package.json
	(cd apps/react/; npm install)
	touch $@

apps/react/dist/app.bundle.js:  apps/react/package-lock.json $(shell find apps/react/src/ -type f -print)
	(cd apps/react/; npm run build)
	touch $@

# Remove any created files in the src directory which were created by the
# `make all` recipe.
.PHONY: clean
clean:
	echo $(objects) | xargs rm -rf

