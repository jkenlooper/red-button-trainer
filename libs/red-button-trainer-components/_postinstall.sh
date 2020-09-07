#!/usr/bin/env bash

set -o pipefail -o errexit;

mkdir -p dist/;

cp -r node_modules/@webcomponents/webcomponentsjs \
  dist/;
