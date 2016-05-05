# MODEX Translator
--------
Chrome extension to translate input text and web pages, using the [Yandex API](https://tech.yandex.com/translate/)
and the [Moses API](http://www.statmt.org/moses/). Useful for those who
want to use different translation systems.

## Preview
### Translation Homepage
![MODEX Home preview](https://github.com/carlapcastro/translate/blob/master/img/preview_home.png?raw=true)
### Translation Language Selection
![MODEX Translation process preview](https://github.com/carlapcastro/translate/blob/master/img/preview_translation.png?raw=true)
![MODEX Translation results display](https://github.com/carlapcastro/translate/blob/master/img/preview_results.png?raw=true)
### Webpage Translation
![MODEX Translation webpage display](https://github.com/carlapcastro/translate/blob/master/img/preview_webpage.png?raw=true)

## Installation
* Open the [Chrome Extension Menu](chrome://extensions/).
* Click the **Load unpacked extension...**
* Navigate to and select the **translate** directory.
* Done!

## Usage
* Install and compile Moses according to the instructions provided [here](http://www.statmt.org/moses/?n=Development.GetStarted), making sure to include XML-RPC.
* Start the Moses Server according to the instructions
[here](https://github.com/casmacat/moses-mt-server/tree/master/python_server).
* Make sure you have a stable internet connection to send requests to the Yandex API.

## Features
* Choice between two leading translation systems.
* Translate input text!
* Translate full webpages!

## Future Work
* Add more languages for translation.
* Incorporate Google Translate API for more translation system options.
