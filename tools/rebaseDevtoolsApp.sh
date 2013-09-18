#!/bin/sh
# Copyright (c) 2013 Google Inc johnjbarton@google.com
# Google BSD license http://code.google.com/google_bsd_license.html

set -e


. "$(git --exec-path)/git-sh-setup"

LOCAL_BRANCH="syncToBlink"
WEBAPP_BRANCH="devtoolsApp"

git checkout "$LOCAL_BRANCH"
LOCAL_GIT_DIR=$(git rev-parse --show-toplevel)
export LOCAL_BLINK="$LOCAL_GIT_DIR/extension/WebInspectorKit"

require_clean_work_tree "$LOCAL_BRANCH"

#----------------

CWD=$(pwd)

git checkout -b built

# Generate files
tools/buildDevtools.sh

# Copy generated files back onto source
BUILT_FRONT_END="build/resources/inspector"
SRC_FRONT_END="extension/WebInspectorKit/Source/devtools/front_end"
diff -r $BUILT_FRONT_END $SRC_FRONT_END | sed -e "/Only in ext/d;/Common subdirectories/d;s/Only in.*://" | xargs -i cp $BUILT_FRONT_END/{} $SRC_FRONT_END/{}

# Record the generated-files patch
git add "extension/WebInspectorKit"
git commit -m "Build files from patched blink"
git clean -f

git checkout "$WEBAPP_BRANCH"
stg rebase built

git branch -D built
