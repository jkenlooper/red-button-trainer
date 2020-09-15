#!/usr/bin/env bash

currentbranch=$(git for-each-ref --points-at=HEAD --format='%(refname)');
echo "Verifying that current branch at HEAD matches release/* or hotfix/*";
echo $currentbranch
[[ ${currentbranch#refs/heads/} == release/* ]] || [[ ${currentbranch#refs/heads/} == hotfix/* ]]
