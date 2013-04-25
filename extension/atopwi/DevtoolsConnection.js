// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window */


define(['appendFrame'], 
function(appendFrame)  {

  var debug = false;

  var DevtoolsConnection = { 

    openInspector: function(debuggee) {
      this.debuggee = debuggee;
      this.listenDebuggee( this.showInspectorIframe());
    },
 
    showInspectorIframe: function() {
      var inspectorElt = window.document.getElementById('WebInspector');
      inspectorElt.classList.remove('hide');
      console.log("append WebInspector from "+this.debuggee.devtoolsURL);
      return appendFrame('WebInspector', "about:blank");
    },

    listenDebuggee: function(childFrame) {
      if (debug) {
        console.log("DevtoolsConnection listening ");
      }
      this.portToDevtools = new ChannelPlate.Parent(childFrame, this.debuggee.devtoolsURL, this.onMessage.bind(this) );
      this.portToDevtools.postMessage({
        method: 'debuggee',
        arguments: [this.debuggee]
      });
    },
    
    onMessage: function(message) {
      console.log("atopwi puts debuggee %o and hears: "+message, message);
    },
    
  };
  
  return DevtoolsConnection;
});