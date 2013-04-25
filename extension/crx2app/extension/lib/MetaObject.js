// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*globals define*/

define([], function () {
  
  // based 'Base' on https://github.com/Gozala/selfish
  // Removed object properties, cost/benefit
  // merge -> mergeMethods: only put methods into [[Prototype]]
  // rename file to avoid confusion with selfish
  
  var MetaObject = {
    'new': function() {
      var obj = Object.create(this);
      obj.initialize.apply(obj, arguments);
      return obj;
    },
 
    everyOwnProperty: function(obj, fnc) {
      return Object.keys(obj).every(function(key) {
        if(fnc(obj[key])) {
          return true;
        }
      }.bind(this));
    },
 
    hasOnlyMethods: function(method) {
      if ( (typeof method === 'function') ||
         ( (typeof method === 'object') && 
           (this.everyOwnProperty(method, this.hasOnlyMethods.bind(this)))
         ) ) {
            return true;
      } else {
          return false;
      }
    },
    
    mergeOneMethod: function(sender, key) {
      var method = sender[key];
      if (this.hasOnlyMethods(method)) {
          this[key] = method;
      } else {
          throw new Error("MetaObject.mergeOneMethod sent non-method: "+key);
      }
    },
    
    mergeMethods: function() {
       var result = this;
       for (var i = 0; i < arguments.length; i++) {
         var argument = arguments[i];
         Object.keys(argument).forEach(
           this.mergeOneMethod.bind(this, argument)
         );
       }
       return result;
    },
    
    extend: function() {
      // An empty object with |this| as its prototype, and props from arguments
      return this.mergeMethods.apply(Object.create(this), arguments);
    }
  };  
    
  return MetaObject;
});