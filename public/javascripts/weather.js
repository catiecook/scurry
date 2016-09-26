$('dashboard.hbs').ready(function(e) {
  event.preventDefault();

  let $urlBase = 'http://api.wunderground.com/api/';
  let weatherAPI = weatherAPI;
  let $query /* pull in zipcode or city,state from user info with query */

  let $url = $urlBase + weatherAPI + '/adfd7dc0d7a5f2f7/forecast/q/80211.json';

  $get($url).then(function(data){
    console.log(data);
    //set up results
    let $results = $('<div />', {
      "class": 'card-text'
    })
    //append the api call results into given div
    $('#weather-results').append($results)

  })
})
