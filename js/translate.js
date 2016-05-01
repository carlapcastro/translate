$(document).ready(function(){

  $(window).onload = function() {
    console.log("Translation extension loaded.");
  }

  $('#inputText#submitBtn').click = function() {
    // var sourceText = $('');
    var sourceLanguage = $('#fromDropdown').children("option").filter(":selected").val();
    var targetLanguage = $('#targetLanguageMenu').children("option").filter(":selected").val();
    console.log('Source Language Selected:', sourceLanguage);
    console.log('Target Language Selected:', targetLanguage);
    // translateWrapper(window, sourceLanguage, )
  }

});
