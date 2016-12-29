var	module_name = 'boilerplate',
	initialized = true
;

function init() {

	console.log( module_name + ' module initialized: ' + initialized );

}

module.exports = {

	init: init

}