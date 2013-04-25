/* Machine generated from ../../WebInspectorKit/Source/WebCore/inspector/front-end/Inspector.json version: 1.0 on Tue Feb 26 2013 11:33:27 GMT-0800 (PST) */

(function () {
// create chrome.devtools
window.extensionInfo = {};
var uid = window.location.toString();
platformExtensionAPI(injectedExtensionAPI(uid));

chrome.devtools.protocol = {};
chrome.devtools.protocol.version = 1.0;

/* unsupported */ 
chrome.devtools.protocol.Inspector = {};
chrome.devtools.protocol.Inspector.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Inspector.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Inspector.disable', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    evaluateForTestInFrontend: function(testCallId, script) {},
    inspect: function(object, hints) {},
    detached: function(reason) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Inspector.evaluateForTestInFrontend', 
            ['testCallId', 'script']);
        chrome.devtools.remoteDebug.registerEvent(
            'Inspector.inspect', 
            ['object', 'hints']);
        chrome.devtools.remoteDebug.registerEvent(
            'Inspector.detached', 
            ['reason']);
        chrome.devtools.remoteDebug.addDomainListener('Inspector', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Memory = {};
chrome.devtools.protocol.Memory.prototype = {

    // Commands: 
    getDOMCounters: function(opt_callback/*(documents,nodes,jsEventListeners)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Memory.getDOMCounters', paramObject, opt_callback);
    },
    getProcessMemoryDistribution: function(reportGraph, opt_callback/*(distribution,graphMetaInformation)*/) {
        var paramObject = {
             'reportGraph': reportGraph,
         };
        chrome.devtools.remoteDebug.sendCommand('Memory.getProcessMemoryDistribution', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    addNativeSnapshotChunk: function(chunk) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Memory.addNativeSnapshotChunk', 
            ['chunk']);
        chrome.devtools.remoteDebug.addDomainListener('Memory', this);
    },
};


chrome.devtools.protocol.Page = {};
chrome.devtools.protocol.Page.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.disable', paramObject, opt_callback);
    },
    /* unsupported */ addScriptToEvaluateOnLoad: function(scriptSource, opt_callback/*(identifier)*/) {
        var paramObject = {
             'scriptSource': scriptSource,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.addScriptToEvaluateOnLoad', paramObject, opt_callback);
    },
    /* unsupported */ removeScriptToEvaluateOnLoad: function(identifier, opt_callback) {
        var paramObject = {
             'identifier': identifier,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.removeScriptToEvaluateOnLoad', paramObject, opt_callback);
    },
    reload: function(ignoreCache, scriptToEvaluateOnLoad, scriptPreprocessor, opt_callback) {
        var paramObject = {
             'ignoreCache': ignoreCache,
             'scriptToEvaluateOnLoad': scriptToEvaluateOnLoad,
             'scriptPreprocessor': scriptPreprocessor,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.reload', paramObject, opt_callback);
    },
    navigate: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.navigate', paramObject, opt_callback);
    },
    /* unsupported */ getCookies: function(opt_callback/*(cookies,cookiesString)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.getCookies', paramObject, opt_callback);
    },
    /* unsupported */ deleteCookie: function(cookieName, url, opt_callback) {
        var paramObject = {
             'cookieName': cookieName,
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.deleteCookie', paramObject, opt_callback);
    },
    /* unsupported */ getResourceTree: function(opt_callback/*(frameTree)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.getResourceTree', paramObject, opt_callback);
    },
    /* unsupported */ getResourceContent: function(frameId, url, opt_callback/*(content,base64Encoded)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.getResourceContent', paramObject, opt_callback);
    },
    /* unsupported */ searchInResource: function(frameId, url, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.searchInResource', paramObject, opt_callback);
    },
    /* unsupported */ searchInResources: function(text, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'text': text,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.searchInResources', paramObject, opt_callback);
    },
    /* unsupported */ setDocumentContent: function(frameId, html, opt_callback) {
        var paramObject = {
             'frameId': frameId,
             'html': html,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setDocumentContent', paramObject, opt_callback);
    },
    /* unsupported */ canOverrideDeviceMetrics: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.canOverrideDeviceMetrics', paramObject, opt_callback);
    },
    /* unsupported */ setDeviceMetricsOverride: function(width, height, fontScaleFactor, fitWindow, opt_callback) {
        var paramObject = {
             'width': width,
             'height': height,
             'fontScaleFactor': fontScaleFactor,
             'fitWindow': fitWindow,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setDeviceMetricsOverride', paramObject, opt_callback);
    },
    /* unsupported */ setShowPaintRects: function(result, opt_callback) {
        var paramObject = {
             'result': result,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setShowPaintRects', paramObject, opt_callback);
    },
    /* unsupported */ canShowDebugBorders: function(opt_callback/*(show)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.canShowDebugBorders', paramObject, opt_callback);
    },
    /* unsupported */ setShowDebugBorders: function(show, opt_callback) {
        var paramObject = {
             'show': show,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setShowDebugBorders', paramObject, opt_callback);
    },
    /* unsupported */ canShowFPSCounter: function(opt_callback/*(show)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.canShowFPSCounter', paramObject, opt_callback);
    },
    /* unsupported */ setShowFPSCounter: function(show, opt_callback) {
        var paramObject = {
             'show': show,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setShowFPSCounter', paramObject, opt_callback);
    },
    /* unsupported */ canContinuouslyPaint: function(opt_callback/*(value)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.canContinuouslyPaint', paramObject, opt_callback);
    },
    /* unsupported */ setContinuousPaintingEnabled: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setContinuousPaintingEnabled', paramObject, opt_callback);
    },
    getScriptExecutionStatus: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.getScriptExecutionStatus', paramObject, opt_callback);
    },
    setScriptExecutionDisabled: function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setScriptExecutionDisabled', paramObject, opt_callback);
    },
    /* unsupported */ setGeolocationOverride: function(latitude, longitude, accuracy, opt_callback) {
        var paramObject = {
             'latitude': latitude,
             'longitude': longitude,
             'accuracy': accuracy,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setGeolocationOverride', paramObject, opt_callback);
    },
    /* unsupported */ clearGeolocationOverride: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.clearGeolocationOverride', paramObject, opt_callback);
    },
    /* unsupported */ canOverrideGeolocation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.canOverrideGeolocation', paramObject, opt_callback);
    },
    /* unsupported */ setDeviceOrientationOverride: function(alpha, beta, gamma, opt_callback) {
        var paramObject = {
             'alpha': alpha,
             'beta': beta,
             'gamma': gamma,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setDeviceOrientationOverride', paramObject, opt_callback);
    },
    /* unsupported */ clearDeviceOrientationOverride: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.clearDeviceOrientationOverride', paramObject, opt_callback);
    },
    /* unsupported */ canOverrideDeviceOrientation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.canOverrideDeviceOrientation', paramObject, opt_callback);
    },
    /* unsupported */ setTouchEmulationEnabled: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setTouchEmulationEnabled', paramObject, opt_callback);
    },
    /* unsupported */ setEmulatedMedia: function(media, opt_callback) {
        var paramObject = {
             'media': media,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setEmulatedMedia', paramObject, opt_callback);
    },
    /* unsupported */ getCompositingBordersVisible: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.getCompositingBordersVisible', paramObject, opt_callback);
    },
    /* unsupported */ setCompositingBordersVisible: function(visible, opt_callback) {
        var paramObject = {
             'visible': visible,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setCompositingBordersVisible', paramObject, opt_callback);
    },
    /* unsupported */ captureScreenshot: function(opt_callback/*(data)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.captureScreenshot', paramObject, opt_callback);
    },
    /* unsupported */ handleJavaScriptDialog: function(accept, opt_callback) {
        var paramObject = {
             'accept': accept,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.handleJavaScriptDialog', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    domContentEventFired: function(timestamp) {},
    loadEventFired: function(timestamp) {},
    /* unsupported */ frameNavigated: function(frame) {},
    /* unsupported */ frameDetached: function(frameId) {},
    /* unsupported */ frameStartedLoading: function(frameId) {},
    /* unsupported */ frameStoppedLoading: function(frameId) {},
    /* unsupported */ frameScheduledNavigation: function(frameId, delay) {},
    /* unsupported */ frameClearedScheduledNavigation: function(frameId) {},
    /* unsupported */ javascriptDialogOpening: function(message) {},
    /* unsupported */ javascriptDialogClosed: function() {},
    /* unsupported */ scriptsEnabled: function(isEnabled) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Page.domContentEventFired', 
            ['timestamp']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.loadEventFired', 
            ['timestamp']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.frameNavigated', 
            ['frame']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.frameDetached', 
            ['frameId']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.frameStartedLoading', 
            ['frameId']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.frameStoppedLoading', 
            ['frameId']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.frameScheduledNavigation', 
            ['frameId', 'delay']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.frameClearedScheduledNavigation', 
            ['frameId']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.javascriptDialogOpening', 
            ['message']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.javascriptDialogClosed', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.scriptsEnabled', 
            ['isEnabled']);
        chrome.devtools.remoteDebug.addDomainListener('Page', this);
    },
};


chrome.devtools.protocol.Runtime = {};
chrome.devtools.protocol.Runtime.prototype = {

    // Commands: 
    evaluate: function(expression, objectGroup, includeCommandLineAPI, doNotPauseOnExceptionsAndMuteConsole, contextId, returnByValue, generatePreview, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'expression': expression,
             'objectGroup': objectGroup,
             'includeCommandLineAPI': includeCommandLineAPI,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
             'contextId': contextId,
             'returnByValue': returnByValue,
             'generatePreview': generatePreview,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.evaluate', paramObject, opt_callback);
    },
    callFunctionOn: function(objectId, functionDeclaration, arguments, doNotPauseOnExceptionsAndMuteConsole, returnByValue, generatePreview, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'objectId': objectId,
             'functionDeclaration': functionDeclaration,
             'arguments': arguments,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
             'returnByValue': returnByValue,
             'generatePreview': generatePreview,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.callFunctionOn', paramObject, opt_callback);
    },
    getProperties: function(objectId, ownProperties, opt_callback/*(result,internalProperties)*/) {
        var paramObject = {
             'objectId': objectId,
             'ownProperties': ownProperties,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.getProperties', paramObject, opt_callback);
    },
    releaseObject: function(objectId, opt_callback) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.releaseObject', paramObject, opt_callback);
    },
    releaseObjectGroup: function(objectGroup, opt_callback) {
        var paramObject = {
             'objectGroup': objectGroup,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.releaseObjectGroup', paramObject, opt_callback);
    },
    /* unsupported */ run: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.run', paramObject, opt_callback);
    },
    /* unsupported */ enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.enable', paramObject, opt_callback);
    },
    /* unsupported */ disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.disable', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    /* unsupported */ executionContextCreated: function(context) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Runtime.executionContextCreated', 
            ['context']);
        chrome.devtools.remoteDebug.addDomainListener('Runtime', this);
    },
};


chrome.devtools.protocol.Console = {};
chrome.devtools.protocol.Console.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Console.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Console.disable', paramObject, opt_callback);
    },
    clearMessages: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Console.clearMessages', paramObject, opt_callback);
    },
    /* unsupported */ setMonitoringXHREnabled: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.devtools.remoteDebug.sendCommand('Console.setMonitoringXHREnabled', paramObject, opt_callback);
    },
    /* unsupported */ addInspectedNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('Console.addInspectedNode', paramObject, opt_callback);
    },
    addInspectedHeapObject: function(heapObjectId, opt_callback) {
        var paramObject = {
             'heapObjectId': heapObjectId,
         };
        chrome.devtools.remoteDebug.sendCommand('Console.addInspectedHeapObject', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    messageAdded: function(message) {},
    messageRepeatCountUpdated: function(count) {},
    messagesCleared: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Console.messageAdded', 
            ['message']);
        chrome.devtools.remoteDebug.registerEvent(
            'Console.messageRepeatCountUpdated', 
            ['count']);
        chrome.devtools.remoteDebug.registerEvent(
            'Console.messagesCleared', 
            ['']);
        chrome.devtools.remoteDebug.addDomainListener('Console', this);
    },
};


chrome.devtools.protocol.Network = {};
chrome.devtools.protocol.Network.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Network.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Network.disable', paramObject, opt_callback);
    },
    setUserAgentOverride: function(userAgent, opt_callback) {
        var paramObject = {
             'userAgent': userAgent,
         };
        chrome.devtools.remoteDebug.sendCommand('Network.setUserAgentOverride', paramObject, opt_callback);
    },
    setExtraHTTPHeaders: function(headers, opt_callback) {
        var paramObject = {
             'headers': headers,
         };
        chrome.devtools.remoteDebug.sendCommand('Network.setExtraHTTPHeaders', paramObject, opt_callback);
    },
    getResponseBody: function(requestId, opt_callback/*(body,base64Encoded)*/) {
        var paramObject = {
             'requestId': requestId,
         };
        chrome.devtools.remoteDebug.sendCommand('Network.getResponseBody', paramObject, opt_callback);
    },
    /* unsupported */ replayXHR: function(requestId, opt_callback) {
        var paramObject = {
             'requestId': requestId,
         };
        chrome.devtools.remoteDebug.sendCommand('Network.replayXHR', paramObject, opt_callback);
    },
    canClearBrowserCache: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Network.canClearBrowserCache', paramObject, opt_callback);
    },
    clearBrowserCache: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Network.clearBrowserCache', paramObject, opt_callback);
    },
    canClearBrowserCookies: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Network.canClearBrowserCookies', paramObject, opt_callback);
    },
    clearBrowserCookies: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Network.clearBrowserCookies', paramObject, opt_callback);
    },
    setCacheDisabled: function(cacheDisabled, opt_callback) {
        var paramObject = {
             'cacheDisabled': cacheDisabled,
         };
        chrome.devtools.remoteDebug.sendCommand('Network.setCacheDisabled', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    requestWillBeSent: function(requestId, frameId, loaderId, documentURL, request, timestamp, initiator, redirectResponse) {},
    requestServedFromCache: function(requestId) {},
    responseReceived: function(requestId, frameId, loaderId, timestamp, type, response) {},
    dataReceived: function(requestId, timestamp, dataLength, encodedDataLength) {},
    loadingFinished: function(requestId, timestamp) {},
    loadingFailed: function(requestId, timestamp, errorText, canceled) {},
    requestServedFromMemoryCache: function(requestId, frameId, loaderId, documentURL, timestamp, initiator, resource) {},
    /* unsupported */ webSocketWillSendHandshakeRequest: function(requestId, timestamp, request) {},
    /* unsupported */ webSocketHandshakeResponseReceived: function(requestId, timestamp, response) {},
    /* unsupported */ webSocketCreated: function(requestId, url) {},
    /* unsupported */ webSocketClosed: function(requestId, timestamp) {},
    /* unsupported */ webSocketFrameReceived: function(requestId, timestamp, response) {},
    /* unsupported */ webSocketFrameError: function(requestId, timestamp, errorMessage) {},
    /* unsupported */ webSocketFrameSent: function(requestId, timestamp, response) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Network.requestWillBeSent', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'request', 'timestamp', 'initiator', 'redirectResponse']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.requestServedFromCache', 
            ['requestId']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.responseReceived', 
            ['requestId', 'frameId', 'loaderId', 'timestamp', 'type', 'response']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.dataReceived', 
            ['requestId', 'timestamp', 'dataLength', 'encodedDataLength']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.loadingFinished', 
            ['requestId', 'timestamp']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.loadingFailed', 
            ['requestId', 'timestamp', 'errorText', 'canceled']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.requestServedFromMemoryCache', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'timestamp', 'initiator', 'resource']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketWillSendHandshakeRequest', 
            ['requestId', 'timestamp', 'request']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketHandshakeResponseReceived', 
            ['requestId', 'timestamp', 'response']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketCreated', 
            ['requestId', 'url']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketClosed', 
            ['requestId', 'timestamp']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameReceived', 
            ['requestId', 'timestamp', 'response']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameError', 
            ['requestId', 'timestamp', 'errorMessage']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameSent', 
            ['requestId', 'timestamp', 'response']);
        chrome.devtools.remoteDebug.addDomainListener('Network', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Database = {};
chrome.devtools.protocol.Database.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Database.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Database.disable', paramObject, opt_callback);
    },
    getDatabaseTableNames: function(databaseId, opt_callback/*(tableNames)*/) {
        var paramObject = {
             'databaseId': databaseId,
         };
        chrome.devtools.remoteDebug.sendCommand('Database.getDatabaseTableNames', paramObject, opt_callback);
    },
    executeSQL: function(databaseId, query, opt_callback/*(columnNames,values,sqlError)*/) {
        var paramObject = {
             'databaseId': databaseId,
             'query': query,
         };
        chrome.devtools.remoteDebug.sendCommand('Database.executeSQL', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    addDatabase: function(database) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Database.addDatabase', 
            ['database']);
        chrome.devtools.remoteDebug.addDomainListener('Database', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.IndexedDB = {};
chrome.devtools.protocol.IndexedDB.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('IndexedDB.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('IndexedDB.disable', paramObject, opt_callback);
    },
    requestDatabaseNamesForFrame: function(frameId, opt_callback/*(securityOriginWithDatabaseNames)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.devtools.remoteDebug.sendCommand('IndexedDB.requestDatabaseNamesForFrame', paramObject, opt_callback);
    },
    requestDatabase: function(frameId, databaseName, opt_callback/*(databaseWithObjectStores)*/) {
        var paramObject = {
             'frameId': frameId,
             'databaseName': databaseName,
         };
        chrome.devtools.remoteDebug.sendCommand('IndexedDB.requestDatabase', paramObject, opt_callback);
    },
    requestData: function(frameId, databaseName, objectStoreName, indexName, skipCount, pageSize, keyRange, opt_callback/*(objectStoreDataEntries,hasMore)*/) {
        var paramObject = {
             'frameId': frameId,
             'databaseName': databaseName,
             'objectStoreName': objectStoreName,
             'indexName': indexName,
             'skipCount': skipCount,
             'pageSize': pageSize,
             'keyRange': keyRange,
         };
        chrome.devtools.remoteDebug.sendCommand('IndexedDB.requestData', paramObject, opt_callback);
    },
};

/* unsupported */ 
chrome.devtools.protocol.DOMStorage = {};
chrome.devtools.protocol.DOMStorage.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOMStorage.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOMStorage.disable', paramObject, opt_callback);
    },
    getDOMStorageItems: function(storageId, opt_callback/*(entries)*/) {
        var paramObject = {
             'storageId': storageId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMStorage.getDOMStorageItems', paramObject, opt_callback);
    },
    setDOMStorageItem: function(storageId, key, value, opt_callback) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
             'value': value,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMStorage.setDOMStorageItem', paramObject, opt_callback);
    },
    removeDOMStorageItem: function(storageId, key, opt_callback) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMStorage.removeDOMStorageItem', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    domStorageItemsCleared: function(storageId) {},
    domStorageItemRemoved: function(storageId, key) {},
    domStorageItemAdded: function(storageId, key, newValue) {},
    domStorageItemUpdated: function(storageId, key, oldValue, newValue) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'DOMStorage.domStorageItemsCleared', 
            ['storageId']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOMStorage.domStorageItemRemoved', 
            ['storageId', 'key']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOMStorage.domStorageItemAdded', 
            ['storageId', 'key', 'newValue']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOMStorage.domStorageItemUpdated', 
            ['storageId', 'key', 'oldValue', 'newValue']);
        chrome.devtools.remoteDebug.addDomainListener('DOMStorage', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.ApplicationCache = {};
chrome.devtools.protocol.ApplicationCache.prototype = {

    // Commands: 
    getFramesWithManifests: function(opt_callback/*(frameIds)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('ApplicationCache.getFramesWithManifests', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('ApplicationCache.enable', paramObject, opt_callback);
    },
    getManifestForFrame: function(frameId, opt_callback/*(manifestURL)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.devtools.remoteDebug.sendCommand('ApplicationCache.getManifestForFrame', paramObject, opt_callback);
    },
    getApplicationCacheForFrame: function(frameId, opt_callback/*(applicationCache)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.devtools.remoteDebug.sendCommand('ApplicationCache.getApplicationCacheForFrame', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    applicationCacheStatusUpdated: function(frameId, manifestURL, status) {},
    networkStateUpdated: function(isNowOnline) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'ApplicationCache.applicationCacheStatusUpdated', 
            ['frameId', 'manifestURL', 'status']);
        chrome.devtools.remoteDebug.registerEvent(
            'ApplicationCache.networkStateUpdated', 
            ['isNowOnline']);
        chrome.devtools.remoteDebug.addDomainListener('ApplicationCache', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.FileSystem = {};
chrome.devtools.protocol.FileSystem.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('FileSystem.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('FileSystem.disable', paramObject, opt_callback);
    },
    requestFileSystemRoot: function(origin, type, opt_callback/*(errorCode,root)*/) {
        var paramObject = {
             'origin': origin,
             'type': type,
         };
        chrome.devtools.remoteDebug.sendCommand('FileSystem.requestFileSystemRoot', paramObject, opt_callback);
    },
    requestDirectoryContent: function(url, opt_callback/*(errorCode,entries)*/) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('FileSystem.requestDirectoryContent', paramObject, opt_callback);
    },
    requestMetadata: function(url, opt_callback/*(errorCode,metadata)*/) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('FileSystem.requestMetadata', paramObject, opt_callback);
    },
    requestFileContent: function(url, readAsText, start, end, charset, opt_callback/*(errorCode,content,charset)*/) {
        var paramObject = {
             'url': url,
             'readAsText': readAsText,
             'start': start,
             'end': end,
             'charset': charset,
         };
        chrome.devtools.remoteDebug.sendCommand('FileSystem.requestFileContent', paramObject, opt_callback);
    },
    deleteEntry: function(url, opt_callback/*(errorCode)*/) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('FileSystem.deleteEntry', paramObject, opt_callback);
    },
};


chrome.devtools.protocol.DOM = {};
chrome.devtools.protocol.DOM.prototype = {

    // Commands: 
    getDocument: function(opt_callback/*(root)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.getDocument', paramObject, opt_callback);
    },
    requestChildNodes: function(nodeId, depth, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'depth': depth,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.requestChildNodes', paramObject, opt_callback);
    },
    querySelector: function(nodeId, selector, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.querySelector', paramObject, opt_callback);
    },
    querySelectorAll: function(nodeId, selector, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.querySelectorAll', paramObject, opt_callback);
    },
    setNodeName: function(nodeId, name, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setNodeName', paramObject, opt_callback);
    },
    setNodeValue: function(nodeId, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'value': value,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setNodeValue', paramObject, opt_callback);
    },
    removeNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.removeNode', paramObject, opt_callback);
    },
    setAttributeValue: function(nodeId, name, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
             'value': value,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setAttributeValue', paramObject, opt_callback);
    },
    setAttributesAsText: function(nodeId, text, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'text': text,
             'name': name,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setAttributesAsText', paramObject, opt_callback);
    },
    removeAttribute: function(nodeId, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.removeAttribute', paramObject, opt_callback);
    },
    /* unsupported */ getEventListenersForNode: function(nodeId, objectGroup, opt_callback/*(listeners)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'objectGroup': objectGroup,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.getEventListenersForNode', paramObject, opt_callback);
    },
    getOuterHTML: function(nodeId, opt_callback/*(outerHTML)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.getOuterHTML', paramObject, opt_callback);
    },
    setOuterHTML: function(nodeId, outerHTML, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'outerHTML': outerHTML,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setOuterHTML', paramObject, opt_callback);
    },
    /* unsupported */ performSearch: function(query, opt_callback/*(searchId,resultCount)*/) {
        var paramObject = {
             'query': query,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.performSearch', paramObject, opt_callback);
    },
    /* unsupported */ getSearchResults: function(searchId, fromIndex, toIndex, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'searchId': searchId,
             'fromIndex': fromIndex,
             'toIndex': toIndex,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.getSearchResults', paramObject, opt_callback);
    },
    /* unsupported */ discardSearchResults: function(searchId, opt_callback) {
        var paramObject = {
             'searchId': searchId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.discardSearchResults', paramObject, opt_callback);
    },
    requestNode: function(objectId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.requestNode', paramObject, opt_callback);
    },
    /* unsupported */ setInspectModeEnabled: function(enabled, highlightConfig, opt_callback) {
        var paramObject = {
             'enabled': enabled,
             'highlightConfig': highlightConfig,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setInspectModeEnabled', paramObject, opt_callback);
    },
    highlightRect: function(x, y, width, height, color, outlineColor, opt_callback) {
        var paramObject = {
             'x': x,
             'y': y,
             'width': width,
             'height': height,
             'color': color,
             'outlineColor': outlineColor,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.highlightRect', paramObject, opt_callback);
    },
    highlightNode: function(highlightConfig, nodeId, objectId, opt_callback) {
        var paramObject = {
             'highlightConfig': highlightConfig,
             'nodeId': nodeId,
             'objectId': objectId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.highlightNode', paramObject, opt_callback);
    },
    hideHighlight: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.hideHighlight', paramObject, opt_callback);
    },
    /* unsupported */ highlightFrame: function(frameId, contentColor, contentOutlineColor, opt_callback) {
        var paramObject = {
             'frameId': frameId,
             'contentColor': contentColor,
             'contentOutlineColor': contentOutlineColor,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.highlightFrame', paramObject, opt_callback);
    },
    /* unsupported */ pushNodeByPathToFrontend: function(path, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'path': path,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.pushNodeByPathToFrontend', paramObject, opt_callback);
    },
    resolveNode: function(nodeId, objectGroup, opt_callback/*(object)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'objectGroup': objectGroup,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.resolveNode', paramObject, opt_callback);
    },
    getAttributes: function(nodeId, opt_callback/*(attributes)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.getAttributes', paramObject, opt_callback);
    },
    moveTo: function(nodeId, targetNodeId, insertBeforeNodeId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'targetNodeId': targetNodeId,
             'insertBeforeNodeId': insertBeforeNodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.moveTo', paramObject, opt_callback);
    },
    /* unsupported */ undo: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.undo', paramObject, opt_callback);
    },
    /* unsupported */ redo: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.redo', paramObject, opt_callback);
    },
    /* unsupported */ markUndoableState: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.markUndoableState', paramObject, opt_callback);
    },
    /* unsupported */ focus: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.focus', paramObject, opt_callback);
    },
    /* unsupported */ setFileInputFiles: function(nodeId, files, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'files': files,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setFileInputFiles', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    documentUpdated: function() {},
    setChildNodes: function(parentId, nodes) {},
    attributeModified: function(nodeId, name, value) {},
    attributeRemoved: function(nodeId, name) {},
    /* unsupported */ inlineStyleInvalidated: function(nodeIds) {},
    characterDataModified: function(nodeId, characterData) {},
    childNodeCountUpdated: function(nodeId, childNodeCount) {},
    childNodeInserted: function(parentNodeId, previousNodeId, node) {},
    childNodeRemoved: function(parentNodeId, nodeId) {},
    /* unsupported */ shadowRootPushed: function(hostId, root) {},
    /* unsupported */ shadowRootPopped: function(hostId, rootId) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.documentUpdated', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.setChildNodes', 
            ['parentId', 'nodes']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.attributeModified', 
            ['nodeId', 'name', 'value']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.attributeRemoved', 
            ['nodeId', 'name']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.inlineStyleInvalidated', 
            ['nodeIds']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.characterDataModified', 
            ['nodeId', 'characterData']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.childNodeCountUpdated', 
            ['nodeId', 'childNodeCount']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.childNodeInserted', 
            ['parentNodeId', 'previousNodeId', 'node']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.childNodeRemoved', 
            ['parentNodeId', 'nodeId']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.shadowRootPushed', 
            ['hostId', 'root']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.shadowRootPopped', 
            ['hostId', 'rootId']);
        chrome.devtools.remoteDebug.addDomainListener('DOM', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.CSS = {};
chrome.devtools.protocol.CSS.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.disable', paramObject, opt_callback);
    },
    getMatchedStylesForNode: function(nodeId, includePseudo, includeInherited, opt_callback/*(matchedCSSRules,pseudoElements,inherited)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'includePseudo': includePseudo,
             'includeInherited': includeInherited,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getMatchedStylesForNode', paramObject, opt_callback);
    },
    getInlineStylesForNode: function(nodeId, opt_callback/*(inlineStyle,attributesStyle)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getInlineStylesForNode', paramObject, opt_callback);
    },
    getComputedStyleForNode: function(nodeId, opt_callback/*(computedStyle)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getComputedStyleForNode', paramObject, opt_callback);
    },
    getAllStyleSheets: function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getAllStyleSheets', paramObject, opt_callback);
    },
    getStyleSheet: function(styleSheetId, opt_callback/*(styleSheet)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getStyleSheet', paramObject, opt_callback);
    },
    getStyleSheetText: function(styleSheetId, opt_callback/*(text)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getStyleSheetText', paramObject, opt_callback);
    },
    setStyleSheetText: function(styleSheetId, text, opt_callback) {
        var paramObject = {
             'styleSheetId': styleSheetId,
             'text': text,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.setStyleSheetText', paramObject, opt_callback);
    },
    setPropertyText: function(styleId, propertyIndex, text, overwrite, opt_callback/*(style)*/) {
        var paramObject = {
             'styleId': styleId,
             'propertyIndex': propertyIndex,
             'text': text,
             'overwrite': overwrite,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.setPropertyText', paramObject, opt_callback);
    },
    toggleProperty: function(styleId, propertyIndex, disable, opt_callback/*(style)*/) {
        var paramObject = {
             'styleId': styleId,
             'propertyIndex': propertyIndex,
             'disable': disable,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.toggleProperty', paramObject, opt_callback);
    },
    setRuleSelector: function(ruleId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'ruleId': ruleId,
             'selector': selector,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.setRuleSelector', paramObject, opt_callback);
    },
    addRule: function(contextNodeId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'contextNodeId': contextNodeId,
             'selector': selector,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.addRule', paramObject, opt_callback);
    },
    getSupportedCSSProperties: function(opt_callback/*(cssProperties)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getSupportedCSSProperties', paramObject, opt_callback);
    },
    forcePseudoState: function(nodeId, forcedPseudoClasses, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'forcedPseudoClasses': forcedPseudoClasses,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.forcePseudoState', paramObject, opt_callback);
    },
    startSelectorProfiler: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.startSelectorProfiler', paramObject, opt_callback);
    },
    stopSelectorProfiler: function(opt_callback/*(profile)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.stopSelectorProfiler', paramObject, opt_callback);
    },
    /* unsupported */ getNamedFlowCollection: function(documentNodeId, opt_callback/*(namedFlows)*/) {
        var paramObject = {
             'documentNodeId': documentNodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getNamedFlowCollection', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    mediaQueryResultChanged: function() {},
    styleSheetChanged: function(styleSheetId) {},
    /* unsupported */ namedFlowCreated: function(namedFlow) {},
    /* unsupported */ namedFlowRemoved: function(documentNodeId, flowName) {},
    /* unsupported */ regionLayoutUpdated: function(namedFlow) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'CSS.mediaQueryResultChanged', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'CSS.styleSheetChanged', 
            ['styleSheetId']);
        chrome.devtools.remoteDebug.registerEvent(
            'CSS.namedFlowCreated', 
            ['namedFlow']);
        chrome.devtools.remoteDebug.registerEvent(
            'CSS.namedFlowRemoved', 
            ['documentNodeId', 'flowName']);
        chrome.devtools.remoteDebug.registerEvent(
            'CSS.regionLayoutUpdated', 
            ['namedFlow']);
        chrome.devtools.remoteDebug.addDomainListener('CSS', this);
    },
};


chrome.devtools.protocol.Timeline = {};
chrome.devtools.protocol.Timeline.prototype = {

    // Commands: 
    start: function(maxCallStackDepth, opt_callback) {
        var paramObject = {
             'maxCallStackDepth': maxCallStackDepth,
         };
        chrome.devtools.remoteDebug.sendCommand('Timeline.start', paramObject, opt_callback);
    },
    stop: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Timeline.stop', paramObject, opt_callback);
    },
    /* unsupported */ setIncludeDomCounters: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.devtools.remoteDebug.sendCommand('Timeline.setIncludeDomCounters', paramObject, opt_callback);
    },
    /* unsupported */ setIncludeNativeMemoryStatistics: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.devtools.remoteDebug.sendCommand('Timeline.setIncludeNativeMemoryStatistics', paramObject, opt_callback);
    },
    /* unsupported */ supportsFrameInstrumentation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Timeline.supportsFrameInstrumentation', paramObject, opt_callback);
    },
    /* unsupported */ canMonitorMainThread: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Timeline.canMonitorMainThread', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    eventRecorded: function(record) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Timeline.eventRecorded', 
            ['record']);
        chrome.devtools.remoteDebug.addDomainListener('Timeline', this);
    },
};


chrome.devtools.protocol.Debugger = {};
chrome.devtools.protocol.Debugger.prototype = {

    // Commands: 
    /* unsupported */ causesRecompilation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.causesRecompilation', paramObject, opt_callback);
    },
    /* unsupported */ supportsSeparateScriptCompilationAndExecution: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.supportsSeparateScriptCompilationAndExecution', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.disable', paramObject, opt_callback);
    },
    setBreakpointsActive: function(active, opt_callback) {
        var paramObject = {
             'active': active,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setBreakpointsActive', paramObject, opt_callback);
    },
    setBreakpointByUrl: function(lineNumber, url, urlRegex, columnNumber, condition, opt_callback/*(breakpointId,locations)*/) {
        var paramObject = {
             'lineNumber': lineNumber,
             'url': url,
             'urlRegex': urlRegex,
             'columnNumber': columnNumber,
             'condition': condition,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setBreakpointByUrl', paramObject, opt_callback);
    },
    setBreakpoint: function(location, condition, opt_callback/*(breakpointId,actualLocation)*/) {
        var paramObject = {
             'location': location,
             'condition': condition,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setBreakpoint', paramObject, opt_callback);
    },
    removeBreakpoint: function(breakpointId, opt_callback) {
        var paramObject = {
             'breakpointId': breakpointId,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.removeBreakpoint', paramObject, opt_callback);
    },
    continueToLocation: function(location, opt_callback) {
        var paramObject = {
             'location': location,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.continueToLocation', paramObject, opt_callback);
    },
    stepOver: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.stepOver', paramObject, opt_callback);
    },
    stepInto: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.stepInto', paramObject, opt_callback);
    },
    stepOut: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.stepOut', paramObject, opt_callback);
    },
    pause: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.pause', paramObject, opt_callback);
    },
    resume: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.resume', paramObject, opt_callback);
    },
    searchInContent: function(scriptId, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.searchInContent', paramObject, opt_callback);
    },
    canSetScriptSource: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.canSetScriptSource', paramObject, opt_callback);
    },
    setScriptSource: function(scriptId, scriptSource, preview, opt_callback/*(callFrames,result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'scriptSource': scriptSource,
             'preview': preview,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setScriptSource', paramObject, opt_callback);
    },
    /* unsupported */ restartFrame: function(callFrameId, opt_callback/*(callFrames,result)*/) {
        var paramObject = {
             'callFrameId': callFrameId,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.restartFrame', paramObject, opt_callback);
    },
    getScriptSource: function(scriptId, opt_callback/*(scriptSource)*/) {
        var paramObject = {
             'scriptId': scriptId,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.getScriptSource', paramObject, opt_callback);
    },
    /* unsupported */ getFunctionDetails: function(functionId, opt_callback/*(details)*/) {
        var paramObject = {
             'functionId': functionId,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.getFunctionDetails', paramObject, opt_callback);
    },
    setPauseOnExceptions: function(state, opt_callback) {
        var paramObject = {
             'state': state,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setPauseOnExceptions', paramObject, opt_callback);
    },
    evaluateOnCallFrame: function(callFrameId, expression, objectGroup, includeCommandLineAPI, doNotPauseOnExceptionsAndMuteConsole, returnByValue, generatePreview, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'callFrameId': callFrameId,
             'expression': expression,
             'objectGroup': objectGroup,
             'includeCommandLineAPI': includeCommandLineAPI,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
             'returnByValue': returnByValue,
             'generatePreview': generatePreview,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.evaluateOnCallFrame', paramObject, opt_callback);
    },
    /* unsupported */ compileScript: function(expression, sourceURL, opt_callback/*(scriptId,syntaxErrorMessage)*/) {
        var paramObject = {
             'expression': expression,
             'sourceURL': sourceURL,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.compileScript', paramObject, opt_callback);
    },
    /* unsupported */ runScript: function(scriptId, contextId, objectGroup, doNotPauseOnExceptionsAndMuteConsole, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'contextId': contextId,
             'objectGroup': objectGroup,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.runScript', paramObject, opt_callback);
    },
    /* unsupported */ setOverlayMessage: function(message, opt_callback) {
        var paramObject = {
             'message': message,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setOverlayMessage', paramObject, opt_callback);
    },
    /* unsupported */ setVariableValue: function(scopeNumber, variableName, newValue, callFrameId, functionObjectId, opt_callback) {
        var paramObject = {
             'scopeNumber': scopeNumber,
             'variableName': variableName,
             'newValue': newValue,
             'callFrameId': callFrameId,
             'functionObjectId': functionObjectId,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setVariableValue', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    globalObjectCleared: function() {},
    scriptParsed: function(scriptId, url, startLine, startColumn, endLine, endColumn, isContentScript, sourceMapURL, hasSourceURL) {},
    scriptFailedToParse: function(url, scriptSource, startLine, errorLine, errorMessage) {},
    breakpointResolved: function(breakpointId, location) {},
    paused: function(callFrames, reason, data) {},
    resumed: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.globalObjectCleared', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.scriptParsed', 
            ['scriptId', 'url', 'startLine', 'startColumn', 'endLine', 'endColumn', 'isContentScript', 'sourceMapURL', 'hasSourceURL']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.scriptFailedToParse', 
            ['url', 'scriptSource', 'startLine', 'errorLine', 'errorMessage']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.breakpointResolved', 
            ['breakpointId', 'location']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.paused', 
            ['callFrames', 'reason', 'data']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.resumed', 
            ['']);
        chrome.devtools.remoteDebug.addDomainListener('Debugger', this);
    },
};


chrome.devtools.protocol.DOMDebugger = {};
chrome.devtools.protocol.DOMDebugger.prototype = {

    // Commands: 
    setDOMBreakpoint: function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.setDOMBreakpoint', paramObject, opt_callback);
    },
    removeDOMBreakpoint: function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.removeDOMBreakpoint', paramObject, opt_callback);
    },
    setEventListenerBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.setEventListenerBreakpoint', paramObject, opt_callback);
    },
    removeEventListenerBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.removeEventListenerBreakpoint', paramObject, opt_callback);
    },
    /* unsupported */ setInstrumentationBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.setInstrumentationBreakpoint', paramObject, opt_callback);
    },
    /* unsupported */ removeInstrumentationBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.removeInstrumentationBreakpoint', paramObject, opt_callback);
    },
    setXHRBreakpoint: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.setXHRBreakpoint', paramObject, opt_callback);
    },
    removeXHRBreakpoint: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.removeXHRBreakpoint', paramObject, opt_callback);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Profiler = {};
chrome.devtools.protocol.Profiler.prototype = {

    // Commands: 
    causesRecompilation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.causesRecompilation', paramObject, opt_callback);
    },
    isSampling: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.isSampling', paramObject, opt_callback);
    },
    hasHeapProfiler: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.hasHeapProfiler', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.disable', paramObject, opt_callback);
    },
    start: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.start', paramObject, opt_callback);
    },
    stop: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.stop', paramObject, opt_callback);
    },
    getProfileHeaders: function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.getProfileHeaders', paramObject, opt_callback);
    },
    getCPUProfile: function(uid, opt_callback/*(profile)*/) {
        var paramObject = {
             'uid': uid,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.getCPUProfile', paramObject, opt_callback);
    },
    getHeapSnapshot: function(uid, opt_callback) {
        var paramObject = {
             'uid': uid,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.getHeapSnapshot', paramObject, opt_callback);
    },
    removeProfile: function(type, uid, opt_callback) {
        var paramObject = {
             'type': type,
             'uid': uid,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.removeProfile', paramObject, opt_callback);
    },
    clearProfiles: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.clearProfiles', paramObject, opt_callback);
    },
    takeHeapSnapshot: function(reportProgress, opt_callback) {
        var paramObject = {
             'reportProgress': reportProgress,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.takeHeapSnapshot', paramObject, opt_callback);
    },
    collectGarbage: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.collectGarbage', paramObject, opt_callback);
    },
    getObjectByHeapObjectId: function(objectId, objectGroup, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
             'objectGroup': objectGroup,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.getObjectByHeapObjectId', paramObject, opt_callback);
    },
    getHeapObjectId: function(objectId, opt_callback/*(heapSnapshotObjectId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.getHeapObjectId', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    addProfileHeader: function(header) {},
    addHeapSnapshotChunk: function(uid, chunk) {},
    finishHeapSnapshot: function(uid) {},
    setRecordingProfile: function(isProfiling) {},
    resetProfiles: function() {},
    reportHeapSnapshotProgress: function(done, total) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.addProfileHeader', 
            ['header']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.addHeapSnapshotChunk', 
            ['uid', 'chunk']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.finishHeapSnapshot', 
            ['uid']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.setRecordingProfile', 
            ['isProfiling']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.resetProfiles', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.reportHeapSnapshotProgress', 
            ['done', 'total']);
        chrome.devtools.remoteDebug.addDomainListener('Profiler', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.HeapProfiler = {};
chrome.devtools.protocol.HeapProfiler.prototype = {

    // Commands: 
    hasHeapProfiler: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('HeapProfiler.hasHeapProfiler', paramObject, opt_callback);
    },
    getProfileHeaders: function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('HeapProfiler.getProfileHeaders', paramObject, opt_callback);
    },
    getHeapSnapshot: function(uid, opt_callback) {
        var paramObject = {
             'uid': uid,
         };
        chrome.devtools.remoteDebug.sendCommand('HeapProfiler.getHeapSnapshot', paramObject, opt_callback);
    },
    removeProfile: function(uid, opt_callback) {
        var paramObject = {
             'uid': uid,
         };
        chrome.devtools.remoteDebug.sendCommand('HeapProfiler.removeProfile', paramObject, opt_callback);
    },
    clearProfiles: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('HeapProfiler.clearProfiles', paramObject, opt_callback);
    },
    takeHeapSnapshot: function(reportProgress, opt_callback) {
        var paramObject = {
             'reportProgress': reportProgress,
         };
        chrome.devtools.remoteDebug.sendCommand('HeapProfiler.takeHeapSnapshot', paramObject, opt_callback);
    },
    collectGarbage: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('HeapProfiler.collectGarbage', paramObject, opt_callback);
    },
    getObjectByHeapObjectId: function(objectId, objectGroup, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
             'objectGroup': objectGroup,
         };
        chrome.devtools.remoteDebug.sendCommand('HeapProfiler.getObjectByHeapObjectId', paramObject, opt_callback);
    },
    getHeapObjectId: function(objectId, opt_callback/*(heapSnapshotObjectId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.devtools.remoteDebug.sendCommand('HeapProfiler.getHeapObjectId', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    addProfileHeader: function(header) {},
    addHeapSnapshotChunk: function(uid, chunk) {},
    finishHeapSnapshot: function(uid) {},
    resetProfiles: function() {},
    reportHeapSnapshotProgress: function(done, total) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'HeapProfiler.addProfileHeader', 
            ['header']);
        chrome.devtools.remoteDebug.registerEvent(
            'HeapProfiler.addHeapSnapshotChunk', 
            ['uid', 'chunk']);
        chrome.devtools.remoteDebug.registerEvent(
            'HeapProfiler.finishHeapSnapshot', 
            ['uid']);
        chrome.devtools.remoteDebug.registerEvent(
            'HeapProfiler.resetProfiles', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'HeapProfiler.reportHeapSnapshotProgress', 
            ['done', 'total']);
        chrome.devtools.remoteDebug.addDomainListener('HeapProfiler', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Worker = {};
chrome.devtools.protocol.Worker.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Worker.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Worker.disable', paramObject, opt_callback);
    },
    sendMessageToWorker: function(workerId, message, opt_callback) {
        var paramObject = {
             'workerId': workerId,
             'message': message,
         };
        chrome.devtools.remoteDebug.sendCommand('Worker.sendMessageToWorker', paramObject, opt_callback);
    },
    connectToWorker: function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        chrome.devtools.remoteDebug.sendCommand('Worker.connectToWorker', paramObject, opt_callback);
    },
    disconnectFromWorker: function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        chrome.devtools.remoteDebug.sendCommand('Worker.disconnectFromWorker', paramObject, opt_callback);
    },
    setAutoconnectToWorkers: function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.devtools.remoteDebug.sendCommand('Worker.setAutoconnectToWorkers', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    workerCreated: function(workerId, url, inspectorConnected) {},
    workerTerminated: function(workerId) {},
    dispatchMessageFromWorker: function(workerId, message) {},
    disconnectedFromWorker: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Worker.workerCreated', 
            ['workerId', 'url', 'inspectorConnected']);
        chrome.devtools.remoteDebug.registerEvent(
            'Worker.workerTerminated', 
            ['workerId']);
        chrome.devtools.remoteDebug.registerEvent(
            'Worker.dispatchMessageFromWorker', 
            ['workerId', 'message']);
        chrome.devtools.remoteDebug.registerEvent(
            'Worker.disconnectedFromWorker', 
            ['']);
        chrome.devtools.remoteDebug.addDomainListener('Worker', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Canvas = {};
chrome.devtools.protocol.Canvas.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.disable', paramObject, opt_callback);
    },
    dropTraceLog: function(traceLogId, opt_callback) {
        var paramObject = {
             'traceLogId': traceLogId,
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.dropTraceLog', paramObject, opt_callback);
    },
    hasUninstrumentedCanvases: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.hasUninstrumentedCanvases', paramObject, opt_callback);
    },
    captureFrame: function(frameId, opt_callback/*(traceLogId)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.captureFrame', paramObject, opt_callback);
    },
    startCapturing: function(frameId, opt_callback/*(traceLogId)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.startCapturing', paramObject, opt_callback);
    },
    stopCapturing: function(traceLogId, opt_callback) {
        var paramObject = {
             'traceLogId': traceLogId,
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.stopCapturing', paramObject, opt_callback);
    },
    getTraceLog: function(traceLogId, startOffset, maxLength, opt_callback/*(traceLog)*/) {
        var paramObject = {
             'traceLogId': traceLogId,
             'startOffset': startOffset,
             'maxLength': maxLength,
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.getTraceLog', paramObject, opt_callback);
    },
    replayTraceLog: function(traceLogId, stepNo, opt_callback/*(resourceState)*/) {
        var paramObject = {
             'traceLogId': traceLogId,
             'stepNo': stepNo,
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.replayTraceLog', paramObject, opt_callback);
    },
    getResourceInfo: function(resourceId, opt_callback/*(resourceInfo)*/) {
        var paramObject = {
             'resourceId': resourceId,
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.getResourceInfo', paramObject, opt_callback);
    },
    getResourceState: function(traceLogId, resourceId, opt_callback/*(resourceState)*/) {
        var paramObject = {
             'traceLogId': traceLogId,
             'resourceId': resourceId,
         };
        chrome.devtools.remoteDebug.sendCommand('Canvas.getResourceState', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    contextCreated: function(frameId) {},
    traceLogsRemoved: function(frameId, traceLogId) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Canvas.contextCreated', 
            ['frameId']);
        chrome.devtools.remoteDebug.registerEvent(
            'Canvas.traceLogsRemoved', 
            ['frameId', 'traceLogId']);
        chrome.devtools.remoteDebug.addDomainListener('Canvas', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Input = {};
chrome.devtools.protocol.Input.prototype = {

    // Commands: 
    dispatchKeyEvent: function(type, modifiers, timestamp, text, unmodifiedText, keyIdentifier, windowsVirtualKeyCode, nativeVirtualKeyCode, macCharCode, autoRepeat, isKeypad, isSystemKey, opt_callback) {
        var paramObject = {
             'type': type,
             'modifiers': modifiers,
             'timestamp': timestamp,
             'text': text,
             'unmodifiedText': unmodifiedText,
             'keyIdentifier': keyIdentifier,
             'windowsVirtualKeyCode': windowsVirtualKeyCode,
             'nativeVirtualKeyCode': nativeVirtualKeyCode,
             'macCharCode': macCharCode,
             'autoRepeat': autoRepeat,
             'isKeypad': isKeypad,
             'isSystemKey': isSystemKey,
         };
        chrome.devtools.remoteDebug.sendCommand('Input.dispatchKeyEvent', paramObject, opt_callback);
    },
    dispatchMouseEvent: function(type, x, y, modifiers, timestamp, button, clickCount, opt_callback) {
        var paramObject = {
             'type': type,
             'x': x,
             'y': y,
             'modifiers': modifiers,
             'timestamp': timestamp,
             'button': button,
             'clickCount': clickCount,
         };
        chrome.devtools.remoteDebug.sendCommand('Input.dispatchMouseEvent', paramObject, opt_callback);
    },
};

/* unsupported */ 
chrome.devtools.protocol.LayerTree = {};
chrome.devtools.protocol.LayerTree.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('LayerTree.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('LayerTree.disable', paramObject, opt_callback);
    },
    getLayerTree: function(opt_callback/*(layerTree)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('LayerTree.getLayerTree', paramObject, opt_callback);
    },
    nodeIdForLayerId: function(layerId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'layerId': layerId,
         };
        chrome.devtools.remoteDebug.sendCommand('LayerTree.nodeIdForLayerId', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    layerTreeDidChange: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.devtools.remoteDebug.registerEvent(
            'LayerTree.layerTreeDidChange', 
            ['']);
        chrome.devtools.remoteDebug.addDomainListener('LayerTree', this);
    },
};

/* copyright 2011 Google, inc. johnjbarton@google.com Google BSD License */
/* See https://github.com/google/devtoolsExtended/blob/atopwi/extension/atopwi/remoteDebugAPIGeneration/generateProxyDebugAPI.html */
}());
