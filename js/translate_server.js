var translate = {
  moses_search_url:"http://127.0.0.1:8081/translate?",
  yandex_search_url:"https://translate.yandex.net/api/v1.5/tr.json/translate?",
  detect_url:"https://translate.yandex.net/api/v1.5/tr.json/detect?",

  // Moses API params
  moses_params: {
    'q': 'der Obama kommt nach Oslo.',
    'target': 'en',
    'source': 'de',
    'key': 'x',
  },

  // Yandex API params
  yandex_params: {
    'key':'trnsl.1.1.20160502T220832Z.0698c1fc39ddc419.c583acaca7d253004aa08b2a30d750c3b1aa74ae',
    'text': 'der Obama kommt nach Oslo.',
    'lang': 'en-ru',
  }
}

var languages = {
    "en" : "English",
    "es" : "Spanish",
    "fr" : "French",
    "de" : "German",
    "ru" : "Russian",
    "pt" : "Portuguese",
    "cs" : "Czech",
    "da" : "Danish",
    "nl" : "Dutch"
}

function detectLanguage(phrase) {
  // Formatted for Yandex
    var url = translate.detect_url + "key=" + translate.yandex_params["key"] + "&text=" + phrase
    $.post(url, function(data, status) {
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        $('#fromText').text(languages[data.lang]);
        $('#fromText').attr('value', languages[data.lang]);
    });
}


/**
  Yandex API
  https://translate.yandex.net/api/v1.5/tr.json/translate ?
  key=<API key>
  & text=<text to translate>
  & lang=<translation direction>
  & [format=<text format>]
  & [options=<translation options>]
  & [callback=<name of the callback function>]
*/

/**
 * Sends GET request to API.
 * @param {object} window - browser's open window, used to check type of browser
 * @param {string} url - uri to send GET request to
 * @param {function} callback - callback method
 */
function translateWrapper(window, mt, source_text, source_lang, target_lang, callback){
  console.log('Source Language Selected:', source_lang);
  console.log('Target Language Selected:', target_lang);
  console.log('Text to translate:', source_text);
  console.log('Using API:', mt);
  var url = '';
  if (mt == 'yandex') {
    // YANDEX
    console.log('Using Yandex API...');
    translate.yandex_params['text'] = source_text;
    translate.yandex_params['lang'] = source_lang + '-' + target_lang;

    url = appendQueryParameters(translate.yandex_search_url, translate.yandex_params);
    console.log('Querying URL:', url);
  } else {
    // MOSES
    console.log('Using Moses API...');
    translate.moses_params['q'] = source_text;
    translate.moses_params['source'] = source_lang;
    translate.moses_params['target'] = target_lang;
    url = appendQueryParameters(translate.moses_search_url, translate.moses_params);
    console.log('Querying URL:', url);
  }

  httpGetAsync(window, url, function(i) {
    translateResponse(mt, i, function(res) {
      console.log('GET request successful: Translated', res);
      callback(res);
    })
  });
}

/**
 * Sends GET request to API.
 * @param {object} window - browser's open window, used to check type of browser
 * @param {string} url - uri to send GET request to
 * @param {function} callback - callback method
 */
function httpGetAsync(window, url, callback){

    var xmlHttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlHttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open("GET", url, true); // true for async
    xmlHttp.send(null);
}

/**
 * Appends search parameters to the url.
 * @param {object} parameters - search parameters to add, where key = parameter
 *                              name, and value = parameter value.
 * @param {string} url - API URI to append search parameters to
 */
function appendQueryParameters(url, parameters) {
  // converts an object into query parameters
  for (key in parameters) {
    p = key + '=' + parameters[key];
    url += p;
    url += '&';
  }

  url = url.slice(0, -1);
  return url;
}


// Callback method to handle GET response from MT API.
function translateResponse(mt, response, callback) {
  if (response == undefined) {
    // Handle response when nothing is returned.
    var err = new Error("Error retrieving response.");
    callback(err);
  } else {
    var json_response = JSON.parse(response);
    if (json_response.error) {
      var err = new Error('API error', json_response.error.errors[0].message);
      callback(err);
    } else {
      if (mt == 'yandex') {
        var translated_text = json_response.text[0];
        console.log('Retrieved translated text from Yandex:', translated_text);
        callback(translated_text);
      } else {
        var results = json_response.data;
        var translations = results.translations;
        var translated_text = translations[0].translatedText;

        console.log('Retrieved translated text from Moses:', translated_text);
        callback(translated_text);
      }
    }
  }
}
