// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals define console*/

define(['crx2app/rpc/Cause'], function (Cause) {
  
  var debug = false;
  
  // A left paren ( followed by any not-right paren ) followed by right paren
  var reParamList = /\(([^\)]*)\)/; 
  var reParameters = /\(([^\)]*)\)/;
  
  // parse the function source to get the parameter name
  function getParamsFromAPI(fnc) {
    var paramList = [];
    var src = fnc.toString();
    var m = reParamList.exec(src);
    if (m && m[1]) {
      var spacyParamList = m[1].split(',');
      spacyParamList.forEach(function(spacy) {
        var paramName = spacy.trim();
        if (paramName) {
          paramList.push(spacy.trim());
        }
      });
    }
    return paramList;
  }
  
  // build a JSON object for Remote Debugging 
  
  function bindParams(paramNames, argValues) {
    var params = {};
    var max = Math.min(paramNames.length, argValues.length);
    for(var i = 0; i < max; i++) {
      var name = paramNames[i];
      params[name] = argValues[i];
    }
    return params;
  }
 
 
  // global monotonic 
  var serialCounter = 1; // every serial must be truthy
  var callbacksBySerial = {};

  function defaultErrorBack(errMsg) {
    if (errMsg && errMsg.method && (errMsg.method === 'onError') && errMsg.args && errMsg.args.length ) {
      console.error("Error "+errMsg.args[0], errMsg.args[1]);
    } else {
      var message = errMsg.message || "";
      console.error("JSONMarshall sendCommand ERROR "+message, arguments);
    }
  }

  function makeSendCommand(channel, target, method, debuggee) {
    // we close over the arguments
    return function sendCommand() {  // arguments here will depend upon method
      var args = Array.prototype.slice.apply(arguments, [0]);
      
      // Our sequence number for RPC
      var serial =  serialCounter++;
      
      // Check for a callback function
      if (typeof args[args.length - 1] === 'function') {
        // remove the callback, otherwise we get a DOM error on serialization
        var callback = args.pop();
        
        // check for errback
        var errback = defaultErrorBack;
        if ( (args.length >= 1) && (typeof args[args.length - 1] === 'function')) { 
          errback = callback;
          callback = args.pop();
        }  
    
        // store the callbacks for recvResponseData
        callbacksBySerial[serial] = {
          callback: callback,
          errback: errback,
          cause: new Cause()
        };
        
      } else {
        throw new Error('Callback function argument missing');
      }
      
      var message = {target: target, method: method,  params: args, serial: serial, debuggee: debuggee};
      
      channel.postMessage(message);
    };
  }
  
  function marshallForHandler(impl, handler) {
    return function (paramsFromJSON, p_id) {
      var args = [];
      for (var i = 0; i < handler.parameters.length; i++) {
        args[i] = paramsFromJSON[handler.parameters[i]];
      }
      args.push(p_id);  // purple specific clock tick postpended
      handler.apply(impl, args);
    };
  }
  
  function makeRemoteDebugSendCommand(chromeProxy, name, domainMethod, debuggee){
    return function() {
      return chromeProxy.debugger.sendCommand(debuggee, domainMethod, arguments);
    };
  }
  //---------------------------------------------------------------------------------------------
  // Beware: this object will be extended with methods from the chrome.* API. So any of the 
  // functions can be shadowed. TODO: fix this fragile issue
  
  var JSONMarshall = {};

  JSONMarshall.applyToparsedJSON = function(p_id, data, method) {
    try {
      var objFromJSON = data.params;
      if (typeof(objFromJSON) === 'string') {
        objFromJSON = JSON.parse(data.params);
      }
      return method.apply(null, [objFromJSON, p_id]);
    } catch(exc) {
      console.error("JSONMarshall ERROR "+exc, exc.stack, data.params);
    }
  };
  
  JSONMarshall.recvResponse = function(data) {
    if (debug) {
      console.log("JSONMarshal.recvResponse "+data.source, data);
    }
    if (data && data.serial) {
      this.recvResponseData(data);
    } else { // not a response
      var method = data.method;
      if (method === 'onError') {
        console.error("JSONMarshal.recvResponse ERROR "+data.source+':'+data.params[0]);
      } else {
        if (method) {
          var objectKey = data.source;
          if ( this.jsonHandlers.hasOwnProperty(objectKey) ) {
            var object = this.jsonHandlers[objectKey];
            var handler = object.hasOwnProperty(method) && object[method];
            if (handler) {
              handler.apply(this, [data.params, data.p_id]);
            } else {
              if (object.jsonObjectHandler) {
                object.jsonObjectHandler.apply(object, [data]);              
              } else {
                console.warn("JSONMarshal.recvResponse dropped data, no handler for "+method, data);
              }
            }
          } else {
            console.warn("JSONMarshal.recvResponse dropped data, no handlers for object "+objectKey, data);
          }
        } else {
          console.error("JSONMarshal.recvResponse dropped data, no .serial and  .method ", data);
        }
      }
    }
  };
  
  
  JSONMarshall.recvResponseData = function(data) {
    var serial = data.serial; // set by sendCommand
    var callbacks = callbacksBySerial[serial];
    if (callbacks) {
      try {
        if (data.method && (data.method !== 'onError') ) {
          callbacks.callback(data.params[0]);
        } else {
          if (data.method && data.method === 'onError') {
            callbacks.errback({
              message: data.params[0]+'',
              data: data,
              toString: function() {
                return data.params[0]+"";
              },
              request: data.params[1]
            });
          } else {
            callbacks.errback({message:"Unknown method", data: data});
          }
        }
      } catch(exc) {
        if (debug) {
          console.error('recv %o fail: ' + exc + '\n', data, callbacks.cause.stack);
        }
      } finally {
        if (debug) {
          console.log("recvResponseData completed "+serial, data);
        }
        delete callbacksBySerial[serial];
      }
    } // else another remote may have created the request
  };
  
  // The chrome.debugger API has 'domains' like Console, Debugger. 
  // Each domain has 'commands' and 'events' functions as properties.
  // obj: remote interface with domain properties
  // prop: 'commands' or 'events'
  // 
  JSONMarshall.flattenDomains = function(obj, prop) {
    var flatObj = {};
    Object.keys(obj).forEach(function flattenDomain(domainName) {
      var bumpy = obj[domainName][prop];
      if (bumpy) {
        Object.keys(bumpy).forEach(function buildProperty(name) {
          flatObj[domainName+'.'+name] = bumpy[name];
        });
      } // else not a domain, eg version
    });
    return flatObj;
  };
  
  JSONMarshall.addHandlerParameters = function(handler, handlerSpec) {
    var m = reParameters.exec(handlerSpec.toString());
    var params = m[1].split(',');
    handler.parameters = [];
    for (var i = 0; i < params.length; i++) {
      var param = params[i].trim();
      if (param) {
        handler.parameters[i] = param;
      }
    }
  };
  
  // return: dictionary of functions accepting json objects, calling impl handlers
  // iface: empty functions for each possible method name coming over JSON
  // objectKey: name, eg chrome.debugger, chrome.windows,...
  // impl: defn for some of the iface entries becomes |this| for handlers
  // eventHandlers: {Debugger: {functions}, Console: {functions}}
  JSONMarshall.buildEventHandlers = function(iface, objectKey, impl, self) {
    this.jsonHandlers = this.jsonHandlers || {};
    this.jsonHandlers[objectKey] = this.jsonHandlers[objectKey] || {};
    var object = this.jsonHandlers[objectKey];
    var handlerNames = Object.keys(iface);
    handlerNames.forEach(function buildHandler(handlerName) {
      var handlerSpec = iface[handlerName]; // an empty function
      var handler = impl[handlerName];  // implementation function of
      if (handler) {
        this.addHandlerParameters(handler, handlerSpec);
        object[handlerName] = marshallForHandler(self, handler);
      }
    }.bind(this));
  };
   
  JSONMarshall.build2LevelEventHandlers = function(iface, impl) {
    var flatFace = this.flattenDomains(iface, 'events');  // eg "Debugger.globalObjectCleared"
    var flatImpl = this.flattenDomains(impl, 'events');
    this.buildEventHandlers(flatFace, 'chrome.debugger.remote', flatImpl, impl);
  };
  
  // Walk the API and implement each function to send over channel.
  JSONMarshall.buildPromisingCalls = function(iface, impl, channel, debuggee) {
    var methods = Object.keys(iface.api);
    methods.forEach(function buildMethod(method) {
      // each RHS is a function returning a promise
      impl[method] = makeSendCommand(channel, iface.name, method, debuggee);
    });
    this._attach(channel);
  };
  
  
  // chrome.debugger remote methods have domain.method names
  JSONMarshall.build2LevelCommands = function(iface, impl, chromeProxy, debuggee) {

    var domains = Object.keys(iface);
    
    domains.forEach(function buildSend(domain) {
      if (iface[domain].commands) {
        impl[domain] = {commands: {}};
        var methods = Object.keys(iface[domain].commands);
        methods.forEach(function buildMethod(method) {
          // each RHS is a function returning a promise
          impl[domain][method] = makeRemoteDebugSendCommand(chromeProxy, iface.version, domain+'.'+method, debuggee);
        });
      } // else no commands
    });
  };
  
  
  // This is called during buildPromisingCalls
  
  JSONMarshall._attach = function(channel) {
    // bind promise resolution to the recv 
    if (!this.boundRecv) {
      this.boundRecv = this.recvResponse.bind(this);
    }
    channel.addListener(this.boundRecv);
  };
  
  JSONMarshall._detach = function(channel) {
    channel.removeListener(this.boundRecv);
  };

  return JSONMarshall;

});
