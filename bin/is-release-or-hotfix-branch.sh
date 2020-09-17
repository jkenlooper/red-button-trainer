#!/usr/bin/env bash

echo "Verifying that any branch name at HEAD matches release/* or hotfix/*";
git for-each-ref --points-at=HEAD --format='%(refname)' \
  | egrep --silent "refs/heads/(release|hotfix)/"
