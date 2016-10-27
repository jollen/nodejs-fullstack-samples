
$.ajax({
	url: 'http://api.openweathermap.org/data/2.5/weather?q=Taipei&APPID=2ab10d1d7c261f5cb373916cc1cf107f',
	type: 'GET',
	dataType: "json",
	complete: function (data, textStatus, jqXHR) {
		console.log(data);
	}	
});