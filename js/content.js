chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello") {
        translateWebPage(request.source, request.target, request.mt);
        sendResponse({farewell: "goodbye"});
    } else if (request.greeting == "detection") {
        sendDetectionMessage();
        sendResponse({farewell: "detection started"});
    }

});

function sendDetectionMessage() {
    var str = document.body.innerText
    var part = str.split(/\s+/).slice(20, 40).join('+');

    chrome.runtime.sendMessage({greeting: "detectLanguage", str: part}, function(response) {
      console.log(response.farewell);
    });

}


function translateWebPage(sourceLanguage, targetLanguage, mt) {
  console.log('translating webpage...');
    var elements = document.getElementsByTagName('*');

    for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            for (var j = 0; j < element.childNodes.length; j++) {
                (function() {
                    var node = element.childNodes[j];
                    if(node.nodeType === 3){
                        $.when(swapText(element,node, sourceLanguage, targetLanguage, mt))
                    }
                })(j);
            }
    }

}

function swapText(element,node, sourceLanguage, targetLanguage, mt){
    var text = node.nodeValue;
    translateWrapper(window, mt, text, sourceLanguage, targetLanguage, function(i) {
        console.log(text);
        var re = new RegExp(text,"g");
        var replacedText = text.replace(re, i);
        if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
        }
        return;
    });
}

/**
  Create individual elements for each language. These elements for the
  drop down list for language selection.
*/

function createLanguages(translationLanguages) {
  var sourceLanguageMenu = document.getElementById("sourceLanguageMenu");
  var targetLanguageMenu = document.getElementById("targetLanguageMenu");
  $('#sourceLanguageMenu ul').empty();
  for (var code in translationLanguages) {
    console.log('creating dropdown for ', code, ' with label ', languages[code]);
    var sourceDropdown = document.createElement("li");
    var link = document.createElement("a");
    var text = document.createTextNode(languages[code]);
    link.className = "dropdown-item";
    link.href = "#";
    var languageCode = document.createAttribute("value");
    languageCode.value = code;
    link.setAttributeNode(languageCode);

    link.appendChild(text);
    sourceDropdown.appendChild(link);

    sourceLanguageMenu.appendChild(sourceDropdown);
    var targetDropdown = sourceDropdown.cloneNode(true);
    targetLanguageMenu.appendChild(targetDropdown);
  }
};

function setTranslationParameters(window) {
  
}
