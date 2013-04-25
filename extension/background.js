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
  
  var optionsString = window.localStorage.getItem('DevtoolsExtended.options');
  var options = {};
  if (optionsString) {
    options = JSON.parse(optionsString);
  }
  options.remoteDebugPort = options.remoteDebugPort || 9222;

  var websocketJSONURL = "http://localhost:" + options.remoteDebugPort + "/json";

  function notify(whyFailed) {
    var notification = webkitNotifications.createNotification("", "No Dogfood", whyFailed);
    notification.show();
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
    XHRInBackground.GET(websocketJSONURL, onJSON, notify.bind(null, "xhr failed"));
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

function onRequest(request, sender, sendResponse) {
  // Show the page action for the tab that the sender (content script)
  // was on.
  chrome.pageAction.show(sender.tab.id);

  // Return nothing to let the connection be cleaned up.
  sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);

/*
  function onTabUpdate(tabId, changeInfo, tab) {
    // For debugger side we need an activator UI
    if (tab.url.indexOf('http://localhost:922') > -1) { // any http port in 922*
      chrome.pageAction.show(tabId);
    }
  };

  chrome.tabs.onUpdated.addListener(onTabUpdate);
*/
  function openFromSync(tab) {
    debuggerOrDebuggee = 'debugger';
    chrome.storage.sync.get('remoteDebug', function onStorage(items) {
      console.log("storage.sync.get remoteDebug", items);
      if (!items.remoteDebug) {
        console.error("storage.sync does not have remoteDebug values");
        var notification = webkitNotifications.createNotification(
          'error.png',  // icon url - can be relative
          'Error',  // notification title
          'Activate Remote DevtoolsExtended by right click on debuggee'  // notification body text
        );
        notification.show();
        return;
      }
      var tabId = items.remoteDebug.focused;
      var tab = items.remoteDebug.tabs[tabId];
      if (!tab) {
        console.error("Focused tab %s not among remote tabs %o", tabId, items.remoteDebug.tabs);
        return;
      }
      openDebugger(tab);
    });

  }

  function onPageAction(tab) {
    openFromSync(tab);
  }

  chrome.pageAction.onClicked.addListener(onPageAction);  

}())