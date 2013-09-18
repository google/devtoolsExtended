// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window */


define([], 
function(  )  {

  // dynamic iframe load
  //
  function appendFrame(eltOrSelector, url) {
    var iframe = window.document.createElement('iframe');
    iframe.setAttribute('src', url);
    var elt = eltOrSelector;
    if (!eltOrSelector.ownerDocument) {
      elt = window.document.querySelector(eltOrSelector);
    }
    elt.appendChild(iframe);
    return iframe;
  }

return appendFrame;

});