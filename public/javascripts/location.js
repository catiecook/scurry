var lat = document.getElementById("lat");
var lon = document.getElementById("lon");
var gps = []

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    lat.innerHTML="Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  lat.innerHTML= "Latitude: " + position.coords.latitude;
  lon.innerHTML= "<br>Longitude: " + position.coords.longitude;

  gps.push(latitude, longitude)
  // console.log(location);
  return (gps)
}

console.log(gps);

getLocation();

// function getWeather(lat, lon) {
//   var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ lon + '&appid=c7582a37f0743590af864b7cb0e955e4';
//   $.get(url).then(function(data){
//     console.log(data);
//
//    var $weatherIcon = data.weathericon *fix this route*
//    var weatherReport = data.forecast *fix this route*
//
//    var $icon = $('<div>') //create new div to place into page
//    var $report = $('<div>')
//     $('.weatherResults').append(
//        $icon.append($weather$icon)).append(
//        $report.append($weatherReport))
//   })
// }

getWeather(gps[0], gps[1])
