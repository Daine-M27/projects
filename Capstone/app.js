var map;
var infoWindow;
var service;
var userLoc;
var searchTerm = 'Amusement Center';
var photos;

function initPosition(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap, showError);
  } else { 
    //put in call for address if not supported.
    alert('Geolocation is not supported by this browser.')
  }
  
};

function initMap(location){
  userLoc = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
  var mapOptions = {
    center: userLoc,
    zoom: 10,
    mapTypeId: 'roadmap'
  };

  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

//put in lable for marker
var marker = new google.maps.Marker({
  position: userLoc,
  map: map
});
}

function performSearch() {
  service = new google.maps.places.PlacesService(map);

  var request = {
    bounds: map.getBounds(),
    keyword: searchTerm
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    addMarker(result);
   //photoBar(result);
  }
        // console.log(results);
}

// function photoBar(place){
  
//   console.log(place.placePhoto[0])
// }


      function addMarker(place) {

        infoWindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: {
            url: 'http://maps.google.com/mapfiles/kml/pal3/icon28.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(20, 20)
          }
        });

        google.maps.event.addListener(marker, 'mouseover', function() {
          service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              console.error(status);
              return;
            }
            
            infoWindow.setContent("<p>Name: <strong>"+result.name+"</strong><p>"  
              +"<p>Address: <strong>"+result.formatted_address+"</strong><p>"
              +"<p>Phone: <strong>"+ result.formatted_phone_number + "</strong><p>"  
              +"<p>Rating: <strong>" +result.rating+"</strong><p>"
              +"<p> <strong>Left click now for detailed info:</strong><p>");
            infoWindow.open(map, marker);
            
            google.maps.event.addListener(marker, 'click', function(){
              window.open(result.url);
            });
          });
        });



        google.maps.event.addListener(marker, 'mouseout', function(){
          infoWindow.close();
        })
       //console.log(place)
     }



     function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
        case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
        case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
        case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      }};



      $('#fun-button').on('click', function(e){
        e.preventDefault();
        performSearch();
      })

