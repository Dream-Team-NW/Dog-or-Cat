var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
    /* No need to set credentials if already passed in URL */
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    zoom: 18,
    center: new Microsoft.Maps.Location(28.332823, -81.492279)
    console.log("test")
});
map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.streetside });

