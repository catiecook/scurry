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

  //need to access the data in this similarly to knex
  //if using superagent will have to promisify the return

  //axios
  //return axios.get(URL) and mod export it just like knex queries and then in my index call it with weather.queryName().then(function(stuff))



module.exports = request;
