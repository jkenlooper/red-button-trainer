#!/usr/bin/bash

rm -rf dist
mkdir -p dist

#cp node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js \
#  dist/
#mkdir -p dist/bundles
#cp node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-ce.js \
#  node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js \
#  node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js \
#  node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd.js \
#  dist/bundles/

cp node_modules/react/umd/react.production.min.js \
  node_modules/react-dom/umd/react-dom.production.min.js \
  dist/
