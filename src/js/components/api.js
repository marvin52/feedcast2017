'use strict'

var $ = require('jquery');

var Api = {
	_api : 'http://feedcast.herokuapp.com/api',
	_api_data : {},
	_urls : {
		yesterdayList 	: '/getPodcasts/yesterday',
		todayList 		: '/getPodcasts',
		byCategory 		: '/podcastsByCategoria/',
		categories 		: '/categorias',
		listened 		: '/week_top_list',
		downloaded 		: '/week_top_list/downloaded'
	},
	init : function(){
		this._populateCategories();
	},
	apiGet : function(url, callback){
		$.get(this._api + url, function(data){
			if(callback) callback(data);
		}, 'json');
	},
	_populateCategories : function(){
		this.apiGet(this._urls.categories, function(data){
			this._api_data.categories = data
		}.bind(this))
	},
}

module.exports = Api;