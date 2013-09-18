// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2013 Google Inc. johnjbarton@google.com

// RemoteMethodCall: RPCish over ChannelPlate

var RemoteMethodCall = (function() {

  "use strict";
  var DEBUG = true;
  var RESPONSE = 'Response';
  var ERROR = 'Error';

    //-----------------------------------------------------------------------------
    // A ChannelPlate Listener that converts requests to method calls and 
    // returns to responses

    function Responder(serverMethods, rawPort) {
      this.serverMethods = serverMethods;
    
      this.onMessage = function(message) {
        var payloadArray = message;
        var postId = payloadArray.shift();
        var method = payloadArray.shift();
       
        if (method in this.serverMethods && (typeof this.serverMethods[method] === 'function') ) {
          var args = payloadArray;
          args.push(this.onReply.bind(this, postId, method));
          args.push(this.onError.bind(this, postId, method));
          try {
            this.serverMethods[method].apply(this.serverMethods, args); 
          } catch (exc) {
            this.onException(postId, method, [exc]);
          }
        } else {
          this.onException(postId, method, ['No Such Method']);
        }
      };

      this.onReply =function(postId, method, args) {
        this.channelPlate.postMessage([postId, method, RESPONSE].concat(args));
      };

      this.onError = function(postId, method, args) {
        this.channelPlate.postMessage([postId, method, ERROR].concat(args));
      };

      this.onException = function(postId, method, args) {
        this.channelPlate.postMessage([postId, method, ERROR, "Exception"].concat(args));
      };

      this.start = function() {
        this.channelPlate.start.apply(this.channelPlate, arguments);
      }

      this.channelPlate = new ChannelPlate.Base(rawPort, this.onMessage.bind(this));
    }

    //---------------------------------------------------------------------------------------
    // A ChannelPlate that converts method calls to requests and responses to returns.
    //

    function Requestor(serverMethods, ChannelPlateCtor) {
      this.postId = 0;
      this.responseHandlers = [];
      this._serverProxy = this._createProxy(serverMethods);
      this.channelPlate = new ChannelPlateCtor(this._onMessage.bind(this));
      this.instance = ++Requestor.instance;
    }

    Requestor.instance = 0;

    Requestor.prototype = {

      serverProxy: function() {
        return this._serverProxy;
      },

      request: function(method, args, onResponse, onError) {
        this.responseHandlers[++this.postId] = {method: method, onResponse: onResponse, onError: onError};
        this.channelPlate.postMessage([this.postId, method].concat(args));
        if (DEBUG) {
          console.log("Requestor "+ this.instance + " sent " + method, args);
        }
      },

      _onMessage: function(event) {
        var payloadArray = event.data || event; // w3C || chrome extension
        var postId = payloadArray.shift();
        var method = payloadArray.shift();
        var responseHandler = this.responseHandlers[postId];
        if (!responseHandler) {
          console.error("Requestor "+ this.instance + " _onMessage failed, no responseHandler for postId " + postId, this.responseHandlers);
        }
        if (method !== responseHandler.method) {
          console.error("Requestor "+ this.instance + " protocol error, remote method does not match local method");
        }
        var args = payloadArray;
        var status = args.shift();
        var callback = responseHandler.onResponse;
        var errback = responseHandler.onError;
        try {
          if (callback && status === RESPONSE) {
            callback.apply(this, args);
          } else if (errback && status === ERROR) {
            errback.apply(this, args);
          }  
        } catch(exc) {
          console.error("Requestor "+ this.instance + " callback failed: "+(exc.stack ?"\n %o":exc), exc.stack);
        } finally {
          delete this.responseHandlers[postId];
        }
      },

      _createProxy: function(serverMethods) {
        var proxy = {};
        Object.keys(serverMethods).forEach(function(method) {
          proxy[method] = function() {
            var args = Array.prototype.slice.call(arguments);
            var errback;
            var callback;
            if (typeof args[args.length - 1] === 'function') {
              if (typeof args[args.length - 2] === 'function') {
                errback = args.pop();
              }
              callback = args.pop();
            }
            this.request(method, args, callback, errback);
          }.bind(this);
        }.bind(this));

        return proxy
      }
      
    };

    //-----------------------------------------------------------------------------
    // Define our exports

    return {
      Responder: Responder,
      // Accepts a port constructor and sends requests thru it
      Requestor: Requestor
    };

}());
