var app = app || {};

/**
* MODELS
**/
app.Message = Backbone.Model.extend({  
  url: 'http://api.openweathermap.org/data/2.5/weather?q=Taipei&APPID=2ab10d1d7c261f5cb373916cc1cf107f',
  defaults: {
    main: {
        temp: -1,
        humidity: -1
    },
    wind: {
        speed: -1
    }
  }
});

/**
* Control (Logic)
**/

var message = new app.Message();

$(document).ready(function(){
	var render = function() {
	    // Celsius
	    var temp = message.get('main').temp;
	    var celsius = parseInt(temp - 273.15);
	    message.set('celsius', celsius);

	    // Date
	    var date = moment().format('LL');
	    message.set('date', date);
	    
	    var html = template(message.attributes);
	    $('#app').html(html);
	};
	
	var template = _.template($('#weather-tmpl').html());

	message.fetch({
		success: function(model, resp, options) {
			render();
		}
	});
});







