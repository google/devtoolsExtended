function storeLinks() {
  var links = document.querySelectorAll('a.frontend_ref');
  console.log('links ', links);
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.devtoolsURL)
      continue;
    link.devtoolsURL = link.href;
    var search = link.href.split('?')[1];
    link.atopwiURL = 'http://localhost:9696/atopwi/atopwi.html?' + search;
  }
}

function useLink(kind) {
  storeLinks();
  var links = document.querySelectorAll('a.frontend_ref');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.href = link[kind];
  }
}

function useAtopwi() {
  useLink('atopwiURL');
  document.querySelector('.atopwiButton').disabled = true;
  document.querySelector('.devtoolsButton').disabled = false;
}

function useDevtools() {
  useLink('devtoolsURL');
  document.querySelector('.atopwiButton').disabled = false;
  document.querySelector('.devtoolsButton').disabled = true;
}

function addRewriteButtons() {
  var devtoolsButton = document.createElement('button');
  devtoolsButton.innerHTML = 'Use Builtin Devtools';
  devtoolsButton.classList.add('devtoolsButton');
  devtoolsButton.addEventListener('click', useDevtools);
  document.body.insertBefore(devtoolsButton, document.body.firstChild);
  
  var atopwiButton = document.createElement('button');
  atopwiButton.innerHTML = 'Use DevtoolsExtended';
  atopwiButton.classList.add('atopwiButton');
  atopwiButton.addEventListener('click', useAtopwi);
  document.body.insertBefore(atopwiButton, document.body.firstChild);

  useDevtools();
}

function checkURL() {
   if (window.location.href.indexOf('http://localhost:922') > -1) { // any http port in 922*
    chrome.extension.sendRequest({action: 'showPageAction'}, function(response) {
      console.log('contentscript.checkURL background responded');
    });

    addRewriteButtons();
   }
}

checkURL();
