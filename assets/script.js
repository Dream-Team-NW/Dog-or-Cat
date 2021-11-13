var inputEl = document.querySelector('#get-info')
var listEl = document.querySelector("#list");
var errorEl = document.getElementById('error')
var savedEl = document.querySelector("#saved");
inputEl.addEventListener('click', apiGet)
var savedAttractionsEl = document.querySelector("#savedAttractions");
var savedAttractionsXid = [];

if (JSON.parse(localStorage.getItem('savedXID')) !== null) {
  savedAttractionsXid = JSON.parse(localStorage.getItem("savedXID"));
};

var opentripKey = "5ae2e3f221c38a28845f05b665a04027d1a5333435e976ca3f86c960";

document.getElementById("start").addEventListener("click", function(event){
  event.preventDefault();
  document.querySelector(".search-content").style.display = "flex";
  document.querySelector(".search-content").classList.add("search-content-style");
  document.querySelector("#start").style.display = "none"
  document.querySelector(".main-header").style.display = "none"
  
})

showSavedAttraction();

function apiGet(query) {
 var locationUrl = "https://api.opentripmap.com/0.1/en/places/geoname?apikey=" + opentripKey+"&name="+query;
    fetch(locationUrl)
      .then(response => response.json())
      .then(function(data){
        console.log(data)
        if (data.status === "OK") {
        getAttraction(data.lon, data.lat);
        } else {
        errorEl.style.display = "block";
        }
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
};
    
    function getAttraction(long, lat) {
      var attractionUrl = "https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=" + long + "&lat=" + lat + "&kinds=amusement_parks,sport,water_parks,miniature_parks&format=json&limit=50&apikey=" + opentripKey;
      listEl.innerHTML = "";
      fetch(attractionUrl)
      .then(response => response.json())
      .then(function(data){
        console.log(data)
        errorEl.style.display = "none"
        bingSearch(data[1].point.lon, data[1].point.lat)
        for (i = 0; i < 5; i++) {
          var attractionXID = data[i].xid;
          var attractionDescriptionUrl = "https://api.opentripmap.com/0.1/en/places/xid/" + attractionXID + "?apikey=" + opentripKey;
          fetch(attractionDescriptionUrl)

          .then(response => response.json())
          .then(function(data){
            console.log(data);
            // append card
            var attractionCard = document.createElement("div");
            attractionCard.className += "card col darken-1";
            attractionCard.setAttribute("style", "border-radius: 20px;")
            listEl.appendChild(attractionCard);
            // append name
            var attractionCardName = document.createElement("span");
            attractionCardName.className += "card-title"
            attractionCardName.textContent = data.name;
            attractionCard.appendChild(attractionCardName);
            // append description
            var attractionCardDescription = document.createElement("div");
            attractionCardDescription.id = "description";
            attractionCardDescription.textContent = data.wikipedia_extracts.text;
            attractionCard.appendChild(attractionCardDescription);
            // append button div
            var attractionCardButtons = document.createElement("div");
            attractionCardButtons.className += "row"
            attractionCardButtons.id = "buttons"
            attractionCard.appendChild(attractionCardButtons)
            // append button to map attraction
            var attractionCardButtonMap = document.createElement("button");
            attractionCardButtonMap.className += "waves-effect waves-light btn";
            attractionCardButtonMap.innerHTML = "Map ";
            attractionCardButtons.appendChild(attractionCardButtonMap);
            // append button to add attraction to list
            var attractionCardButtonAdd = document.createElement("a");
            attractionCardButtonAdd.className += "btn-floating btn-large waves-effect waves-light red";
            attractionCardButtonAdd.innerHTML = "+";
            attractionCardButtons.appendChild(attractionCardButtonAdd);
            // append hidden div of xid
            var attractionWiki = document.createElement("div")
            attractionWiki.setAttribute("style", "display:none;");
            attractionWiki.id = "xid"
            attractionWiki.innerHTML = data.xid;
            attractionCard.appendChild(attractionWiki);
            console.log(attractionWiki);
            // addEventListener to append card to savedAttraction
            attractionCardButtonAdd.addEventListener("click", function(event) {
              event.preventDefault();
              pickAttraction(this);
            });
            function pickAttraction(target) {
              var xidButton = target;
              var xidCard = xidButton.closest(".card");
              var xid = xidCard.children[3].innerHTML;
              var xidCheck = savedAttractionsXid.includes(xid);
              if (xidCheck == true) {
                return;
              } else {
                savedAttractionsXid.push(xid);
                localStorage.setItem("savedXID", JSON.stringify(savedAttractionsXid));
                savedEl.innerHTML = "";
                showSavedAttraction();
              };
            }
 
            attractionCardButtonMap.addEventListener("click", function(event) {
              event.preventDefault();
              bingSearch(data.point.lon, data.point.lat)
            });
          })
        }
      })
};

function bingSearch(long, lat){
  var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {

        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 25,
        center: new Microsoft.Maps.Location(lat, long)
      });
      map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.birdseye 
      });
    };
    
function showSavedAttraction() {
  for (i = 0; i < savedAttractionsXid.length; i++) {
    var attractionXID = savedAttractionsXid[i];
    var attractionDescriptionUrl = "https://api.opentripmap.com/0.1/en/places/xid/" + attractionXID + "?apikey=" + opentripKey;
    fetch(attractionDescriptionUrl)
      .then(response => response.json())
      .then(function(data) {
        console.log(data);
        // append card
        var attractionCard = document.createElement("div");
        attractionCard.className += "card col darken-1";
        attractionCard.setAttribute("style", "border-radius: 20px;")
        savedEl.appendChild(attractionCard);
        // append name
        var attractionCardName = document.createElement("span");
        attractionCardName.className += "card-title"
        attractionCardName.textContent = data.name;
        attractionCard.appendChild(attractionCardName);
        // append description
        var attractionCardDescription = document.createElement("div");
        attractionCardDescription.textContent = data.wikipedia_extracts.text;
        attractionCard.appendChild(attractionCardDescription);
        // append button to map attraction
        var attractionCardButtonMap = document.createElement("button");
        attractionCardButtonMap.className += "waves-effect waves-light btn";
        attractionCardButtonMap.innerHTML = "Map " + data.name;
        attractionCard.appendChild(attractionCardButtonMap);

        attractionCardButtonMap.addEventListener("click", function(event) {
          event.preventDefault();
          bingSearch(data.point.lon, data.point.lat)
        });
      });
  };
};
  

document.getElementById("get-info").addEventListener("click", function (event) {
  event.preventDefault();
  console.log('click')
    let name = document.getElementById("text").value;
    console.log(name)
    apiGet(name)
    document.getElementById("text").value = "";
});