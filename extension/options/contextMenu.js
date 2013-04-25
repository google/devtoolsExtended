// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global console window chrome*/

/* 
 * Returns a number or null
 */
function ensureNumber(n) {
  return isFinite(n) ? n : null;
}
 
// return a contextMenu onclick handler that opens a chrome popup window
//
function halfWidthWindowOpener(url, onWindowCreated) {
  return function(info, tab) {

    var createData = {url: url, type: 'popup' };

    var width = parseInt(window.localStorage.getItem('windowWidth'), 10);
    createData.width = ensureNumber(width) || (Math.floor(window.screen.availWidth / 2) - 2);

    var height = parseInt(window.localStorage.getItem('windowHeight'), 10);
    createData.height = Math.max( (isFinite(height) ? height : 0) , window.screen.availHeight - 80);

    var top = parseInt(window.localStorage.getItem('windowTop'), 10);
    createData.top = ensureNumber(top) || window.screen.availTop;

    var left = parseInt(window.localStorage.getItem('windowLeft'), 10);
    createData.left = ensureNumber(left) || (window.screen.availLeft + (window.screen.availWidth - createData.width) );

    // Open Purple in a new window.
    chrome.windows.create(createData, onWindowCreated.bind(null, info, tab));
  };
}

function formDebuggerURL(allowedSite, debuggeeTabId, debuggeeURL) {
  var q = allowedSite.indexOf('?');
  var separator = (q === -1) ? '?' : '&';
  return allowedSite + separator + 'tabId=' + debuggeeTabId + '&' + 'url=' + debuggeeURL;
}

function buildContextMenuItem(title, opener) {
  chrome.contextMenus.remove(title, function() { 
    chrome.contextMenus.create({
      "title" : title,
      "type" : "normal",
      "contexts" : ["page"],
      "onclick" : opener
    });  
  });
 
}