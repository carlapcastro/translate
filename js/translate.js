$(document).ready(function(){

  createLanguages();

  $(window).onload = function() {
    console.log("Translation extension loaded.");
  }

  $('#submitBtn').on("click", function() {
    console.log('submit button pressed');
    // var sourceText = $('');
    var sourceLanguage = $('#fromText').attr('value');
    var targetLanguage = $('#toText').attr('value');
    var sourceText = $('#inputText').val();
    var translationModel = $('#translationModel').attr('value');
    if (sourceLanguage == 'Language' || targetLanguage == 'Language') {
      console.log('No languages selected');
      $('#translatedOutput').text('Please select a language!');
    } else {
      console.log("opening results.html...");
      localStorage.setItem("sourceText",sourceText);
      localStorage.setItem("sourceLanguage",sourceLanguage);
      localStorage.setItem("targetLanguage",targetLanguage);
      localStorage.setItem("translationModel",translationModel);

      window.location.href="results.html";
    }
  });

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

  $('textarea').keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
  });

  $('textarea').on('keyup', function(){
    $(this).val($(this).val().replace(/\n/g, ''));
  });

  $('#sourceLanguageMenu li  a').on('click', function(){
    $('#fromText').text($(this).text());
    $('#fromText').attr('value', $(this).attr('value'));
  });

  $('#targetLanguageMenu li  a').on('click', function(){
    $('#toText').text($(this).text());
    $('#toText').attr('value', $(this).attr('value'));
  });

  $('#translationMenu li  a').on('click', function(){
    $('#translationModel').text($(this).text());
    $('#translationModel').attr('value', $(this).attr('value'));
  });
  $("#translationMenu li a")[0].click();

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

  createLanguages = function() {
    var sourceLanguageMenu = document.getElementById("sourceLanguageMenu");
    var targetLanguageMenu = document.getElementById("targetLanguageMenu");
    $('#sourceLanguageMenu ul').empty();
    for (var code in languages) {
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
  }

});
