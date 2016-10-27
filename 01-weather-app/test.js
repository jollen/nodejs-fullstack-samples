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
message.fetch({
	success: function(model, resp, options) {
		console.log(resp);
	}
});









