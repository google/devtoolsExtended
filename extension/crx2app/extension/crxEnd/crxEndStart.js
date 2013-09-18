/*globals window restoreOptions buildContextMenuItem */

if (!window.define) {

  window.define = function(deps, defn) {
    window.remote = defn();
  };
 
}

var  WindowsAdapter = makeWindowsAdapter(chrome, PostSource);
var  TabsAdapter = makeTabsAdapter(chrome, PostSource);
var  DebuggerAdapter = makeDebuggerAdapter(chrome, PostSource, window.remote);


function adapterFactory(origin, debuggerTab) {
  var adapters = {};
  var windowsAdapter = new WindowsAdapter(origin, debuggerTab);
  adapters[WindowsAdapter.path] = windowsAdapter;
  adapters[TabsAdapter.path] = new TabsAdapter(windowsAdapter);
  adapters[DebuggerAdapter.path] = new DebuggerAdapter(windowsAdapter);
  return adapters;
}

// return an extended chrome.contextMenu onClick handler closed over a 'site'
// callback(debuggerTab, debuggeeTab) 
//
function allowSiteWhenDebuggerOpens(site, callback, extraURLParams) {
  return function onDebuggerWindowCreated(onClickInfo, debuggeeTab, win) {
    var debuggerTab = win.tabs[0];

    // We just created a window for the debugger. 
    // We gave it a tabId via the URL parameters, it will now try to attach to that tabId
    // We need to allow it by finding the right instance of windowsAdapter and calling addTab.

    crxEnd.checkDebuggerOrigin(
      site, 
      function onValidOrigin(validOrigin) {
        WindowsAdapter.addUserSelectedTab(debuggeeTab.id);

        var windowsAdapter = crxEnd.getWindowsAdaptersByOrigin(validOrigin, debuggerTab);
        if (!windowsAdapter) {  // then this origin has not been seen
           windowsAdapter = crxEnd.createWindowsAdapter(validOrigin, debuggerTab);
        } else {
           windowsAdapter.addTab(debuggerTab);
        }

        var url = site + '?tabId=' + debuggeeTab.id + '&' + 'url=' + encodeURIComponent(onClickInfo.pageUrl);
        if (extraURLParams) 
          url += extraURLParams;

        // now release the debugger
        var onUpdate = callback ? callback.bind(null, debuggeeTab) : null;
        chrome.tabs.update(debuggerTab.id, {url: url}, onUpdate);
      }, 
      function onInvalid(msg) {
        // TODO we are in a context menu handler, should we alert?
        console.error(msg);
        return;
      }
    );
  };
}

// return a chrome.contextMenus onclick handler that opens and allows a debugger from 'site'
//
function debuggerOpener(site, callback, extraURLParams) {
  // open blank and update to avoid racing debugger attaching to the tab   
  //********** workaround for http://code.google.com/p/chromium/issues/detail?id=108519
  var crx2appBase = window.crx2appBase || "crx2app/extension"; 
  var fakeBlankURL = crx2appBase + '/workaroundBug108519.html';
  //**********
  return halfWidthWindowOpener(fakeBlankURL, allowSiteWhenDebuggerOpens(site, callback, extraURLParams));
}

function obeyOptions() {

  window.debugConnection = false;
  window.debugMessages = false;
  window.debugWarnings = false;
  window.debugAdapters = false;

  var options = restoreOptions();
  if (!options) {  // maybe our first time
    return;
  }
  
  window.debugConnection = options.debugConnection;
  window.debugMessages = options.debugMessages;
  window.debugWarnings = options.debugWarnings;
  window.debugAdapters = options.debugAdapters;
  
  options.allowedSites = options.allowedSites || [];
  
  options.allowedSites.forEach(function(allowedSite) {
    var title = 'Debug With ' + allowedSite.name;  
    if (title && title !== '(none)') {
      var onClick = debuggerOpener(
        allowedSite.site, 
        function(debuggeeTab, debuggerTab) {
          console.log("debugger %o, debugeee %o", debuggerTab, debuggeeTab);
        }
      );

      buildContextMenuItem(title, onClick);
    }
  });
}

obeyOptions();

var crxEnd = makeCxrEnd(getChromeExtensionPipe, chrome);
crxEnd.attach(adapterFactory);