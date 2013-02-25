
var Protocol = {};
/** @typedef {string}*/
Protocol.Error;



var InspectorAgent = {};

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
InspectorAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
InspectorAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
InspectorAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
InspectorAgent.disable.invoke = function(obj, opt_callback) {}
/** @interface */
InspectorAgent.Dispatcher = function() {};
/**
 * @param {number} testCallId
 * @param {string} script
 */
InspectorAgent.Dispatcher.prototype.evaluateForTestInFrontend = function(testCallId, script) {};
/**
 * @param {RuntimeAgent.RemoteObject} object
 * @param {Object} hints
 */
InspectorAgent.Dispatcher.prototype.inspect = function(object, hints) {};
/**
 * @param {string} reason
 */
InspectorAgent.Dispatcher.prototype.detached = function(reason) {};
/**
 * @param {InspectorAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerInspectorDispatcher = function(dispatcher) {}



var MemoryAgent = {};

/** @typedef {{size:(number|undefined), name:(string), children:(Array.<MemoryAgent.MemoryBlock>|undefined)}|null} */
MemoryAgent.MemoryBlock;

/** @typedef {{strings:(Array.<string>), nodes:(Array.<number>), edges:(Array.<number>), baseToRealNodeId:(Array.<number>)}|null} */
MemoryAgent.HeapSnapshotChunk;

/**
 * @param {function(?Protocol.Error, number, number, number):void=} opt_callback
 */
MemoryAgent.getDOMCounters = function(opt_callback) {}
/** @param {function(?Protocol.Error, number, number, number):void=} opt_callback */
MemoryAgent.getDOMCounters.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean=} opt_reportGraph
 * @param {function(?Protocol.Error, MemoryAgent.MemoryBlock, Object=):void=} opt_callback
 */
MemoryAgent.getProcessMemoryDistribution = function(opt_reportGraph, opt_callback) {}
/** @param {function(?Protocol.Error, MemoryAgent.MemoryBlock, Object=):void=} opt_callback */
MemoryAgent.getProcessMemoryDistribution.invoke = function(obj, opt_callback) {}
/** @interface */
MemoryAgent.Dispatcher = function() {};
/**
 * @param {MemoryAgent.HeapSnapshotChunk} chunk
 */
MemoryAgent.Dispatcher.prototype.addNativeSnapshotChunk = function(chunk) {};
/**
 * @param {MemoryAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerMemoryDispatcher = function(dispatcher) {}



var PageAgent = {};

/** @typedef {string} */
PageAgent.ResourceType;

/** @typedef {{id:(string), parentId:(string|undefined), loaderId:(NetworkAgent.LoaderId), name:(string|undefined), url:(string), securityOrigin:(string|undefined), mimeType:(string)}|null} */
PageAgent.Frame;

/** @typedef {{frame:(PageAgent.Frame), childFrames:(Array.<PageAgent.FrameResourceTree>|undefined), resources:(Array.<Object>)}|null} */
PageAgent.FrameResourceTree;

/** @typedef {{lineNumber:(number), lineContent:(string)}|null} */
PageAgent.SearchMatch;

/** @typedef {{url:(string), frameId:(NetworkAgent.FrameId), matchesCount:(number)}|null} */
PageAgent.SearchResult;

/** @typedef {{name:(string), value:(string), domain:(string), path:(string), expires:(number), size:(number), httpOnly:(boolean), secure:(boolean), session:(boolean)}|null} */
PageAgent.Cookie;

/** @typedef {string} */
PageAgent.ScriptIdentifier;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {string} scriptSource
 * @param {function(?Protocol.Error, PageAgent.ScriptIdentifier):void=} opt_callback
 */
PageAgent.addScriptToEvaluateOnLoad = function(scriptSource, opt_callback) {}
/** @param {function(?Protocol.Error, PageAgent.ScriptIdentifier):void=} opt_callback */
PageAgent.addScriptToEvaluateOnLoad.invoke = function(obj, opt_callback) {}

/**
 * @param {PageAgent.ScriptIdentifier} identifier
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.removeScriptToEvaluateOnLoad = function(identifier, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.removeScriptToEvaluateOnLoad.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean=} opt_ignoreCache
 * @param {string=} opt_scriptToEvaluateOnLoad
 * @param {string=} opt_scriptPreprocessor
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.reload = function(opt_ignoreCache, opt_scriptToEvaluateOnLoad, opt_scriptPreprocessor, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.reload.invoke = function(obj, opt_callback) {}

/**
 * @param {string} url
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.navigate = function(url, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.navigate.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, Array.<PageAgent.Cookie>, string):void=} opt_callback
 */
PageAgent.getCookies = function(opt_callback) {}
/** @param {function(?Protocol.Error, Array.<PageAgent.Cookie>, string):void=} opt_callback */
PageAgent.getCookies.invoke = function(obj, opt_callback) {}

/**
 * @param {string} cookieName
 * @param {string} url
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.deleteCookie = function(cookieName, url, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.deleteCookie.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, PageAgent.FrameResourceTree):void=} opt_callback
 */
PageAgent.getResourceTree = function(opt_callback) {}
/** @param {function(?Protocol.Error, PageAgent.FrameResourceTree):void=} opt_callback */
PageAgent.getResourceTree.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {string} url
 * @param {function(?Protocol.Error, string, boolean):void=} opt_callback
 */
PageAgent.getResourceContent = function(frameId, url, opt_callback) {}
/** @param {function(?Protocol.Error, string, boolean):void=} opt_callback */
PageAgent.getResourceContent.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {string} url
 * @param {string} query
 * @param {boolean=} opt_caseSensitive
 * @param {boolean=} opt_isRegex
 * @param {function(?Protocol.Error, Array.<PageAgent.SearchMatch>):void=} opt_callback
 */
PageAgent.searchInResource = function(frameId, url, query, opt_caseSensitive, opt_isRegex, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<PageAgent.SearchMatch>):void=} opt_callback */
PageAgent.searchInResource.invoke = function(obj, opt_callback) {}

/**
 * @param {string} text
 * @param {boolean=} opt_caseSensitive
 * @param {boolean=} opt_isRegex
 * @param {function(?Protocol.Error, Array.<PageAgent.SearchResult>):void=} opt_callback
 */
PageAgent.searchInResources = function(text, opt_caseSensitive, opt_isRegex, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<PageAgent.SearchResult>):void=} opt_callback */
PageAgent.searchInResources.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {string} html
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setDocumentContent = function(frameId, html, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setDocumentContent.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
PageAgent.canOverrideDeviceMetrics = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
PageAgent.canOverrideDeviceMetrics.invoke = function(obj, opt_callback) {}

/**
 * @param {number} width
 * @param {number} height
 * @param {number} fontScaleFactor
 * @param {boolean} fitWindow
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setDeviceMetricsOverride = function(width, height, fontScaleFactor, fitWindow, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setDeviceMetricsOverride.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} result
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setShowPaintRects = function(result, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setShowPaintRects.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
PageAgent.canShowDebugBorders = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
PageAgent.canShowDebugBorders.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} show
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setShowDebugBorders = function(show, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setShowDebugBorders.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
PageAgent.canShowFPSCounter = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
PageAgent.canShowFPSCounter.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} show
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setShowFPSCounter = function(show, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setShowFPSCounter.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
PageAgent.canContinuouslyPaint = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
PageAgent.canContinuouslyPaint.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} enabled
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setContinuousPaintingEnabled = function(enabled, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setContinuousPaintingEnabled.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, string):void=} opt_callback
 */
PageAgent.getScriptExecutionStatus = function(opt_callback) {}
/** @param {function(?Protocol.Error, string):void=} opt_callback */
PageAgent.getScriptExecutionStatus.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} value
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setScriptExecutionDisabled = function(value, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setScriptExecutionDisabled.invoke = function(obj, opt_callback) {}

/**
 * @param {number=} opt_latitude
 * @param {number=} opt_longitude
 * @param {number=} opt_accuracy
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setGeolocationOverride = function(opt_latitude, opt_longitude, opt_accuracy, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setGeolocationOverride.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.clearGeolocationOverride = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.clearGeolocationOverride.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
PageAgent.canOverrideGeolocation = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
PageAgent.canOverrideGeolocation.invoke = function(obj, opt_callback) {}

/**
 * @param {number} alpha
 * @param {number} beta
 * @param {number} gamma
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setDeviceOrientationOverride = function(alpha, beta, gamma, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setDeviceOrientationOverride.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.clearDeviceOrientationOverride = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.clearDeviceOrientationOverride.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
PageAgent.canOverrideDeviceOrientation = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
PageAgent.canOverrideDeviceOrientation.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} enabled
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setTouchEmulationEnabled = function(enabled, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setTouchEmulationEnabled.invoke = function(obj, opt_callback) {}

/**
 * @param {string} media
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setEmulatedMedia = function(media, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setEmulatedMedia.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
PageAgent.getCompositingBordersVisible = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
PageAgent.getCompositingBordersVisible.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} visible
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.setCompositingBordersVisible = function(visible, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.setCompositingBordersVisible.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, string):void=} opt_callback
 */
PageAgent.captureScreenshot = function(opt_callback) {}
/** @param {function(?Protocol.Error, string):void=} opt_callback */
PageAgent.captureScreenshot.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} accept
 * @param {function(?Protocol.Error):void=} opt_callback
 */
PageAgent.handleJavaScriptDialog = function(accept, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
PageAgent.handleJavaScriptDialog.invoke = function(obj, opt_callback) {}
/** @interface */
PageAgent.Dispatcher = function() {};
/**
 * @param {number} timestamp
 */
PageAgent.Dispatcher.prototype.domContentEventFired = function(timestamp) {};
/**
 * @param {number} timestamp
 */
PageAgent.Dispatcher.prototype.loadEventFired = function(timestamp) {};
/**
 * @param {PageAgent.Frame} frame
 */
PageAgent.Dispatcher.prototype.frameNavigated = function(frame) {};
/**
 * @param {NetworkAgent.FrameId} frameId
 */
PageAgent.Dispatcher.prototype.frameDetached = function(frameId) {};
/**
 * @param {NetworkAgent.FrameId} frameId
 */
PageAgent.Dispatcher.prototype.frameStartedLoading = function(frameId) {};
/**
 * @param {NetworkAgent.FrameId} frameId
 */
PageAgent.Dispatcher.prototype.frameStoppedLoading = function(frameId) {};
/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {number} delay
 */
PageAgent.Dispatcher.prototype.frameScheduledNavigation = function(frameId, delay) {};
/**
 * @param {NetworkAgent.FrameId} frameId
 */
PageAgent.Dispatcher.prototype.frameClearedScheduledNavigation = function(frameId) {};
/**
 * @param {string} message
 */
PageAgent.Dispatcher.prototype.javascriptDialogOpening = function(message) {};
PageAgent.Dispatcher.prototype.javascriptDialogClosed = function() {};
/**
 * @param {boolean} isEnabled
 */
PageAgent.Dispatcher.prototype.scriptsEnabled = function(isEnabled) {};
/**
 * @param {PageAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerPageDispatcher = function(dispatcher) {}



var RuntimeAgent = {};

/** @typedef {string} */
RuntimeAgent.RemoteObjectId;

/** @typedef {{type:(string), subtype:(string|undefined), className:(string|undefined), value:(*|undefined), description:(string|undefined), objectId:(RuntimeAgent.RemoteObjectId|undefined), preview:(RuntimeAgent.ObjectPreview|undefined)}|null} */
RuntimeAgent.RemoteObject;

/** @typedef {{lossless:(boolean), overflow:(boolean), properties:(Array.<RuntimeAgent.PropertyPreview>)}|null} */
RuntimeAgent.ObjectPreview;

/** @typedef {{name:(string), type:(string), value:(string|undefined), valuePreview:(RuntimeAgent.ObjectPreview|undefined), subtype:(string|undefined)}|null} */
RuntimeAgent.PropertyPreview;

/** @typedef {{name:(string), value:(RuntimeAgent.RemoteObject|undefined), writable:(boolean|undefined), get:(RuntimeAgent.RemoteObject|undefined), set:(RuntimeAgent.RemoteObject|undefined), configurable:(boolean), enumerable:(boolean), wasThrown:(boolean|undefined), isOwn:(boolean|undefined)}|null} */
RuntimeAgent.PropertyDescriptor;

/** @typedef {{name:(string), value:(RuntimeAgent.RemoteObject|undefined)}|null} */
RuntimeAgent.InternalPropertyDescriptor;

/** @typedef {{value:(*|undefined), objectId:(RuntimeAgent.RemoteObjectId|undefined)}|null} */
RuntimeAgent.CallArgument;

/** @typedef {number} */
RuntimeAgent.ExecutionContextId;

/** @typedef {{id:(RuntimeAgent.ExecutionContextId), isPageContext:(boolean), name:(string), frameId:(NetworkAgent.FrameId)}|null} */
RuntimeAgent.ExecutionContextDescription;

/**
 * @param {string} expression
 * @param {string=} opt_objectGroup
 * @param {boolean=} opt_includeCommandLineAPI
 * @param {boolean=} opt_doNotPauseOnExceptionsAndMuteConsole
 * @param {RuntimeAgent.ExecutionContextId=} opt_contextId
 * @param {boolean=} opt_returnByValue
 * @param {boolean=} opt_generatePreview
 * @param {function(?Protocol.Error, RuntimeAgent.RemoteObject, boolean=):void=} opt_callback
 */
RuntimeAgent.evaluate = function(expression, opt_objectGroup, opt_includeCommandLineAPI, opt_doNotPauseOnExceptionsAndMuteConsole, opt_contextId, opt_returnByValue, opt_generatePreview, opt_callback) {}
/** @param {function(?Protocol.Error, RuntimeAgent.RemoteObject, boolean=):void=} opt_callback */
RuntimeAgent.evaluate.invoke = function(obj, opt_callback) {}

/**
 * @param {RuntimeAgent.RemoteObjectId} objectId
 * @param {string} functionDeclaration
 * @param {Array.<RuntimeAgent.CallArgument>=} opt_arguments
 * @param {boolean=} opt_doNotPauseOnExceptionsAndMuteConsole
 * @param {boolean=} opt_returnByValue
 * @param {boolean=} opt_generatePreview
 * @param {function(?Protocol.Error, RuntimeAgent.RemoteObject, boolean=):void=} opt_callback
 */
RuntimeAgent.callFunctionOn = function(objectId, functionDeclaration, opt_arguments, opt_doNotPauseOnExceptionsAndMuteConsole, opt_returnByValue, opt_generatePreview, opt_callback) {}
/** @param {function(?Protocol.Error, RuntimeAgent.RemoteObject, boolean=):void=} opt_callback */
RuntimeAgent.callFunctionOn.invoke = function(obj, opt_callback) {}

/**
 * @param {RuntimeAgent.RemoteObjectId} objectId
 * @param {boolean=} opt_ownProperties
 * @param {function(?Protocol.Error, Array.<RuntimeAgent.PropertyDescriptor>, Array.<RuntimeAgent.InternalPropertyDescriptor>=):void=} opt_callback
 */
RuntimeAgent.getProperties = function(objectId, opt_ownProperties, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<RuntimeAgent.PropertyDescriptor>, Array.<RuntimeAgent.InternalPropertyDescriptor>=):void=} opt_callback */
RuntimeAgent.getProperties.invoke = function(obj, opt_callback) {}

/**
 * @param {RuntimeAgent.RemoteObjectId} objectId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
RuntimeAgent.releaseObject = function(objectId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
RuntimeAgent.releaseObject.invoke = function(obj, opt_callback) {}

/**
 * @param {string} objectGroup
 * @param {function(?Protocol.Error):void=} opt_callback
 */
RuntimeAgent.releaseObjectGroup = function(objectGroup, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
RuntimeAgent.releaseObjectGroup.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
RuntimeAgent.run = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
RuntimeAgent.run.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
RuntimeAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
RuntimeAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
RuntimeAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
RuntimeAgent.disable.invoke = function(obj, opt_callback) {}
/** @interface */
RuntimeAgent.Dispatcher = function() {};
/**
 * @param {RuntimeAgent.ExecutionContextDescription} context
 */
RuntimeAgent.Dispatcher.prototype.executionContextCreated = function(context) {};
/**
 * @param {RuntimeAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerRuntimeDispatcher = function(dispatcher) {}



var ConsoleAgent = {};

/** @typedef {{source:(string), level:(string), text:(string), type:(string|undefined), url:(string|undefined), line:(number|undefined), repeatCount:(number|undefined), parameters:(Array.<RuntimeAgent.RemoteObject>|undefined), stackTrace:(ConsoleAgent.StackTrace|undefined), networkRequestId:(NetworkAgent.RequestId|undefined)}|null} */
ConsoleAgent.ConsoleMessage;

/** @typedef {{functionName:(string), url:(string), lineNumber:(number), columnNumber:(number)}|null} */
ConsoleAgent.CallFrame;

/** @typedef {Array.<ConsoleAgent.CallFrame>} */
ConsoleAgent.StackTrace;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ConsoleAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ConsoleAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ConsoleAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ConsoleAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ConsoleAgent.clearMessages = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ConsoleAgent.clearMessages.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} enabled
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ConsoleAgent.setMonitoringXHREnabled = function(enabled, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ConsoleAgent.setMonitoringXHREnabled.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ConsoleAgent.addInspectedNode = function(nodeId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ConsoleAgent.addInspectedNode.invoke = function(obj, opt_callback) {}

/**
 * @param {number} heapObjectId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ConsoleAgent.addInspectedHeapObject = function(heapObjectId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ConsoleAgent.addInspectedHeapObject.invoke = function(obj, opt_callback) {}
/** @interface */
ConsoleAgent.Dispatcher = function() {};
/**
 * @param {ConsoleAgent.ConsoleMessage} message
 */
ConsoleAgent.Dispatcher.prototype.messageAdded = function(message) {};
/**
 * @param {number} count
 */
ConsoleAgent.Dispatcher.prototype.messageRepeatCountUpdated = function(count) {};
ConsoleAgent.Dispatcher.prototype.messagesCleared = function() {};
/**
 * @param {ConsoleAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerConsoleDispatcher = function(dispatcher) {}



var NetworkAgent = {};

/** @typedef {string} */
NetworkAgent.LoaderId;

/** @typedef {string} */
NetworkAgent.FrameId;

/** @typedef {string} */
NetworkAgent.RequestId;

/** @typedef {number} */
NetworkAgent.Timestamp;

/** @typedef {Object} */
NetworkAgent.Headers;

/** @typedef {{requestTime:(number), proxyStart:(number), proxyEnd:(number), dnsStart:(number), dnsEnd:(number), connectStart:(number), connectEnd:(number), sslStart:(number), sslEnd:(number), sendStart:(number), sendEnd:(number), receiveHeadersEnd:(number)}|null} */
NetworkAgent.ResourceTiming;

/** @typedef {{url:(string), method:(string), headers:(NetworkAgent.Headers), postData:(string|undefined)}|null} */
NetworkAgent.Request;

/** @typedef {{url:(string), status:(number), statusText:(string), headers:(NetworkAgent.Headers), headersText:(string|undefined), mimeType:(string), requestHeaders:(NetworkAgent.Headers|undefined), requestHeadersText:(string|undefined), connectionReused:(boolean), connectionId:(number), fromDiskCache:(boolean|undefined), timing:(NetworkAgent.ResourceTiming|undefined)}|null} */
NetworkAgent.Response;

/** @typedef {{headers:(NetworkAgent.Headers)}|null} */
NetworkAgent.WebSocketRequest;

/** @typedef {{status:(number), statusText:(string), headers:(NetworkAgent.Headers)}|null} */
NetworkAgent.WebSocketResponse;

/** @typedef {{opcode:(number), mask:(boolean), payloadData:(string)}|null} */
NetworkAgent.WebSocketFrame;

/** @typedef {{url:(string), type:(PageAgent.ResourceType), response:(NetworkAgent.Response|undefined), bodySize:(number)}|null} */
NetworkAgent.CachedResource;

/** @typedef {{type:(string), stackTrace:(ConsoleAgent.StackTrace|undefined), url:(string|undefined), lineNumber:(number|undefined)}|null} */
NetworkAgent.Initiator;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
NetworkAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
NetworkAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
NetworkAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
NetworkAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {string} userAgent
 * @param {function(?Protocol.Error):void=} opt_callback
 */
NetworkAgent.setUserAgentOverride = function(userAgent, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
NetworkAgent.setUserAgentOverride.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.Headers} headers
 * @param {function(?Protocol.Error):void=} opt_callback
 */
NetworkAgent.setExtraHTTPHeaders = function(headers, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
NetworkAgent.setExtraHTTPHeaders.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {function(?Protocol.Error, string, boolean):void=} opt_callback
 */
NetworkAgent.getResponseBody = function(requestId, opt_callback) {}
/** @param {function(?Protocol.Error, string, boolean):void=} opt_callback */
NetworkAgent.getResponseBody.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
NetworkAgent.replayXHR = function(requestId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
NetworkAgent.replayXHR.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
NetworkAgent.canClearBrowserCache = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
NetworkAgent.canClearBrowserCache.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
NetworkAgent.clearBrowserCache = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
NetworkAgent.clearBrowserCache.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
NetworkAgent.canClearBrowserCookies = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
NetworkAgent.canClearBrowserCookies.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
NetworkAgent.clearBrowserCookies = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
NetworkAgent.clearBrowserCookies.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} cacheDisabled
 * @param {function(?Protocol.Error):void=} opt_callback
 */
NetworkAgent.setCacheDisabled = function(cacheDisabled, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
NetworkAgent.setCacheDisabled.invoke = function(obj, opt_callback) {}
/** @interface */
NetworkAgent.Dispatcher = function() {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.FrameId} frameId
 * @param {NetworkAgent.LoaderId} loaderId
 * @param {string} documentURL
 * @param {NetworkAgent.Request} request
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {NetworkAgent.Initiator} initiator
 * @param {NetworkAgent.Response=} opt_redirectResponse
 */
NetworkAgent.Dispatcher.prototype.requestWillBeSent = function(requestId, frameId, loaderId, documentURL, request, timestamp, initiator, opt_redirectResponse) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 */
NetworkAgent.Dispatcher.prototype.requestServedFromCache = function(requestId) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.FrameId} frameId
 * @param {NetworkAgent.LoaderId} loaderId
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {PageAgent.ResourceType} type
 * @param {NetworkAgent.Response} response
 */
NetworkAgent.Dispatcher.prototype.responseReceived = function(requestId, frameId, loaderId, timestamp, type, response) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {number} dataLength
 * @param {number} encodedDataLength
 */
NetworkAgent.Dispatcher.prototype.dataReceived = function(requestId, timestamp, dataLength, encodedDataLength) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.Timestamp} timestamp
 */
NetworkAgent.Dispatcher.prototype.loadingFinished = function(requestId, timestamp) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {string} errorText
 * @param {boolean=} opt_canceled
 */
NetworkAgent.Dispatcher.prototype.loadingFailed = function(requestId, timestamp, errorText, opt_canceled) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.FrameId} frameId
 * @param {NetworkAgent.LoaderId} loaderId
 * @param {string} documentURL
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {NetworkAgent.Initiator} initiator
 * @param {NetworkAgent.CachedResource} resource
 */
NetworkAgent.Dispatcher.prototype.requestServedFromMemoryCache = function(requestId, frameId, loaderId, documentURL, timestamp, initiator, resource) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {NetworkAgent.WebSocketRequest} request
 */
NetworkAgent.Dispatcher.prototype.webSocketWillSendHandshakeRequest = function(requestId, timestamp, request) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {NetworkAgent.WebSocketResponse} response
 */
NetworkAgent.Dispatcher.prototype.webSocketHandshakeResponseReceived = function(requestId, timestamp, response) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {string} url
 */
NetworkAgent.Dispatcher.prototype.webSocketCreated = function(requestId, url) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.Timestamp} timestamp
 */
NetworkAgent.Dispatcher.prototype.webSocketClosed = function(requestId, timestamp) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {NetworkAgent.WebSocketFrame} response
 */
NetworkAgent.Dispatcher.prototype.webSocketFrameReceived = function(requestId, timestamp, response) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {string} errorMessage
 */
NetworkAgent.Dispatcher.prototype.webSocketFrameError = function(requestId, timestamp, errorMessage) {};
/**
 * @param {NetworkAgent.RequestId} requestId
 * @param {NetworkAgent.Timestamp} timestamp
 * @param {NetworkAgent.WebSocketFrame} response
 */
NetworkAgent.Dispatcher.prototype.webSocketFrameSent = function(requestId, timestamp, response) {};
/**
 * @param {NetworkAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerNetworkDispatcher = function(dispatcher) {}



var DatabaseAgent = {};

/** @typedef {string} */
DatabaseAgent.DatabaseId;

/** @typedef {{id:(DatabaseAgent.DatabaseId), domain:(string), name:(string), version:(string)}|null} */
DatabaseAgent.Database;

/** @typedef {{message:(string), code:(number)}|null} */
DatabaseAgent.Error;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DatabaseAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DatabaseAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DatabaseAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DatabaseAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {DatabaseAgent.DatabaseId} databaseId
 * @param {function(?Protocol.Error, Array.<string>):void=} opt_callback
 */
DatabaseAgent.getDatabaseTableNames = function(databaseId, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<string>):void=} opt_callback */
DatabaseAgent.getDatabaseTableNames.invoke = function(obj, opt_callback) {}

/**
 * @param {DatabaseAgent.DatabaseId} databaseId
 * @param {string} query
 * @param {function(?Protocol.Error, Array.<string>=, Array.<*>=, DatabaseAgent.Error=):void=} opt_callback
 */
DatabaseAgent.executeSQL = function(databaseId, query, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<string>=, Array.<*>=, DatabaseAgent.Error=):void=} opt_callback */
DatabaseAgent.executeSQL.invoke = function(obj, opt_callback) {}
/** @interface */
DatabaseAgent.Dispatcher = function() {};
/**
 * @param {DatabaseAgent.Database} database
 */
DatabaseAgent.Dispatcher.prototype.addDatabase = function(database) {};
/**
 * @param {DatabaseAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerDatabaseDispatcher = function(dispatcher) {}



var IndexedDBAgent = {};

/** @typedef {{securityOrigin:(string), databaseNames:(Array.<string>)}|null} */
IndexedDBAgent.SecurityOriginWithDatabaseNames;

/** @typedef {{name:(string), version:(string), intVersion:(number), objectStores:(Array.<IndexedDBAgent.ObjectStore>)}|null} */
IndexedDBAgent.DatabaseWithObjectStores;

/** @typedef {{name:(string), keyPath:(IndexedDBAgent.KeyPath), autoIncrement:(boolean), indexes:(Array.<IndexedDBAgent.ObjectStoreIndex>)}|null} */
IndexedDBAgent.ObjectStore;

/** @typedef {{name:(string), keyPath:(IndexedDBAgent.KeyPath), unique:(boolean), multiEntry:(boolean)}|null} */
IndexedDBAgent.ObjectStoreIndex;

/** @typedef {{type:(string), number:(number|undefined), string:(string|undefined), date:(number|undefined), array:(Array.<IndexedDBAgent.Key>|undefined)}|null} */
IndexedDBAgent.Key;

/** @typedef {{lower:(IndexedDBAgent.Key|undefined), upper:(IndexedDBAgent.Key|undefined), lowerOpen:(boolean), upperOpen:(boolean)}|null} */
IndexedDBAgent.KeyRange;

/** @typedef {{key:(RuntimeAgent.RemoteObject), primaryKey:(RuntimeAgent.RemoteObject), value:(RuntimeAgent.RemoteObject)}|null} */
IndexedDBAgent.DataEntry;

/** @typedef {{type:(string), string:(string|undefined), array:(Array.<string>|undefined)}|null} */
IndexedDBAgent.KeyPath;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
IndexedDBAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
IndexedDBAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
IndexedDBAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
IndexedDBAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {function(?Protocol.Error, IndexedDBAgent.SecurityOriginWithDatabaseNames):void=} opt_callback
 */
IndexedDBAgent.requestDatabaseNamesForFrame = function(frameId, opt_callback) {}
/** @param {function(?Protocol.Error, IndexedDBAgent.SecurityOriginWithDatabaseNames):void=} opt_callback */
IndexedDBAgent.requestDatabaseNamesForFrame.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {string} databaseName
 * @param {function(?Protocol.Error, IndexedDBAgent.DatabaseWithObjectStores):void=} opt_callback
 */
IndexedDBAgent.requestDatabase = function(frameId, databaseName, opt_callback) {}
/** @param {function(?Protocol.Error, IndexedDBAgent.DatabaseWithObjectStores):void=} opt_callback */
IndexedDBAgent.requestDatabase.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {string} databaseName
 * @param {string} objectStoreName
 * @param {string} indexName
 * @param {number} skipCount
 * @param {number} pageSize
 * @param {IndexedDBAgent.KeyRange=} opt_keyRange
 * @param {function(?Protocol.Error, Array.<IndexedDBAgent.DataEntry>, boolean):void=} opt_callback
 */
IndexedDBAgent.requestData = function(frameId, databaseName, objectStoreName, indexName, skipCount, pageSize, opt_keyRange, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<IndexedDBAgent.DataEntry>, boolean):void=} opt_callback */
IndexedDBAgent.requestData.invoke = function(obj, opt_callback) {}
/** @interface */
IndexedDBAgent.Dispatcher = function() {};
/**
 * @param {IndexedDBAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerIndexedDBDispatcher = function(dispatcher) {}



var DOMStorageAgent = {};

/** @typedef {{securityOrigin:(string), isLocalStorage:(boolean)}|null} */
DOMStorageAgent.StorageId;

/** @typedef {Array.<string>} */
DOMStorageAgent.Item;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMStorageAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMStorageAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMStorageAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMStorageAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMStorageAgent.StorageId} storageId
 * @param {function(?Protocol.Error, Array.<DOMStorageAgent.Item>):void=} opt_callback
 */
DOMStorageAgent.getDOMStorageItems = function(storageId, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<DOMStorageAgent.Item>):void=} opt_callback */
DOMStorageAgent.getDOMStorageItems.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMStorageAgent.StorageId} storageId
 * @param {string} key
 * @param {string} value
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMStorageAgent.setDOMStorageItem = function(storageId, key, value, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMStorageAgent.setDOMStorageItem.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMStorageAgent.StorageId} storageId
 * @param {string} key
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMStorageAgent.removeDOMStorageItem = function(storageId, key, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMStorageAgent.removeDOMStorageItem.invoke = function(obj, opt_callback) {}
/** @interface */
DOMStorageAgent.Dispatcher = function() {};
/**
 * @param {DOMStorageAgent.StorageId} storageId
 */
DOMStorageAgent.Dispatcher.prototype.domStorageItemsCleared = function(storageId) {};
/**
 * @param {DOMStorageAgent.StorageId} storageId
 * @param {string} key
 */
DOMStorageAgent.Dispatcher.prototype.domStorageItemRemoved = function(storageId, key) {};
/**
 * @param {DOMStorageAgent.StorageId} storageId
 * @param {string} key
 * @param {string} newValue
 */
DOMStorageAgent.Dispatcher.prototype.domStorageItemAdded = function(storageId, key, newValue) {};
/**
 * @param {DOMStorageAgent.StorageId} storageId
 * @param {string} key
 * @param {string} oldValue
 * @param {string} newValue
 */
DOMStorageAgent.Dispatcher.prototype.domStorageItemUpdated = function(storageId, key, oldValue, newValue) {};
/**
 * @param {DOMStorageAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerDOMStorageDispatcher = function(dispatcher) {}



var ApplicationCacheAgent = {};

/** @typedef {{url:(string), size:(number), type:(string)}|null} */
ApplicationCacheAgent.ApplicationCacheResource;

/** @typedef {{manifestURL:(string), size:(number), creationTime:(number), updateTime:(number), resources:(Array.<ApplicationCacheAgent.ApplicationCacheResource>)}|null} */
ApplicationCacheAgent.ApplicationCache;

/** @typedef {{frameId:(NetworkAgent.FrameId), manifestURL:(string), status:(number)}|null} */
ApplicationCacheAgent.FrameWithManifest;

/**
 * @param {function(?Protocol.Error, Array.<ApplicationCacheAgent.FrameWithManifest>):void=} opt_callback
 */
ApplicationCacheAgent.getFramesWithManifests = function(opt_callback) {}
/** @param {function(?Protocol.Error, Array.<ApplicationCacheAgent.FrameWithManifest>):void=} opt_callback */
ApplicationCacheAgent.getFramesWithManifests.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ApplicationCacheAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ApplicationCacheAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {function(?Protocol.Error, string):void=} opt_callback
 */
ApplicationCacheAgent.getManifestForFrame = function(frameId, opt_callback) {}
/** @param {function(?Protocol.Error, string):void=} opt_callback */
ApplicationCacheAgent.getManifestForFrame.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {function(?Protocol.Error, ApplicationCacheAgent.ApplicationCache):void=} opt_callback
 */
ApplicationCacheAgent.getApplicationCacheForFrame = function(frameId, opt_callback) {}
/** @param {function(?Protocol.Error, ApplicationCacheAgent.ApplicationCache):void=} opt_callback */
ApplicationCacheAgent.getApplicationCacheForFrame.invoke = function(obj, opt_callback) {}
/** @interface */
ApplicationCacheAgent.Dispatcher = function() {};
/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {string} manifestURL
 * @param {number} status
 */
ApplicationCacheAgent.Dispatcher.prototype.applicationCacheStatusUpdated = function(frameId, manifestURL, status) {};
/**
 * @param {boolean} isNowOnline
 */
ApplicationCacheAgent.Dispatcher.prototype.networkStateUpdated = function(isNowOnline) {};
/**
 * @param {ApplicationCacheAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerApplicationCacheDispatcher = function(dispatcher) {}



var FileSystemAgent = {};

/** @typedef {{url:(string), name:(string), isDirectory:(boolean), mimeType:(string|undefined), resourceType:(PageAgent.ResourceType|undefined), isTextFile:(boolean|undefined)}|null} */
FileSystemAgent.Entry;

/** @typedef {{modificationTime:(number), size:(number)}|null} */
FileSystemAgent.Metadata;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
FileSystemAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
FileSystemAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
FileSystemAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
FileSystemAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {string} origin
 * @param {string} type
 * @param {function(?Protocol.Error, number, FileSystemAgent.Entry=):void=} opt_callback
 */
FileSystemAgent.requestFileSystemRoot = function(origin, type, opt_callback) {}
/** @param {function(?Protocol.Error, number, FileSystemAgent.Entry=):void=} opt_callback */
FileSystemAgent.requestFileSystemRoot.invoke = function(obj, opt_callback) {}

/**
 * @param {string} url
 * @param {function(?Protocol.Error, number, Array.<FileSystemAgent.Entry>=):void=} opt_callback
 */
FileSystemAgent.requestDirectoryContent = function(url, opt_callback) {}
/** @param {function(?Protocol.Error, number, Array.<FileSystemAgent.Entry>=):void=} opt_callback */
FileSystemAgent.requestDirectoryContent.invoke = function(obj, opt_callback) {}

/**
 * @param {string} url
 * @param {function(?Protocol.Error, number, FileSystemAgent.Metadata=):void=} opt_callback
 */
FileSystemAgent.requestMetadata = function(url, opt_callback) {}
/** @param {function(?Protocol.Error, number, FileSystemAgent.Metadata=):void=} opt_callback */
FileSystemAgent.requestMetadata.invoke = function(obj, opt_callback) {}

/**
 * @param {string} url
 * @param {boolean} readAsText
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @param {string=} opt_charset
 * @param {function(?Protocol.Error, number, string=, string=):void=} opt_callback
 */
FileSystemAgent.requestFileContent = function(url, readAsText, opt_start, opt_end, opt_charset, opt_callback) {}
/** @param {function(?Protocol.Error, number, string=, string=):void=} opt_callback */
FileSystemAgent.requestFileContent.invoke = function(obj, opt_callback) {}

/**
 * @param {string} url
 * @param {function(?Protocol.Error, number):void=} opt_callback
 */
FileSystemAgent.deleteEntry = function(url, opt_callback) {}
/** @param {function(?Protocol.Error, number):void=} opt_callback */
FileSystemAgent.deleteEntry.invoke = function(obj, opt_callback) {}
/** @interface */
FileSystemAgent.Dispatcher = function() {};
/**
 * @param {FileSystemAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerFileSystemDispatcher = function(dispatcher) {}



var DOMAgent = {};

/** @typedef {number} */
DOMAgent.NodeId;

/** @typedef {{nodeId:(DOMAgent.NodeId), nodeType:(number), nodeName:(string), localName:(string), nodeValue:(string), childNodeCount:(number|undefined), children:(Array.<DOMAgent.Node>|undefined), attributes:(Array.<string>|undefined), documentURL:(string|undefined), baseURL:(string|undefined), publicId:(string|undefined), systemId:(string|undefined), internalSubset:(string|undefined), xmlVersion:(string|undefined), name:(string|undefined), value:(string|undefined), frameId:(NetworkAgent.FrameId|undefined), contentDocument:(DOMAgent.Node|undefined), shadowRoots:(Array.<DOMAgent.Node>|undefined), templateContent:(DOMAgent.Node|undefined)}|null} */
DOMAgent.Node;

/** @typedef {{type:(string), useCapture:(boolean), isAttribute:(boolean), nodeId:(DOMAgent.NodeId), handlerBody:(string), location:(DebuggerAgent.Location|undefined), sourceName:(string|undefined), handler:(RuntimeAgent.RemoteObject|undefined)}|null} */
DOMAgent.EventListener;

/** @typedef {{r:(number), g:(number), b:(number), a:(number|undefined)}|null} */
DOMAgent.RGBA;

/** @typedef {{showInfo:(boolean|undefined), contentColor:(DOMAgent.RGBA|undefined), paddingColor:(DOMAgent.RGBA|undefined), borderColor:(DOMAgent.RGBA|undefined), marginColor:(DOMAgent.RGBA|undefined)}|null} */
DOMAgent.HighlightConfig;

/**
 * @param {function(?Protocol.Error, DOMAgent.Node):void=} opt_callback
 */
DOMAgent.getDocument = function(opt_callback) {}
/** @param {function(?Protocol.Error, DOMAgent.Node):void=} opt_callback */
DOMAgent.getDocument.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {number=} opt_depth
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.requestChildNodes = function(nodeId, opt_depth, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.requestChildNodes.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} selector
 * @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback
 */
DOMAgent.querySelector = function(nodeId, selector, opt_callback) {}
/** @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback */
DOMAgent.querySelector.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} selector
 * @param {function(?Protocol.Error, Array.<DOMAgent.NodeId>):void=} opt_callback
 */
DOMAgent.querySelectorAll = function(nodeId, selector, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<DOMAgent.NodeId>):void=} opt_callback */
DOMAgent.querySelectorAll.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} name
 * @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback
 */
DOMAgent.setNodeName = function(nodeId, name, opt_callback) {}
/** @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback */
DOMAgent.setNodeName.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} value
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.setNodeValue = function(nodeId, value, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.setNodeValue.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.removeNode = function(nodeId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.removeNode.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} name
 * @param {string} value
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.setAttributeValue = function(nodeId, name, value, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.setAttributeValue.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} text
 * @param {string=} opt_name
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.setAttributesAsText = function(nodeId, text, opt_name, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.setAttributesAsText.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} name
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.removeAttribute = function(nodeId, name, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.removeAttribute.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string=} opt_objectGroup
 * @param {function(?Protocol.Error, Array.<DOMAgent.EventListener>):void=} opt_callback
 */
DOMAgent.getEventListenersForNode = function(nodeId, opt_objectGroup, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<DOMAgent.EventListener>):void=} opt_callback */
DOMAgent.getEventListenersForNode.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {function(?Protocol.Error, string):void=} opt_callback
 */
DOMAgent.getOuterHTML = function(nodeId, opt_callback) {}
/** @param {function(?Protocol.Error, string):void=} opt_callback */
DOMAgent.getOuterHTML.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} outerHTML
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.setOuterHTML = function(nodeId, outerHTML, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.setOuterHTML.invoke = function(obj, opt_callback) {}

/**
 * @param {string} query
 * @param {function(?Protocol.Error, string, number):void=} opt_callback
 */
DOMAgent.performSearch = function(query, opt_callback) {}
/** @param {function(?Protocol.Error, string, number):void=} opt_callback */
DOMAgent.performSearch.invoke = function(obj, opt_callback) {}

/**
 * @param {string} searchId
 * @param {number} fromIndex
 * @param {number} toIndex
 * @param {function(?Protocol.Error, Array.<DOMAgent.NodeId>):void=} opt_callback
 */
DOMAgent.getSearchResults = function(searchId, fromIndex, toIndex, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<DOMAgent.NodeId>):void=} opt_callback */
DOMAgent.getSearchResults.invoke = function(obj, opt_callback) {}

/**
 * @param {string} searchId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.discardSearchResults = function(searchId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.discardSearchResults.invoke = function(obj, opt_callback) {}

/**
 * @param {RuntimeAgent.RemoteObjectId} objectId
 * @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback
 */
DOMAgent.requestNode = function(objectId, opt_callback) {}
/** @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback */
DOMAgent.requestNode.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} enabled
 * @param {DOMAgent.HighlightConfig=} opt_highlightConfig
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.setInspectModeEnabled = function(enabled, opt_highlightConfig, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.setInspectModeEnabled.invoke = function(obj, opt_callback) {}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {DOMAgent.RGBA=} opt_color
 * @param {DOMAgent.RGBA=} opt_outlineColor
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.highlightRect = function(x, y, width, height, opt_color, opt_outlineColor, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.highlightRect.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.HighlightConfig} highlightConfig
 * @param {DOMAgent.NodeId=} opt_nodeId
 * @param {RuntimeAgent.RemoteObjectId=} opt_objectId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.highlightNode = function(highlightConfig, opt_nodeId, opt_objectId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.highlightNode.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.hideHighlight = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.hideHighlight.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId} frameId
 * @param {DOMAgent.RGBA=} opt_contentColor
 * @param {DOMAgent.RGBA=} opt_contentOutlineColor
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.highlightFrame = function(frameId, opt_contentColor, opt_contentOutlineColor, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.highlightFrame.invoke = function(obj, opt_callback) {}

/**
 * @param {string} path
 * @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback
 */
DOMAgent.pushNodeByPathToFrontend = function(path, opt_callback) {}
/** @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback */
DOMAgent.pushNodeByPathToFrontend.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string=} opt_objectGroup
 * @param {function(?Protocol.Error, RuntimeAgent.RemoteObject):void=} opt_callback
 */
DOMAgent.resolveNode = function(nodeId, opt_objectGroup, opt_callback) {}
/** @param {function(?Protocol.Error, RuntimeAgent.RemoteObject):void=} opt_callback */
DOMAgent.resolveNode.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {function(?Protocol.Error, Array.<string>):void=} opt_callback
 */
DOMAgent.getAttributes = function(nodeId, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<string>):void=} opt_callback */
DOMAgent.getAttributes.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {DOMAgent.NodeId} targetNodeId
 * @param {DOMAgent.NodeId=} opt_insertBeforeNodeId
 * @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback
 */
DOMAgent.moveTo = function(nodeId, targetNodeId, opt_insertBeforeNodeId, opt_callback) {}
/** @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback */
DOMAgent.moveTo.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.undo = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.undo.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.redo = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.redo.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.markUndoableState = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.markUndoableState.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.focus = function(nodeId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.focus.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {Array.<string>} files
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMAgent.setFileInputFiles = function(nodeId, files, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMAgent.setFileInputFiles.invoke = function(obj, opt_callback) {}
/** @interface */
DOMAgent.Dispatcher = function() {};
DOMAgent.Dispatcher.prototype.documentUpdated = function() {};
/**
 * @param {DOMAgent.NodeId} parentId
 * @param {Array.<DOMAgent.Node>} nodes
 */
DOMAgent.Dispatcher.prototype.setChildNodes = function(parentId, nodes) {};
/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} name
 * @param {string} value
 */
DOMAgent.Dispatcher.prototype.attributeModified = function(nodeId, name, value) {};
/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} name
 */
DOMAgent.Dispatcher.prototype.attributeRemoved = function(nodeId, name) {};
/**
 * @param {Array.<DOMAgent.NodeId>} nodeIds
 */
DOMAgent.Dispatcher.prototype.inlineStyleInvalidated = function(nodeIds) {};
/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {string} characterData
 */
DOMAgent.Dispatcher.prototype.characterDataModified = function(nodeId, characterData) {};
/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {number} childNodeCount
 */
DOMAgent.Dispatcher.prototype.childNodeCountUpdated = function(nodeId, childNodeCount) {};
/**
 * @param {DOMAgent.NodeId} parentNodeId
 * @param {DOMAgent.NodeId} previousNodeId
 * @param {DOMAgent.Node} node
 */
DOMAgent.Dispatcher.prototype.childNodeInserted = function(parentNodeId, previousNodeId, node) {};
/**
 * @param {DOMAgent.NodeId} parentNodeId
 * @param {DOMAgent.NodeId} nodeId
 */
DOMAgent.Dispatcher.prototype.childNodeRemoved = function(parentNodeId, nodeId) {};
/**
 * @param {DOMAgent.NodeId} hostId
 * @param {DOMAgent.Node} root
 */
DOMAgent.Dispatcher.prototype.shadowRootPushed = function(hostId, root) {};
/**
 * @param {DOMAgent.NodeId} hostId
 * @param {DOMAgent.NodeId} rootId
 */
DOMAgent.Dispatcher.prototype.shadowRootPopped = function(hostId, rootId) {};
/**
 * @param {DOMAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerDOMDispatcher = function(dispatcher) {}



var CSSAgent = {};

/** @typedef {string} */
CSSAgent.StyleSheetId;

/** @typedef {{styleSheetId:(CSSAgent.StyleSheetId), ordinal:(number)}|null} */
CSSAgent.CSSStyleId;

/** @typedef {string} */
CSSAgent.StyleSheetOrigin;

/** @typedef {{styleSheetId:(CSSAgent.StyleSheetId), ordinal:(number)}|null} */
CSSAgent.CSSRuleId;

/** @typedef {{pseudoId:(number), matches:(Array.<CSSAgent.RuleMatch>)}|null} */
CSSAgent.PseudoIdMatches;

/** @typedef {{inlineStyle:(CSSAgent.CSSStyle|undefined), matchedCSSRules:(Array.<CSSAgent.RuleMatch>)}|null} */
CSSAgent.InheritedStyleEntry;

/** @typedef {{rule:(CSSAgent.CSSRule), matchingSelectors:(Array.<number>)}|null} */
CSSAgent.RuleMatch;

/** @typedef {{selectors:(Array.<string>), text:(string), range:(CSSAgent.SourceRange|undefined)}|null} */
CSSAgent.SelectorList;

/** @typedef {{name:(string), style:(CSSAgent.CSSStyle)}|null} */
CSSAgent.CSSStyleAttribute;

/** @typedef {{styleSheetId:(CSSAgent.StyleSheetId), frameId:(NetworkAgent.FrameId), sourceURL:(string), origin:(CSSAgent.StyleSheetOrigin), title:(string), disabled:(boolean)}|null} */
CSSAgent.CSSStyleSheetHeader;

/** @typedef {{styleSheetId:(CSSAgent.StyleSheetId), rules:(Array.<CSSAgent.CSSRule>), text:(string|undefined)}|null} */
CSSAgent.CSSStyleSheetBody;

/** @typedef {{ruleId:(CSSAgent.CSSRuleId|undefined), selectorList:(CSSAgent.SelectorList), sourceURL:(string|undefined), sourceLine:(number), origin:(CSSAgent.StyleSheetOrigin), style:(CSSAgent.CSSStyle), media:(Array.<CSSAgent.CSSMedia>|undefined)}|null} */
CSSAgent.CSSRule;

/** @typedef {{start:(number), end:(number)}|null} */
CSSAgent.SourceRange;

/** @typedef {{name:(string), value:(string)}|null} */
CSSAgent.ShorthandEntry;

/** @typedef {{name:(string), longhands:(Array.<string>|undefined)}|null} */
CSSAgent.CSSPropertyInfo;

/** @typedef {{name:(string), value:(string)}|null} */
CSSAgent.CSSComputedStyleProperty;

/** @typedef {{styleId:(CSSAgent.CSSStyleId|undefined), cssProperties:(Array.<CSSAgent.CSSProperty>), shorthandEntries:(Array.<CSSAgent.ShorthandEntry>), cssText:(string|undefined), range:(CSSAgent.SourceRange|undefined), width:(string|undefined), height:(string|undefined)}|null} */
CSSAgent.CSSStyle;

/** @typedef {{name:(string), value:(string), priority:(string|undefined), implicit:(boolean|undefined), text:(string|undefined), parsedOk:(boolean|undefined), status:(string|undefined), range:(CSSAgent.SourceRange|undefined)}|null} */
CSSAgent.CSSProperty;

/** @typedef {{text:(string), source:(string), sourceURL:(string|undefined), sourceLine:(number|undefined)}|null} */
CSSAgent.CSSMedia;

/** @typedef {{selector:(string), url:(string), lineNumber:(number), time:(number), hitCount:(number), matchCount:(number)}|null} */
CSSAgent.SelectorProfileEntry;

/** @typedef {{totalTime:(number), data:(Array.<CSSAgent.SelectorProfileEntry>)}|null} */
CSSAgent.SelectorProfile;

/** @typedef {{regionOverset:(string), nodeId:(DOMAgent.NodeId)}|null} */
CSSAgent.Region;

/** @typedef {{documentNodeId:(DOMAgent.NodeId), name:(string), overset:(boolean), content:(Array.<DOMAgent.NodeId>), regions:(Array.<CSSAgent.Region>)}|null} */
CSSAgent.NamedFlow;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
CSSAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
CSSAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
CSSAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
CSSAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {boolean=} opt_includePseudo
 * @param {boolean=} opt_includeInherited
 * @param {function(?Protocol.Error, Array.<CSSAgent.RuleMatch>=, Array.<CSSAgent.PseudoIdMatches>=, Array.<CSSAgent.InheritedStyleEntry>=):void=} opt_callback
 */
CSSAgent.getMatchedStylesForNode = function(nodeId, opt_includePseudo, opt_includeInherited, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<CSSAgent.RuleMatch>=, Array.<CSSAgent.PseudoIdMatches>=, Array.<CSSAgent.InheritedStyleEntry>=):void=} opt_callback */
CSSAgent.getMatchedStylesForNode.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {function(?Protocol.Error, CSSAgent.CSSStyle=, CSSAgent.CSSStyle=):void=} opt_callback
 */
CSSAgent.getInlineStylesForNode = function(nodeId, opt_callback) {}
/** @param {function(?Protocol.Error, CSSAgent.CSSStyle=, CSSAgent.CSSStyle=):void=} opt_callback */
CSSAgent.getInlineStylesForNode.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {function(?Protocol.Error, Array.<CSSAgent.CSSComputedStyleProperty>):void=} opt_callback
 */
CSSAgent.getComputedStyleForNode = function(nodeId, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<CSSAgent.CSSComputedStyleProperty>):void=} opt_callback */
CSSAgent.getComputedStyleForNode.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, Array.<CSSAgent.CSSStyleSheetHeader>):void=} opt_callback
 */
CSSAgent.getAllStyleSheets = function(opt_callback) {}
/** @param {function(?Protocol.Error, Array.<CSSAgent.CSSStyleSheetHeader>):void=} opt_callback */
CSSAgent.getAllStyleSheets.invoke = function(obj, opt_callback) {}

/**
 * @param {CSSAgent.StyleSheetId} styleSheetId
 * @param {function(?Protocol.Error, CSSAgent.CSSStyleSheetBody):void=} opt_callback
 */
CSSAgent.getStyleSheet = function(styleSheetId, opt_callback) {}
/** @param {function(?Protocol.Error, CSSAgent.CSSStyleSheetBody):void=} opt_callback */
CSSAgent.getStyleSheet.invoke = function(obj, opt_callback) {}

/**
 * @param {CSSAgent.StyleSheetId} styleSheetId
 * @param {function(?Protocol.Error, string):void=} opt_callback
 */
CSSAgent.getStyleSheetText = function(styleSheetId, opt_callback) {}
/** @param {function(?Protocol.Error, string):void=} opt_callback */
CSSAgent.getStyleSheetText.invoke = function(obj, opt_callback) {}

/**
 * @param {CSSAgent.StyleSheetId} styleSheetId
 * @param {string} text
 * @param {function(?Protocol.Error):void=} opt_callback
 */
CSSAgent.setStyleSheetText = function(styleSheetId, text, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
CSSAgent.setStyleSheetText.invoke = function(obj, opt_callback) {}

/**
 * @param {CSSAgent.CSSStyleId} styleId
 * @param {number} propertyIndex
 * @param {string} text
 * @param {boolean} overwrite
 * @param {function(?Protocol.Error, CSSAgent.CSSStyle):void=} opt_callback
 */
CSSAgent.setPropertyText = function(styleId, propertyIndex, text, overwrite, opt_callback) {}
/** @param {function(?Protocol.Error, CSSAgent.CSSStyle):void=} opt_callback */
CSSAgent.setPropertyText.invoke = function(obj, opt_callback) {}

/**
 * @param {CSSAgent.CSSStyleId} styleId
 * @param {number} propertyIndex
 * @param {boolean} disable
 * @param {function(?Protocol.Error, CSSAgent.CSSStyle):void=} opt_callback
 */
CSSAgent.toggleProperty = function(styleId, propertyIndex, disable, opt_callback) {}
/** @param {function(?Protocol.Error, CSSAgent.CSSStyle):void=} opt_callback */
CSSAgent.toggleProperty.invoke = function(obj, opt_callback) {}

/**
 * @param {CSSAgent.CSSRuleId} ruleId
 * @param {string} selector
 * @param {function(?Protocol.Error, CSSAgent.CSSRule):void=} opt_callback
 */
CSSAgent.setRuleSelector = function(ruleId, selector, opt_callback) {}
/** @param {function(?Protocol.Error, CSSAgent.CSSRule):void=} opt_callback */
CSSAgent.setRuleSelector.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} contextNodeId
 * @param {string} selector
 * @param {function(?Protocol.Error, CSSAgent.CSSRule):void=} opt_callback
 */
CSSAgent.addRule = function(contextNodeId, selector, opt_callback) {}
/** @param {function(?Protocol.Error, CSSAgent.CSSRule):void=} opt_callback */
CSSAgent.addRule.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, Array.<CSSAgent.CSSPropertyInfo>):void=} opt_callback
 */
CSSAgent.getSupportedCSSProperties = function(opt_callback) {}
/** @param {function(?Protocol.Error, Array.<CSSAgent.CSSPropertyInfo>):void=} opt_callback */
CSSAgent.getSupportedCSSProperties.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {Array.<string>} forcedPseudoClasses
 * @param {function(?Protocol.Error):void=} opt_callback
 */
CSSAgent.forcePseudoState = function(nodeId, forcedPseudoClasses, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
CSSAgent.forcePseudoState.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
CSSAgent.startSelectorProfiler = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
CSSAgent.startSelectorProfiler.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, CSSAgent.SelectorProfile):void=} opt_callback
 */
CSSAgent.stopSelectorProfiler = function(opt_callback) {}
/** @param {function(?Protocol.Error, CSSAgent.SelectorProfile):void=} opt_callback */
CSSAgent.stopSelectorProfiler.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} documentNodeId
 * @param {function(?Protocol.Error, Array.<CSSAgent.NamedFlow>):void=} opt_callback
 */
CSSAgent.getNamedFlowCollection = function(documentNodeId, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<CSSAgent.NamedFlow>):void=} opt_callback */
CSSAgent.getNamedFlowCollection.invoke = function(obj, opt_callback) {}
/** @interface */
CSSAgent.Dispatcher = function() {};
CSSAgent.Dispatcher.prototype.mediaQueryResultChanged = function() {};
/**
 * @param {CSSAgent.StyleSheetId} styleSheetId
 */
CSSAgent.Dispatcher.prototype.styleSheetChanged = function(styleSheetId) {};
/**
 * @param {CSSAgent.NamedFlow} namedFlow
 */
CSSAgent.Dispatcher.prototype.namedFlowCreated = function(namedFlow) {};
/**
 * @param {DOMAgent.NodeId} documentNodeId
 * @param {string} flowName
 */
CSSAgent.Dispatcher.prototype.namedFlowRemoved = function(documentNodeId, flowName) {};
/**
 * @param {CSSAgent.NamedFlow} namedFlow
 */
CSSAgent.Dispatcher.prototype.regionLayoutUpdated = function(namedFlow) {};
/**
 * @param {CSSAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerCSSDispatcher = function(dispatcher) {}



var TimelineAgent = {};

/** @typedef {{type:(string), data:(Object), children:(Array.<TimelineAgent.TimelineEvent>|undefined)}|null} */
TimelineAgent.TimelineEvent;

/**
 * @param {number=} opt_maxCallStackDepth
 * @param {function(?Protocol.Error):void=} opt_callback
 */
TimelineAgent.start = function(opt_maxCallStackDepth, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
TimelineAgent.start.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
TimelineAgent.stop = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
TimelineAgent.stop.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} enabled
 * @param {function(?Protocol.Error):void=} opt_callback
 */
TimelineAgent.setIncludeDomCounters = function(enabled, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
TimelineAgent.setIncludeDomCounters.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} enabled
 * @param {function(?Protocol.Error):void=} opt_callback
 */
TimelineAgent.setIncludeNativeMemoryStatistics = function(enabled, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
TimelineAgent.setIncludeNativeMemoryStatistics.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
TimelineAgent.supportsFrameInstrumentation = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
TimelineAgent.supportsFrameInstrumentation.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
TimelineAgent.canMonitorMainThread = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
TimelineAgent.canMonitorMainThread.invoke = function(obj, opt_callback) {}
/** @interface */
TimelineAgent.Dispatcher = function() {};
/**
 * @param {TimelineAgent.TimelineEvent} record
 */
TimelineAgent.Dispatcher.prototype.eventRecorded = function(record) {};
/**
 * @param {TimelineAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerTimelineDispatcher = function(dispatcher) {}



var DebuggerAgent = {};

/** @typedef {string} */
DebuggerAgent.BreakpointId;

/** @typedef {string} */
DebuggerAgent.ScriptId;

/** @typedef {string} */
DebuggerAgent.CallFrameId;

/** @typedef {{scriptId:(DebuggerAgent.ScriptId), lineNumber:(number), columnNumber:(number|undefined)}|null} */
DebuggerAgent.Location;

/** @typedef {{location:(DebuggerAgent.Location), name:(string|undefined), displayName:(string|undefined), inferredName:(string|undefined), scopeChain:(Array.<DebuggerAgent.Scope>|undefined)}|null} */
DebuggerAgent.FunctionDetails;

/** @typedef {{callFrameId:(DebuggerAgent.CallFrameId), functionName:(string), location:(DebuggerAgent.Location), scopeChain:(Array.<DebuggerAgent.Scope>), this:(RuntimeAgent.RemoteObject)}|null} */
DebuggerAgent.CallFrame;

/** @typedef {{type:(string), object:(RuntimeAgent.RemoteObject)}|null} */
DebuggerAgent.Scope;

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
DebuggerAgent.causesRecompilation = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
DebuggerAgent.causesRecompilation.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
DebuggerAgent.supportsSeparateScriptCompilationAndExecution = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
DebuggerAgent.supportsSeparateScriptCompilationAndExecution.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} active
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.setBreakpointsActive = function(active, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.setBreakpointsActive.invoke = function(obj, opt_callback) {}

/**
 * @param {number} lineNumber
 * @param {string=} opt_url
 * @param {string=} opt_urlRegex
 * @param {number=} opt_columnNumber
 * @param {string=} opt_condition
 * @param {function(?Protocol.Error, DebuggerAgent.BreakpointId, Array.<DebuggerAgent.Location>):void=} opt_callback
 */
DebuggerAgent.setBreakpointByUrl = function(lineNumber, opt_url, opt_urlRegex, opt_columnNumber, opt_condition, opt_callback) {}
/** @param {function(?Protocol.Error, DebuggerAgent.BreakpointId, Array.<DebuggerAgent.Location>):void=} opt_callback */
DebuggerAgent.setBreakpointByUrl.invoke = function(obj, opt_callback) {}

/**
 * @param {DebuggerAgent.Location} location
 * @param {string=} opt_condition
 * @param {function(?Protocol.Error, DebuggerAgent.BreakpointId, DebuggerAgent.Location):void=} opt_callback
 */
DebuggerAgent.setBreakpoint = function(location, opt_condition, opt_callback) {}
/** @param {function(?Protocol.Error, DebuggerAgent.BreakpointId, DebuggerAgent.Location):void=} opt_callback */
DebuggerAgent.setBreakpoint.invoke = function(obj, opt_callback) {}

/**
 * @param {DebuggerAgent.BreakpointId} breakpointId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.removeBreakpoint = function(breakpointId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.removeBreakpoint.invoke = function(obj, opt_callback) {}

/**
 * @param {DebuggerAgent.Location} location
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.continueToLocation = function(location, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.continueToLocation.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.stepOver = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.stepOver.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.stepInto = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.stepInto.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.stepOut = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.stepOut.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.pause = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.pause.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.resume = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.resume.invoke = function(obj, opt_callback) {}

/**
 * @param {DebuggerAgent.ScriptId} scriptId
 * @param {string} query
 * @param {boolean=} opt_caseSensitive
 * @param {boolean=} opt_isRegex
 * @param {function(?Protocol.Error, Array.<PageAgent.SearchMatch>):void=} opt_callback
 */
DebuggerAgent.searchInContent = function(scriptId, query, opt_caseSensitive, opt_isRegex, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<PageAgent.SearchMatch>):void=} opt_callback */
DebuggerAgent.searchInContent.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
DebuggerAgent.canSetScriptSource = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
DebuggerAgent.canSetScriptSource.invoke = function(obj, opt_callback) {}

/**
 * @param {DebuggerAgent.ScriptId} scriptId
 * @param {string} scriptSource
 * @param {boolean=} opt_preview
 * @param {function(?Protocol.Error, Array.<DebuggerAgent.CallFrame>=, Object=):void=} opt_callback
 */
DebuggerAgent.setScriptSource = function(scriptId, scriptSource, opt_preview, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<DebuggerAgent.CallFrame>=, Object=):void=} opt_callback */
DebuggerAgent.setScriptSource.invoke = function(obj, opt_callback) {}

/**
 * @param {DebuggerAgent.CallFrameId} callFrameId
 * @param {function(?Protocol.Error, Array.<DebuggerAgent.CallFrame>, Object):void=} opt_callback
 */
DebuggerAgent.restartFrame = function(callFrameId, opt_callback) {}
/** @param {function(?Protocol.Error, Array.<DebuggerAgent.CallFrame>, Object):void=} opt_callback */
DebuggerAgent.restartFrame.invoke = function(obj, opt_callback) {}

/**
 * @param {DebuggerAgent.ScriptId} scriptId
 * @param {function(?Protocol.Error, string):void=} opt_callback
 */
DebuggerAgent.getScriptSource = function(scriptId, opt_callback) {}
/** @param {function(?Protocol.Error, string):void=} opt_callback */
DebuggerAgent.getScriptSource.invoke = function(obj, opt_callback) {}

/**
 * @param {RuntimeAgent.RemoteObjectId} functionId
 * @param {function(?Protocol.Error, DebuggerAgent.FunctionDetails):void=} opt_callback
 */
DebuggerAgent.getFunctionDetails = function(functionId, opt_callback) {}
/** @param {function(?Protocol.Error, DebuggerAgent.FunctionDetails):void=} opt_callback */
DebuggerAgent.getFunctionDetails.invoke = function(obj, opt_callback) {}

/**
 * @param {string} state
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.setPauseOnExceptions = function(state, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.setPauseOnExceptions.invoke = function(obj, opt_callback) {}

/**
 * @param {DebuggerAgent.CallFrameId} callFrameId
 * @param {string} expression
 * @param {string=} opt_objectGroup
 * @param {boolean=} opt_includeCommandLineAPI
 * @param {boolean=} opt_doNotPauseOnExceptionsAndMuteConsole
 * @param {boolean=} opt_returnByValue
 * @param {boolean=} opt_generatePreview
 * @param {function(?Protocol.Error, RuntimeAgent.RemoteObject, boolean=):void=} opt_callback
 */
DebuggerAgent.evaluateOnCallFrame = function(callFrameId, expression, opt_objectGroup, opt_includeCommandLineAPI, opt_doNotPauseOnExceptionsAndMuteConsole, opt_returnByValue, opt_generatePreview, opt_callback) {}
/** @param {function(?Protocol.Error, RuntimeAgent.RemoteObject, boolean=):void=} opt_callback */
DebuggerAgent.evaluateOnCallFrame.invoke = function(obj, opt_callback) {}

/**
 * @param {string} expression
 * @param {string} sourceURL
 * @param {function(?Protocol.Error, DebuggerAgent.ScriptId=, string=):void=} opt_callback
 */
DebuggerAgent.compileScript = function(expression, sourceURL, opt_callback) {}
/** @param {function(?Protocol.Error, DebuggerAgent.ScriptId=, string=):void=} opt_callback */
DebuggerAgent.compileScript.invoke = function(obj, opt_callback) {}

/**
 * @param {DebuggerAgent.ScriptId} scriptId
 * @param {RuntimeAgent.ExecutionContextId=} opt_contextId
 * @param {string=} opt_objectGroup
 * @param {boolean=} opt_doNotPauseOnExceptionsAndMuteConsole
 * @param {function(?Protocol.Error, RuntimeAgent.RemoteObject, boolean=):void=} opt_callback
 */
DebuggerAgent.runScript = function(scriptId, opt_contextId, opt_objectGroup, opt_doNotPauseOnExceptionsAndMuteConsole, opt_callback) {}
/** @param {function(?Protocol.Error, RuntimeAgent.RemoteObject, boolean=):void=} opt_callback */
DebuggerAgent.runScript.invoke = function(obj, opt_callback) {}

/**
 * @param {string=} opt_message
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.setOverlayMessage = function(opt_message, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.setOverlayMessage.invoke = function(obj, opt_callback) {}

/**
 * @param {number} scopeNumber
 * @param {string} variableName
 * @param {RuntimeAgent.CallArgument} newValue
 * @param {DebuggerAgent.CallFrameId=} opt_callFrameId
 * @param {RuntimeAgent.RemoteObjectId=} opt_functionObjectId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DebuggerAgent.setVariableValue = function(scopeNumber, variableName, newValue, opt_callFrameId, opt_functionObjectId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DebuggerAgent.setVariableValue.invoke = function(obj, opt_callback) {}
/** @interface */
DebuggerAgent.Dispatcher = function() {};
DebuggerAgent.Dispatcher.prototype.globalObjectCleared = function() {};
/**
 * @param {DebuggerAgent.ScriptId} scriptId
 * @param {string} url
 * @param {number} startLine
 * @param {number} startColumn
 * @param {number} endLine
 * @param {number} endColumn
 * @param {boolean=} opt_isContentScript
 * @param {string=} opt_sourceMapURL
 * @param {boolean=} opt_hasSourceURL
 */
DebuggerAgent.Dispatcher.prototype.scriptParsed = function(scriptId, url, startLine, startColumn, endLine, endColumn, opt_isContentScript, opt_sourceMapURL, opt_hasSourceURL) {};
/**
 * @param {string} url
 * @param {string} scriptSource
 * @param {number} startLine
 * @param {number} errorLine
 * @param {string} errorMessage
 */
DebuggerAgent.Dispatcher.prototype.scriptFailedToParse = function(url, scriptSource, startLine, errorLine, errorMessage) {};
/**
 * @param {DebuggerAgent.BreakpointId} breakpointId
 * @param {DebuggerAgent.Location} location
 */
DebuggerAgent.Dispatcher.prototype.breakpointResolved = function(breakpointId, location) {};
/**
 * @param {Array.<DebuggerAgent.CallFrame>} callFrames
 * @param {string} reason
 * @param {Object=} opt_data
 */
DebuggerAgent.Dispatcher.prototype.paused = function(callFrames, reason, opt_data) {};
DebuggerAgent.Dispatcher.prototype.resumed = function() {};
/**
 * @param {DebuggerAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerDebuggerDispatcher = function(dispatcher) {}



var DOMDebuggerAgent = {};

/** @typedef {string} */
DOMDebuggerAgent.DOMBreakpointType;

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {DOMDebuggerAgent.DOMBreakpointType} type
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMDebuggerAgent.setDOMBreakpoint = function(nodeId, type, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMDebuggerAgent.setDOMBreakpoint.invoke = function(obj, opt_callback) {}

/**
 * @param {DOMAgent.NodeId} nodeId
 * @param {DOMDebuggerAgent.DOMBreakpointType} type
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMDebuggerAgent.removeDOMBreakpoint = function(nodeId, type, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMDebuggerAgent.removeDOMBreakpoint.invoke = function(obj, opt_callback) {}

/**
 * @param {string} eventName
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMDebuggerAgent.setEventListenerBreakpoint = function(eventName, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMDebuggerAgent.setEventListenerBreakpoint.invoke = function(obj, opt_callback) {}

/**
 * @param {string} eventName
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMDebuggerAgent.removeEventListenerBreakpoint = function(eventName, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMDebuggerAgent.removeEventListenerBreakpoint.invoke = function(obj, opt_callback) {}

/**
 * @param {string} eventName
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMDebuggerAgent.setInstrumentationBreakpoint = function(eventName, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMDebuggerAgent.setInstrumentationBreakpoint.invoke = function(obj, opt_callback) {}

/**
 * @param {string} eventName
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMDebuggerAgent.removeInstrumentationBreakpoint = function(eventName, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMDebuggerAgent.removeInstrumentationBreakpoint.invoke = function(obj, opt_callback) {}

/**
 * @param {string} url
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMDebuggerAgent.setXHRBreakpoint = function(url, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMDebuggerAgent.setXHRBreakpoint.invoke = function(obj, opt_callback) {}

/**
 * @param {string} url
 * @param {function(?Protocol.Error):void=} opt_callback
 */
DOMDebuggerAgent.removeXHRBreakpoint = function(url, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
DOMDebuggerAgent.removeXHRBreakpoint.invoke = function(obj, opt_callback) {}
/** @interface */
DOMDebuggerAgent.Dispatcher = function() {};
/**
 * @param {DOMDebuggerAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerDOMDebuggerDispatcher = function(dispatcher) {}



var ProfilerAgent = {};

/** @typedef {{typeId:(string), title:(string), uid:(number), maxJSObjectId:(number|undefined)}|null} */
ProfilerAgent.ProfileHeader;

/** @typedef {{functionName:(string), url:(string), lineNumber:(number), totalTime:(number), selfTime:(number), numberOfCalls:(number), visible:(boolean), callUID:(number), children:(Array.<ProfilerAgent.CPUProfileNode>)}|null} */
ProfilerAgent.CPUProfileNode;

/** @typedef {{head:(ProfilerAgent.CPUProfileNode|undefined), bottomUpHead:(ProfilerAgent.CPUProfileNode|undefined), idleTime:(number|undefined)}|null} */
ProfilerAgent.CPUProfile;

/** @typedef {string} */
ProfilerAgent.HeapSnapshotObjectId;

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
ProfilerAgent.causesRecompilation = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
ProfilerAgent.causesRecompilation.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
ProfilerAgent.isSampling = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
ProfilerAgent.isSampling.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
ProfilerAgent.hasHeapProfiler = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
ProfilerAgent.hasHeapProfiler.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ProfilerAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ProfilerAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ProfilerAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ProfilerAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ProfilerAgent.start = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ProfilerAgent.start.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ProfilerAgent.stop = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ProfilerAgent.stop.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, Array.<ProfilerAgent.ProfileHeader>):void=} opt_callback
 */
ProfilerAgent.getProfileHeaders = function(opt_callback) {}
/** @param {function(?Protocol.Error, Array.<ProfilerAgent.ProfileHeader>):void=} opt_callback */
ProfilerAgent.getProfileHeaders.invoke = function(obj, opt_callback) {}

/**
 * @param {number} uid
 * @param {function(?Protocol.Error, ProfilerAgent.CPUProfile):void=} opt_callback
 */
ProfilerAgent.getCPUProfile = function(uid, opt_callback) {}
/** @param {function(?Protocol.Error, ProfilerAgent.CPUProfile):void=} opt_callback */
ProfilerAgent.getCPUProfile.invoke = function(obj, opt_callback) {}

/**
 * @param {number} uid
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ProfilerAgent.getHeapSnapshot = function(uid, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ProfilerAgent.getHeapSnapshot.invoke = function(obj, opt_callback) {}

/**
 * @param {string} type
 * @param {number} uid
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ProfilerAgent.removeProfile = function(type, uid, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ProfilerAgent.removeProfile.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ProfilerAgent.clearProfiles = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ProfilerAgent.clearProfiles.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean=} opt_reportProgress
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ProfilerAgent.takeHeapSnapshot = function(opt_reportProgress, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ProfilerAgent.takeHeapSnapshot.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
ProfilerAgent.collectGarbage = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
ProfilerAgent.collectGarbage.invoke = function(obj, opt_callback) {}

/**
 * @param {ProfilerAgent.HeapSnapshotObjectId} objectId
 * @param {string=} opt_objectGroup
 * @param {function(?Protocol.Error, RuntimeAgent.RemoteObject):void=} opt_callback
 */
ProfilerAgent.getObjectByHeapObjectId = function(objectId, opt_objectGroup, opt_callback) {}
/** @param {function(?Protocol.Error, RuntimeAgent.RemoteObject):void=} opt_callback */
ProfilerAgent.getObjectByHeapObjectId.invoke = function(obj, opt_callback) {}

/**
 * @param {RuntimeAgent.RemoteObjectId} objectId
 * @param {function(?Protocol.Error, ProfilerAgent.HeapSnapshotObjectId):void=} opt_callback
 */
ProfilerAgent.getHeapObjectId = function(objectId, opt_callback) {}
/** @param {function(?Protocol.Error, ProfilerAgent.HeapSnapshotObjectId):void=} opt_callback */
ProfilerAgent.getHeapObjectId.invoke = function(obj, opt_callback) {}
/** @interface */
ProfilerAgent.Dispatcher = function() {};
/**
 * @param {ProfilerAgent.ProfileHeader} header
 */
ProfilerAgent.Dispatcher.prototype.addProfileHeader = function(header) {};
/**
 * @param {number} uid
 * @param {string} chunk
 */
ProfilerAgent.Dispatcher.prototype.addHeapSnapshotChunk = function(uid, chunk) {};
/**
 * @param {number} uid
 */
ProfilerAgent.Dispatcher.prototype.finishHeapSnapshot = function(uid) {};
/**
 * @param {boolean} isProfiling
 */
ProfilerAgent.Dispatcher.prototype.setRecordingProfile = function(isProfiling) {};
ProfilerAgent.Dispatcher.prototype.resetProfiles = function() {};
/**
 * @param {number} done
 * @param {number} total
 */
ProfilerAgent.Dispatcher.prototype.reportHeapSnapshotProgress = function(done, total) {};
/**
 * @param {ProfilerAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerProfilerDispatcher = function(dispatcher) {}



var HeapProfilerAgent = {};

/** @typedef {{title:(string), uid:(number), maxJSObjectId:(number|undefined)}|null} */
HeapProfilerAgent.ProfileHeader;

/** @typedef {string} */
HeapProfilerAgent.HeapSnapshotObjectId;

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
HeapProfilerAgent.hasHeapProfiler = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
HeapProfilerAgent.hasHeapProfiler.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, Array.<HeapProfilerAgent.ProfileHeader>):void=} opt_callback
 */
HeapProfilerAgent.getProfileHeaders = function(opt_callback) {}
/** @param {function(?Protocol.Error, Array.<HeapProfilerAgent.ProfileHeader>):void=} opt_callback */
HeapProfilerAgent.getProfileHeaders.invoke = function(obj, opt_callback) {}

/**
 * @param {number} uid
 * @param {function(?Protocol.Error):void=} opt_callback
 */
HeapProfilerAgent.getHeapSnapshot = function(uid, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
HeapProfilerAgent.getHeapSnapshot.invoke = function(obj, opt_callback) {}

/**
 * @param {number} uid
 * @param {function(?Protocol.Error):void=} opt_callback
 */
HeapProfilerAgent.removeProfile = function(uid, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
HeapProfilerAgent.removeProfile.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
HeapProfilerAgent.clearProfiles = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
HeapProfilerAgent.clearProfiles.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean=} opt_reportProgress
 * @param {function(?Protocol.Error):void=} opt_callback
 */
HeapProfilerAgent.takeHeapSnapshot = function(opt_reportProgress, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
HeapProfilerAgent.takeHeapSnapshot.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
HeapProfilerAgent.collectGarbage = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
HeapProfilerAgent.collectGarbage.invoke = function(obj, opt_callback) {}

/**
 * @param {HeapProfilerAgent.HeapSnapshotObjectId} objectId
 * @param {string=} opt_objectGroup
 * @param {function(?Protocol.Error, RuntimeAgent.RemoteObject):void=} opt_callback
 */
HeapProfilerAgent.getObjectByHeapObjectId = function(objectId, opt_objectGroup, opt_callback) {}
/** @param {function(?Protocol.Error, RuntimeAgent.RemoteObject):void=} opt_callback */
HeapProfilerAgent.getObjectByHeapObjectId.invoke = function(obj, opt_callback) {}

/**
 * @param {RuntimeAgent.RemoteObjectId} objectId
 * @param {function(?Protocol.Error, HeapProfilerAgent.HeapSnapshotObjectId):void=} opt_callback
 */
HeapProfilerAgent.getHeapObjectId = function(objectId, opt_callback) {}
/** @param {function(?Protocol.Error, HeapProfilerAgent.HeapSnapshotObjectId):void=} opt_callback */
HeapProfilerAgent.getHeapObjectId.invoke = function(obj, opt_callback) {}
/** @interface */
HeapProfilerAgent.Dispatcher = function() {};
/**
 * @param {HeapProfilerAgent.ProfileHeader} header
 */
HeapProfilerAgent.Dispatcher.prototype.addProfileHeader = function(header) {};
/**
 * @param {number} uid
 * @param {string} chunk
 */
HeapProfilerAgent.Dispatcher.prototype.addHeapSnapshotChunk = function(uid, chunk) {};
/**
 * @param {number} uid
 */
HeapProfilerAgent.Dispatcher.prototype.finishHeapSnapshot = function(uid) {};
HeapProfilerAgent.Dispatcher.prototype.resetProfiles = function() {};
/**
 * @param {number} done
 * @param {number} total
 */
HeapProfilerAgent.Dispatcher.prototype.reportHeapSnapshotProgress = function(done, total) {};
/**
 * @param {HeapProfilerAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerHeapProfilerDispatcher = function(dispatcher) {}



var WorkerAgent = {};

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
WorkerAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
WorkerAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
WorkerAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
WorkerAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {number} workerId
 * @param {Object} message
 * @param {function(?Protocol.Error):void=} opt_callback
 */
WorkerAgent.sendMessageToWorker = function(workerId, message, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
WorkerAgent.sendMessageToWorker.invoke = function(obj, opt_callback) {}

/**
 * @param {number} workerId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
WorkerAgent.connectToWorker = function(workerId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
WorkerAgent.connectToWorker.invoke = function(obj, opt_callback) {}

/**
 * @param {number} workerId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
WorkerAgent.disconnectFromWorker = function(workerId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
WorkerAgent.disconnectFromWorker.invoke = function(obj, opt_callback) {}

/**
 * @param {boolean} value
 * @param {function(?Protocol.Error):void=} opt_callback
 */
WorkerAgent.setAutoconnectToWorkers = function(value, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
WorkerAgent.setAutoconnectToWorkers.invoke = function(obj, opt_callback) {}
/** @interface */
WorkerAgent.Dispatcher = function() {};
/**
 * @param {number} workerId
 * @param {string} url
 * @param {boolean} inspectorConnected
 */
WorkerAgent.Dispatcher.prototype.workerCreated = function(workerId, url, inspectorConnected) {};
/**
 * @param {number} workerId
 */
WorkerAgent.Dispatcher.prototype.workerTerminated = function(workerId) {};
/**
 * @param {number} workerId
 * @param {Object} message
 */
WorkerAgent.Dispatcher.prototype.dispatchMessageFromWorker = function(workerId, message) {};
WorkerAgent.Dispatcher.prototype.disconnectedFromWorker = function() {};
/**
 * @param {WorkerAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerWorkerDispatcher = function(dispatcher) {}



var CanvasAgent = {};

/** @typedef {string} */
CanvasAgent.ResourceId;

/** @typedef {{id:(CanvasAgent.ResourceId), description:(string)}|null} */
CanvasAgent.ResourceInfo;

/** @typedef {{id:(CanvasAgent.ResourceId), traceLogId:(CanvasAgent.TraceLogId), imageURL:(string|undefined)}|null} */
CanvasAgent.ResourceState;

/** @typedef {{description:(string)}|null} */
CanvasAgent.CallArgument;

/** @typedef {{contextId:(CanvasAgent.ResourceId), functionName:(string|undefined), arguments:(Array.<CanvasAgent.CallArgument>|undefined), result:(CanvasAgent.CallArgument|undefined), isDrawingCall:(boolean|undefined), isFrameEndCall:(boolean|undefined), property:(string|undefined), value:(CanvasAgent.CallArgument|undefined), sourceURL:(string|undefined), lineNumber:(number|undefined), columnNumber:(number|undefined)}|null} */
CanvasAgent.Call;

/** @typedef {string} */
CanvasAgent.TraceLogId;

/** @typedef {{id:(CanvasAgent.TraceLogId), calls:(Array.<CanvasAgent.Call>), startOffset:(number), alive:(boolean), totalAvailableCalls:(number)}|null} */
CanvasAgent.TraceLog;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
CanvasAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
CanvasAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
CanvasAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
CanvasAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {CanvasAgent.TraceLogId} traceLogId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
CanvasAgent.dropTraceLog = function(traceLogId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
CanvasAgent.dropTraceLog.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, boolean):void=} opt_callback
 */
CanvasAgent.hasUninstrumentedCanvases = function(opt_callback) {}
/** @param {function(?Protocol.Error, boolean):void=} opt_callback */
CanvasAgent.hasUninstrumentedCanvases.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId=} opt_frameId
 * @param {function(?Protocol.Error, CanvasAgent.TraceLogId):void=} opt_callback
 */
CanvasAgent.captureFrame = function(opt_frameId, opt_callback) {}
/** @param {function(?Protocol.Error, CanvasAgent.TraceLogId):void=} opt_callback */
CanvasAgent.captureFrame.invoke = function(obj, opt_callback) {}

/**
 * @param {NetworkAgent.FrameId=} opt_frameId
 * @param {function(?Protocol.Error, CanvasAgent.TraceLogId):void=} opt_callback
 */
CanvasAgent.startCapturing = function(opt_frameId, opt_callback) {}
/** @param {function(?Protocol.Error, CanvasAgent.TraceLogId):void=} opt_callback */
CanvasAgent.startCapturing.invoke = function(obj, opt_callback) {}

/**
 * @param {CanvasAgent.TraceLogId} traceLogId
 * @param {function(?Protocol.Error):void=} opt_callback
 */
CanvasAgent.stopCapturing = function(traceLogId, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
CanvasAgent.stopCapturing.invoke = function(obj, opt_callback) {}

/**
 * @param {CanvasAgent.TraceLogId} traceLogId
 * @param {number=} opt_startOffset
 * @param {number=} opt_maxLength
 * @param {function(?Protocol.Error, CanvasAgent.TraceLog):void=} opt_callback
 */
CanvasAgent.getTraceLog = function(traceLogId, opt_startOffset, opt_maxLength, opt_callback) {}
/** @param {function(?Protocol.Error, CanvasAgent.TraceLog):void=} opt_callback */
CanvasAgent.getTraceLog.invoke = function(obj, opt_callback) {}

/**
 * @param {CanvasAgent.TraceLogId} traceLogId
 * @param {number} stepNo
 * @param {function(?Protocol.Error, CanvasAgent.ResourceState):void=} opt_callback
 */
CanvasAgent.replayTraceLog = function(traceLogId, stepNo, opt_callback) {}
/** @param {function(?Protocol.Error, CanvasAgent.ResourceState):void=} opt_callback */
CanvasAgent.replayTraceLog.invoke = function(obj, opt_callback) {}

/**
 * @param {CanvasAgent.ResourceId} resourceId
 * @param {function(?Protocol.Error, CanvasAgent.ResourceInfo):void=} opt_callback
 */
CanvasAgent.getResourceInfo = function(resourceId, opt_callback) {}
/** @param {function(?Protocol.Error, CanvasAgent.ResourceInfo):void=} opt_callback */
CanvasAgent.getResourceInfo.invoke = function(obj, opt_callback) {}

/**
 * @param {CanvasAgent.TraceLogId} traceLogId
 * @param {CanvasAgent.ResourceId} resourceId
 * @param {function(?Protocol.Error, CanvasAgent.ResourceState):void=} opt_callback
 */
CanvasAgent.getResourceState = function(traceLogId, resourceId, opt_callback) {}
/** @param {function(?Protocol.Error, CanvasAgent.ResourceState):void=} opt_callback */
CanvasAgent.getResourceState.invoke = function(obj, opt_callback) {}
/** @interface */
CanvasAgent.Dispatcher = function() {};
/**
 * @param {NetworkAgent.FrameId} frameId
 */
CanvasAgent.Dispatcher.prototype.contextCreated = function(frameId) {};
/**
 * @param {NetworkAgent.FrameId=} opt_frameId
 * @param {CanvasAgent.TraceLogId=} opt_traceLogId
 */
CanvasAgent.Dispatcher.prototype.traceLogsRemoved = function(opt_frameId, opt_traceLogId) {};
/**
 * @param {CanvasAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerCanvasDispatcher = function(dispatcher) {}



var InputAgent = {};

/**
 * @param {string} type
 * @param {number=} opt_modifiers
 * @param {number=} opt_timestamp
 * @param {string=} opt_text
 * @param {string=} opt_unmodifiedText
 * @param {string=} opt_keyIdentifier
 * @param {number=} opt_windowsVirtualKeyCode
 * @param {number=} opt_nativeVirtualKeyCode
 * @param {number=} opt_macCharCode
 * @param {boolean=} opt_autoRepeat
 * @param {boolean=} opt_isKeypad
 * @param {boolean=} opt_isSystemKey
 * @param {function(?Protocol.Error):void=} opt_callback
 */
InputAgent.dispatchKeyEvent = function(type, opt_modifiers, opt_timestamp, opt_text, opt_unmodifiedText, opt_keyIdentifier, opt_windowsVirtualKeyCode, opt_nativeVirtualKeyCode, opt_macCharCode, opt_autoRepeat, opt_isKeypad, opt_isSystemKey, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
InputAgent.dispatchKeyEvent.invoke = function(obj, opt_callback) {}

/**
 * @param {string} type
 * @param {number} x
 * @param {number} y
 * @param {number=} opt_modifiers
 * @param {number=} opt_timestamp
 * @param {string=} opt_button
 * @param {number=} opt_clickCount
 * @param {function(?Protocol.Error):void=} opt_callback
 */
InputAgent.dispatchMouseEvent = function(type, x, y, opt_modifiers, opt_timestamp, opt_button, opt_clickCount, opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
InputAgent.dispatchMouseEvent.invoke = function(obj, opt_callback) {}
/** @interface */
InputAgent.Dispatcher = function() {};
/**
 * @param {InputAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerInputDispatcher = function(dispatcher) {}



var LayerTreeAgent = {};

/** @typedef {string} */
LayerTreeAgent.LayerId;

/** @typedef {{x:(number), y:(number), width:(number), height:(number)}|null} */
LayerTreeAgent.IntRect;

/** @typedef {{layerId:(LayerTreeAgent.LayerId), bounds:(LayerTreeAgent.IntRect), isComposited:(boolean), paintCount:(number|undefined), memory:(number|undefined), compositedBounds:(LayerTreeAgent.IntRect|undefined), childLayers:(Array.<LayerTreeAgent.Layer>|undefined)}|null} */
LayerTreeAgent.Layer;

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
LayerTreeAgent.enable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
LayerTreeAgent.enable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error):void=} opt_callback
 */
LayerTreeAgent.disable = function(opt_callback) {}
/** @param {function(?Protocol.Error):void=} opt_callback */
LayerTreeAgent.disable.invoke = function(obj, opt_callback) {}

/**
 * @param {function(?Protocol.Error, LayerTreeAgent.Layer):void=} opt_callback
 */
LayerTreeAgent.getLayerTree = function(opt_callback) {}
/** @param {function(?Protocol.Error, LayerTreeAgent.Layer):void=} opt_callback */
LayerTreeAgent.getLayerTree.invoke = function(obj, opt_callback) {}

/**
 * @param {LayerTreeAgent.LayerId} layerId
 * @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback
 */
LayerTreeAgent.nodeIdForLayerId = function(layerId, opt_callback) {}
/** @param {function(?Protocol.Error, DOMAgent.NodeId):void=} opt_callback */
LayerTreeAgent.nodeIdForLayerId.invoke = function(obj, opt_callback) {}
/** @interface */
LayerTreeAgent.Dispatcher = function() {};
LayerTreeAgent.Dispatcher.prototype.layerTreeDidChange = function() {};
/**
 * @param {LayerTreeAgent.Dispatcher} dispatcher
 */
InspectorBackend.registerLayerTreeDispatcher = function(dispatcher) {}
