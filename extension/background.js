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

  function notify(whyFailed) {
    webkitNotifications.createNotification("", "No Dogfood", whyFailed);
  }

  function onJSON(matcher, data) {
    var entries = JSON.parse(data);
    var found = entries.some(matcher);
    if (!found)
      notify("atopwi not among json entries from " + websocketJSONURL);
  }

  function getDogfoodFromJSONEntry(entry) {
    var wsParam = entry.webSocketDebuggerUrl.replace('://','=');
    return atopwiURL + '?' + wsParam;
  }
    
  function openDogfooder(url) {
    function onWindowCreated(win) {
      console.log("Opened Dogfooder ");
    }
    var createData = {url: url, type: 'popup' };
    chrome.windows.create(createData, onWindowCreated);
  }

  function getJSONAsync(onJSON) {
    var websocketJSONURL = "http://localhost:9222/json";
    XHRInBackground.prototype.xhr.call(null, websocketJSONURL, onJSON, notify.bind(null, "xhr failed"));
  }

  //--------------------------------------------------------------------------------------
  // context menu
  function onContextMenuClick(info, tab) {

    function matchTabURL(entry){
      if (entry.url == tab.url) { 
        // accept the first matching entry, fails if user has multiple tabs on the same URL
        var dogfoodURL = getDogfoodFromJSONEntry(entry);
        var dogfoodTab = win.tabs[0]; // opened by contextMenu
        chrome.tabs.update(dogfoodTab.id, {url: dogfoodURL}, function onUpdate() {
          console.log("opened dogfood debugger " + dogfoodURL +  " from entry ", entry);
        });
      }
    }

    var onJSONMatch = onJSON.bind(null, matchTabURL);
    getJSONAsync(onJSONMatch);
  }

  //buildContextMenuItem("Dogfood", onContextMenuClick);

  // -------------------------------------------------
  // PageAction

  function onTabUpdate(tabId, changeInfo, tab) {
    // any http port in 922*
    if (tab.url.indexOf('http://localhost:922') > -1) {
      chrome.pageAction.show(tabId);
    }
  };

  chrome.tabs.onUpdated.addListener(onTabUpdate);

  function onPageAction(tab) {

    function findDevtoolsExtendedInJSON(entry) {
      if (entry.title === "DevToolsExtended") {
        openDogfooder(getDogfoodFromJSONEntry(entry));
        return true;
      }
    }

    var matcher = findDevtoolsExtendedInJSON;
    var onJSONMatch = onJSON.bind(null, matcher);
    getJSONAsync(onJSONMatch);
  }
  chrome.pageAction.onClicked.addListener(onPageAction);  

}())