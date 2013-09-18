// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global console */

var makeTabsAdapter = function(chrome, PostSource) {

function TabsAdapter(windowsAdapter) {
  this.windowsAdapter = windowsAdapter; // the adapter for our chrome.window
  windowsAdapter.setTabAdapter(this);   // backpointer for onCreated
  
  var portDelegate = new PostSource(TabsAdapter.path);
  Object.keys(portDelegate).forEach(function(key) {
    this[key] = portDelegate[key].bind(windowsAdapter);   
  }.bind(this));
  
  this._bindListeners();
  this.api = ['create', 'update', 'remove'];
  this._connect();
}

TabsAdapter.path = 'chrome.tabs';


TabsAdapter.prototype = {
  chromeWrappers: {
    create: function(serial, createProperties) {
      var cleanCreateProperties = this._cleanseCreateProperties(createProperties);
      chrome.tabs.create(cleanCreateProperties, this.noErrorPosted);
    },
  
    // NB The debugger will see progress events from the devtools and chrome.extension
    update: function(serial, tabId, updateProperties) {
      var index = this.windowsAdapter.chromeTabIds.indexOf(tabId);
      if (index > -1) {
        var bound = this.onUpdateResponse.bind(this, serial);
        chrome.tabs.update(tabId, updateProperties, bound);
      } else {  
        var msg = "update got invalid tabId: "+tabId;
        this.postError(msg);
      }
    },
  
    remove: function(serial, tabIds) {
      if (typeof tabIds === 'number') {
        tabIds = [tabIds];
      }
      tabIds.forEach(function(tabId) {
        var index = this.windowsAdapter.chromeTabIds.indexOf(tabId);
        if (index !== -1) {
          chrome.tabs.remove(tabId, this.noErrorPosted);
        }
      }.bind(this));
      
    }
  },
  //---------------------------------------------------------------------------------------------------------
  // Events
  
  onCreated: function(chromeTab) {
    if (debugMessages) console.log("TabsAdapter onCreated", chromeTab);
    // The barrier for creation is the target window 
    var tabAdapter = this;
    this.windowsAdapter.barrier(chromeTab.windowId, arguments, function(windowId, index) {
      // |this| is windowsAdapter inside of barrier()
      this.addTab(chromeTab.id);
      this.postMessage({source:tabAdapter.getPath(), method: 'onCreated', params: {tab: chromeTab}});
      tabAdapter.warnAttached(chromeTab.id);     
    });
  },
  
  warnAttached: function(tabId) {
    chrome.pageAction.setTitle({tabId: tabId, title: "This tab controlled by "+this.windowsAdapter.debuggerOrigin});
    chrome.pageAction.show(tabId);
    if (debugWarnings) console.log("TabsAdapter warnAttach on tabId: "+tabId);
  },
  
  // callback from update()
  onUpdateResponse: function(serial, tab) {
    if ( this.noErrorPosted({serial: serial}) ) {
      this.warnAttached(tab.id);
      this.postMessage({source: this.getPath(), serial: serial, method: "OnResponse", params: [tab]});
    } 
  },
  
  // external event onUpdated
  onUpdated: function(tabId, changeInfo, tab) {
    this.barrier(tabId, arguments, function(tabId, changeInfo, tab) {
      this.warnAttached(tabId);
      this.postMessage({source: this.getPath(), method: 'onUpdated', params:{tabId: tabId, changeInfo: changeInfo, tab: tab}});
    });
  },
  
  onRemoved: function(tabId, removeInfo) {
    this.barrier(tabId, arguments, function(tabId, removeInfo, index) {
      this.windowsAdapter.removeTab(tabId);
      this.postMessage({source: this.getPath(), method: 'onRemoved', params:{tabId: tabId, removeInfo: removeInfo}});
    });
  },
  
  onPageActionClicked: function() {
    var updateInfo = {focused: true};
    chrome.windows.update(this.windowsAdapter.debuggerTab.windowId, updateInfo, function(win) {
      if (chrome.extension.lastError) {
        console.error("crx2app onPageActionClicked ERROR ", chrome.extension.lastError);
      } else {
        if (debugWarnings) console.log("crx2app onPageActionClicked update window complete", win);
      }
    });
    var updateProperties = {active: true, highlighted: true};
    chrome.tabs.update(this.windowsAdapter.debuggerTab.id, updateProperties, function(tab) {
      if (chrome.extension.lastError) {
        console.error("crx2app onPageActionClicked ERROR ", chrome.extension.lastError);
      } else {
        if (debugWarnings) console.log("crx2app onPageActionClicked update complete", tab);
      }
    });
  },
  //---------------------------------------------------------------------------------------------------------
  // Call the action iff the tab is allowed to the debugger
  // action takes the same arguments as the caller of barrier, plus index is available
  barrier: function (tabId, args, action) {
    var index = this.windowsAdapter.chromeTabIds.indexOf(tabId);
    if (index > -1) {
      var _args = Array.prototype.slice.call(args);
      action.apply( this, _args.concat([index]) );
    } // else not ours
  },
  
  _connect: function() {
    // build a record of the tabs being debugged
    chrome.tabs.onCreated.addListener(this.onCreated);  
    // prepare to update debuggee records
    chrome.tabs.onUpdated.addListener(this.onUpdated);
    // prepare to clean up the records
    chrome.tabs.onRemoved.addListener(this.onRemoved);
    // chrome.tabs functions available to client WebApps
  },

  disconnect: function() {
    chrome.tabs.onCreated.removeListener(this.onCreated);  
    chrome.tabs.onUpdated.removeListener(this.onUpdated);
    chrome.tabs.onRemoved.removeListener(this.onRemoved);
  },
  
  _cleanseCreateProperties: function(createProperties) {
    console.assert( (typeof createProperties.id === 'number'), "The createProperties.id must be a number");
    var chromeWindowId = this.windowsAdapter.chromeWindowIds[createProperties.id];
    if (chromeWindowId) {
      return createProperties;
    }
    var msg = "The createProperties.id "+createProperties.id + " is not a valid chrome.window id";
    this.postError(msg);
  },
  
  _bindListeners: function() {
    this.onCreated = this.onCreated.bind(this);
    this.onRemoved = this.onRemoved.bind(this);
    this.onUpdated = this.onUpdated.bind(this);
    //chrome.pageAction.onClicked.addListener(this.onPageActionClicked.bind(this));
  }
};



  return TabsAdapter;
};