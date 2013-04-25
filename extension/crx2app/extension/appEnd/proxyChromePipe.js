// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global window define exports require console chromeExtensionPipe */

// Listens for postMessage events and forwards them as if this was the chrome pipe
// Can be loaded from an http URL
// Should be connected to an iframeDomain in chrome-extension//

// @return: connection object with attach/detach addListener/postMessage

(function (definition) {
  if (typeof define === 'function') { // RequireJS
    define(['require'], definition); 
  } else { // <script>
    chromeExtensionPipe = {};  // global
    definition(undefined);
  }
}(function (serverRequire) {

var chromeExtensionPipe = {};  

chromeExtensionPipe.createFrom = function(crx2appBase){

  var debug = window.debugChromeDebuggerRemote || false;
  
  var iframeDomain = crx2appBase.split('/').slice(0,3).join('/');

  var proxyEnd = {

    // call this method before the chromeIframe can load
    // so we can be listening for its introduction message.
    // do not call .addListener or .postMessage until the callback fires.
    attach: function(callback) {
      this.listeners = [];
      this.onIntroduction = this.onAttach.bind(this, callback);
      window.addEventListener('message', this.onIntroduction, false);
      if (debug) {
        console.log("proxyChromePipe awaiting introduction from "+iframeDomain);
      }
    },

    detach: function() {
      window.removeEventListener('message', this.fromExtnToApp, false);
    },
    
    // Get the source window and listen to it
    //
    onAttach: function(callback, event) {
      if (event.origin === iframeDomain) {
        if (debug) {
          console.log("proxyChromePipe onAttach called by "+event.origin);
        }
        
        // Remember our partner
        this.source = event.source; 

        // detach this listener
        window.removeEventListener('message', this.onIntroduction, false);
        
        // the proxying function will callback on the reply from the chromeIframe
        this.onExtnIntro = function(data) {
          // do the callback dance one time only
          this.removeListener(this.onExtnIntro);

           // signal the app that we are ready
          callback();
          
        }.bind(this);
        this.addListener(this.onExtnIntro);

        // rebind the listener to proxying function
        window.addEventListener('message', this.fromExtnToApp, false);
      
        // signal the extn that we are ready by forwarding the introduction
        this.fromAppToExtn(event.data); 
      } // else not for us
    },
    
    // Our port closed
    onDisconnect: function() {
      this.fromExtnToApp({source:'crx2app', method: 'onDisconnect', params:[]});
    },

    //--------------------------------------------------------------------------------------
    
    hasListener: function(listener) {
      return (this.listeners.indexOf(listener) + 1);
    },

    addListener: function(listener) {
      if ( listener && !this.hasListener(listener) ) { 
        this.listeners.push(listener);
        if (debug) {
          console.log("proxyChromePipe addListener "+this.listeners.length+": "+listener);
        }
      }
    },
    
    removeListener: function(listener) {
      var number = this.hasListener(listener);
      if (number) {
        this.listeners.splice( (number - 1), 1);
      }
    },
    
    //--------------------------------------------------------------------------------------    
    
    fromExtnToApp: function(event) {
      if (event.origin === iframeDomain) {
        if (debug) {
          console.log("crx2app.proxyChromePipe.fromExtnToApp in "+window.location, event);
        }
        this.listeners.forEach(function(listener) {
          listener(event.data);
        }); 
      } // else not for us
    },

    fromAppToExtn: function(msgObj) {
      if (!this.listeners.length) {
        console.warning("crx2app.appEnd.proxyChromePipe.fromAppToExtn: sending but not listening");
      }
      if (debug) {
        console.log("proxyChromePipe postMessage "+iframeDomain, msgObj);
      }
      this.source.postMessage(msgObj, iframeDomain);
    },
    
    _bindListeners: function() {
      this.onDisconnect = this.onDisconnect.bind(this);
      this.fromExtnToApp = this.fromExtnToApp.bind(this);      
    }
  };
  
  proxyEnd._bindListeners();
  
  return {  // these functions are bound to proxyEnd, not the return object
    attach: proxyEnd.attach.bind(proxyEnd),
    postMessage: proxyEnd.fromAppToExtn.bind(proxyEnd),
    addListener: proxyEnd.addListener.bind(proxyEnd),
    removeListener: proxyEnd.removeListener.bind(proxyEnd),
    detach: proxyEnd.detach.bind(proxyEnd),
    NAME: chromeExtensionPipe.NAME,
    VERSION: chromeExtensionPipe.VERSION
  };
};

chromeExtensionPipe.NAME = 'crx2app';
chromeExtensionPipe.VERSION = '1';

return chromeExtensionPipe;

}));

