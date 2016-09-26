$('dashboard.hbs').ready(function(e) {
  event.preventDefault();

  let $urlBase = 'http://api.wunderground.com/api/';
  let weatherAPI = weatherAPI;
  let $zip /*pull in zipcode from user info with query */

  let $url = $urlBase + weatherAPI + '/q/' + $zip + '&format==json';

  $get($url).then(function(data){
    console.log(data);
    //set up results
    let $results = $('<p />', {
      "class": 'card-text'
    })
    //append the api call results into given div
    $('#weather-results').append($results)

  })
})
