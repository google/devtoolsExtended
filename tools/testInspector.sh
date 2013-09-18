#!/bin/sh
# Build and test devtools
# Copyright (c) 2013 Google Inc johnjbarton@google.com
# Google BSD license http://code.google.com/google_bsd_license.html

set -e -x -v

# Assume we start in a chromium build at third_party/WebKit

cd ../..
ninja -C out/Release content_shell -j500

./webkit/tools/layout_tests/run_webkit_tests.sh --no-retry-failures inspector
./webkit/tools/layout_tests/run_webkit_tests.sh --no-retry-failures http/tests/inspector
./webkit/tools/layout_tests/run_webkit_tests.sh --no-retry-failures inspector-protocol
./webkit/tools/layout_tests/run_webkit_tests.sh --no-retry-failures http/tests/inspector-protocol

