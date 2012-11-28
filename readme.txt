DevtoolsExtended

Experimental extension of Chrome Devtools:
  Run Chrome devtools in an iframe hosted in a chrome extension.
  Connects to Chrome over the chrome.devtools.debugger extension API or WebSockets,
  Extensible, supports devtools extensions for remote debugging,
  Experimental patches to devtools adding new extension features.

Install:
  Use Chrome Canary (or trunk build)
  clone this repo, checkout branch 'atopwi'
  Chrome -> chrome://extensions -> Load Unpacked extensions -> repo directory extension/

Use:
  Any non-chrome web page: right click Debug with DevtoolsExtended.

Extend:
  Chrome -> chrome://extensions -> DevtoolsExtended -> options
  Add Extension: give the chrome-extension:// URL to any devtools extension with modified(*) .html files.
  (*) See the options page for details.
  Two extensions are configured by default:
    qpp Querypoint debugging prototype,
    devtools-save custom file save tool for qpp. 
  These must be installed as chrome-extensions (see the down arrow on the options page) and enabled in the options page.

Develop:
  Beware, this project uses rebase workflow!
  clone this repo
  git checkout atopwi
  patches welcome eg via github pull request
  don't git pull, instead just re-clone the repo

Debugging:
  By default we use chrome.debugger for protocol transport. To use DevtoolsExtended on itself we
  need to run a copy over websockets *and* run it in a different chrome profile.
  1. <path to chrome>chrome  --user-data-dir=/work/chrome/qppProfile --remote-debugging-port=9222
    sign in to chrome (we use chrome.storage.sync)
    install devtoolsExtended, qpp, devtools-save, and configure them
    open your test page and right click select "Remote DevtoolsExtended"
  2. <path to chrome> chrome  --user-data-dir=/work/chrome/dogfoodProfile http://localhost:9222
    sign in to chrome with the same id as #1 (we use chrome.storage.sync)
    install devtoolsExtended, qpp, devtools-save, and configure them
    reload http://localhost:9222, click on the page action (opens Remote DevtoolsExtended over websockets to #1).
  Use normal devtools on the popup window from #2 or 
  right click and use DevtoolsExtended on the Remote DevtoolsExtended.

Branch syncToWebKit: a copy of Web Inspector source,
  see tools/updateFromWebKit.sh.
  should only affect directory extension/WebInspectorKit

Branch stgit: Stacked Git managed branch
  Install Stacked Git (stg) from http://www.procode.org/stgit/
  'stg series' will show the current patches to WebInspectorKit

Branch atopwi: a Web app/chrome extension shell around Web Inspector allowing it to run
  over chrome.devtools.debugger extension protocol.
  This branch sits at the lowest point we can test 
