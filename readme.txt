DevtoolsExtended

Experimental extension of Chrome Devtools:
  Run Chrome devtools in an iframe hosted in a chrome extension.
  Connects to Chrome over WebSockets (or the chrome.devtools.debugger extension AP)
  Extensible, supports devtools extensions for remote debugging,
  Experimental patches to devtools adding new extension features.

Install:
  Use Chrome Canary (or trunk build)
  clone this repo, checkout branch 'devtoolsApp'
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
  git checkout syncToBlink
  patches welcome eg via github pull request
  don't git pull, instead just re-clone the repo

Debugging:
  1. <path to chrome>chrome  --user-data-dir=/work/chrome/9222 --remote-debugging-port=9222
    sign in to chrome (we use chrome.storage.sync)
  2. <path to chrome> chrome  --user-data-dir=/work/chrome/9223
    sign in to chrome with the same id as #1 (we use chrome.storage.sync)
    install devtoolsExtended,
    open http://localhost:9222, select devtoolsExtended button, then a page thumbnail

See tools/readme.txt