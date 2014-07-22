/*jshint camelcase: false*/
'use strict';
var request = require('request');

function Weather(zip){
  this.zip = zip;
}

Weather.high = function(zip, cb){
  var url = 'http://api.wunderground.com/api/067e021a41cde59a/forecast/q/' + zip + '.json';
  request(url, function(error, response, body){
    body = JSON.parse(body);
    cb(body.forecast.simpleforecast.forecastday[0].high.fahrenheit + 'F');
  });
};

Weather.low = function(zip, cb){
  var url = 'http://api.wunderground.com/api/067e021a41cde59a/forecast/q/' + zip + '.json';
  request(url, function(error, response, body){
    body = JSON.parse(body);
    cb(body.forecast.simpleforecast.forecastday[0].low.fahrenheit + 'F');
  });

};

Weather.avgHigh = function(zip, cb){
  var url = 'http://api.wunderground.com/api/067e021a41cde59a/forecast10day/q/' + zip + '.json';
  request(url, function(error, response, body){
    body = JSON.parse(body);
    var temps = body.forecast.simpleforecast.forecastday;
    var sum = 0;
    for(var i = 0; i < temps.length; i++){
     sum += parseInt(temps[i].high.fahrenheit);
    }
    cb((sum / temps.length) + 'F', temps.length);
  });

};

Weather.avgLow = function(zip, cb){
  var url = 'http://api.wunderground.com/api/067e021a41cde59a/forecast10day/q/' + zip + '.json';
  request(url, function(error, response, body){
    body = JSON.parse(body);
    var temps = body.forecast.simpleforecast.forecastday;
    var sum = 0;
    for(var i = 0; i < temps.length; i++){
     sum += parseInt(temps[i].low.fahrenheit);
    }
    var dev = stdDev(sum / temps.length, temps, 'low');
    cb((sum / temps.length) + 'F', temps.length, dev);
  });
};

Weather.highs = function(zip, cb){
  var url = 'http://api.wunderground.com/api/067e021a41cde59a/forecast10day/q/' + zip + '.json';
  request(url, function(error, response, body){
    body = JSON.parse(body);
    var temps = body.forecast.simpleforecast.forecastday;
    var f = [];
    for(var i = 0; i < temps.length; i++){
     f.push(parseInt(temps[i].high.fahrenheit));
    }
    cb(f);
  });

};

Weather.lows = function(zip, cb){
  var url = 'http://api.wunderground.com/api/067e021a41cde59a/forecast10day/q/' + zip + '.json';
  request(url, function(error, response, body){
    body = JSON.parse(body);
    var temps = body.forecast.simpleforecast.forecastday;
    var f = [];
    for(var i = 0; i < temps.length; i++){
     f.push(parseInt(temps[i].low.fahrenheit));
    }
    cb(f);
  });
};

Weather.deltas = function(zip, cb){
  var url = 'http://api.wunderground.com/api/067e021a41cde59a/forecast10day/q/' + zip + '.json';
  request(url, function(error, response, body){
    body = JSON.parse(body);
    var temps = body.forecast.simpleforecast.forecastday;
    var f = [];
    for(var i = 0; i < temps.length; i++){
     f.push(parseInt(temps[i].high.fahrenheit - temps[i].low.fahrenheit));
    }
    cb(f);
  });

};

Weather.moon = function(zip, cb){
  var url = 'http://api.wunderground.com/api/9b9842efc9926224/astronomy/q/' + zip + '.json';
  request(url, function(error, response, body){
    body = JSON.parse(body);
    console.log(body.moon_phase.percentIlluminated);

    var percent = body.moon_phase.percentIlluminated;
    var phase = '';
    if(percent <= 5) {
      phase = 'New';

    }
    else if(percent <= 44 && percent >= 6) {
      phase = 'Crescent';

    }
    else if(percent <= 55 && percent >= 45) {
      phase = 'Quarter';

    }
    else if(percent <= 94 && percent >= 56) {
      phase = 'Gibbous';

    }
    else if(percent >= 95) {
      phase = 'Full';

    }
    cb(phase, percent);
  });

};

function stdDev(mean, vals, temp){
  var newMean = 0;
  for(var i = 0; i < vals.length; i++){
   newMean =  vals[i][temp].fahrenheit + mean;
  }
  newMean = newMean / vals.length;

  return Math.sqrt(newMean);

}













module.exports = Weather;
