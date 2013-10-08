
// Called in front-end/devtools.html

require({
    paths: {
      'crx2app': '../../../../../crx2app/extension',
      'atopwi': '../../../../../atopwi',
    }
});
require(['atopwi/Debuggee'], function(Debuggee) {
    var base = window.location.href.substr(0, window.location.href.indexOf(window.location.pathname));
    var debuggee = new Debuggee(base);
    debuggee.attachToParent();
});
