// function loadMapScenario() {
// var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
//     /* No need to set credentials if already passed in URL */
//     mapTypeId: Microsoft.Maps.MapTypeId.road,
//     zoom: 18,
//     center: new Microsoft.Maps.Location(28.332823, -81.492279)
// });
// map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.streetside });
// }

// loadMapScenario();

// function fetchData(){
//     var cityName = inputField.value
//     var apiKey = 'X1-ZWz16g8ifrfvnv_4ye7m'
//     var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
//     fetch(requestUrl)
//     .then(function(response) {
//         return response.json()
//     })
    
function fetchData(){
    var cityState = inputField.value
    var addressName = inputField.value
    var apiKey = 'X1-ZWz16g8ifrfvnv_4ye7m'
    var requestUrl = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + apiKey + '&address=' + addressName + '&' + cityState
    fetch(requestUrl)
    .then(function(response) {
        return response.json()
    })
    
    fetchData()
}