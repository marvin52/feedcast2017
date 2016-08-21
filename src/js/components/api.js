'use strict'

var helpers = require('./helpers');
var $ = require('jquery');

var Api = {
	_api : 'http://feedcast.herokuapp.com/api',
	_api_data : {
		categories : {},
		podcastsByCategory : []
	},
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
		this._populatePodcastByCategory(0); //populate all podcasts list
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
	_populatePodcastByCategory: function(id, callback){
		var id = parseInt(id) || 0;
		for(var i in this._api_data.podcastsByCategory){
			if(this._api_data.podcastsByCategory[i].categoryId === id){
				if(callback) callback(this._api_data.podcastsByCategory[i]);
				return this._api_data.podcastsByCategory[i];
			}
		}
		this.apiGet((id !== 0) ? this._urls.byCategory + id : '' , function(data){
			var _data = {
				categoryId: id,
				data :  data,
				time : Date.now()
			}

			this._api_data.podcastsByCategory.push(_data);

			if(callback) callback(_data);

		}.bind(this))
	},
	_loadPodcasts : function(id_channel, callback){
		var self = {};

		self.populated 	= false;
		self.podcasts 	= [];
		self.channel_id = id_channel;
		self.channel 	= this._getPodcastById(id_channel);

		var _self 			= {};
		_self.count_id 		= 1;
		_self.channel_img 	= self.channel.image;
		_self.id_channel 	= (id_channel)? parseInt(id_channel) : false;


		self.pushToPodcasts = function(_item, dataObj){
			//try {
				//debugger
				var item 			= {};
				item.name_channel 	= dataObj.rss.channel.title['#text'];
				item.channel_id 	= _self.id_channel;
				item.name 			= _item.title['#text'];
				item.channel_img 	= _self.channel_img;
				item.id 			= _self.count_id++;
				item.pubDate 		= (helpers._isset([_item.pubDate['#text']]))? _item.pubDate['#text']: false;
				item.link 			= (helpers._isset([_item.link]))? _item.link['#text']: false;
				item.desc 			= (helpers._isset([_item.description]))? _item.description.valueOf(): '';
				item.url 			= (helpers._isset([_item['enclosure'], _item['enclosure']['@attributes']]))? _item['enclosure']['@attributes']['url'] : false;
				item.categories 	= (helpers._isset([_item.category]))? _item.category : {};
				item._length 		= (helpers._isset([_item['itunes:duration']]))? helpers._durationToSeconds(_item['itunes:duration']['#text']) : false;

				(item.url)? self.podcasts.push(item) : false;
			//}
			//catch(err) {
			//    console.log(err.message);
			//}
		}.bind(this)

		$.get(self.channel.feed, function(data){
			var dataObj = helpers.xmlToJson(data);

			if(dataObj.rss.channel && helpers._isset([dataObj.rss.channel.item[0], dataObj.rss.channel.item.title]))
					self.pushToPodcasts(dataObj.rss.channel.item, dataObj);
			else
				for(var i in dataObj.rss.channel.item)
					self.pushToPodcasts(dataObj.rss.channel.item[i], dataObj);

			self.populated = true;

		}.bind(this), 'xml').done(function(){
			if(callback) callback(self)
		}.bind(this))
	},
	_getPodcastById : function(id){

		for(var i in this._api_data.podcastsByCategory)
			if(this._api_data.podcastsByCategory[i].categoryId == 0)
				for(var a in this._api_data.podcastsByCategory[i].data)
					if(this._api_data.podcastsByCategory[i].data[a].id ==  id)
						return this._api_data.podcastsByCategory[i].data[a];

		return false;

	}
}

module.exports = Api;