// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2013 Google Inc. johnjbarton@google.com

(function buildDebuggerProtocol() {
  if (chrome && chrome.devtools) {
    var protocolSrc = generateProxyDebugAPI.loadInspectorJSON("chrome-extension://ggimboaoffjaeoblofehalflljohnfbl/WebInspectorKit/Source/devtools/protocol.json");
    eval(protocolSrc);
  } else {
    console.error("buildDebuggerProtocol: no chrome.devtools in this scope; chrome:", chrome);
  }
}());
