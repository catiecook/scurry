// var lat = document.getElementById("lat");
// var lon = document.getElementById("lon");


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
    console.log(city, state)
    getWeather(city, state)
  })





//find city and state from gps coordinates
function displayLocation(lat,lon){

  return new Promise(function(resolve, reject) {
    let positions = [] //empty array to hold city, state
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=true';
    var async = true;

    request.open(method, url, async);

    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        // console.log(request.responseText); // check under which type your city is stored, later comment this line
        var addressComponents = data.results[0].address_components;
        for(i=0;i<addressComponents.length;i++){
          var types = addressComponents[i].types
              //alert(types);

          if(types=="locality,political"){
            positions.push(addressComponents[i].long_name)
          }

          if(types=="administrative_area_level_1,political"){
            positions.push(addressComponents[i].long_name)
          }
        }
        resolve(positions)
      }
    };
     request.send();
  })
 };


function getWeather(city, state) {
  var url = 'http://api.wunderground.com/api/adfd7dc0d7a5f2f7/forecast/q/' + state + '/' + city + '.json';

  $.get(url).then(function(data){
    console.log("date: ", data["forecast"]["txt_forecast"]["date"]);
    console.log("icon: ", data["forecast"]["txt_forecast"]["forecastday"][0]["icon_url"]);
    console.log("title: ", data["forecast"]["txt_forecast"]["forecastday"][0]["title"]);
    console.log("desc: ", data["forecast"]["txt_forecast"]["forecastday"][0]["fcttext"]);

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
