#!/bin/sh
# Copyright (c) 2010 Google Inc johnjbarton@google.com
# Google BSD license http://code.google.com/google_bsd_license.html

# Propagate changes in patch stack chain to origin
# Use after  rebaseStack.sh

set -e -x
git push -f origin syncToWebKit
git push -f origin 97332_revert_open_resource_dialog_filter
git push -f origin 93166_shortestItemSelected
git push -f origin 96040_ExtensionItemSelector
git push -f origin atopwi
