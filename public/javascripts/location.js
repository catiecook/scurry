function locationPromise() {
  return new Promise(function(resolve, reject) {
    console.log("retreiving position.....");
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

locationPromise()
  .then(function(data){
    var lat = data.coords.latitude
    var lon = data.coords.longitude
    return displayLocation(lat, lon)
  })
  .then(function(data){
    var city = data[0]
    var state = data[1]
    getWeather(city, state)
  })
//find city and state from gps coordinates
function displayLocation(lat,lon){
    let positions = [] //empty array to hold city, state
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=true';
    return $.get(url).then(function(data) {

      var addressComponents = data.results[0].address_components;
      for(i=0;i<addressComponents.length;i++){
        var types = addressComponents[i].types
        if(types=="locality,political"){
          positions.push(addressComponents[i].long_name)
        }
        if(types=="administrative_area_level_1,political"){
          positions.push(addressComponents[i].long_name)
        }
      }
      return(positions)
    })
}

function getWeather(city, state) {
  var url = 'http://api.wunderground.com/api/'+ api +'/forecast/q/' + state + '/' + city + '.json';

  $.get(url).then(function(data){
    for(var i=0; i<3; i++) {
      var $daySection = $('<div>', {'class': 'weatherTitle'})
      var $icon = $('<div>')
      var $forecast = $('<div>', {'class': 'report'})

      var $iconURL = data["forecast"]["txt_forecast"]["forecastday"][i]["icon_url"]
      var $day = data["forecast"]["txt_forecast"]["forecastday"][i]["title"]
      var $report = data["forecast"]["txt_forecast"]["forecastday"][i]["fcttext"]

      $('#weatherResults').append($daySection.append(
        $day).append($icon.append($('<img>', {'src': $iconURL})
      )).append($forecast.append(
        $report))
      )
    }
  })
}
