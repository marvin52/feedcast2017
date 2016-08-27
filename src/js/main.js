var helpers = require('./components/helpers.js');
var $ = require('jquery')

window.bg = chrome.extension.getBackgroundPage();

window.feedcastClient = {
	contentContainer : null,
	init :  function() {
		this._setBinds();
		this._setElements();
	},



	
	_setBinds : function() {
		var $dom = $(document);
		$dom.on('click',  '.category-list-js a', this._clickCategory.bind(this))
		$dom.on('click',  '.btn-podcast-load', this._clickPodcast.bind(this))
	},



	
	_setElements : function() {
		this.contentContainer = document.querySelector('.mdl-layout__content')
		this._handlebarsRegisterHelpers();
		this._setCategories();
		this._setContentContainer();
	},



	
	_setCategories : function() {
		this.categoryList = document.querySelector('.category-list-js')
		var source = document.getElementById('category-link').innerHTML
		var template = Handlebars.compile(source);
		this.categoryList.innerHTML = template( bg.api._api_data.categories);
	},



	
	_handlebarsRegisterHelpers : function() {
		Handlebars.registerHelper ('truncate', function (str, len) {
		    if (str.length > len && str.length > 0) {
		        var new_str = str + " ";
		        new_str = str.substr (0, len);
		        new_str = str.substr (0, new_str.lastIndexOf(" "));
		        new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

		        return new Handlebars.SafeString ( new_str +'...' ); 
		    }
		    return str;
		});
	},



	
	_clickCategory : function(evt){
		var id = evt.target.attributes['data-category-id'].value
		$('.mdl-layout__drawer, .mdl-layout__obfuscator').removeClass('is-visible')
		helpers.toggleLoader(true);
		bg.api._populatePodcastByCategory(id, (data) => {
			helpers.toggleLoader(false);
			var source = document.getElementById('podcasts-by-category').innerHTML
			var template = Handlebars.compile(source);
			localStorage['contentContainer'] = this.contentContainer.innerHTML = template( data.data );
		})
	},



	
	_clickPodcast : function(evt){
		var id = evt.target.attributes['podcast-id'].value
		helpers.toggleLoader(true);
		bg.api._loadPodcasts(id, (data) => {
			helpers.toggleLoader(false);
			var source = document.getElementById('podcast-list').innerHTML
			var template = Handlebars.compile(source);
			localStorage['contentContainer'] = this.contentContainer.innerHTML = template( data );
		})
	},



	
	_setContentContainer : function() {
		if(typeof localStorage['contentContainer'] !== 'undefined'){
			console.log(this.contentContainer)
			this.contentContainer.innerHTML = localStorage['contentContainer'];
		}
	}
}











/* Check if the material design has finished the rendering */

window.onload = function() {
	setTimeout(()=>{
		window.feedcastClient.init(); 
	}, 50)
}