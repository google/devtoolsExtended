function StandaloneTestRunner(testPath, expected, next)
{
    this._pendingMessages = [];
    window.addEventListener("message", this._onMessage.bind(this), true);
    this._inspectorWindow = window.parent;
}

StandaloneTestRunner.prototype = {
    dumpAsText: function()
    {
    },

    waitUntilDone: function()
    {
    },

    closeWebInspector: function()
    {
        // In batch mode under DumpRenderTree we exit here. 
        console.log("closeWebInspector");
    },

    notifyDone: function()
    {
        var actual = document.body.innerText + "\n";
        document.documentElement.innerHTML = "";

        var xhr = new XMLHttpRequest();
        var href = window.location.href;
        var ext = href.lastIndexOf(".");
        xhr.open("GET", href.substring(0, ext) + "-expected.txt", false);
        xhr.send(null);
        var expected = xhr.responseText;

        const baseDir = "/LayoutTests/http/tests/inspector/resources/jsdifflib/";
        var stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.type = "text/css";
        stylesheet.href = baseDir + "diffview.css";
        document.head.appendChild(stylesheet);

        var script = document.createElement("script");
        script.src = baseDir + "difflib.js";
        script.onload = allLoaded;
        document.head.appendChild(script);

        script = document.createElement("script");
        script.src = baseDir + "diffview.js";
        script.onload = allLoaded;
        document.head.appendChild(script);

        var scriptsLoaded = 0;
        function allLoaded(event) 
        {
            scriptsLoaded += 1;
            if (scriptsLoaded === 2) 
                viewerLoaded();
        }

        function viewerLoaded()
        {
            var baseLines = difflib.stringAsLines(expected);
            var newLines =  difflib.stringAsLines(actual);
            var sequenceMatcher = new difflib.SequenceMatcher(baseLines, newLines);
            var diffView = diffview.buildView({
                baseTextLines: baseLines,
                newTextLines: newLines,
                opcodes: sequenceMatcher.get_opcodes(),
                contextSize: 3,
                viewType: 1
            });
            document.body.appendChild(diffView);
        }
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
        var message = {command: "evaluateInWebInspector", callId: callId, script: script};
        if (this._isLoaded)
            this._postMessages([message]);
        else
            this._pendingMessages.push(message);
    },

    _onMessage: function(event)
    {
        if (event.data === "frontendLoaded") {
            this._isLoaded = true;
            this._postMessages(this._pendingMessages);
            this._pendingMessages = [];
        }
    },

    _postMessages: function(messages)
    {
        for (var i = 0; i < messages.length; ++i)
            this._inspectorWindow.postMessage(messages[i], "*");
    }
}

if (!window.testRunner) 
    window.testRunner = new StandaloneTestRunner();
