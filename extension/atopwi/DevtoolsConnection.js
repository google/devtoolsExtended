// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window */


define(['appendFrame'], 
function(appendFrame)  {

  var debug = true;

  var DevtoolsConnection = { 

    openInspector: function(debuggee) {
      this.debuggee = debuggee;
      this.listenDebuggee(this._addWebInspectorIframe());
    },
    
    _addWebInspectorIframe: function() {
      this.showWaiting();
      return appendFrame('.WebInspectorContainer', "about:blank");
    },
 
    showWaiting: function() {
      window.document.querySelector('.devtoolsBackendURL').textContent = this.debuggee.devtoolsURL;
      this._timeoutIndex = setTimeout(this._reportTimeout.bind(this), 2000);
    },
 
    _reportTimeout: function() {
       window.document.querySelector('.splashWaitingMessage').textContent = " No response!"
    },
 
    showInspectorIframe: function() {
      clearTimeout(this._timeoutIndex);
      var inspectorElt = window.document.querySelector('.WebInspectorContainer');
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
      ChannelPlate.Parent(childFrame, this.debuggee.devtoolsURL, function(rawPort){
        // TODO use RemoteMethodCall to atopwi
        this.portToDevtools = new ChannelPlate.Base(rawPort, this.onMessage.bind(this));
        this.portToDevtools.postMessage({
          method: 'debuggee',
          arguments: [this.debuggee]
        });  
      }.bind(this));
    },
    
    onMessage: function(message) {
      if (debug) {
        console.log("atopwi puts debuggee %o and hears %o", this.debuggee, message);
      }
      // Check that we get the signal from WebInspector
      if (message[0] && message[0] === 'loadCompleted') {
        this.showInspectorIframe();
      }
    },
    
  };
  
  return DevtoolsConnection;
});