// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global console window debugConnection debugAdapters debugMessages*/

/*
 Barrier proxy for chrome.windows. One per Debugger domain.
 
 This object has two jobs:
   1) proxy chrome.windows functions,
   2) insure that calls from the Web side only operate on windows
      created from the Web side of the crx2app channel
 
 Debugger access to windows is limited to same-domain.
 */


var makeWindowsAdapter = function(chrome, PostSource) {

function WindowsAdapter(origin, debuggerTab) {
  this.debuggerOrigin = origin; // the debugger we accept connections from
  this.debuggerTab = debuggerTab;
  this.instanceIndex = ++WindowsAdapter.instanceCounter;
  this.name = WindowsAdapter.path + '.' + WindowsAdapter.instanceCounter;
  this.chromeWindowIds = [];  // only these ids can be used by client
  this.chromeTabIds = [];     // only these tabs can be used by client

  // chrome.debugger calls must complete before any other chrome.* calls
  this.chromeQueue = [];
  
  // All user selected tabs are accessible to this debugger
  WindowsAdapter.userSelectedTabs.forEach(this.addTab.bind(this));
    
  this._bindListeners();
  // chrome.window functions available to client WebApps
  this.api = ['create', 'getAll'];
  this._connect();
}

WindowsAdapter.path = 'chrome.windows';
WindowsAdapter.instanceCounter = 0;
WindowsAdapter.userSelectedTabs = [];
WindowsAdapter.addUserSelectedTab = function(tabId) {
    WindowsAdapter.userSelectedTabs.push(tabId);
};


WindowsAdapter.prototype = {
  
  // API functions, restricted versions of the chrome.windows functions
  chromeWrappers: {
    create: function(serial, createData) {
      var cleanCreateData = this._cleanseCreateData(createData);
      chrome.windows.create(cleanCreateData, this.onCreated.bind(this, serial));
    },
  
    getAll: function(serial, getInfo) {
      chrome.windows.getAll(getInfo, this.onGetAll.bind(this, serial));
    }
  },

  //------------------------------------------------------------------------------------ 
  isAccessibleTab: function(tabId) {
    return (this.chromeTabIds.indexOf(tabId) > -1);
  },
    
  addTab: function(tabId) {
    if (!this.isAccessibleTab(tabId)) {
      this.chromeTabIds.push(tabId);
      if (debugAdapters) {
        console.log("windowsAdapter allows "+tabId);
      }
    }
  },
  
  removeTab: function(tabId) {
    var userIndex = WindowsAdapter.userSelectedTabs.indexOf(tabId);
    if (userIndex > -1) {
      WindowsAdapter.userSelectedTabs.splice(userIndex, 1);
    } // else not user selected
    
    var index = this.chromeTabIds.indexOf(tabId);
    if (index > -1) {
      this.chromeTabIds.splice(index, 1);
    } else {
      if (debugAdapters) {
        console.info("windowsAdapter attempt to remove "+tabId+", unknown tab");
      }
    }
  },
  
  // Called during construction, for onCreated, and disconnect
  setTabAdapter: function(tabAdapter) {
    this.tabAdapter = tabAdapter; 
  },
  
  setDebugAdapter: function(debugAdapter) {
    this.debugAdapter = debugAdapter;
  },

  
  //------------------------------------------------------------------------------------ 
  // callback from chrome.windows.create
  // @param http://code.google.com/chrome/extensions/dev/windows.html#type-Window
  onCreated: function(serial, win) {
    if (debugMessages) console.log('WindowsAdapter.onCreated', arguments);
    if (!win) {
      return; // incognito windows are not supported because we can't track them
    }
    console.assert( !win.tabs || (win.tabs.length === 1), "A newly created chrome.Window should have at most one tab");
    
    if ( typeof serial === 'number' ) { // then we created the window, track it
      this.chromeWindowIds.push(win.id); // index in this array is our new id
      if (!this.listening) {
        chrome.windows.onRemoved.addListener(this.onRemoved);
        this.listening = true;
      }
      // We already missed the onCreated event for the tab, it came before window onCreated, 
      // and did not pass the barrier. 
      // So send one now for the new window's only tab
      var tab = win.tabs[0];
      this.tabAdapter.onCreated(tab);
      
      // Notify the app of the new window, as a response.
      // The tabAdapter sends onCreated for the tab, and it may arrive first, but we need to record the tab before responding
      this.postMessage({source:this.getPath(), method:'onResponse', params:[win], serial: serial});
    } // else not a response, so not one our app created, so drop the event.
  },
  
  // callback from onRemoved, clean up and event the client
  onRemoved: function(windowId) {
    this.barrier(windowId, arguments, function(windowId, index) {
      this.chromeWindowIds.splice(index, 1);
      this.postMessage({source:this.getPath(), method:'onRemoved', params:{}});
    });
  },

  // callback from getAll, convert result to subset visible to client
  onGetAll: function(serial, chromeWindows) {
    var cleanWindows = [];
    chromeWindows.forEach(function(win) {
      this.barrier(win.id, arguments, function(win) {
        cleanWindows.push(win);
      });
    }.bind(this));
    this.postMessage({source:this.getPath(), method:'onGetAll', params:cleanWindows, serial: serial});
  },

  //------------------------------------------------------------------------------------------------------
    
  blockChromeCalls: function() {
    this.blocked = true;
    if (window.debugAdapters) {
      console.log("<< chrome calls blocked ---------------------------------");
    }
  },
  
  stageChromeCall: function(method, obj, params) {
    if (this.blocked && obj !== this.debugAdapter) {
      var args = Array.prototype.slice.call(arguments, 0);
      this.chromeQueue.push(args);
    } else {
      // send on to chrome
      method.apply(obj, params);
    }
    if (window.debugAdapters) {
      console.log("  "+this.chromeQueue.length+" chrome calls queued");
    }
  },
  
  releaseChromeCalls: function() {
    this.blocked = false;
    if (window.debugAdapters) {
      console.log("<< chrome calls unblocked ---------------------------------");
    }

    while(this.chromeQueue.length && !this.blocked) {
      var chromeCall = this.chromeQueue.shift();
      this.stageChromeCall.apply(this, chromeCall);
    }
  },

  //---------------------------------------------------------------------------------------------------------
  _connect: function() {
    if (debugConnection) {
      console.log("WindowsAdapter "+this.name+" connect "+this.debuggerOrigin);
    }
  },
  
  _disconnect: function() {
    if (debugConnection) {
      var adapters = this.tabAdapter ? "tabAdapter" : "";
      adapters += this.debugAdapter ? " debugAdapter": "";
      console.log("WindowsAdapter "+this.name+" disconnect "+this.debuggerOrigin+" has adapters "+adapters);
    }
    
    if (this.tabAdapter) {
      this.tabAdapter.disconnect();
    }
    if (this.debugAdapter) {
      this.debugAdapter.disconnect();
    }
    
    this.setPort(null); // prevent any more messages
    
    chrome.windows.onCreated.removeListener(this.onCreated);
    chrome.windows.onRemoved.removeListener(this.onRemoved);
  },

  //---------------------------------------------------------------------------------------------------------
  // Call the action iff the window is allowed to the debugger
  // action takes the same arguments as the caller of barrier, plus index is available
  barrier: function (winId, args, action) {
    var index = this.chromeWindowIds.indexOf(winId);
    if (index > -1) {
      // we probably are called with arguments, not an array
      var _args = Array.prototype.slice.call(args);
      action.apply( this, _args.concat([index]) );
    } // else not ours
  },

  // copy allowed fields, force values on others
  _cleanseCreateData: function(createData) {
    var allowedProperties = [ 'url', 'left', 'top', 'width', 'height', 'focused', 'type' ];
    var cleanData = {};
    allowedProperties.forEach(function(prop) {
      if (typeof createData[prop] !== 'undefined')  {
        cleanData[prop] = createData[prop];
      }
    });
    cleanData.incognito = false; // forced
    return cleanData;
  },

  _bindListeners: function() {
    this.onCreated = this.onCreated.bind(this);
    this.onRemoved = this.onRemoved.bind(this);
    this.onGetAll = this.onGetAll.bind(this);
  }
};

  var postSource = new PostSource(WindowsAdapter.path);
  Object.keys(postSource).forEach(function(key) {
    WindowsAdapter.prototype[key] = postSource[key];   
  });

  return WindowsAdapter;
};
