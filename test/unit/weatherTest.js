/*global describe,it*/
'use strict';

var expect = require('chai').expect;
var Weather = require('../../app/models/weather');

describe('Weather', function(){
  describe('constructor', function(){
    it('should be an instance of Weather', function(){
    var w = new Weather(37206);

    expect(w).to.be.instanceof(Weather);
    expect(w.zip).to.equal(37206);
    });
  });
  describe('.high', function(){
    it('should return the high temperature', function(done){
     Weather.high(37206, function(high){
       console.log(high);
    
       expect(high.length).to.be.at.least(2);

       done();
      });
    });
  }); 
  describe('.low', function(){
    it('should return the low  temperature', function(done){
      Weather.low(37206, function(low){
       console.log(low);
    
       //expect(low).to.be.ok;
       expect(low.length).to.be.at.least(2);

       done();
      });
    });
  }); 
  describe('.avgHigh', function(){
    it('should return the average high temperature', function(done){
      Weather.avgHigh(37206, function(avg, length){
       console.log(avg);
    
       expect(avg).to.be.at.least('80F');
       expect(length).to.equal(10);

       done();
      });
    });
  }); 
  describe('.avgLow', function(){
    it('should return the average low temperature', function(done){
      Weather.avgLow(37206, function(avg, length, dev){
       console.log(avg);
       console.log(dev);
    
       expect(avg).to.be.at.least('60F');
       expect(length).to.equal(10);

       done();
      });
    });
  }); 
  describe('.highs', function(){
    it('should return 10 day high temperatures', function(done){
      Weather.highs(37206, function(highs){
       console.log(highs);
       expect(highs.length).to.equal(10);
       done();
      });
    });
  }); 
  describe('.lows', function(){
    it('should return 10 day low temperatures', function(done){
      Weather.lows(37206, function(lows){
       console.log(lows);
       expect(lows.length).to.equal(10);
       done();
      });
    });
  }); 
  describe('.deltas', function(){
    it('should return the difference in highs and lows', function(done){
      Weather.deltas(37206, function(deltas){
       console.log(deltas);
       expect(deltas.length).to.equal(10);
         for(var i = 0; i < deltas.length; i++){
           expect(deltas[i]).to.be.at.least(10);
          }
       done();
      });
    });
  }); 
  describe('.moon', function(){
    it('should return the current phase of the moon', function(done){
      Weather.moon(37206, function(moon, perc){
       console.log(moon);
       expect(perc).to.be.within(0,100);
       expect(moon).to.be.a('string');
       done();
      });
    });
  }); 
});

