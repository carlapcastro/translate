$(document).ready(function(){

  $(window).onload = function() {
    console.log("Translation extension loaded.");
  }

  $('#submitBtn').on("click", function() {
    console.log('submit button pressed');
    // var sourceText = $('');
    var sourceLanguage = $('#fromText').attr('value');
    var targetLanguage = $('#toText').attr('value');
    var sourceText = $('#inputText').val();
    console.log('Source Language Selected:', sourceLanguage);
    console.log('Target Language Selected:', targetLanguage);
    console.log('Text to translate:', sourceText);
    if (sourceLanguage == 'Language' || targetLanguage == 'Language') {
      console.log('No languages selected');
      $('#translatedOutput').text('Please select a language!');
    } else {
      // TODO: Change this once the moses server works
      translateWrapper(window, sourceText, sourceLanguage, targetLanguage, function(i) {
        $('#translatedOutput').text(i);
      });
    }
  });

  $("#translatePageBtn").on("click", function() {
      console.log("translate page button clicked");
      var sourceLanguage = $('#fromText').attr('value');
      var targetLanguage = $('#toText').attr('value');

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            console.log(response.farewell);
        });
      });
  });

  $('#sourceLanguageMenu li  a').on('click', function(){
    $('#fromText').text($(this).text());
    $('#fromText').attr('value', $(this).attr('value'));
  });

  $('#targetLanguageMenu li  a').on('click', function(){
    $('#toText').text($(this).text());
    $('#toText').attr('value', $(this).attr('value'));
  });

});

// function translateWebPage(sourceLanguage, targetLanguage) {
//     var elements = document.getElementsByTagName('*');
//
//     for (var i = 0; i < elements.length; i++) {
//         (function(){
//             var element = elements[i];
//
//             for (var j = 0; j < element.childNodes.length; j++) {
//                 (function() {
//                     var node = element.childNodes[j];
//                     if(node.nodeType === 3){
//                         $.when(swapText(element,node, sourceLanguage, targetLanguage)).then(function () {
//                             //console.log("j= "+j);
//                         })
//                     }
//                 })(j);
//             }
//         })(i)
//
//     }
//
// }
//
// function swapText(element,node, sourceLanguage, targetLanguage){
//     var text = node.nodeValue;
//     translateWrapper(window, text, sourceLanguage, targetLanguage, function(i) {
//         console.log(text);
//         var re = new RegExp(text,"g");
//         var replacedText = text.replace(re, i);
//         if (replacedText !== text) {
//             element.replaceChild(document.createTextNode(replacedText), node);
//         }
//         return;
//     });
// }
