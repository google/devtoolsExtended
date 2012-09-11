#!/bin/sh
# update extension/WebInspectorKit from WebKit
# Copyright (c) 2010 Google Inc johnjbarton@google.com
# Google BSD license http://code.google.com/google_bsd_license.html

set -e

export USAGE=" local-path-to-chromium-repo webkit-branch-to-copy local-branch-target"

. "$(git --exec-path)/git-sh-setup"

copySubDir() {
  mkdir -p $LOCAL_WEBKIT/$1
  cp -r $CHROMIUM_WEBKIT/$1 $LOCAL_WEBKIT/$1/..
}

CHROMIUM_ROOT=$1
if [ -z "$CHROMIUM_ROOT" ]; then
  usage
  exit -1
fi

WEBKIT_BRANCH=$2
if [ -z "$WEBKIT_BRANCH" ]; then
  usage
  exit -1
fi

LOCAL_BRANCH=$3
if [ -z "$LOCAL_BRANCH" ]; then
  LOCAL_BRANCH="$WEBKIT_BRANCH"
  if [ "$WEBKIT_BRANCH" = "master" ]; then
    LOCAL_BRANCH="syncToWebKit"
  fi
fi

LOCAL_GIT_DIR=$(git rev-parse --show-toplevel)
export LOCAL_WEBKIT="$LOCAL_GIT_DIR/extension/WebInspectorKit"

require_clean_work_tree "$LOCAL_BRANCH"

CHROMIUM_WEBKIT="$CHROMIUM_ROOT/third_party/WebKit"
echo "Copying source from $CHROMIUM_WEBKIT branch $WEBKIT_BRANCH to local branch $LOCAL_BRANCH"
#----------------

git checkout "$LOCAL_BRANCH"
CWD=$(pwd)
cd "$CHROMIUM_WEBKIT"
require_clean_work_tree "$CHROMIUM_WEBKIT"
git checkout $WEBKIT_BRANCH
cd $CWD

copySubDir "Source/WebCore/inspector/front-end"
copySubDir "LayoutTests/inspector"
copySubDir "LayoutTests/http/tests/inspector"
copySubDir "Source/WebKit/chromium/src/js"


BUILT_FRONT_END="$CHROMIUM_ROOT/out/Release/resources/inspector"
echo "Copying built files from $BUILT_FRONT_END"

LOCAL_FRONT_END="$LOCAL_WEBKIT/Source/WebCore/inspector/front-end/"
mkdir -p "$LOCAL_FRONT_END"
cp "$BUILT_FRONT_END/devtools_extension_api.js" "$LOCAL_FRONT_END"
cp "$BUILT_FRONT_END/InspectorBackendCommands.js" "$LOCAL_FRONT_END"
cp "$BUILT_FRONT_END/devtools.html" "$LOCAL_FRONT_END"