// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*global define console */

define(  ['crx2app/lib/MetaObject', 'crx2app/rpc/JSONMarshall', 'crx2app/rpc/chrome',  'crx2app/rpc/ChromeDebuggerProxy'],
function(              MetaObject,               JSONMarshall,               chrome,                ChromeDebuggerProxy) {

  var ChromeProxy = MetaObject.extend(JSONMarshall, {
    
    initialize: function(connection, eventHandlers) {
      this.connection = connection;
    
      this.windows = eventHandlers.windows || {};
      this.buildEventHandlers(chrome.windows.events, 'chrome.windows', this.windows);
      this.buildPromisingCalls(chrome.windows, this.windows, connection);

      this.tabs = eventHandlers.tabs || {};
      this.buildEventHandlers(chrome.tabs.events, 'chrome.tabs', this.tabs);
      this.buildPromisingCalls(chrome.tabs, this.tabs, connection);
      
      this.debugger = {}; 
      this.buildPromisingCalls(chrome.debugger, this.debugger, connection);
      
      this.debug = false;
    },
  
    getConnection: function(connection) {
      return this.connection;
    },
    
    
    detach: function() {
      JSONMarshall.detach.apply(this, [this.getConnection()]);
    },
  
    openNewWindow: function(createData, onCreated) {
      //********** workaround for http://code.google.com/p/chromium/issues/detail?id=108519
      var fakeBlankURL = window.crx2appBase+"/workaroundBug108519.html";
      //**********
      createData.url = fakeBlankURL;
      this.windows.create(createData,  onCreated);
    },
    
    openNewTab: function (createData, onNewTab) {
      this.openNewWindow(createData, function(win) {
        var tabId = win.tabs[0].id;
        onNewTab(tabId);
      });
    },
 
    onPreAttach: function(debuggerEventHandlers, debuggerProxy) {
      debuggerProxy.registerHandlers(debuggerEventHandlers);
    },
    
    onPostAttach: function(debuggerProxy) {
       return debuggerProxy.Debugger.enable();
    },
    
    openDebuggerProxyOnTab: function (tabId, onPreAttach, onPostAttach) {
      var debuggerProxy = ChromeDebuggerProxy.new(this, {tabId: tabId});
      
      onPreAttach = onPreAttach || this.onPreAttach;
      onPreAttach(debuggerProxy);
       
      function onAttach() {
        if (this.debug) {
          console.log("ChromeProxy openDebuggerProxy connected, send enable: "+tabId);
        }

        onPostAttach = onPostAttach || this.onPostAttach;
        var enabled = onPostAttach(debuggerProxy, function () {
          if (this.debug) {
            console.log("ChromeProxy openDebuggerProxy enabled", enabled);
          }
        });
      }

      function onRetry() {
        this.debugger.attach({tabId: tabId}, "1.0", onAttach.bind(this));
      }
      
      this.debugger.attach({tabId: tabId}, "0.1", onAttach.bind(this), onRetry.bind(this));
    },
    
    /*
     * create debugger for url in a new Chrome window 
     * @param url, string URL
     * @param chromeProxy, object representing "chrome" extension API
     * @callback(ChromeDebuggerProxy)  
     */
    openDebuggerProxy: function(url, debuggerEventHandlers, callback) {
      this.openNewWindow(
        function(win) {
          if (this.debug) {
            console.log("ChromeProxy openDebuggerProxy onCreated callback, trying connect", win);
          }
          var tabId = win.tabs[0].id;
      
          var debuggerProxy = this.openDebuggerProxyOnTab(
            tabId, 
            this.onPreAttach.bind(this, debuggerEventHandlers),
            function(debuggerProxy) {
              this.tabs.update(tabId, {url: url}, function(tab) {
                callback(debuggerProxy);
              });
            }.bind(this)
          );
          
        }.bind(this));
    }
  });
  
  return ChromeProxy;
});
