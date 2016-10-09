/*
Config file containing the various addresses
*/

module.exports.addresses = {

	//Google distance matrix API key
	'apiKey' : 'GOOGLE_API_KEY',

	//default transport mode
	'mode' : 'driving',

	//default departure time
	'departure_time': 'now',

	//default transport model
	'traffic_model': 'best_guess',

	//Alexa gets some names wrong :)
	'wrongNames' : {
		'artist' : 'aarthi',
		'aj'    : 'ajay',
		'ojay'  : 'ajay',
		'ojays' : 'ajay'
	},


	//list of pre-configured users and their addresses
	'ajay' : {

		'work' : 'LOCATION',
		'home' : 'LOCATION'
		
	},

	'aarthi' : {

		'work' : 'LOCATION',
		'home' : 'LOCATION'
	}
};