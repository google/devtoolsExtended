// Copyright 2011 Google Inc. 
// Google BSD license
// johnjbarton@google.com

/*globals define console require window*/
(function (definition) {

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // RequireJS
    if (typeof define === "function") {
        define([], definition);
    // CommonJS
    } else if (typeof exports === "object") {
        definition(require, exports);
    // <script>
    } else {
        window.Cause = definition(void 0, {});
    }

})(function (serverSideRequire, exports) {
"use strict";

function removeCommonSegments(baseSegments, segments) {
  if (segments[0] !== baseSegments[0]) {
    return segments; // nothing in common
  }
  for(var i = 1; i < segments.length; i++) {
    if (segments[i] !== baseSegments[i]) {
      return segments.slice(i);
    }    
  }
  // everything in common
  return [segments[segments.length - 1]];
}



function description(callsite) {
  var text = "";
  if (callsite.getThis()) {
    text += callsite.getTypeName() + '.';
  }
  text += callsite.getFunctionName();
  return text;
}

function FileFilter() {
  this.inQ = false;
}
 
FileFilter.showSystem = false;
FileFilter.reQ = /q\/q\.js$/;
FileFilter.reNative = /^native\s/;

FileFilter.prototype.isSystem  = function(file) {
  if (FileFilter.showSystem) {
    return false;
  }
  if (FileFilter.reQ.test(file)) {
    this.inQ = true;
    return true;
  } else if (this.inQ && FileFilter.reNative.test(file)) {
    return true;
  } else {
    this.inQ = false;
  }
}


function filterAndCount(error, arrayOfCallSite) {
  error.fileNameColumns = 0;
  error.largestLineNumber = 0;
  var baseSegments = window.location.toString().split('/');
  
  var filteredStack = [];
  var fileFilter = new FileFilter();
  for (var i = 0; i < arrayOfCallSite.length; i++) {
    var callsite = arrayOfCallSite[i];
    var file = callsite.getFileName();
    if (!fileFilter.isSystem(file)) {
      file = removeCommonSegments(baseSegments, file.split('/')).join('/');

      if (file.length > error.fileNameColumns) {
        error.fileNameColumns = file.length;
      }
      var line = callsite.getLineNumber();
      if (line > error.largestLineNumber) {
        error.largestLineNumber = line;
      }
      filteredStack.push({file: file, line: line, description: description(callsite)});
    }
  }
  error.lineNumberColumns = (error.largestLineNumber+'').length;
  return filteredStack;
}

function formatStack(error, stackArray) {
  var lineNumberColumns = error.lineNumberColumns || 0;
  var fileNameColumns = error.fileNameColumns || 0;
  
  var textArray = stackArray.map(function toString(callsite, index) {
    // https://gist.github.com/312a55532fac0296f2ab P. Mueller
    //WeinreTargetCommands.coffee  21 - WeinreTargetCommands.registerTarget()
    var text = "";
    var file = callsite.file;
    var line = callsite.line;
    if (!file) {
      console.log("file undefined: ", callsite);
    }
    var blanks = fileNameColumns - file.length;
    if (blanks < 0) {
      console.log("toString blanks negative for "+file);
    }
    while (blanks-- > 0) {
      text += " ";
    };
    text += file;
    blanks = lineNumberColumns - (line+'').length + 1;
    while (blanks-- > 0) {
      text += " ";
    };
    text += line + ' - ';
    
    text += callsite.description;
    return text;
  });
  return textArray.join('\n');
}

var reMueller = /(\s*[^\s]*)\s(\s*[0-9]*)\s-\s/;  // abcd 1234 -
// I would much rather work on the stack before its turned to a string!
function reformatStack(error, stack) {
  var fileNameShift = 0;
  var lineNumberShift = 0;
  var frameStrings = stack.split('\n');
  var m = reMueller.exec(frameStrings[0]);
  if (m) {
    var fileNameFormatted = m[1];
    if (fileNameFormatted.length > error.fileNameColumns) {
      // the other stack will need to step up
      error.fileNameColumns = fileNameFormatted.length;
    } else {
      // We need to move this one over
      fileNameShift = error.fileNameColumns - fileNameFormatted.length;
    }
    var lineNumberFormatted = m[2];
    if (lineNumberFormatted.length > error.lineNumberColumns) {
      error.lineNumberColumns = lineNumberFormatted.length;
    } else {
      lineNumberShift = error.lineNumberColumns - lineNumberFormatted.length;
    }
  
    if (lineNumberShift || fileNameShift) {
      var fileNamePadding = "";
      while (fileNameShift--) {
        fileNamePadding += ' ';
      }
      var lineNumberPadding = "";
      while (lineNumberShift--) {
        lineNumberPadding += ' ';
      }
      
      var oldFileNameColumns = fileNameFormatted.length;
      var frames = frameStrings.map(function splitter(frameString) {
        var fileName = frameString.substr(0, oldFileNameColumns);
        var rest = frameString.substr(oldFileNameColumns);
        return fileNamePadding + fileName + lineNumberPadding + rest;
      });
      return frames.join('\n');
    } else {
      return stack;
    }
  } else {
    console.error("reformatStack fails ", frameStrings);
  }
}

Error.stackTraceLimit = 20;  // cause ten of them are Q
Error.causeStackDepth = 0;

// Triggered by Cause.stack access
Error.prepareStackTrace = function(error, structuredStackTrace) {

  var filteredStack = filterAndCount(error, structuredStackTrace);

  var reformattedCauseStack = ""; 
  if (error instanceof Cause || (error.prev && error.prev.cause)) {
    if (error.prev && error.prev.cause) {
      var cause = error.prev.cause;
      Error.causeStackDepth++;
      var causeStack = cause.stack;  // recurse
      Error.causeStackDepth--;
      reformattedCauseStack = reformatStack(error, causeStack);
    } //  else hit bottom
  }
  // don't move this up, the reformat may change the error.fileNameColumns values
  var formattedStack = formatStack(error, filteredStack);
  if (formattedStack) {
    if (reformattedCauseStack) {  
      formattedStack = formattedStack + '\n' + reformattedCauseStack;
    }  
  } else { //  all got filtered
    formattedStack = reformattedCauseStack;
  }
  return formattedStack;
}

// An Error constructor used as a Cause constructor
function Cause(head) {
  Error.captureStackTrace(this, Cause);  // sets this.stack, lazy
  this.prev = head;
  this.message = 'cause';
  this.fileName = 'q.js'
  this.lineNumber = 1;
}

Cause.externalCause = null;
Cause.setExternalCause  = function(message) {
  Cause.externalCause = message;
}
exports = Cause;

return Cause;

});
