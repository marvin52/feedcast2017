'use strict'

var Audio = {
	
	audioEl : document.createElement("AUDIO"),
	playlist : [],

	init : function (){
		this._setBinds();
	},

	_setBinds: function(e){
		this.audioEl.onabort = function(e){
			console.log('onabort')
		}
		this.audioEl.oncancel = function(e){
			console.log('oncancel')
		}
		this.audioEl.oncanplay = function(e){
			console.log('oncanplay')
		}
		this.audioEl.oncanplaythrough = function(e){
			console.log('oncanplaythrough')
		}
		this.audioEl.onchange = function(e){
			console.log('onchange')
		}
		this.audioEl.ondurationchange = function(e){
			console.log('ondurationchange')
		}
		this.audioEl.onended = function(e){
			console.log('onended')
		}
		this.audioEl.onerror = function(e){
			console.log('onerror')
		}
		this.audioEl.onloadeddata = function(e){
			console.log('onloadeddata')
		}
		this.audioEl.onloadedmetadata = function(e){
			console.log('onloadedmetadata')
		}
		this.audioEl.onloadstart = function(e){
			console.log('onloadstart')
		}
		this.audioEl.onpause = function(e){
			console.log('onpause')
		}
		this.audioEl.onplay = function(e){
			console.log('onplay')
		}
		this.audioEl.onplaying = function(e){
			console.log('onplaying')
		}
		this.audioEl.onprogress = function(e){
			console.log('onprogress', e)
		}
		this.audioEl.onratechange = function(e){
			console.log('onratechange')
		}
		this.audioEl.ontimeupdate = function(e){
			console.log('ontimeupdate')
		}
		this.audioEl.onvolumechange = function(e){
			console.log('onvolumechange')
		}
		this.audioEl.onwaiting = function(e){
			console.log('onwaiting')
		}
	},

	playPodcast : function(obj){
		this.addToPlaylist('default', obj);
		this.isInPlaylist('default', obj, function(podcast){
			window.log(podcast)
		});
	},


	/**
	 * Add podcast object to the playlist
	 * @param {String} name - Name of the playlist
	 * @param {Object} obj  - Podcast object
	 * @return {Bolean} Success push state
	 */
	addToPlaylist : function(name, obj){
		//Check if the playlist exists 
		if(this.isPlaylist(name)){
			//and if the obj is not added already			
			if(!this.isInPlaylist(name, obj)){
				var playlistObj = this.getPlaylist(name);
				console.count("push to playlist")
			 	return playlistObj.podcasts.push(obj);
			}
			
			return false

		} else {
			//Create the playlist and add the object to it
			this.createPlaylist(name);
			this.addToPlaylist(name, obj);	
		}
	},



	/**
	 * Verify if exists playlist with such name
	 * @param  {String} name - Playlist name
	 * @return {Boolean}
	 */
	isPlaylist: function(name){
		for(var i in this.playlist)
			if( this.playlist[i].name == name)
				return true
		return false
	},

	/**
	 * Returns the playlist selected
	 * @param  {String} name  - Playlist name
	 * @return {Object} Playlist object
	 */
	getPlaylist: function(name){
		for(var i in this.playlist)
			if( this.playlist[i].name == name)
				return this.playlist[i]
		return false	
	},


	/**
	 * Create a playlist from an especified name
	 * @param  {String} name - Name of playlist
	 * @return {Booleann} Push state
	 */
	createPlaylist: function(name){
		if(!this.isPlaylist(name)){
			return this.playlist.push({
				name : name,
				podcasts: []
			});
		} else {
			throw "The playlist already exists"
			return false
		}
	},



	/**
	 * Check if the podcast already has been added to the playlist.
	 * @param  {String}  playlistName - name of the playlist
	 * @param  {Object}  podcastObj   - object of the podcast
	 * @return {Boolean}
	 */
	isInPlaylist: function(playlistName, podcastObj, callback){
		//Check if exists playlist with this name
		if(this.isPlaylist(playlistName)){
			var tempPlaylist = this.getPlaylist(playlistName).podcasts
			//Check if the object exists in this playlist
			for(var i in tempPlaylist)
				if( JSON.stringify(tempPlaylist[i]) 
					=== JSON.stringify(podcastObj)){
					if(callback) callback(tempPlaylist[i]);
					//Return true if yes
					return true
				}
			//otherwise return false
			return false
		} else {
			throw "There is no such playlist"
			return false
		}

	}
}

module.exports = Audio;