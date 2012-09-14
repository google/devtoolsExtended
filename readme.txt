DevtoolsExtended

Experimental extension of Chrome Devtools:
  Run Chrome devtools in an iframe hosted in a chrome extension.
  Connects to Chrome over the chrome.devtools.debugger extension API or WebSockets,
  Extensible, supports devtools extensions for remote debugging,
  Experimental patches to devtools adding new extension features.

Branch syncToWebKit: a copy of Web Inspector source,
  see tools/updateFromWebKit.sh.
  should only affect extension/WebInspectorKit

Branch atopwi: a Web app/chrome extension shell around Web Inspector allowing it to run
  over chrome.devtools.debugger extension protocol.
  This branch sits at the lowest point we can test 

Patch Branch: NNNNN_XYZ branches are patches on Web Inspector.
  These patches should only change patches/ and extension/WebInspectorKit
  These branches form a patch queue, see rebaseStack.sh