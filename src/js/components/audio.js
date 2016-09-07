'use strict'

var Audio = {
	
	audioEl : document.createElement("AUDIO"),

	init : function (){
		this.setBinds();
	},

	setBinds: function(e){
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

	}
}

module.exports = Audio;