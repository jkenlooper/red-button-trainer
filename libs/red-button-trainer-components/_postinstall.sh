#!/usr/bin/env bash

set -o pipefail -o errexit;

mkdir -p dist;
cp node_modules/utility-redbutton-css/utility-redbutton.css \
  node_modules/suitcss-utils-display/lib/display.css \
  dist/;
