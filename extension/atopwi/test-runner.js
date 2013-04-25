
var layoutTestsServer = "http://localhost:8002/";
var scannerServer = "./";
var remoteDebuggingServer = "http://localhost:9222/";

var tests = [];
var skipList = [
    // HALT
    "inspector/console/console-api-on-call-frame.html",

    // FAILED
    "inspector/console/console-dir-global.html",
    "inspector/console/console-log-toString-object.html",
    "inspector/console/console-uncaught-exception-in-eval.html",
    "inspector/elements/edit-dom-actions.html",
    "inspector/elements/highlight-node-scaled.html",
    "inspector/elements/highlight-node-scroll.html",
    "inspector/elements/highlight-node.html",
    "inspector/elements/highlight-svg-root.html",
    "inspector/network-status-non-http.html",
    "inspector/storage-panel-dom-storage-update.html",
    "inspector/styles/inject-stylesheet.html",
    "inspector/styles/protocol-css-regions-commands.html",
    "inspector/styles/region-style-crash.html",
    "inspector/styles/styles-disable-then-enable-overriden-ua.html",
    "inspector/styles/styles-url-linkify.html",
    "inspector/styles/vendor-prefixes.html",
    "inspector/timeline/timeline-event-dispatch.html",
    "inspector/timeline/timeline-frames.html",
    "inspector/timeline/timeline-network-resource.html",
    "inspector/timeline/timeline-paint.html",
    "inspector/timeline/timeline-receive-response-event.html",

    // TIMEOUT
    "inspector/profiler/cpu-profiler-profiling-without-inspector.html",
    "inspector/profiler/heap-snapshot-inspect-dom-wrapper.html",
    "inspector/timeline/timeline-network-received-data.html",
];
var treeOutline = null;

function run(debug)
{
    if (window.runner && debug) {
        window.runner.continueDebugging();
        return;
    }

    if (window.runner)
        window.runner.cleanup();

    window.debug = debug;

    runTests();
}

function runTests()
{
    document.getElementById("outline").removeChildren();
    treeOutline = new TreeOutline(document.getElementById("outline"));

    document.getElementById("pass").textContent = 0;
    document.getElementById("skip").textContent = 0;
    document.getElementById("fail").textContent = 0;
    document.getElementById("timeout").textContent = 0;
    document.getElementById("remaining").textContent = tests.length;

    runNextTest();
}

function interrupt()
{
    tests = [];
}

function runNextTest(lastResult)
{
    if (lastResult) {
        var element = document.getElementById(lastResult);
        element.textContent = parseInt(element.textContent) + 1;

        element = document.getElementById("remaining");
        element.textContent = parseInt(element.textContent) - 1;
        if (window.debug) {
            document.getElementById("debug").textContent = "Debug";
            return;
        }
    }

    var test;
    var filter = document.getElementById("filter").value;
    while (test = tests.shift()) {
        if (!filter || test[0].match(filter)) {
            new StandaloneTestRunner(test[0], test[1], runNextTest.bind(null));
            return;
        }
    }
}

function StandaloneTestRunner(testPath, expected, next)
{
    this._testPath = testPath;
    this._next = next;
    this._expected = expected;
    this._pendingMessages = [];

    this._treeElement = new TreeElement(testPath);
    treeOutline.appendChild(this._treeElement);

    for (var i = 0; !window.debug && i < skipList.length; ++i) {
        if (testPath.indexOf(skipList[i]) !== -1) {
            this._treeElement.title = testPath + ": SKIPPED";
            this._next("skip");
            return;
        }
    }
    window.runner = this;
    this._testPage = window.open("about:blank", "inspected", "width=800,height=600");

    window.remoteDebuggingHandshake = this._remoteDebuggingHandshake.bind(this);
    var script = document.createElement("script");
    script.src = remoteDebuggingServer + "json?jsonp=remoteDebuggingHandshake";
    document.head.appendChild(script);
}

StandaloneTestRunner.FrontendLocation = "inspector.html";

StandaloneTestRunner.prototype = {
    _remoteDebuggingHandshake: function(data)
    {
        for (var i = 0; i < data.length; ++i) {
            if (data[i].url !== "about:blank")
                continue;
            this._debuggerURL = data[i].webSocketDebuggerUrl.replace("://", "=");
            this._navigateTestPage();
            break;
        }
    },

    _navigateTestPage: function()
    {
        this._testPage.location.href = this._testPath;
        var width = localStorage.getItem('inspectorWidth') || 600;
        var height = localStorage.getItem('inspectorHeight') || 400;
        var features = "width=" + Math.max(width , 600) + ",height=" + Math.max(height, 400);
        this._inspectorWindowLoading = window.open(StandaloneTestRunner.FrontendLocation + "?" + this._debuggerURL, "inspector", features);
        this._inspectorWindowLoading.dispatchStandaloneTestRunnerMessages = true;
        
        window.addEventListener('unload', this.cleanup.bind(this));

        if (!window.debug)
            this._watchDog = setTimeout(this._timeout.bind(this), 10000);
    },

    loadCompleted: function()
    {
        if (!window.debug) {
            this._loadCompleted(this);
            return;
        }
        document.getElementById("debug").textContent = "Continue";
    },

    continueDebugging: function()
    {
        this._loadCompleted();
    },

    _loadCompleted: function()
    {
        this._inspectorWindow = this._inspectorWindowLoading;
        for (var i = 0; i < this._pendingMessages.length; ++i)
            this._inspectorWindow.postMessage(this._pendingMessages[i], "*");
        this._pendingMessages = [];
    },

    closeWebInspector: function()
    {
        if (!window.debug)
            this._inspectorWindow.close();
    },

    notifyDone: function(actual)
    {
        if (this._done)
            return;
        this._done = true;

        if (!window.debug) 
            this.cleanup()

        clearTimeout(this._watchDog);

        this._treeElement.onselect = this.onTreeElementSelect.bind(this);

        // TODO pavel  is the  RHS || condition wanted?
        if (actual === this._expected || actual === this._expected + "\n") {
            this._treeElement.title = this._testPath + ": SUCCESS";
            this._next("pass");
            return;
        }

        this._treeElement.title = this._testPath + ": FAILED";
        this._treeElement.listItemElement.addStyleClass("failed");

        var baseLines = difflib.stringAsLines(this._expected);
        var newLines = difflib.stringAsLines(actual);
        var sm = new difflib.SequenceMatcher(baseLines, newLines);
        var opcodes = sm.get_opcodes();
        var lastWasSeparator = false;

        for (var idx = 0; idx < opcodes.length; idx++) {
            var code = opcodes[idx];
            var change = code[0];
            var b = code[1];
            var be = code[2];
            var n = code[3];
            var ne = code[4];
            var rowCount = Math.max(be - b, ne - n);
            var topRows = [];
            var bottomRows = [];
            for (var i = 0; i < rowCount; i++) {
                if (change === "delete" || (change === "replace" && b < be)) {
                    var lineNumber = b++;
                    this._treeElement.appendChild(new TreeElement("- [" + lineNumber + "] " + baseLines[lineNumber]));
                }

                if (change === "insert" || (change === "replace" && n < ne)) {
                    var lineNumber = n++;
                    this._treeElement.appendChild(new TreeElement("+ [" + lineNumber + "] " + newLines[lineNumber]));
                }

                if (change === "equal") {
                    b++;
                    n++;
                }
            }
        }

        this._next("fail");
    },

    evaluateInWebInspector: function(callId, script)
    {
        if (this._inspectorWindow)
            this._inspectorWindow.postMessage(["evaluateForTest", callId, script], "*");
        else
            this._pendingMessages.push(["evaluateForTest", callId, script]);
    },

    _timeout: function()
    {
        this._treeElement.title = this._testPath + ": TIMEOUT";
        this._treeElement.listItemElement.addStyleClass("timeout");
        this._done = true;
        this.cleanup();
        this._next("timeout");
    },

    cleanup: function ()
    {
        localStorage.setItem('inspectorWidth', this._inspectorWindowLoading.outerWidth);
        localStorage.setItem('inspectorHeight', this._inspectorWindowLoading.outerHeight);
        this._inspectorWindowLoading.close();
        this._testPage.close();
        delete window.runner;
    },

    onTreeElementSelect: function () 
    {
        var baseEndSentinel = '/inspector/';
        var baseChars = this._testPath.indexOf(baseEndSentinel) + baseEndSentinel.length;
        if (baseChars > 0) 
            document.getElementById("filter").value = this._testPath.substr(baseChars);
    },

    display: function() { }
}

function onMessageFromTestPage(event)
{
    var signature = event.data;
    var method = signature.shift();
    if (method === 'test') {
        tests.push(signature[0]);
    }

    if (window.runner)
        window.runner[method].apply(window.runner, signature);
}
window.addEventListener("message", onMessageFromTestPage, true);

function onload()
{
     attachListeners();

    var queryParamsObject = {};
    var queryParams = window.location.search;
    if (!queryParams)
        return;
    var params = queryParams.substring(1).split("&");
    for (var i = 0; i < params.length; ++i) {
        var pair = params[i].split("=");
        queryParamsObject[pair[0]] = pair[1];
    }
    if ("filter" in queryParamsObject)
        document.getElementById("filter").value = queryParamsObject["filter"];
}
window.addEventListener('load', onload);

function loadTests() {
    if (window.testScannerIframe) 
        document.body.removeChild(window.testScannerIframe);
    window.testScannerIframe = document.createElement("iframe");
    window.testScannerIframe.src = scannerServer + "test-scanner.html";
    document.body.appendChild(window.testScannerIframe);
}

function attachListeners() {
    document.querySelector('.load').addEventListener('click', function(){
        loadTests();
    });document.querySelector('.run').addEventListener('click', function(){
        run();
    });
    document.querySelector('.debug').addEventListener('click', function(){
        run(true);
    });    
    document.querySelector('.interrupt').addEventListener('click', function(){
        interrupt();
    });
}

