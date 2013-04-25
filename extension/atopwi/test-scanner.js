var tests = [];
var baseURL = "http://localhost:9696"
scanFolder("inspector/console");
// scanFolder("inspector/debugger");
scanFolder("inspector/editor");
scanFolder("inspector/elements");
scanFolder("inspector/profiler");
scanFolder("inspector/styles");
scanFolder("inspector/timeline");
scanFolder("inspector");

function scanFolder(folder)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(xhr.responseXML.documentElement.nodeName);
        var doc = xhr.responseXML;
        var links = doc.querySelectorAll("a");
        for (var i = 0; i < links.length; ++i) {
            var link = links[i].href;
            var match = link.match(/[^\/]*\/([^\/]+\.html)$/);
            if (!match)
                continue;
            var path = "/LayoutTests/" + folder + "/" + match[1];
            fetchExpectations(link);
        }
    }
    xhr.onerror = function(message) {
      console.error(window.location + ": XHR failed ", message);
    }
    xhr.open("GET", baseURL+"/LayoutTests/" + folder + "/");
    xhr.responseType = "document";
    xhr.send(null);
}

function fetchExpectations(path, callback)
{
    var ext = path.lastIndexOf(".");
    path = path.substring(0, ext) + "-expected.txt";
    
    var chromiumSegment = "/LayoutTests/platform/chromium/";
    var chromiumPath = path.replace("/LayoutTests/", chromiumSegment);

    function filter(webkitPath) {
        if (this.status === 404) {
            if (this.path.indexOf(chromiumSegment) !== -1) {
                // If we don't find the expectations under chromium, try webkit proper
                fetch(path, filter, function() {
                  console.warn("Failed to load "+path);
                });                
            }
            return;
        }
            
        var expectations = this.responseText;
        var expectationLines = expectations.split("\n");
        var filtered = [];
        for (var i = 0; i < expectationLines.length; ++i) {
            if (!expectationLines[i].indexOf("ALERT: ") ||
                !expectationLines[i].indexOf("CONSOLE MESSAGE: ")) {
                filtered = [];
                continue;
            }
            filtered.push(expectationLines[i]);
        }
        var test = [path, filtered.join("\n")];
        console.log("added "+path);
        window.parent.postMessage(["test", test], "*");
    }
    
    fetch(chromiumPath, filter, function() {
            console.warn("Failed to load "+path);
    });
}

function fetch(path, callback, errback)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.onerror = errback;
    xhr.path = path;
    xhr.open("GET", path);
    xhr.send(null);
}

