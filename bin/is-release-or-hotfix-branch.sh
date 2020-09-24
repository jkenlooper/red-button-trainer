#!/usr/bin/env bash

set -o pipefail -o errexit -o nounset

function usage {
  cat <<USAGE

Usage: ${0} [-h]

Options:
  -h            Show help
  -v            Verbose

Checks if any branch name at HEAD matches release/* or hotfix/*.
Will error with 1 if no match.

USAGE
  exit 0;
}
VERBOSE=0
while getopts ":hv" opt; do
  case ${opt} in
    h )
      usage;
      ;;
    v )
      VERBOSE=1
      ;;
    \? )
      usage;
      ;;
  esac;
done;
shift "$((OPTIND-1))";

if [ ${VERBOSE} == 1 ]; then
  set -o verbose
fi

git for-each-ref --points-at=HEAD --format='%(refname)' \
  | egrep --silent "refs/heads/(release|hotfix)/"

