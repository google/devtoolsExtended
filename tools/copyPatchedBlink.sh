#!/bin/sh
# update extension/WebInspectorKit from WebKit
# Copyright (c) 2013 Google Inc johnjbarton@google.com
# Google BSD license http://code.google.com/google_bsd_license.html

set -e

export USAGE=" local-path-to-blink "

. "$(git --exec-path)/git-sh-setup"

cleanCopySubDir() {
  rm -r -f $LOCAL_BLINK/$1
  mkdir -p $LOCAL_BLINK/$1
  cp -r $BLINK_ROOT/$1 $LOCAL_BLINK/$1/..
}


LOCAL_BRANCH="syncToBlink"

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

LOCAL_ROOT=$(pwd)

echo "Copying Blink source from branch $BLINK_BRANCH on $BLINK_ROOT to $LOCAL_BRANCH on $LOCAL_ROOT"

#----------------

cd "$BLINK_ROOT"
git checkout "$BLINK_BRANCH"
require_clean_work_tree "$BLINK_ROOT"

BLINK_GIT_HEAD=$(git rev-parse HEAD)

# Copy our Blink patches, accounting for the path a/extension/WebInspectorKit
stg export -p -d "$LOCAL_ROOT/patches-blink" -n

cd "$LOCAL_ROOT"

# Record the patches.
git add -A "patches-blink"
git commit -m "Patches to Blink at $BLINK_GIT_HEAD"

# Overwrite the local source with patched blink source

cd $LOCAL_ROOT
cleanCopySubDir "Source/devtools"
cleanCopySubDir "LayoutTests/inspector"
cleanCopySubDir "LayoutTests/http/tests/inspector"

git add -A extension/WebInspectorKit/
git commit -m "Sync to Patched Blink at $BLINK_GIT_HEAD" || echo "No diffs?"
