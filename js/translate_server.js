var translate = {
  search_url:"http://127.0.0.1:8081/translate?",
  yandex_search_url:"https://translate.yandex.net/api/v1.5/tr.json/translate?",
  detect_url:"https://translate.yandex.net/api/v1.5/tr.json/detect?",

  // params: {
  //   'q': 'der Obama kommt nach Oslo.',
  //   'target_lang': 'en',
  //   'source_lang': 'de',
  //   'key': 'x',
  //   'yandex_key':'trnsl.1.1.20160502T220832Z.0698c1fc39ddc419.c583acaca7d253004aa08b2a30d750c3b1aa74ae'
  // }

  // Yandex API params
  params: {
    'key':'trnsl.1.1.20160502T220832Z.0698c1fc39ddc419.c583acaca7d253004aa08b2a30d750c3b1aa74ae',
    'text': 'der Obama kommt nach Oslo.',
    'lang': 'en-ru',
  }
}

function detectLanguage(phrase) {
    var url = translate.detect_url + "key=" + translate.params["key"] + "&text=" + phrase
    $.post(url, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
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
function translateWrapper(window, source_text, source_lang, target_lang, callback){
  // MOSES
  // translate.params['q'] = source_text;
  // translate.params['source_lang'] = source_lang;
  // translate.params['target_lang'] = target_lang;

  // YANDEX
  translate.params['text'] = source_text;
  translate.params['lang'] = source_lang + '-' + target_lang;

  var url = appendQueryParameters(translate.yandex_search_url, translate.params);
  console.log(url);

  httpGetAsync(window, url, function(i) {
    // translateResponse(i, function(res) {
    //   console.log('GET request successful: Translated', res);
    //   callback(res);
    // })

    testTranslateResponse(i, function(res) {
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

// Callback method to handle GET response.
// Convert image link array -> array of images
function translateResponse(response, callback) {
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
      var results = json_response.data;
      var translations = results.translations;
      var translated_text = translations.translatedText;

      console.log('Retrieved translated text:', translated_text);
      callback(translated_text);
    }
  }
}

// Callback method to handle GET response.
// Convert image link array -> array of images
function testTranslateResponse(response, callback) {
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
      var translated_text = json_response.text[0];
      console.log('Retrieved translated text:', translated_text);
      callback(translated_text);
    }
  }
}
