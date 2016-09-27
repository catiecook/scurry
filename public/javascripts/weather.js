// var express = require('express')
// var request = require('request')
// var query = require('../database/query.js')
//
// let $query = query.getUsersLocationByID() /* pull in zipcode or city,state from user info with query */
//
//
//   var weatherIcon = []
//   var forecast = []
//   var date = []
//
//   request('http://api.wunderground.com/api/forecast/q/' + $query + '.json', function(err, res, data) {
//     if(!err && response.statusCode == 200) {
//       console.log(data.response.forecast)
//       var weatherData = data.response.forecast
//
//       for(var i=0; i<4; i++){
//         weatherIcon.push(weatherData.forecastday[i].icon_url)
//         forecast.push({weatherData.title: weatherData.fcttext_metric})
//         date.push(weatherData.date)
//       }
//
//       res.render('/dashboard') {
//
//       })
//
//     }
//   })
//
//
// module.exports = router;
