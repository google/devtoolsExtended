// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals document window */

// used by options.html and crxEnd.js 
// options.allowedSites is array of {site: url, name: string}

function saveOptions() {
  var options = {
      allowedSites: [],
      extensionInfos: []
  };
  var allowedSitesTable = document.getElementById('origins');
  var originElts = allowedSitesTable.getElementsByClassName('origin');
  for(var i = 0; i < originElts.length; i++) {
    var originElt = originElts[i];
    var origin = originElt.value;
    var contextMenuNameElt = originElt.parentElement.parentElement.querySelector('.contextMenuId');
    
    if (origin) {
      var name = contextMenuNameElt.value || '(none)';
      options.allowedSites.push({site: origin, name: name});
    }
  }

  
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

  var stringified = JSON.stringify(options);
  window.localStorage.setItem('options', stringified);
  
  var warnReload = document.getElementById('warnReload');
  warnReload.classList.remove('hidden');  
}

function restoreOptions() {
  var stringified = window.localStorage.getItem('options');
  try {
    var options = JSON.parse(stringified);
    return options;
  } catch (exc) {
    // ignore corrupt data
  }
}