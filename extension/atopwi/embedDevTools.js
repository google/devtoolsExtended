// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window ScriptInjector*/

// requires ScriptInjector

(function()  {

  var debug = true;
  
  window.WebInspector.delayLoaded = window.WebInspector.loaded;
  window.WebInspector.loaded = function() {
    if (debug) {
      console.log('WebInspector patched at load event');
    }
  };

  var InspectorPatch = {

    // relative to WebInspectorKit/Source/WebCore/inspector/front-end
    files: [
       '../../../../../crx2app/extension/lib/requirejs/require.js',
       '../../../../../ChannelPlate/ChannelPlate.js',
       '../../../../../crx2app/extension/appEnd/appEnd.js',
       '../../../../../atopwi/loadDebuggee.js'
      ],

    patchInspector: function(event) {
      if (debug) {
          console.log('WebInspector at DOMContentLoaded event');
       }
      var win = event.currentTarget;
      ScriptInjector.injectScripts(this.files, win);
    }
  };
    
  window.addEventListener(
     'DOMContentLoaded', 
      InspectorPatch.patchInspector.bind(InspectorPatch)
  );
    
  window.addEventListener(
      'load',
      function() {
        if (debug) {
          console.log('WebInspector at load event');
        }
  });  
}());