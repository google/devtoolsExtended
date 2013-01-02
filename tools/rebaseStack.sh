#!/bin/sh
# Copyright (c) 2010 Google Inc johnjbarton@google.com
# Google BSD license http://code.google.com/google_bsd_license.html

# Propagate changes in syncToWebKit up through patch stack chain
# Use after updateFromWebKit.sh

set -e -x
git checkout stgit
stg rebase syncToWebKit 
git checkout atopwi
git rebase stgit