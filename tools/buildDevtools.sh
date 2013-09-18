#!/bin/sh
# Copyright (c) 2013 Google Inc johnjbarton@google.com
# Google BSD license http://code.google.com/google_bsd_license.html

# Generate devtools files from source

set -e

CWD=$(pwd)
cd $CWD/extension/WebInspectorKit/Source/devtools

# Generates a Makefile in devtools/ and files in devtools/out
$CWD/tools/gyp/gyp --depth=$CWD/extension/WebInspectorKit/Source/devtools -D PRODUCT_DIR=$CWD/build -D debug_devtools=1 --ignore-environment

# Build into ./build/resources/inspector
make

#Clean up

cd $CWD
rm extension/WebInspectorKit/Source/devtools/Makefile
rm -r extension/WebInspectorKit/Source/devtools/out
