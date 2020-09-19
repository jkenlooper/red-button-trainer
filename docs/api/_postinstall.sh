#!/usr/bin/env bash

set -o pipefail -o errexit;

mkdir -p dist/;

cp -r node_modules/swagger-ui/dist/swagger-ui.css \
  node_modules/swagger-editor-dist/swagger-editor.css \
  node_modules/swagger-editor-dist/swagger-editor-bundle.js \
  node_modules/swagger-editor-dist/swagger-editor-standalone-preset.js \
  node_modules/utility-redbutton-css/utility-redbutton.css \
  dist/;
