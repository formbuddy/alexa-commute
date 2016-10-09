/**
 * CommuteController
 *
 * @description :: Server-side logic for managing commutes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var googleMaps = require('@google/maps');
var alexa = require('alexa-app');

module.exports = {

	ask: function(req, res) {

		var gMapsClient = googleMaps.createClient({
  			key: sails.config.addresses.apiKey
		});

		var app = new alexa.app('commute');

		app.intent('GetCommuteDuration', function(request, response) {
			console.log(JSON.stringify(request, null, 2));
			var reqUser = request.slot('user');
			reqUser = reqUser.replace(/'s$/, "");
			reqUser = reqUser.toLowerCase();
			var reqTo = request.slot('to');
			var reqFrom;

			if(!sails.config.addresses[reqUser]) {
				if(sails.config.addresses.wrongNames[reqUser]){
					reqUser = sails.config.addresses.wrongNames[reqUser];
				} else {
					response.say("Uh oh! I did not recognize that user");
					return response.send();
				}
			}

			if(reqTo == "home" ) {
				reqFrom = "work";
			}
			else {
				reqFrom = "home";
			}

			if(!sails.config.addresses[reqUser][reqFrom] || !sails.config.addresses[reqUser][reqTo]) {
				response.say("Uh oh! I did not recognize that destination");
				return response.send();
			}

			var gMapsObj = {};

			gMapsObj.origins = [ sails.config.addresses[reqUser][reqFrom] ];
			gMapsObj.destinations = [ sails.config.addresses[reqUser][reqTo] ];
			gMapsObj.mode = sails.config.addresses.mode;
			gMapsObj.traffic_model = sails.config.addresses.traffic_model;
			gMapsObj.departure_time = sails.config.addresses.departure_time;

			gMapsClient.distanceMatrix(gMapsObj, function(err, mapResponse){

				if (err) {
	    			response.say("Something bad happened");
	  			} else {
	  				console.log(JSON.stringify(mapResponse, null, 2));
	  				var speakOut = "If you leave now, it will take "
	  				             + mapResponse.json.rows[0].elements[0].duration_in_traffic.text
	  				             + " to drive the "
	  				             + mapResponse.json.rows[0].elements[0].distance.text
	  				             + " it takes to reach "
	  				             + reqTo;
	  				console.log(speakOut);
  					response.say(speakOut);
  				}
  				response.send();

			});

			return false;

		});

		app.request(req.body)
   		   .then(function(appResponse) { 
      			res.json(appResponse);
    	});
	}
};

