
$('dashboard.hbs').ready(function(e) {
  event.preventDefault();

  let $urlBase = 'https://maps.googleapis.com/maps/api/js?key='
  let googleMapsAPI = googleMapsAPI;
  let $url = $urlBase + googleMapsAPI + '&format==json';

  $get($url).then(function(data){
    console.log(data);
    //set up results
    let $results = $('<p />', {
      "class": 'card-text'
    })
    //append the api call results into given div
    $('#map-results').append($results)

  })

})
