// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2013 Google Inc. johnjbarton@google.com

var server;
ChannelPlate.ChromeBackgroundListener(function(rawPort){
  server = new RemoteMethodCall.Responder(XHRInBackground, rawPort);
});
