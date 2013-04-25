// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2012 Google Inc. johnjbarton@google.com

(function(){
  var crx2appKey = 'crx2app.options';
  var atopwiURL = 'chrome-extension://ggimboaoffjaeoblofehalflljohnfbl/atopwi/atopwi.html';

  localStorage.removeItem(crx2appKey);
  var options = new ExtensionOptions(crx2appKey, {
    allowedSites: [
      {
        name: 'DevtoolsExtended',
        site: atopwiURL
      }
    ]
  });

  //********** workaround for http://code.google.com/p/chromium/issues/detail?id=108519
  var crx2appBase = window.crx2appBase || "crx2app/extension"; 
  var fakeBlankURL = crx2appBase + '/workaroundBug108519.html';
  //**********
  
  var websocketJSONURL = "http://localhost:9222/json";


  function updateByJSONP(info, tab, win) {
    function notify(whyFailed) {
      webkitNotifications.createNotification("", "No Dogfood", whyFailed);
    }
    // tab is open on fakeBlankURL
    function onJSON(data) {
      var entries = JSON.parse(data);
      var found = entries.some(function(entry){
        if (entry.url == tab.url) { 
          // accept the first matching entry, fails if user has multiple tabs on the same URL
          var wsParam = entry.webSocketDebuggerUrl.replace('://','=');
          var dogfoodURL = atopwiURL + '?' + wsParam;
          var dogfoodTab = win.tabs[0]; // opened by contextMenu
          chrome.tabs.update(dogfoodTab.id, {url: dogfoodURL}, function onUpdate() {
            console.log("opened dogfood debugger " + dogfoodURL +  " from entry ", entry);
          });
        }
      });
      if (!found)
        notify("atopwi not among json entries from " + websocketJSONURL);
    }

    var websocketJSONURL = "http://localhost:9222/json";
    XHRInBackground.prototype.xhr.call(null, websocketJSONURL, onJSON, notify.bind(null, "xhr failed"));
  }

  buildContextMenuItem("Dogfood", halfWidthWindowOpener(fakeBlankURL, updateByJSONP));

}())