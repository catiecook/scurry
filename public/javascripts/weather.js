var express = require('express')
var request = require('request')
var query = require('../database/query.js')

let weatherAPI = weatherAPI;
let $query = query.getUsersLocationByID() /* pull in zipcode or city,state from user info with query */


request('http://api.wunderground.com/api/' + weatherAPI '/forecast/q/' + $query + '.json', function(err, res, body) {
  if(!err && response.statusCode == 200) {
    console.log(body)
    res.render
  }
})


module.exports = router;
