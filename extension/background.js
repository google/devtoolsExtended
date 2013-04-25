// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2012 Google Inc. johnjbarton@google.com

(function(){
  var crx2appKey = 'crx2app.options';
  localStorage.removeItem(crx2appKey);
  var options = new ExtensionOptions(crx2appKey, {
    allowedSites: [
      {
        name: 'DevtoolsExtended',
        site: 'chrome-extension://ggimboaoffjaeoblofehalflljohnfbl/atopwi/atopwi.html'
      }
    ]
  });
}())