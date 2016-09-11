window.log = function(){
	
	console.log('<-- BG LOG INIT -->')
	
	for(var i in arguments)
		if( i <= ( arguments.length - 1 ) )
			console.log(arguments[i]);
	
	return '<-- BG LOG END -->'
}


window.api = require('./components/api.js')
window.Audio = require('./components/audio.js')



window.api.init();
window.Audio.init();