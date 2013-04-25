/*
 * Copyright (C) 2009 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * 
 */

/**
 * @constructor
 */
WebInspector.TestCaseLoader = function()
{
}

WebInspector.TestCaseLoader.notifyDone = function(callId, result)
{
    var message = typeof result === "undefined" ? "\"<undefined>\"" : JSON.stringify(result);
    RuntimeAgent.evaluate("didEvaluateForTestInFrontend(" + callId + ", " + message + ")", "test");
}

WebInspector.TestCaseLoader.loadCompleted = function()
{
    var testRunnerIframe = document.querySelector('.testRunner');
    if (testRunnerIframe)   // Then we are to be a victim of testing
        setTimeout(this._clearAndTest.bind(this));  // wait for resourceTreeModel
}

WebInspector.TestCaseLoader._clearAndTest = function() {
    // We may have reloaded WebInspector, but the page may have results from a previous test run.
    WebInspector.resourceTreeModel.addEventListener(WebInspector.ResourceTreeModel.EventTypes.OnLoad, this._testPageIsClear, this);
    PageAgent.reload(true);
}

WebInspector.TestCaseLoader._testPageIsClear = function() 
{
    WebInspector.resourceTreeModel.removeEventListener(WebInspector.ResourceTreeModel.EventTypes.OnLoad, this._testPageIsClear, this);
    
    function onTestFrameworkMessage(event)
    {
        if (event.data.command === "evaluateInWebInspector")
            WebInspector.evaluateForTestInFrontend(event.data.callId, event.data.script);
    }
    window.addEventListener("message", onTestFrameworkMessage, true);

    var testRunnerIframe = document.querySelector('.testRunner');
    testRunnerIframe.contentWindow.postMessage("frontendLoaded", "*");
}

WebInspector.evaluateForTestInFrontend = function(callId, script)
{
    window.isUnderTest = true;
    function invokeMethod()
    {
        try {
            script = script + "//@ sourceURL=evaluateInWebInspector" + callId + ".js";
            var result = window.eval(script);
            WebInspector.TestCaseLoader.notifyDone(callId, result);
        } catch (e) {
            WebInspector.TestCaseLoader.notifyDone(callId, e.toString());
        }
    }
    InspectorBackend.runAfterPendingDispatches(invokeMethod);
};