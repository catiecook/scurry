var express = require('express')
var request = require('request')
var query = require('../../database/query.js')

let api = process.env.weatherAPI
let city
let state


  // var weatherIcon = []
  // var forecast = []
  // var date = []

  request('http://api.wunderground.com/'+api+'/geolocate/q/' + state + city + '.json', function(err, response, data) {

    if(!err && response.statusCode == 200) {
      console.log(data.response.forecast)

      var lat = data.response.location.lat
      var long = data.response.location.long

      res.redirect('/dashboard')
    }
  })



module.exports = request;
