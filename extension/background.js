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

  function getWebSocketURLFromJSONEntry(entry) {
    var wsParam = entry.webSocketDebuggerUrl.replace('://','=');
    return atopwiURL + '?' + wsParam;
  }
    
  function openRemoteDevtools(url) {
    function onWindowCreated(win) {
      console.log("Opened Remote DevtoolsExtended ");
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
    var sending = new Date().getTime(); 
    chrome.storage.sync.set({remoteDebug: tab}, function(){
      var sent = new Date().getTime();
      console.log("sent tab in " + (sent - sending) + "ms", tab);
    });
  }

  buildContextMenuItem("Remote DevtoolsExtended", onContextMenuClick);

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log("storage changes", changes);
    for (key in changes) {
      var storageChange = changes[key];
      console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
      chrome.storage.sync.get(key, function onStorage(items) {
         console.log("storage.sync.get "+key, items);
      });
     }
  });

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

    chrome.storage.sync.get("remoteDebug", function onStorage(items) {
      console.log("storage.sync.get remoteDebug", items);
      var tab = items.remoteDebug;
      function findDevtoolsExtendedInJSON(entry) {
        console.log("trying entry "+entry.url + '===' + tab.url);
        if (entry.url === tab.url) {
          openRemoteDevtools(getWebSocketURLFromJSONEntry(entry));
          return true;
        }
      }

      var matcher = findDevtoolsExtendedInJSON;
      var onJSONMatch = onJSON.bind(null, matcher);
      getJSONAsync(onJSONMatch);
    });

  }
  chrome.pageAction.onClicked.addListener(onPageAction);  

}())