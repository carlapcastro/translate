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

  $('#sourceLanguageMenu li  a').on('click', function(){
    $('#fromText').text($(this).text());
    $('#fromText').attr('value', $(this).attr('value'));
  });

  $('#targetLanguageMenu li  a').on('click', function(){
    $('#toText').text($(this).text());
    $('#toText').attr('value', $(this).attr('value'));
  });

});
