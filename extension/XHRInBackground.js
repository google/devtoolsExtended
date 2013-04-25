// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

function XHRInBackground(rawPort) {
  ChannelPlate.ChromeBackground.call(this, rawPort);
}

XHRInBackground.prototype = Object.create(ChannelPlate.ChromeBackground.prototype);

// Cross site XHR, xhr(url) -> content 
//
XHRInBackground.prototype.xhr = function(url, callback, errback) {
  console.log("start xhr "+url);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function(e) {
    if (xhr.status == 200 || xhr.status == 0) {
      console.log("end xhr "+url);
      callback(xhr.responseText);
    } else {
      console.error("err xhr "+url);

      errback(xhr.status);
    }
  }.bind(this), false);
  var onFailure = function() {
    errback.apply(null, arguments);
  }.bind(this);
  xhr.addEventListener('error', onFailure, false);
  xhr.addEventListener('abort', onFailure, false);
  xhr.send();
};


ChannelPlate.ChromeBackground.startAccepter(XHRInBackground);