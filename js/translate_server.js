var translate = {
  search_url:"http://127.0.0.1:8081/translate?",

  params: {
    'q': 'der Obama kommt nach Oslo.',
    'target': 'en',
    'source': 'de', // keys.google_search.cx
    'key': 'x'
  },

  url:''
}

/**
 * Sends GET request to API.
 * @param {object} window - browser's open window, used to check type of browser
 * @param {string} url - uri to send GET request to
 * @param {function} callback - callback method
 */
function httpGetAsync(window, url, callback){

  // TODO: CHECK FOR WHEN I RUN OUT OF API CALLS, OR IF THE REQUEST IS NULL T-T
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
function translateReponse(response, callback) {
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
