// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global console window*/

function onClickDebug(event) {
  saveOptions();
}

function setDebug(options, setting) {
  if (options[setting]) {
    document.getElementById(setting).checked = true;
  }
}

function showNoExtensions(noshow) {
  var noExtensions = document.querySelector('.no-extensions')
  if (noshow)
    noExtensions.classList.remove('hidden');
  else
    noExtensions.classList.add('hidden');
}

function restore() {
  var options = restoreOptions();
  if (options) {

    setDebug(options, 'debugConnection');
    setDebug(options, 'debugMessages');
    setDebug(options, 'debugWarnings');
    setDebug(options, 'debugAdapters');
    
    var extensionInfos = options.extensionInfos;
    showNoExtensions(true);
    if (extensionInfos && extensionInfos instanceof Array) {
      extensionInfos.forEach(addExtensionInfosRow);
      showNoExtensions(false);
    }
  }
  // the default UI will work for no-options-set-yet
}


function cloneElementByClass(className) {
  var template = document.querySelector('.'+className);
  var elt = template.cloneNode(true);
  elt.classList.remove(className);
  template.parentNode.insertBefore(elt, template);
  return elt;
}

function addExtensionInfosRow(extensionInfo) {
  var row = cloneElementByClass('extensionInfo-template');
  var input = row.getElementsByClassName('extensionInfo-startPage')[0];
  input.value = extensionInfo.startPage;
  input = row.querySelector('.extensionInfo-name');
  input.value = extensionInfo.name;
  addExtensionInfosRowClickHandler(row);
}

function eachUserInput(row, fnc) {
  var userInputs = row.querySelectorAll('.userInput');
  for (var i = 0; i < userInputs.length; i++) {
    fnc(userInputs[i]);
  }
}

// From editing to saved
function save(row) {
  saveOptions();
  console.log('save', row);
  eachUserInput(row, function(elt) {
    elt.setAttribute('disabled', 'disabled');
  });
  row.classList.remove('stateEditing');
  row.classList.add('stateSaved');
}

// From saved to editing
function edit(row) {
  eachUserInput(row, function(elt) {
    elt.removeAttribute('disabled');
  });
  row.classList.remove('stateSaved');
  row.classList.add('stateEditing');
}

function getRow(event) {
  var action = event.target;
  var row = action;
  while (row.localName !== 'tr') {
    row = row.parentElement;
    if (!row) {
      return; // FAIL
    }
  }
  return row;
}

function saveOrEditRow(event) {
  var row = getRow(event);
  if (row) {
    if (row.classList.contains('stateEditing')) {
      save(row)
    } else if (row.classList.contains('stateSaved')) {
      edit(row)
    } else {
      console.error("Bad state "+row.classList);
    }
  }
}

function removeRow(event) {
  var row = getRow(event);
  if (row) {
      row.parentElement.removeChild(row);
      saveOptions();
  }
}

function highlightSave(event) {
  var save = document.getElementById("save");
  save.classList.add('youShouldSave');
  status.innerHTML = "";
}


function addExtensionInfosRowClickHandler(row) {
  row.addEventListener('click', function(event){
      console.log("row click", event);
    if (event.target.classList.contains('remove')) 
      removeRow(event);
    else if (event.target.classList.contains('save'))
      saveOrEditRow(event);
  });
  return row;
}

function addListeners() {
  var debugOptions = document.querySelectorAll('debugOption');
  Array.prototype.forEach.call(debugOptions, function(option){
    option.addEventListener('click', onClickDebug);
  });

  var addExtensionInfosRow = document.querySelector('.addExtensionInfosRow');
  addExtensionInfosRow.addEventListener('click',function(event) {
    edit(addExtensionInfosRowClickHandler(
      cloneElementByClass('extensionInfo-template'))
    );
    showNoExtensions(false);
  }, false);
}

function onLoad() {
  restore();
  addListeners();
}

window.addEventListener('load', onLoad, false);

window.onbeforeunload = function(event) {
  var editings = document.getElementsByClassName('stateEditing');
  
  if ( editings.length > 0 ) {
     event.returnValue = "You have unsaved edits";
     return event.returnValue;
  }
};

function selectAll() {
    var all = document.querySelectorAll("output#list li input");
    for(var i = 0; i < all.length; i++) {
      var input = all[i];
      if (input.checked) {
        input.checked = false;
      } else {
        input.checked = true;
      }
    }
}
