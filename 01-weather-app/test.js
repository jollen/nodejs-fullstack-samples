var app = app || {};

/**
* MODELS
**/
app.Message = Backbone.Model.extend({  
  url: function() {
  	return 'http://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&APPID=2ab10d1d7c261f5cb373916cc1cf107f';
  },
  city: '',
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
    	var city = this.$el.data('city');

        this.model = new app.Message();
        this.model.city = city;
        this.model.set('city', city);

        this.template = _.template($('#weather-tmpl').html());

        this.model.fetch({
			success: (model, resp, options) => {
				this.render();
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
	    this.$el.html(html);
	}   
});


$(document).ready(function(){
	app.messageView = new app.MessageView();
});







