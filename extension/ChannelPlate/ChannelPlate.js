// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

// ChannelPlate:  a switchplate, covering over API differences in MessageChannel APIs.
//  Pass your onMessage handler to the constructor, 
//  send your messages via method postMessage(message)

var ChannelPlate = (function channelPlateModule() {

"use strict";
var DEBUG = false;

// ----------------------------------------------------------------------------
// Utilities

function assertFunction(onmessage) {
  if (!onmessage || ! typeof onmessage === 'function' ) {
    throw new Error("onmessage argument must be a function");
  }
}

function getWebOrigin(href) {
  // ftp://ftp.rfc-editor.org/in-notes/rfc3986.txt Appendix B
  var reURIString = "^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?";
  var reURI = new RegExp(reURIString);

  // The Web Origin Concept RFC 6454
  // 
  var origin = "";
  var m = reURI.exec(href);
  if (m) {
    var scheme = m[2];
    var authority = m[4];
    
    if (scheme) {
      if (scheme === 'file') {
        origin = "null"; 
      } else {
        origin += scheme;
        origin += ":";
        if (authority) {
          origin += "//";
          origin += authority;
        }
      }
    }

  } // else malformed
  
  return origin;
}

function Base(rawPort, onMessage) {
  if (rawPort) {
    this._assign(rawPort, onMessage); 
  }
}

Base.channelPlates = 0;

Base.prototype = {

  postMessage: function(message) {
    if (this.port) {
      this.port.postMessage(message);
    } else {
      this.queue = this.queue || [];
      this.queue.push(message);
    }
  },

  set onmessage(onMessage) {
    function repackage(event) {
      onMessage(event.data, event);
    }
    if (this.port.onMessage) { // chrome extension 
      this.port.onMessage.addListener(onMessage);
    } else {  // W3c, implicitly calls start()
      this.port.onmessage = repackage;
    }
    if (this.port.plate !== this) 
      console.error("mismatched plates");
  }, 

  accept: function(port, onMessage) {
    this._assign(port, onMessage);
    this._drainQueue();
  },

  _assign: function(port, onMessage) {
    this.port = port;
    this.plateNumber = ++Base.channelPlates;
    this.port.plate = this;
    if (onMessage) {
      this.onmessage = onMessage;
    }
  },

  _drainQueue: function() {
    if (this.queue) {
      this.queue.forEach(function(message) {
        this.postMessage(message);
      }.bind(this));
    }
    delete this.queue;
  }
};


//-----------------------------------------------------------------------------
//  Client using eventWindow.postMessaage to send port

function Talker(eventWindow, onMessage) {
  assertFunction(onMessage);
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/web-messaging.html#channel-messaging
  
  // We will be the client and post to the listening parent (server)
  this.channel = new window.MessageChannel();

  // We allow the parent from any origin
  this.targetOrigin = "*";
  
  // One of the ports is kept as the local port
  this.port = this.channel.port1;
  
  // The other port is sent to the remote side
  eventWindow.postMessage(['ChannelPlate', window.location.href], this.targetOrigin, [this.channel.port2]);

  // Implicitly start the port
  this.port.onmessage = onMessage;

  window.addEventListener('unload', function onUnload() {
     this.port.close();
   }.bind(this));
}

Talker.prototype = Object.create(Base.prototype);

//-----------------------------------------------------------------------------
//  For communicating from an iframe to its window.parent

function ChildIframe(onMessage) {
  Talker.call(this, window.parent, onMessage);
}

ChildIframe.prototype = Object.create(Talker.prototype);

//-----------------------------------------------------------------------------
//  For communicating from a web page to its content window

function WebPage(onMessage) {
  Talker.call(this, window, onMessage);
}

WebPage.prototype = Object.create(Talker.prototype);

//-----------------------------------------------------------------------------
// web window Server, listening for connection  

function Listener(clientWebOriginOrURL, onConnect) {
  // If the url is relative the origin will match window.location
  var targetOrigin = getWebOrigin(clientWebOriginOrURL) || getWebOrigin(window.location.toString());

  function onChannelPlate(event) {
    if (!event.data || !event.data[0] || event.data[0] !== 'ChannelPlate') {
      // We are a port-creator for ChannelPlate, nothing else.
      return;
    } 

    if (event.origin !== "null" && targetOrigin !== event.origin) {
      // The event.origin was either unexpected or unset.
      return;
    }

    onConnect(event.ports[0], event.data[1]);
  }

  if (DEBUG) {
    console.log('start listening in ' + window.location.href);
  }

  window.addEventListener('message', onChannelPlate);
}

//-----------------------------------------------------------------------------
// For communicating from a window to an iframe child

function Parent(existingChildIframe, srcURLToAssign, onConnect) {
  function filterOnConnect(rawPort, url) {
    if (url.indexOf(srcURLToAssign) !== -1)
      onConnect(rawPort, url);
  }
  Listener(srcURLToAssign, filterOnConnect);
  if (!existingChildIframe) {
    throw new Error("First argument must be an existing iframe");
  }
  existingChildIframe.src = srcURLToAssign;    
}


//-----------------------------------------------------------------------------
// For background pages listening for foreground connections
// Create a new Listener port for each foreground contact

function ChromeBackgroundListener(onConnect) {
  
  var onRawConnect = function(rawPort) {
    if (DEBUG) { 
      console.log("onConnect ", rawPort)
    }
    if (DEBUG) {
      console.log(window.location + " accept "+ rawPort.name);
    }

    onConnect(rawPort);
    
    rawPort.onDisconnect.addListener(function() {
      if (DEBUG) {
        console.log("onDisconnect " + rawPort.name);  
      }
    }.bind(this));
  }.bind(this);

  chrome.extension.onConnect.addListener(onConnect);        
  
};

//-----------------------------------------------------------------------------
// For foreground pages to contact background pages.
// Note  the name argument on each content script must be unique 

function ContentScriptTalker(myName, onMessage) {
  this.port = chrome.extension.connect({name: myName});
  function onDisconnect(event){
    console.log("ChromeTalker onDisconnect ", event);
     delete this.port;
  }
  this.port.onDisconnect.addListener(onDisconnect.bind(this));
  this.port.onMessage.addListener(onMessage);
}

ContentScriptTalker.prototype = Object.create(Base.prototype);


function DevtoolsTalker(onMessage) {
  var name = encodeURIComponent(window.location.href).replace(/[!'()*]/g, '_');
  ContentScriptTalker.call(this, name, onMessage);
}

DevtoolsTalker.prototype = Object.create(ContentScriptTalker.prototype);

//-----------------------------------------------------------------------------
// Common functions for proxies

var ProxyBasePrototype = {

  addPort: function(port, connectionId, incomingPorts, outgoingPorts) {
    var onMessage = this.proxyMessage.bind(this, connectionId, outgoingPorts);
    var queueingPort = incomingPorts[connectionId];
    
    if (queueingPort) {
      queueingPort.accept(port, onMessage);
    } else {
      incomingPorts[connectionId] = new Base(port, onMessage);
    }
    
    if (port.onDisconnect) {  // chrome extension
      port.onDisconnect.addListener(function () {
        delete incomingPorts[connectionId];
      }.bind(this));
    }
    
    console.log("connect "+connectionId+" to "+port);
  }, 

  proxyMessage: function(tabId, outgoingPorts, message) {
    var port = outgoingPorts[tabId];
    if (!port) { // no devtools open for the page
      port = outgoingPorts[tabId] = new Base();
    }    
    port.postMessage(message);
    console.log("proxyMessage to %o: %o", port, message);
  },
}

//-----------------------------------------------------------------------------
// Match content-script ports to devtools ports and ferry messages between them.

function ChromeDevtoolsProxy() {
  this.devtoolsPorts = {};
  this.backgroundPorts = {};

  function onConnect(port) {

    if(port.name.indexOf('devtools') === 0) {
      var tabId = port.name.split('-')[1];
      this.addPort(port, tabId, this.devtoolsPorts, this.backgroundPorts);
    } else {
      var tabId = port.sender.tab.id;
      this.addPort(port, tabId, this.backgroundPorts, this.devtoolsPorts);
    }
  }

  chrome.extension.onConnect.addListener(onConnect.bind(this));
}

ChromeDevtoolsProxy.prototype = ProxyBasePrototype;

//-----------------------------------------------------------------------------
// Match webpage ports to content-script ports and ferry messages between them.

function ContentScriptProxy() {
  this.backgroundPorts = {};
  this.webpagePorts = {};

  /// This will be the background page
  var port = chrome.extension.connect({name: 'content-script'});
  this.addPort(port, 'content-script', this.backgroundPorts, this.webpagePorts);

  this.targetOrigin = getWebOrigin(window.location.href);

  // Listen for web page connections
  //
  var onChannelPlate = function(event) {

    if (event.data !== 'ChannelPlate') {
      return;
    } 

    if (this.targetOrigin !== event.origin) {
      return;
    }

    this.addPort(event.ports[0], 'content-script', this.webpagePorts, this.backgroundPorts);
    
    // Once we addPort to the child window stop listening for it to connect.
    //
    window.removeEventListener('message', onChannelPlate);
  }.bind(this);

  window.addEventListener('message', onChannelPlate);

}

ContentScriptProxy.prototype = ProxyBasePrototype;

//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Define our exports

return {
  // Base class for accepted connetion ports
  Base: Base,
  // Base class for waiting for connection events
  Listener: Listener,  
  // Waits for connection events from iframes
  Parent: Parent,
  // Base class for starting channels
  Talker: Talker,
  // Starts channels to window.parent
  ChildIframe: ChildIframe,
  // Starts channels from web pages to chrome content scripts
  WebPage: WebPage,
  // Starts channels from chrome content scripts to background 
  ContentScriptTalker: ContentScriptTalker,
  // Starts channels from devtools to background
  DevtoolsTalker: DevtoolsTalker,
  // Waits for web page and background then forward between 
  ContentScriptProxy: ContentScriptProxy,
  // Waits for devtools and background then forward between
  ChromeDevtoolsProxy: ChromeDevtoolsProxy,
  // Waits for extension connection, creates ChannelPlate connection.
  ChromeBackgroundListener: ChromeBackgroundListener,
};

}());
