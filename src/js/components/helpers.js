'use strict'

var $ = require('jquery')

var Helpers = {
	xmlToJson : function(xml) {
		var obj = {};
		if (xml.nodeType == 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}

		// do children
		if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = this.xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(this.xmlToJson(item));
				}
			}
		}
		return obj;
	},
	toggleLoader : function(cond){
		var loader = $('.loader');
		if(cond && cond === true){
			loader.addClass('is-active')
		} else if(cond && cond === false) {
			loader.removeClass('is-active')
		} else {
			loader.toggleClass('is-active')
		}
	},
	_isset : function(ArrayObjects){

		for(var i in ArrayObjects)
			if(ArrayObjects[i] === undefined)
				return false;

		return true;
	},
	_durationToSeconds : function(duration){
		var a = duration.split(':'); // split it at the colons

		// minutes are worth 60 seconds. Hours are worth 60 minutes.
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

		return seconds;
	}
}



module.exports = Helpers;