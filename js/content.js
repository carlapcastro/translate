chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello") {
        translateWebPage(request.source, request.target)
        sendResponse({farewell: "goodbye"});
    } else if (request.greeting == "detection") {
        sendDetectionMessage();
        sendResponse({farewell: "detection started"});
    }

});

function sendDetectionMessage() {

    chrome.runtime.sendMessage({greeting: "detectLanguage"}, function(response) {
      console.log(response.farewell);
    });

}


function translateWebPage(sourceLanguage, targetLanguage) {
    var elements = document.getElementsByTagName('*');

    for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            for (var j = 0; j < element.childNodes.length; j++) {
                (function() {
                    var node = element.childNodes[j];
                    if(node.nodeType === 3){
                        $.when(swapText(element,node, sourceLanguage, targetLanguage))
                    }
                })(j);
            }
    }

}

function swapText(element,node, sourceLanguage, targetLanguage){
    var text = node.nodeValue;
    translateWrapper(window, text, sourceLanguage, targetLanguage, function(i) {
        console.log(text);
        var re = new RegExp(text,"g");
        var replacedText = text.replace(re, i);
        if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
        }
        return;
    });
}
