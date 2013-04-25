// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window */

var ScriptInjector = (function()  {

  var debug = true;

  var ScriptInjector = {

    injectScripts: function(urls, win) {
      if (urls.length && urls.shift && win && win.document) {
        this.files = urls;
        this._continueInjection(win);
      } else {
        throw new Error("usage: injectScripts([url-strings], window)");
      }
    },
    
    // Recurse by chaining off the load event, 
    // then wait for the connection event
    _continueInjection: function(win) {
      if(this.files.length) {
        this._injectScript(this.files.shift(), win);
      }
    },
    
    _injectScript: function(file, win) {
      var element = win.document.createElement('script');
      element.setAttribute('src', file);
    
      function onError() {
        var args = Array.prototype.slice.call(arguments, 0);
        if (debug) {
          console.log("override script load error "+file, args);
        }
      }
    
      function onLoad() {
        if (debug) {
          console.log("Load complete for "+file);
        }
        element.removeEventListener('load', onLoad, false);
        element.removeEventListener('error', onError, false);
        // Recurse
        this._continueInjection(win);  
      }
    
      element.addEventListener('load', onLoad.bind(this), false);
      element.addEventListener('error', onError, false);
    
      win.document.body.appendChild(element);
    }
  };

  return ScriptInjector;

}());