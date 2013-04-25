// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global chrome console window*/


// @return: connection object with attach/detach addListener/postMessage

function getChromeExtensionPipe(){

  var debug = false;

  var appEnd = {

    // Announce to the extn that we are running and
    // ask the extn to give us a port name unique to this connection
    attach: function(callback, errback) {
      if (!chrome || !chrome.extension) {
        throw new Error("Must be loaded into an iframe using a chrome extension url");
      }
      var request = {
        name:    getChromeExtensionPipe.NAME, 
        version: getChromeExtensionPipe.VERSION
      };
      chrome.extension.sendRequest(request, this.onAttach.bind(this, callback, errback));
    },

    detach: function() {
      this.port.disconnect();
    },
    // Get the assigned name of the port and connect to it
    //
    onAttach: function(callback, errback, response) {
      if (response.error) {
        var msg = response.error+": "+response.origin;
        msg += "\n Check cxr2app options in Chrome's Extension page";
        if (errback) {
          errback(msg);
        } else {
          window.alert(msg);
        }
        return;
      }
      if (!response.name) {
        console.error("crx2App the extension must send .name in response", response);
        return;
      }
    
      this.name = response.name;
      
      // open a long-lived connection using the assigned name
      this.port = chrome.extension.connect({name: this.name});
    
      // prepare for disconnection
      this.port.onDisconnect.addListener(this.onDisconnect);
    
      // prepare for extension messages to from extn to app
      this.port.onMessage.addListener(this.fromExtnToApp);
      
      // signal the app that we are ready
      callback();
    },
    
    // Our port closed
    onDisconnect: function() {
      this.fromExtnToApp({source:'crx2app', method: 'onDisconnect', params:[]});
      delete this.listener;
    },

    addListener: function(listener) {
      this.listener = listener; // may be null
    },
    
    fromExtnToApp: function(msgObj) {
      if (this.listener) {
        if (debug) {
          console.log("appEnd fromExtnToApp", msgObj);
        }
        this.listener(msgObj);
      } else { // else no listener
        console.info("crx2app.appEnd no listener for recv", msgObj);
      }
    },

    fromAppToExtn: function(msgObj) {
      if (debug) {
        console.log("appEnd postMessage", msgObj);
      }
      this.port.postMessage(msgObj);
    },
    
    _bindListeners: function() {
      this.onDisconnect = this.onDisconnect.bind(this);
      this.fromExtnToApp = this.fromExtnToApp.bind(this);
      
      this.attach = this.attach.bind(this);
      this.detach = this.detach.bind(this);
      this.fromAppToExtn = this.fromAppToExtn.bind(this);
      this.addListener = this.addListener.bind(this);
    }
  };
  
  appEnd._bindListeners();
  
  return {  // these functions are bound to appEnd, not the return object
    attach: appEnd.attach,
    postMessage: appEnd.fromAppToExtn,
    addListener: appEnd.addListener,
    detach: appEnd.detach,
    NAME: getChromeExtensionPipe.NAME,
    VERSION: getChromeExtensionPipe.VERSION
  };
}

getChromeExtensionPipe.NAME = 'crx2app';
getChromeExtensionPipe.VERSION = '1';

