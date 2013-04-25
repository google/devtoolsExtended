// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals document window */

// used by options.html and crxEnd.js 
// options.allowedSites is array of {site: url, name: string}

var optionsKey = 'DevtoolsExtended.options';
  
function saveOptions() {
  var options = restoreOptions() || {};
  options.extensionInfos = [];
  
  var extensionInfosRows = document.querySelectorAll('.extensionInfos-row');
  for (var i = 0; i < extensionInfosRows.length; i++) {
      if (extensionInfosRows[i].classList.contains('extensionInfo-template')) {
        continue;
      }
      var name = extensionInfosRows[i].querySelector('.extensionInfo-name').value;
      var startPage =  extensionInfosRows[i].querySelector('.extensionInfo-startPage').value;
      options.extensionInfos.push(
        {
          name: name,
          startPage: startPage
        }
      );
  }
  
  var debugConnection = document.getElementById('debugConnection');
  options.debugConnection = debugConnection.checked;

  var debugMessages = document.getElementById('debugMessages');
  options.debugMessages = debugMessages.checked;

  var debugWarnings = document.getElementById('debugWarnings');
  options.debugWarnings = debugWarnings.checked;
  
  var debugAdapters = document.getElementById('debugAdapters');
  options.debugAdapters = debugAdapters.checked;
  
  var warnReload = document.getElementById('warnReload');
  warnReload.classList.remove('hidden');  

  var stringified = JSON.stringify(options);
  window.localStorage.setItem(optionsKey, stringified);
}

function restoreOptions(defaultOptions) {
  var stringified = window.localStorage.getItem(optionsKey);
  var options;
  if (stringified) {
    try {
      options = JSON.parse(stringified);
    } catch (exc) {
      // ignore corrupt data
    }  
  }
  return options || defaultOptions;
}