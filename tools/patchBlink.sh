#!/bin/sh
# update extension/WebInspectorKit from WebKit
# Copyright (c) 2013 Google Inc johnjbarton@google.com
# Google BSD license http://code.google.com/google_bsd_license.html

set -e

export USAGE=" local-path-to-blink "

. "$(git --exec-path)/git-sh-setup"

LOCAL_BRANCH="patchedBlink"

BLINK_ROOT=$1
if [ -z "$BLINK_ROOT" ]; then
  usage
  exit -1
fi

BLINK_BRANCH=$2
if [ -z "$BLINK_BRANCH" ]; then
  BLINK_BRANCH="devtoolsExtended"
fi

git checkout "$LOCAL_BRANCH"
LOCAL_GIT_DIR=$(git rev-parse --show-toplevel)
export LOCAL_BLINK="$LOCAL_GIT_DIR/extension/WebInspectorKit"

require_clean_work_tree "$LOCAL_BRANCH"

CWD=$(pwd)

echo "Patching Blink using stg into branch $BLINK_BRANCH on $BLINK_ROOT using patches-blink on $LOCAL_BRANCH on $CWD"

#----------------

cd "$BLINK_ROOT"
git checkout master
require_clean_work_tree "$BLINK_ROOT"
git checkout -b "$BLINK_BRANCH"

BLINK_GIT_HEAD=$(git rev-parse HEAD)

# Copy our Blink patches, accounting for the path a/extension/WebInspectorKit
stg import -p 3 --series "$CWD/patches-blink/series"
