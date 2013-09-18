// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2013 Google Inc. johnjbarton@google.com

// Add this to the manifest.json:
// "background": {
//      "scripts": ["ChannelPlate/ChannelPlate.js", "ChannelPlate/RemoteMethodCall.js", ChannelPlate/XHRInBackground.js"] // workaround CSP
//    },


var DEBUG = false;

var totalRequests = 0;
var totalCallback = 0;
var totalErrback = 0;

if (DEBUG) {
  setInterval(function() {
    console.log("Requests " + totalRequests + " = " + totalCallback + ' callbacks + ' + totalErrback + ' errbacks');
  }, 5000);
}

var XHRInBackground = {};

// Cross site XHR, xhr(url) -> content 
//
XHRInBackground.request = function(method, url, callback, errback) {
  if (!callback || !errback) {
    throw new Error("Both callback and errback functions are required");
  }
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.addEventListener('load', function(e) {
    if (xhr.status == 200 || xhr.status == 0) {
      if (DEBUG) 
        console.log("end xhr "+url);
      totalCallback++;
      callback(xhr.responseText);
    } else {
      if (DEBUG) 
        console.error("err xhr "+url);
      totalErrback++;
      errback(xhr.status);
    }
  }.bind(this), false);
  var onFailure = function() {
    errback.apply(null, arguments);
  }.bind(this);
  xhr.addEventListener('error', onFailure, false);
  xhr.addEventListener('abort', onFailure, false);
  totalRequests++;
  xhr.send();
};


// Cross site XHR, xhr(url) -> content 
//
XHRInBackground.xhr = function(url, callback, errback) {
  if (DEBUG)
    console.log("start xhr "+url);
  this.request('GET', url, callback, errback);
};

XHRInBackground.GET = function(url, callback, errback) {
  this.request('GET', url, callback, errback);
};

// Cross site XHR WebDAV, xhr(url) -> content 
//
XHRInBackground.PUT = function(url, callback, errback) {
  this.request('PUT', url, callback, errback);
};

// Cross site XHR WebDAV, xhr(url) -> content 
//
XHRInBackground.PROPFIND = function(url, callback, errback) {
  this.request('PROPFIND', url, callback, errback);
};

