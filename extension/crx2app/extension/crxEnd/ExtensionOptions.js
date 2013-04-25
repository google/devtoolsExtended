// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals document window */

function ExtensionOptions(key, defaultOptions, extractOptionsFromUI) {
  this.optionsKey = key;
  if (!this.restoreOptions())  {
    this._setOptions(defaultOptions);
  }
  this.extractOptionsFromUI = extractOptionsFromUI;  
}

ExtensionOptions.prototype = {

  _setOptions: function(options) {
    var stringified = JSON.stringify(options);
    window.localStorage.setItem(this.optionsKey, stringified);
  },

  restoreOptions: function() {
    var stringified = window.localStorage.getItem(optionsKey);
    var options;
    if (stringified) {
      try {
        options = JSON.parse(stringified);
        return options;
      } catch (exc) {
        // ignore corrupt data
      }  
    }
    return options;
  },

  saveOptions: function() {
    var options = this.restoreOptions() || {};
    options = this.extractOptionsFromUI(options);
    this._setOptions(options);
  }
}



