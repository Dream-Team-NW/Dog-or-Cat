var inputEl = document.querySelector('#get-info')
inputEl.addEventListener('click', apiGet)

var opentripKey = "5ae2e3f221c38a28845f05b665a04027d1a5333435e976ca3f86c960";

function apiGet(query) {
 var locationUrl = "https://api.opentripmap.com/0.1/en/places/geoname?apikey=" + opentripKey+"&name="+query;
    fetch(locationUrl)
      .then(response => response.json())
      .then(function(data){
        console.log(data)
        getAttraction(data.lon, data.lat)
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
};

function getAttraction(long, lat) {
  var attractionUrl = "https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=" + long + "&lat=" + lat + "&kinds=amusement_parks,sport,water_parks,miniature_parks&format=json&limit=50&apikey=" + opentripKey;
    fetch(attractionUrl)
      .then(response => response.json())
      .then(function(data){
        console.log(data)
      })
};

function bingSearch(long, lat){
  var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 18,
        center: new Microsoft.Maps.Location(lat, long)
    });
    map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.streetside 
    });
}

document.getElementById("get-info").addEventListener("click", function (event) {
  event.preventDefault();
  console.log('click')
    let name = document.getElementById("text").value;
    console.log(name)
    apiGet(name)
});
