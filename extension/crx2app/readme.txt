crx2app A Barrier Proxy giving Web app limited access to Chrome Browser extensions.

// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

Install
  Use Chrome Browser version 19 or larger (dev channel as of Jan 2012)
  
  Clone this reprository
  
  Use URL chrome://extensions, 
    set developer mode, 
    load unpacked extension, 
    navigate to the clone,
    find the subdirectory /extension
    open it to select this folder as the unpacked extension
    ==> the crx2app extension should be loaded
    
  Open chrome://extensions 
    Find extension "crx2app"
    Click "options" link, 
      ==> You should see a yellow page
    add the URL of your Web debugger.
  
  Testing: 
    ATopWI is Chrome DevTools (Web Inspector) running in an iframe on crx2app:
      https://github.com/johnjbarton/atopwi
    Clone the project
    Open the as a web page: atopwi.html. This will run a simple test by default
       (Uses the slow github server...)
    Put the URL for that page into the crx2app options page, set the name to "ATopWI"
    From chrome://extensions reload crx2app (to rebuild the context menu)
    Use the context menu item to open the test.
  
  
Using Orion
  If you are using Orion, your clone will have a URL like 
    http://orionhub.org/edit/edit.html#/file/PQ/test/index.html
    open http://orionhub.org/file/PQ/test/index.html
 
Directories
  crxEnd/ chrome side of proxy, use the chromeIframe.html as serc in your web page
  appEnd/ app side of proxy, include these files in your web page
  rpc/ marshalling/dispatch code for appEnd use
  lib/ q.js and require.js used in rpc/ and demos
  test/ demo app
  