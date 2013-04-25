// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global console window*/


/*
  Connection handler for one tab to chrome.debugger
  @param tabId the id of the tab to debug
  @param send function(JSONable object) to forward to app
*/

function makeDebuggerAdapter(chrome, PostSource, remote) {

var debug = window.debugAdapters;

function DebuggerAdapter(windowsAdapter) {
  this.windowsAdapter = windowsAdapter;
  this.windowsAdapter.setDebugAdapter(this);   // backpointer for disconnect

  this.debuggeeTabIds = [];
  this.blockers = 0;
  
  // TODO redo this mess
  var portDelegate = new PostSource(DebuggerAdapter.path);
  Object.keys(portDelegate).forEach(function(key) {
    this[key] = portDelegate[key].bind(windowsAdapter);   
  }.bind(this));
  
  this._bindListeners();
  this.api = ['attach', 'sendCommand', 'detach'];
}

DebuggerAdapter.path = 'chrome.debugger';

DebuggerAdapter.cleanUpDebuggees = {};
DebuggerAdapter.reloadTimeout = debug ? 70000 : 2000; 

DebuggerAdapter.prototype = {

  //-------------------------------------------------------------------------
  
  chromeWrappers: {
    attach: function(serial, debuggee, version, callback) {
      if (!this._checkDebuggee(debuggee)) {
        return;
      }
    
      // Setup the connection to the devtools backend
      chrome.debugger.attach(debuggee, version, this.onAttach.bind(this, serial, debuggee));
    },
    
    sendCommand: function(serial, debuggee, method, params) {
      if (!this._checkDebuggee(debuggee)) {
        return;
      }
      if (this.debuggeeTabIds.indexOf(debuggee.tabId) === -1) {
        // chrome.debugger does not seem to give error except in console
        this.postError("crx2app: tab "+debuggee.tabId+" not attached");
        return;
      }
      
      this.windowsAdapter.blockChromeCalls();  // wait for chrome.debugger to respond
      this.blockers++;
      
      var commandResponse = function(response) {
        if (!chrome.extension.lastError) {
          if (debug) {
            console.log(serial+" crxEnd/DebuggerAdapter.commandResponse "+method, response);
          }
        } else {
          console.error("sendCommand "+method+" FAILS "+chrome.extension.lastError, chrome.extension.lastError);
          response = {error: chrome.extension.lastError};
        }

        this.onResponse(serial, {method: method, params:params}, response);
        this.blockers--;
        if (!this.blockers) {
          this.windowsAdapter.releaseChromeCalls();
        }
      }.bind(this);

      if (debug) {
        console.log(serial+" crxEnd/DebuggerAdapter.sendCommand "+method, params);
      }
      
      chrome.debugger.sendCommand(
        { tabId: debuggee.tabId },
        method,
        params,
        commandResponse
      );
    },
  
    detach: function(serial, debuggee) {
      if (!this._checkDebuggee(debuggee)) {
        return; 
      }
      chrome.debugger.detach({tabId: debuggee.tabId}, this.noErrorPosted);
      
      DebuggerAdapter.cleanUpDebuggees[debuggee.tabId] = window.setTimeout(function cleanUp() {
        delete DebuggerAdapter.cleanUpDebuggees[debuggee.tabId];
        this.onRemoved(debuggee.tabId, {});  // disallow (re-) attach
      }.bind(this), DebuggerAdapter.reloadTimeout);
    }
  },
  
  //-------------------------------------------------------------------------
  
  // Forward debugger events as JSON
  onEvent: function(debuggee, method, params) {
    if ( this.windowsAdapter.isAccessibleTab(debuggee.tabId) ) {
      this.postMessage({source: this.getPath()+'.remote', method: method, params: params}); 
    }
  },
  
  onAttach: function(serial, debuggee) {
    if ( this.noErrorPosted({serial: serial}) ) {
      if (debug) {
        console.log(serial+":  crx2app.DebuggerAdapter.onAttach: "+debuggee.tabId);
      }

      this.addListeners();

      if (DebuggerAdapter.cleanUpDebuggees[debuggee.tabId]) {  // then we reloaded the debugger
        window.clearTimeout(DebuggerAdapter.cleanUpDebuggees[debuggee.tabId]);
        if (debug) {
          var index = this.debuggeeTabIds.indexOf(debuggee.tabId);
          console.info("crxEnd.DebuggerAdapter.onAttach cleared the cleanup of "+debuggee.tabId+" index: "+index);
        }
      }
      if (this.debuggeeTabIds.indexOf(debuggee.tabId) === -1) {
        this.debuggeeTabIds.push(debuggee.tabId);
      }
      
      this.postMessage({source: this.getPath(), method: "onAttach", serial: serial, params:[debuggee]});
    }
  },
  
  // The browser backend announced detach
  onDetach: function(debuggee) {
    if ( this.windowsAdapter.isAccessibleTab(debuggee.tabId) ) {
      if (debug) {
        console.log("crx2app.DebuggerAdapter.onDetach: "+debuggee.tabId);
      }
      this.postMessage({source: this.getPath(), method: "onDetach", params:[debuggee]}); 
    }
  },
  
  // The debuggee tab was removed
  onRemoved: function(tabId, removeInfo) {
    var index = this.debuggeeTabIds.indexOf(tabId);
    if (index > -1) {
      this.debuggeeTabIds.splice(index, 1);
    } // else not ours
  },
  //---------------------------------------------------------------------------
  // class methods
  _checkDebuggee: function(debuggee) {
    if (!debuggee) {
      this.postError("crx2app.DebuggerAdapter no debuggee");
      return false;
    }
    if (!this.windowsAdapter.isAccessibleTab(debuggee.tabId)) {
       var msg = "Debuggee tabId "+debuggee.tabId+" is not accessible";
       console.error(msg);
       this.postError(msg);
       return false;
    }
	return true;
  },
  
  disconnect: function() {
    this.debuggeeTabIds.forEach(function (tabId) {
      this.chromeWrappers.detach.apply(this, [undefined, {tabId: tabId}]);
    }.bind(this));
    this.removeListeners();
  },
  
  addListeners: function() {
      // prepare for events from chrome.debugger
      chrome.debugger.onEvent.addListener(this.onEvent);
      // detach if the tab is removed
      chrome.tabs.onRemoved.addListener(this.onRemoved);
  },
  
  removeListeners: function() {
      chrome.debugger.onEvent.removeListener(this.onEvent);
      chrome.tabs.onRemoved.removeListener(this.onRemoved);
  },
  
  // Call exactly once
  _bindListeners: function() {
    this.onEvent = this.onEvent.bind(this);
    // onResponse bound for each call
    this.onDetach = this.onDetach.bind(this);
    this.onRemoved = this.onRemoved.bind(this);
  }
  
};

  return DebuggerAdapter;
}

