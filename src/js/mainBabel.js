'use strict';

var helpers = require('./components/helpers.js');
var $ = require('jquery');

window.bg = chrome.extension.getBackgroundPage();

window.feedcastClient = {
	contentContainer: null,
	init: function init() {
		this._setBinds();
		this._setElements();
	},

	_setBinds: function _setBinds() {
		var $dom = $(document);
		$dom.on('click', '.category-list-js a', this._clickCategory.bind(this));
		$dom.on('click', '.btn-podcast-load', this._clickPodcast.bind(this));
		$dom.on('click', '.play-podcast', this._playPodcast.bind(this));
	},

	_setElements: function _setElements() {
		this.contentContainer = document.querySelector('.mdl-layout__content');
		this._handlebarsRegisterHelpers();
		this._setCategories();
		this._setContentContainer();
	},

	_setCategories: function _setCategories() {
		this.categoryList = document.querySelector('.category-list-js');
		var source = document.getElementById('category-link').innerHTML;
		var template = Handlebars.compile(source);
		this.categoryList.innerHTML = template(bg.api._api_data.categories);
	},

	_handlebarsRegisterHelpers: function _handlebarsRegisterHelpers() {

		Handlebars.registerHelper('json', function (context) {
			return JSON.stringify(context);
		});

		Handlebars.registerHelper('truncate', function (str, len) {
			if (str.length > len && str.length > 0) {
				var new_str = str + " ";
				new_str = str.substr(0, len);
				new_str = str.substr(0, new_str.lastIndexOf(" "));
				new_str = new_str.length > 0 ? new_str : str.substr(0, len);

				return new Handlebars.SafeString(new_str + '...');
			}
			return str;
		});
	},

	_clickCategory: function _clickCategory(evt) {
		var _this = this;

		var id = evt.target.attributes['data-category-id'].value;
		$('.mdl-layout__drawer, .mdl-layout__obfuscator').removeClass('is-visible');
		helpers.toggleLoader(true);
		bg.api._populatePodcastByCategory(id, function (data) {
			helpers.toggleLoader(false);
			var source = document.getElementById('podcasts-by-category').innerHTML;
			var template = Handlebars.compile(source);
			localStorage['contentContainer'] = _this.contentContainer.innerHTML = template(data.data);
		});
	},

	_clickPodcast: function _clickPodcast(evt) {
		var _this2 = this;

		var id = evt.target.attributes['podcast-id'].value;
		helpers.toggleLoader(true);
		bg.api._loadPodcasts(id, function (data) {
			helpers.toggleLoader(false);
			var source = document.getElementById('podcast-list').innerHTML;
			var template = Handlebars.compile(source);
			localStorage['contentContainer'] = _this2.contentContainer.innerHTML = template(data);
		});
	},

	_setContentContainer: function _setContentContainer() {
		if (typeof localStorage['contentContainer'] !== 'undefined') {
			console.log(this.contentContainer);
			this.contentContainer.innerHTML = localStorage['contentContainer'];
		}
	},

	/**
  * Play podcast when click at the play icon
  * @param  {Object} evt - Event from click
  */
	_playPodcast: function _playPodcast(evt) {
		var node, objPodcast;

		switch (true) {
			case evt.target.nodeName == "A":
				node = evt.target;
				break;
			case evt.target.parentNode.nodeName == "A":
				node = evt.target.parentNode;
				break;
		}

		objPodcast = JSON.parse(node.attributes['json-obj'].nodeValue);

		window.bg.Audio.playPodcast(objPodcast);
	}
};

/* Check if the material design has finished the rendering */

window.onload = function () {
	setTimeout(function () {
		window.feedcastClient.init();
	}, 50);
};
//# sourceMappingURL=mainBabel.js.map
