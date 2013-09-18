// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global console ensureOrigin restoreOptions getChromeExtensionPipe debugConnection debugMessages*/

/*
  Chrome extension end of crx2app communications
  
  This file runs in background.html. It waits for the content-script 
  in contentScriptProxy.js to connect, then ferries requests from 
  app to chrome and responses/events from chrome to app.
  
  The messages from App are multiplexed: {target: string, request: any},
  send to chrome[target], eg chrome.debugger
  
  The messages to App are multiplexed: {source: string, data: any}
  
 */

function makeCxrEnd(config, chrome) {

var crxEnd = {

  // Entry point, sets up the communication with the content-script
  // @param ChromeAdapterFactories dictionary of target-names to adapters
  //         eg 'chrome.debugger': DebuggerAdapter
  // @param WindowsAdapter: ctor for windowsAdapter represention
  
  attach: function(adapterFactory) {
    this.adapterFactory = adapterFactory;
    this.windowsAdaptersByName = {};
    
    // prepare for introduction call from content-script
    chrome.extension.onRequest.addListener(this.onRequest);
  },
  
  detach: function() {
    chrome.extension.onRequest.removeListener(this.onRequest);
    this.adapterFactory['chrome.tabs']._disconnect();
    // TODO DebugAdapter
  },
  
  isOriginAllowed: function(origin) {
    var options = restoreOptions();
    if (options) {
      if (options.allowedSites) {
        return options.allowedSites.some(function(allowedSite) {
          var allowedOrigin = ensureOrigin(allowedSite.site);
          return (allowedOrigin === origin);
        });
        
      }
    }
  },
  
  getWindowsAdaptersByOrigin: function(origin, debuggerTab) {
    var windowsAdapter;
    Object.keys(this.windowsAdaptersByName).some(function(name) {
      if (this.windowsAdaptersByName[name].debuggerOrigin === origin) {
        windowsAdapter = this.windowsAdaptersByName[name];
        return windowsAdapter;
      }
    }, this);
    return windowsAdapter;
  },
  
  createWindowsAdapter: function(validOrigin, debuggerTab) {
      this.chromeAdapters = this.adapterFactory(validOrigin, debuggerTab);
      var windowsAdapter = this.chromeAdapters['chrome.windows'];
      this.windowsAdaptersByName[windowsAdapter.name] = windowsAdapter;
      return windowsAdapter;
  },
  
  createOrReuseWindowsAdapter: function(validOrigin, debuggerTab){
    var windowsAdapter = this.getWindowsAdaptersByOrigin(validOrigin, debuggerTab);
    if (!windowsAdapter) {  // then this validOrigin has not been seen
      windowsAdapter = this.createWindowsAdapter(validOrigin, debuggerTab);
    } else {                
      // we can reuse the existing adapter
      if (windowsAdapter.port) {
        windowsAdapter.port.disconnect();                       // disconnecting the channel,
        windowsAdapter.setPort(null);                           // and clearing its state
      }
    }
    return windowsAdapter;
  },
  
  checkDebuggerOrigin: function(debuggerURL, onValid, onInvalid) {
      var origin = ensureOrigin(debuggerURL);
      if (origin) {
        if (this.isOriginAllowed(origin)) {
          onValid(origin);
        } else { // else not allowed to use us
          onInvalid("Web Origin Not Allowed "+origin+", Check chrome://extensions options");
        }
      } else {// else not valid url origin
        onInvalid("No valid Web Origin in URL: "+debuggerURL);
      }
  },
  
  // introduction callback from content script
  onRequest: function(request, sender, sendResponse) {
    // Do I know you?
    if (sender.tab && request.name === getChromeExtensionPipe.NAME) {
      
      this.checkDebuggerOrigin(sender.tab.url, function onValid(validOrigin){
        var windowsAdapter = this.createOrReuseWindowsAdapter(validOrigin, sender.tab);
        // prepare for connection
        if ( !chrome.extension.onConnect.hasListener(this.onConnect) ) {
          chrome.extension.onConnect.addListener(this.onConnect);
        }
        // give the proxy it's name, ending our introduction
        sendResponse({name: windowsAdapter.name});
      }.bind(this), function onInvalid(msg){
         sendResponse({error: msg});
      }.bind(this));
       
    } // else not our caller
  },
  
  // When the app connects its port has the name we gave it.
  onConnect: function(port) {
    if (debugConnection) {
      console.log("crxEnd onConnect "+port.name);
    }
    var windowsAdapter = this.windowsAdaptersByName[port.name];
    if (windowsAdapter) {
      windowsAdapter.setPort(port);

      // prepare for message traffic
      windowsAdapter.onMessage = this.onMessage.bind(this, windowsAdapter);
      port.onMessage.addListener(windowsAdapter.onMessage);

      // prepare for unload
      windowsAdapter.onDisconnect = this.onDisconnect.bind(this);
      port.onDisconnect.addListener(windowsAdapter.onDisconnect);
    } else {
      console.error("crx2app/crxEnd: no windowsAdapter for port.name: "+port.name);
    }
  },

  // From App 
  onMessage: function(windowsAdapter, jsonObj) {
    if(debugMessages) {
      console.log("crx2app/crxEnd: onMessage "+jsonObj.target+"."+jsonObj.method, jsonObj);
    }
    var target = this.chromeAdapters[jsonObj.target];
    if (target) {
      if ( target.api.indexOf(jsonObj.method) > -1 ) {
        var method = target.chromeWrappers[jsonObj.method];
        jsonObj.params = jsonObj.params || [];         // devtools sends undefined params
        jsonObj.serial = jsonObj.serial || jsonObj.id; // devtools uses 'id'
        if (jsonObj.params instanceof Array) {
          if (typeof jsonObj.serial === 'number') {
            windowsAdapter.stageChromeCall(method, target, [jsonObj.serial].concat(jsonObj.params));
          } else {
            windowsAdapter.postError("serial \'"+jsonObj.serial+"\' is not a number; "+jsonObj.target+"."+jsonObj.method, jsonObj);
          }
        } else {
          windowsAdapter.postError("params \'"+jsonObj.params+"\' is not an array "+jsonObj.target+"."+jsonObj.method, jsonObj);
        }
      } else {
        windowsAdapter.postError("method \'"+jsonObj.method+"\' is not one of "+jsonObj.target+'.'+target.api.join(','), jsonObj);
      }
    } else {
      // reply with error
      windowsAdapter.postError("target \'"+jsonObj.target+"\' is not one of "+Object.keys(this.chromeAdapters), jsonObj);
    }
  },
  
  onDisconnect: function(port) {
    if (debugConnection) {
      console.log("crxEnd onDisconnected "+port.name, port);
      console.trace("crxEnd onDisconnected "+port.name);
    }
    var windowsAdapter = this.windowsAdaptersByName[port.name];
    if (windowsAdapter) {
      chrome.extension.onConnect.removeListener(this.onConnect);
      windowsAdapter._disconnect();
      delete this.windowsAdaptersByName[port.name];
    } // else not ours
  },
  
  getOrigin: function(url) {
    // eg http://www.example.com/path
    //      0  1 2
    var splits = url.split('/');  
    var segments = splits.slice(0, 3);
    return segments.join('/');
  },
  
  // Call exactly once.
  _bindListeners: function() {
    this.onRequest = this.onRequest.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    // onMessage is bound in listener call
  }
};

crxEnd._bindListeners();

return crxEnd;
}