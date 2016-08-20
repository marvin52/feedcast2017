var helpers = require('./components/helpers.js');
var $ = require('jquery');

window.bg = chrome.extension.getBackgroundPage();

var content_container = $('.content_container');
var categories = bg.api._api_data.categories;

for(var i in categories){
	console.log(categories[i], content_container)
	content_container.append('<p>' + categories[i].name + '</p>')
}