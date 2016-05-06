$(document).ready(function(){
  sourceText = localStorage.getItem("sourceText");
  sourceLanguage = localStorage.getItem("sourceLanguage");
  targetLanguage = localStorage.getItem("targetLanguage");
  translationModel = localStorage.getItem("translationModel");
  translateWrapper(window, translationModel, sourceText, sourceLanguage, targetLanguage, function(i) {
    $('#sourceText').text(sourceText);
    $('#translatedOutput').text(i);
    window.localStorage.clear();
  });

  $(window).onload = function() {
    console.log("Results page loaded.");
  }

  $("#translatePageBtn a").on("click", function() {
      console.log("translate page button clicked");
      var sourceLanguage = $('#fromText').attr('value');
      var targetLanguage = $('#toText').attr('value');
      var translationModel = $('#translationModel').attr('value');

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", source: sourceLanguage, target: targetLanguage, mt: translationModel}, function(response) {
            console.log(response.farewell);
        });
      });
  });

  $('#footerLinks').on('click', 'a', function(){
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
  });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "detection"}, function(response) {
        console.log(response.farewell);
    });
  });

  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "detectLanguage") {
      detectLanguage(request.str);
      sendResponse({farewell: "good-a-bye"});
    }
  });

});
