#!/usr/bin/env bash

set -o pipefail -o errexit;

mkdir -p dist;

cp node_modules/utility-redbutton-css/utility-redbutton.css \
  node_modules/mocha/mocha.css \
  node_modules/mocha/mocha.js \
  node_modules/chai/chai.js \
  dist/;

cp node_modules/@xstate/fsm/es/index.js dist/xstate-fsm-es.js;

npm run build
