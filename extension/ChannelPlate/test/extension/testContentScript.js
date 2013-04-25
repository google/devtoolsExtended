var port = new ChannelPlate.ContentScriptTalker("content-script", function onMessage(message) {
  console.log("ContentScript got the message ", message);
});

port.postMessage("This is your content script calling");
