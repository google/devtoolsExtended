// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console WebInspector  getChromeExtensionPipe window */


define(['crx2app/rpc/ChromeProxy', 'atopwi/appendFrame'], 
function(            ChromeProxy,          appendFrame)  {

  var debug = false;
  
  function echoOk() {
    if (debug) {
      console.log('ok ', arguments);
    }
  }
  
  function echoErr() {
    console.error('ERROR ', arguments);
  }

  function Debuggee(iframeDomain) {
    this.iframeDomain = iframeDomain;
  }
  
  Debuggee.prototype = {
    attachToParent: function() {
      console.log(window.location + ' talking ');
      this.portToAtopwi = new ChannelPlate.ChildIframe(function(message){
        console.log('Debuggee got message ', message);
        var method = message.data.method;
        var args = message.data.arguments;
        if (method === "debuggee") {
          this.parseDebuggee(args[0]);
          if (this.websocketParam) {
            this.patchInspector(function() {
              window.parent.document.title = "Dogfooder";
              console.log("websocketParam used "+window.parent.location.href);
            });
          } else {
            if (this.url || this.tabId) {
              this.attachToChrome();
              console.log("AttachedToChrome");
            } else {
              console.error("Bad debuggeeSpec", args[0]);
            }
          } 
        }
      }.bind(this));
    },
  
    attachToChrome: function() {

      this.chromeConnection = getChromeExtensionPipe();
      
      var tid = window.setTimeout(function offerExtension() {
        // TODO
        window.alert('Requires: https://github.com/johnjbarton/crx2app');
      }, 2000);
  
      // listen for a connection.
      this.chromeConnection.attach(
        function onConnectedToChrome() {
          // we have connected to the extension, so clear the offer
          window.clearTimeout(tid);
                
          this.chrome = ChromeProxy.new(
            this.chromeConnection, 
            {
              windows: {}, 
              tabs: { onRemoved: function() { console.log('tab removed');}}
              //debugger event listeners are added during load
            }
          );
 
          this.attach(function() {
            console.log("Debuggee attach ", this.chrome);
          }.bind(this));    
        }.bind(this), 
        function errback(msg) {
         console.error('Debuggee.attach ERROR:', msg);
        }
      );
     
      window.beforeUnload = function detach() {
        this.chromeConnection.detach();
      }.bind(this);

    },

    parseDebuggee: function(debuggeeSpec) {
      var tabId = parseInt(debuggeeSpec.tabId, 10);
      if (debuggeeSpec.url) {
        this.url = decodeURIComponent(debuggeeSpec.url);
      }
      if ( !isNaN(tabId) ) {  // then we better have a URL
        this.tabId = tabId;
      }
      if (debuggeeSpec.ws) {
        this.websocketParam = debuggeeSpec.ws;
      }
      if (debuggeeSpec.tests) {
        this.obeyTestRunner = true;
      }
    },
    
    open: function(debuggeeSpec) {
      this.parseDebuggee(debuggeeSpec);
      if (debug) {
        console.log("Debuggee parsed debuggeeSpec %o and got %o", debuggeeSpec, this);
      }
      var high = window.screen.availHeight;
      var wide = window.screen.availWidth / 2;
      var createData = {
        url: this.url,
        left: wide,
        width: wide,
        height: high,
        focused: false
      };
        
      this.chrome.openNewTab(
        createData, 
        function(newTabId) {
          this.tabId = newTabId;
          window.beforeUnload = this.close.bind(this);
          this.attach();
        }.bind(this)
      );
    },
    
    close: function(newTabId) {
      this.chrome.tabs.remove(newTabId, function() {
        if (debug) {
          console.log('atopwi removed '+newTabId);
        }
      });
    },

    attach: function(callback) {
       this.chrome.debugger.attach(
        {tabId: this.tabId}, 
        '1.0', 
        this.onAttach.bind(this, callback)
      );
    },
    
    onAttach: function(callback) {
      if (debug) {
        console.log('atopwi chrome.debugger.attach complete '+this.tabId);
      }
       
      window.beforeUnload = this.detach.bind(this);
        
      this.patchInspector(callback);
    },
    
    detach: function() {
      this.chrome.debugger.detach({tabId: this.tabId}, function() {
         if (debug) {
            console.log('atopwi detached from ' + this.tabId);
          }
         this.close(this.tabId);
       }.bind(this));
    },

    rerouteMessages: function() {
              
      // Accept command from WebInspector and forward them to chrome.debugger
      var backend = this.inspectorWindow.InspectorBackend;
      backend.sendMessageObjectToBackend = this.sendMessageObject.bind(this);
      
      // Route events from chrome.debugger to WebInspector
      this.chrome.jsonHandlers['chrome.debugger.remote'] = {
        jsonObjectHandler:  function(data) {
          if (debug) {
            console.log("jsonObjectHandler "+data.method, data);
          }
          backend.dispatch.apply(backend, [data]);
        }.bind(this)
      };
    
      this.inspectorWindow.InspectorFrontendHost.sendMessageToBackend = function() {
        throw new Error("Should not be called");
      };

    },
    
    interceptMessages: function() {
      console.log("interceptMessages from websockets here");
    },

    patchInspector: function(callback) {
      if (debug) {
        console.log("DOMContentLoaded on inspectorWindow ", this);
      }
      this.inspectorWindow = window;

      // Hack to prevent inspector.js from initializing 
      InspectorFrontendHost.isStub = false;
      
      if (this.websocketParam) {
        this.interceptMessages();
      } else {
        this.rerouteMessages();
      }

      var WebInspector = this.inspectorWindow.WebInspector;
      WebInspector.attached = true; // small icons for embed in orion

      
      this.completeLoad = WebInspector.delayLoaded; // set by openInspector
    
      // Called asynchronously from WebInspector _initializeCapability
      // which is called by the load event vai doLoadedDone()
      this._doLoadedDoneWithCapabilities = 
        WebInspector._doLoadedDoneWithCapabilities;
        
      // Called by _doLoadedDoneWithCapabilities after panels are created by before we select the initial panel.  
      InspectorExtensionRegistry.getExtensionsAsync = function() {
        this.loadExtensions();
      }.bind(this);

      if (this.obeyTestRunner) {
        this.listenForTestRunner();
      }
    
      WebInspector._doLoadedDoneWithCapabilities = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        this._doLoadedDoneWithCapabilities.apply(WebInspector, args);
        this.loadCompleted();
      }.bind(this);
      
      this.completeLoad.call(this.inspectorWindow.WebInspector);

      // Undo Hack to prevent inspector.js from initializing 
      InspectorFrontendHost.isStub = true;
      callback && callback();
    },
    
    // When called as a WebApp, devtools extensions are loaded.
    loadExtensions: function() {
      var optionsString = window.localStorage.getItem('DevtoolsExtended.options');
      if (optionsString) {
        var options = JSON.parse(optionsString);
        if (options.extensionInfos && options.extensionInfos.length) {
          var infos = options.extensionInfos.map(function(info) {
            // send the tabId to build
            info.startPage += "?tabId="+this.tabId;
            return info;
          }.bind(this));
          WebInspector.addExtensions(infos);        
        }
      }
    },
    
    _eventListenersByDomain: {},
    
    navigateToURL: function(inspectorReady) {
      if (this.url) { // then we started in a new tab, navigate
        if (debug) {
          console.log('atopwi setting URL:'+this.url);
        }
        this.chrome.tabs.update(
          this.tabId, 
          {url: this.url}, 
          this.onTabUpdate.bind(this)
        );
      }
    },
    
    onTabUpdate: function(tab) {
      if (debug) {
        var msg = 'atopwi.chrome.tabs.update ' + this.tabId;
        msg += ' to ' + this.url;
        console.log(msg);
      }
    },
    
    sendMessageObject: function(messageObject) {
      if (debug) {
        var from = messageObject.id ? messageObject.id + ' from devtools ' : '';
        from += messageObject.requestId ? messageObject.requestId + ' from extension ' : '';
        
        console.log(from +" atopwi sendCommand "+messageObject.method);
      }
      
      // The socket protocol sends 'id' and the backend echoes it,
      // so we save it for the response
      function handleSendCommandResponse(id, data) {
        var response = {result: data, id: id};
        if (chrome.extension.lastError) {
            response.error = chrome.extension.lastError;
        }
        if (debug) {
          var msg = id + 
             " atopwi response to sendCommand " + messageObject.method;
             var obj = {messageObject: messageObject, data: data, response: response};
             console.log(msg, obj);
        }
        this.inspectorWindow.InspectorBackend.dispatch(response); 
      }
      
      this.chrome.debugger.sendCommand(
        {url: this.url, tabId: this.tabId}, 
        messageObject.method, 
        messageObject.params, 
        handleSendCommandResponse.bind(this, messageObject.id)
      );
    },

    testRunnerResponder: {
      evaluateInWebInspector: function(src) {
        return eval(src + "\n//@ sourceURL=testRunnerEvals.js");
      },
      notifyDone: function(message) {
        console.log("notifyDone "+message);
      }
    },

    listenForTestRunner: function() {
      chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
        console.log("message from testRunner: ", message);
        var method = this.testRunnerResponder[message.method];
        if (method) {
          sendResponse(method.apply(this.testRunnerResponder, message.arguments));
        } else {
          console.error("testRunnerResponder: no such method " + message.method + " from TestRunner ", message);
        }
      }.bind(this));
    },
    
    loadCompleted: function() {
      if (this.obeyTestRunner) {
        console.log("loadCompleted, sending runTest with window.InspectorTest: ", window.InspectorTest);
        chrome.extension.sendMessage({to: "testPage", method: "runTest", arguments: []}, function onResponse(response) {
            console.log("runTest response", response);
        }); 
      }
    },

};

return Debuggee;

});
