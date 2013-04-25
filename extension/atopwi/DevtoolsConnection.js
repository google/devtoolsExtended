// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window */


define(['appendFrame'], 
function(appendFrame)  {

  var debug = false;

  var DevtoolsConnection = { 

    openInspector: function(debuggee) {
      this.debuggee = debuggee;
      this.listenDebuggee(this.getWebInspectorIframe());
    },
    
    getWebInspectorIframe: function() {
      this.showWaiting();
      return appendFrame('WebInspector', "about:blank");
    },
 
    showWaiting: function() {
      window.document.querySelector('.devtoolsBackendURL').textContent = this.debuggee.devtoolsURL;
    },
 
    showInspectorIframe: function() {
      var inspectorElt = window.document.getElementById('WebInspector');
      inspectorElt.classList.remove('hide');
      window.document.querySelector('.splash').classList.add('hide');
      if (debug) {
        console.log("append WebInspector from "+this.debuggee.devtoolsURL);
      }

    },

    listenDebuggee: function(childFrame) {
      if (debug) {
        console.log("DevtoolsConnection sending debuggee ", this.debuggee);
      }
      this.portToDevtools = new ChannelPlate.Parent(childFrame, this.debuggee.devtoolsURL, this.onMessage.bind(this) );
      this.portToDevtools.postMessage({
        method: 'debuggee',
        arguments: [this.debuggee]
      });
    },
    
    onMessage: function(message) {
      if (debug) {
        console.log("atopwi puts debuggee %o and hears %o", this.debuggee, message);
      }
      if (message.data[0] && message.data[0] === 'loadCompleted') {
        this.showInspectorIframe();
      }
    },
    
  };
  
  return DevtoolsConnection;
});