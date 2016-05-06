$(document).ready(function(){

  // Create li for each language supported
  createLanguages(languages);

  $(window).onload = function() {
    console.log("Translation extension loaded.");
  }

  // Submit input text for translation
  $('#submitBtn').on("click", function() {
    setTranslationParameters(window);
  });

  $("#translatePageBtn a").on("click", function() {
      console.log("translate page button clicked");
      var sourceLanguage = $('#fromText').attr('value');
      var targetLanguage = $('#toText').attr('value');
      var translationModel = $('#translationModel').attr('value');

      document.getElementById("lspinner").className = "unhidden" ;
      document.getElementById("translatePageBtn").className = "hidden";

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", source: sourceLanguage, target: targetLanguage, mt: translationModel}, function(response) {
            console.log(response.farewell);
        });
      });
  });

  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "removeSpinner") {
        document.getElementById("lspinner").className = "hidden" ;
        document.getElementById("translatePageBtn").className = "unhidden";
      sendResponse({farewell: "bye bye spinner"});
    }
  });

  // Disable enter key and newlines for text area
  $('textarea').keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
  });

  $('textarea').on('keyup', function(){
    $(this).val($(this).val().replace(/\n/g, ''));
  });

  // Reset value every time a new language is clicked
  $('#sourceLanguageMenu li  a').on('click', function(){
    $('#fromText').text($(this).text());
    $('#fromText').attr('value', $(this).attr('value'));
  });

  // Reset value every time a new language is clicked
  $('#targetLanguageMenu li  a').on('click', function(){
    $('#toText').text($(this).text());
    $('#toText').attr('value', $(this).attr('value'));
  });

  // Set translation menu
  $('#translationMenu li  a').on('click', function(){
    $('#translationModel').text($(this).text());
    $('#translationModel').attr('value', $(this).attr('value'));
  });
  $("#translationMenu li a")[0].click();

  // Set links on footer to open to new tab
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
