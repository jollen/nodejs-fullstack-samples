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
* VIEWS
**/
app.MessageView = Backbone.View.extend({
	el: '#app',
    // constructor
    initialize: function() {
    	var self = this;

        this.model = new app.Message();
        this.template = _.template($('#weather-tmpl').html());

        this.model.fetch({
			success: function(model, resp, options) {
				self.render();
			}
    	});
    },	
	render: function() {
	    // Celsius
	    var temp = this.model.get('main').temp;
	    var celsius = parseInt(temp - 273.15);
	    this.model.set('celsius', celsius);

	    // Date
	    var date = moment().format('LL');
	    this.model.set('date', date);
	    
	    var html = this.template(this.model.attributes);
	    $('#app').html(html);
	};    
});


$(document).ready(function(){

});







