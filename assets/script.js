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


// var inputField = document.querySelector('#zipCode')


// function fetchData(){
//     var zipCode = inputField.value
//     // var addressName = inputFieldAddress.value
//     var apiKey = 'X1-ZWz16g8ifrfvnv_4ye7m'
//     var requestUrl = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + apiKey + '&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA'
//     fetch(requestUrl)
//     .then(function(response) {
//         return response.json()
//     })  
// }

// fetchData()
// const pageLength = 5; // number of objects per page

// let lon; // place longitude
// let lat; // place latitude

// let offset = 0; // offset from first object in the list
// let count; // total objects count

// function createListItem(item) {
//     let a = document.createElement("a");
//     a.className = "list-group-item list-group-item-action";
//     a.setAttribute("data-id", item.xid);
//     a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
//               <p class="list-group-item-text">${getCategoryName(item.kinds)}</p>`;

//     a.addEventListener("click", function() {
//       document.querySelectorAll("#list a").forEach(function(item) {
//         item.classList.remove("active");
//       });
//       this.classList.add("active");
//       let xid = this.getAttribute("data-id");
//       apiGet("xid/" + xid).then(data => onShowPOI(data));
//     });
//     return a;
//   }

// function loadList() {
//     apiGet(
//       "radius",
//       `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
//     ).then(function(data) {
//       let list = document.getElementById("list");
//       list.innerHTML = "";
//       data.forEach(item => list.appendChild(createListItem(item)));
//       let nextBtn = document.getElementById("next_button");
//       if (count < offset + pageLength) {
//         nextBtn.style.visibility = "hidden";
//       } else {
//         nextBtn.style.visibility = "visible";
//         nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
//       }
//     });
//   }

// function firstLoad() {
//     apiGet(
//       "radius",
//       `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
//     ).then(function(data) {
//       count = data.count;
//       offset = 0;
//       document.getElementById(
//         "info"
//       ).innerHTML += `<p>${count} objects with description in a 1km radius</p>`;
//       loadList();
//     });
//   }



// document.getElementById("search_form")
// document.addEventListener("click", function(event) {
//     let name = document.getElementById("text").value;
//     apiGet("geoname", "name=" + name).then(function(data) {
//       let message = "Name not found";
//       if (data.status == "OK") {
//         message = data.name + ", " + getCountryName(data.country);
//         lon = data.lon;
//         lat = data.lat;
//         firstLoad();
//       }
//       document.getElementById("info").innerHTML = `${message}`;
//     });
//     event.preventDefault();
//   });

var inputEl = document.querySelector('#get-info')
inputEl.addEventListener('click', apiGet)

var opentripKey = "5ae2e3f221c38a28845f05b665a04027d1a5333435e976ca3f86c960";
//You should get your API key at https://opentripmap.io

function apiGet(query) {
 var locationUrl = "https://api.opentripmap.com/0.1/en/places/geoname?apikey=" + opentripKey+"&name="+query;
    fetch(locationUrl)
      .then(response => response.json())
      .then(function(data){
        console.log(data)
        bingSearch(data.lon, data.lat)
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  };
function bingSearch(long, lat){
  var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 18,
        center: new Microsoft.Maps.Location(lat, long)
    });
    map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.streetside });
}

document.getElementById("get-info").addEventListener("click", function (event) {
  event.preventDefault();
  console.log('click')
    let name = document.getElementById("text").value;
    console.log(name)
    apiGet(name)
    // .then(function (data) {
    //   let message = "Name not found";
    //   if (data.status == "OK") {
    //     message = data.name + ", " + getCountryName(data.country);
    //     lon = data.lon;
    //     lat = data.lat;
    //     firstLoad();
    //   }
    //   document.getElementById("info").innerHTML = `${message}`;
    // });
  });
