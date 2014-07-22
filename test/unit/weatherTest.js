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
  
  
  
  
});

