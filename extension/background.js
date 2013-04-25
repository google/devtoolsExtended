// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2012 Google Inc. johnjbarton@google.com

window.debuggerOrDebuggee; 

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
    
  function openRemoteDevtools(url, fncOfWindow) {
    function onWindowCreated(win) {
      console.log("Opened Remote DevtoolsExtended on "+url);
      fncOfWindow(win);
    }
    var createData = {url: url, type: 'popup' };
    chrome.windows.create(createData, onWindowCreated);
  }

  function getJSONAsync(onJSON) {
    var websocketJSONURL = "http://localhost:9222/json";
    XHRInBackground.prototype.xhr.call(null, websocketJSONURL, onJSON, notify.bind(null, "xhr failed"));
  }
  
  //--------------------------------------------------------------------------------------
  // Sync
  var sync = {remoteDebug : {tabs:{}, focused: undefined}};
  var debuggers = {}; // keys remote-tabId, values popup Windows

  function updateSync() {
    var sending = new Date().getTime();
    chrome.storage.sync.set(sync, function(){
      var sent = new Date().getTime();
      console.log(debuggerOrDebuggee + " sent remoteDebug in " + (sent - sending) + "ms", sync);
    });
  }

  function openDebugger(tab) {
      function findDevtoolsExtendedInJSON(entry) {
        console.log(debuggerOrDebuggee + " openDebugger trying entry "+entry.url + '===' + tab.url);
        if (entry.url === tab.url) {
          openRemoteDevtools(getWebSocketURLFromJSONEntry(entry), function onPopup(win){
            debuggers[tab.id] = win;
          });
          return true;
        }
      }

      var matcher = findDevtoolsExtendedInJSON;
      var onJSONMatch = onJSON.bind(null, matcher);
      getJSONAsync(onJSONMatch);
  }

// Server side
chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log(debuggerOrDebuggee + " storage changes", changes);
    if ('remoteDebug' in changes) {
      var storageChange = changes.remoteDebug;
      console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                'remoteDebug',
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
      if (debuggerOrDebuggee === 'debugger') {
        chrome.storage.sync.get('remoteDebug', function onStorage(items) {
           console.log("storage.sync.get remoteDebug: %o, debuggers: %o", items.remoteDebug, debuggers);
           cleanupDebuggers(items.remoteDebug);  //maybe a tab was deleted
           syncDebuggers(items.remoteDebug); // maybe a tab was added
        });
      }
     }
  });

  // debugger side
  function cleanupDebuggers(remoteDebug) {
    Object.keys(debuggers).forEach(function(tabId){
      if (tabId in remoteDebug.tabs) {
        return;
      } else {
        var win = debuggers[tabId];
        chrome.windows.remove(win.id, function() {
          delete debuggers[tabId];  
        });
      }
    });
  }

  // debugger side
  function syncDebuggers(remoteDebug) {
    Object.keys(remoteDebug.tabs).forEach(function(tabId){
      if (tabId in debuggers) {
        if (remoteDebug.focused === tabId) {
          chrome.windows.update(debuggers[tabId].id, {focused: true}, function(){
            console.log("syncDebuggers tried to focus the debugger matching"+tabId);
          });
        }
        return;
      } else {
        openDebugger(remoteDebug.tabs[tabId]);
      }
    });
  }

  // debuggee side
  chrome.tabs.onRemoved.addListener(function(tabId) {
    if (tabId in sync.remoteDebug.tabs) {
      delete sync.remoteDebug.tabs[tabId];
      updateSync();
    }
  });

  //--------------------------------------------------------------------------------------
  // context menu

  function onContextMenuClick(info, tab) {
    debuggerOrDebuggee = 'debuggee';
    sync.remoteDebug.tabs[tab.id] = tab;
    sync.remoteDebug.focused = tab.id; 
    updateSync();
  }

  buildContextMenuItem("Remote DevtoolsExtended", onContextMenuClick);


  // -------------------------------------------------
  // PageAction

  function onTabUpdate(tabId, changeInfo, tab) {
    // For debugger side we need an activator UI
    if (tab.url.indexOf('http://localhost:922') > -1) { // any http port in 922*
      chrome.pageAction.show(tabId);
    }
  };

  chrome.tabs.onUpdated.addListener(onTabUpdate);

  function onPageAction(tab) {
    debuggerOrDebuggee = 'debugger';
    chrome.storage.sync.get('remoteDebug', function onStorage(items) {
      console.log("storage.sync.get remoteDebug", items);
      var tabId = items.remoteDebug.focused;
      var tab = items.remoteDebug.tabs[tabId];
      if (!tab) {
        console.error("Focused tab %s not amoung remote tabs %o", tabId, items.remoteDebug.tabs);
        return;
      }
      openDebugger(tab);
    });
  }

  chrome.pageAction.onClicked.addListener(onPageAction);  

}())