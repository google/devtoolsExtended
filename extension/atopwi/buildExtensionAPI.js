// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

(function buildExtensionAPI() {
  
    if (chrome && chrome.devtools && chrome.devtools.panels) {
      return; // probably we are running in the browser's devtools
    }

     window.extensionInfo = {};

    var id = window.location.host + window.location.pathname;
    id = id.replace(/\//g, '_').replace(/\./g,'_', 'g');
    // Build the chrome.devtools API
    //
    platformExtensionAPI(injectedExtensionAPI(id));

}());
