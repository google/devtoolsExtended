// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global console window chrome*/

/* 
 * Returns a number or null
 */
function insureNumber(n) {
  return isFinite(n) ? n : null;
}
      
function buildContextMenuItem(title, url, onDebuggerWindowCreated) {
      /**
       * Returns a handler which will open url?tabId=tab.id in a new window when activated.
       */
      function getClickHandler() {
        return function(info, tab) {

          var createData = {url: url, type: 'popup' };

          var width = parseInt(window.localStorage.getItem('windowWidth'), 10);
          createData.width = insureNumber(width) || (Math.floor(window.screen.availWidth / 2) - 2);

          var height = parseInt(window.localStorage.getItem('windowHeight'), 10);
          createData.height = Math.max( (isFinite(height) ? height : 0) , window.screen.availHeight - 80);

          var top = parseInt(window.localStorage.getItem('windowTop'), 10);
          createData.top = insureNumber(top) || window.screen.availTop;

          var left = parseInt(window.localStorage.getItem('windowLeft'), 10);
          createData.left = insureNumber(left) || (window.screen.availLeft + (window.screen.availWidth - createData.width) );

          // Open Purple in a new window.
          chrome.windows.create(createData, onDebuggerWindowCreated.bind(null, info, tab));
        };
      }

      /**
       * Create a context menu which will only show up on all pages
       */
      chrome.contextMenus.create({
        "title" : title,
        "type" : "normal",
        "contexts" : ["page"],
        "onclick" : getClickHandler()
      });
}