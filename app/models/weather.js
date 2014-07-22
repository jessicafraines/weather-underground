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

function stdDev(mean, vals, temp){
  var newMean = 0;
  for(var i = 0; i < vals.length; i++){
   newMean =  vals[i][temp].fahrenheit + mean;
  }
  newMean = newMean / vals.length;

  return Math.sqrt(newMean);

}













module.exports = Weather;
