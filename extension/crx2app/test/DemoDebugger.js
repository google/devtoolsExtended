// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*global define console window */
define(  ['crx2app/rpc/ChromeDebuggerProxy'], 
  function(            ChromeDebuggerProxy) {
  
  function output() {
    window.parent.postMessage(arguments,"*");
  }
  
  var DemoDebugger = ChromeDebuggerProxy.extend({
  
    Debugger: {
      events: {
        breakpointResolved: function(breakpointId, location) {
          output("DemoDebugger", arguments);
        },
        paused: function(details) {
          output("DemoDebugger paused", arguments);
        },
        resumed: function() {
          output("DemoDebugger", arguments);
        },
        scriptFailedToParse: function(data, errorLine, errorMessage, firstLine, url) {
          output("DemoDebugger", arguments);
        },
        scriptParsed: function(scriptId, url, startLine, startColumn, endLine, endColumn, isContentScript, sourceMapURL, p_id) {
          output('scriptParsed '+url);
        }
      }
    },

    initialize: function(chromeProxy, debuggee) {
      ChromeDebuggerProxy.initialize.apply(this, [chromeProxy, debuggee]);
      ChromeDebuggerProxy.Debugger.addListener(this.Debugger.events);
    }
  
  });


  return DemoDebugger;
});