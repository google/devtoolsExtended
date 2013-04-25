/*globals window console require*/

var DevtoolsExtendedBase = 'chrome-extension://ggimboaoffjaeoblofehalflljohnfbl';
window.crx2appBase = DevtoolsExtendedBase+'/crx2app/extension';

function extractParamsFromURL() {
  var search = window.location.search;
  if (search) {
    var parameterString = search.substr(1);
    if (parameterString) {
      var params = {};
      parameterString.split('&').forEach(function(param) {
        var nv = param.split('=');
        if (nv.length === 2 && nv[1]) {
          params[nv[0]] = nv[1];
        }
      });
      if (Object.keys(params).length) {
        return params;
      }
    }
  } // else undefined
}

function reloadWithURL(debuggeeURLElt) {
  var debuggeeURL = debuggeeURLElt.value;
  var base = window.location.href;
  base = base.split('?')[0];
  var relo = 'url='+encodeURIComponent(debuggeeURL)+'&';
  window.open(base+'?'+relo);
}
  
function getFrontendURL() {
  var url = document.querySelector('.frontendURL').value;
  if (url) {
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    localStorage.setItem('DevtoolsExtended.frontendURL', url);
  }
  return url;
}
  
function URLOptions() {
  this.params = extractParamsFromURL() || {};
  
  function preset(url) {
    if (url) {
      document.querySelector('.frontendURL').value = url;
      localStorage.setItem('DevtoolsExtended.frontendURL', url);
    }
  }
  
  var defaultPreset = localStorage.getItem('DevtoolsExtended.frontendURL') || window.DevtoolsExtendedBase + "/WebInspectorKit/Source/WebCore/inspector/front-end";
  preset(defaultPreset);
  
  document.querySelector('.crxFrontEnd').addEventListener('click', function() {
    preset(window.DevtoolsExtendedBase + '/atopwi/devtoolsAdapter/');
  });
  document.querySelector('.testingFrontEnd').addEventListener('click', function() {
    preset('http://localhost:8081/out/Release/resources/inspector/');
  });
  
  document.querySelector('#doDebug').addEventListener('click', function() {
    var elt = document.querySelector('#debuggeeSpecURLElt');
    reloadWithURL(elt);
  });
  
}

URLOptions.prototype = {
  
  useWebSocket: function() {
    return this.params.hasOwnProperty('ws');
  },
  
  useCrx2app: function() {
    return (this.params.hasOwnProperty('url') || this.params.hasOwnProperty('tabId'));
  },

  devToolsURL: function() {
    var devtoolsURL = getFrontendURL() + 'devtools.html?experiments=true';
    if (this.useWebSocket()) {
      devtoolsURL += '&ws=' + this.params.ws;
    } 
    return devtoolsURL ;
  },
  
  getDebuggeeSpec: function(wsFromJSONP) {
    if (this.useWebSocket() || this.useCrx2app()) {
      return {
        url: this.params.url,
        tabId: this.params.tabId,
        devtoolsURL: this.devToolsURL(),
        ws: wsFromJSONP || this.params.ws,
        frontendURL: getFrontendURL(),
        tests: this.params.tests && this.params.tests === this.params.tabId
      };
    } // else none.
  },

};

function onLoad() {

  window.removeEventListener('load', onLoad, false);

  require({
      paths: {
        'crx2app': window.crx2appBase,
        'q': DevtoolsExtendedBase+'/MetaObject/q'
      }
    }); 
    
   require.onError = function(err) {
     console.error(err+'', {stack: err.stack.split('\n')});
   };
  
  require(['DevtoolsConnection'], function open(DevtoolsConnection) {
    var options = new URLOptions();
    var debuggeeSpec = options.getDebuggeeSpec();
    function onDebuggeeSpec(debuggeeSpec) {
      console.log("openInspector ", debuggeeSpec);
      DevtoolsConnection.openInspector(debuggeeSpec);      
    }
    if (debuggeeSpec && debuggeeSpec.ws !== 'jsonp') {
      onDebuggeeSpec(debuggeeSpec);
    } else {
      var selector = document.querySelector('.WebSocketSelector');
      selector.innerHTML = '<iframe src="http://localhost:9222"></iframe>';
      var prompt = document.querySelector('.debuggeeSpec');
      prompt.classList.remove('hide');    
    }
  });
  
}

window.addEventListener('load', onLoad, false);
