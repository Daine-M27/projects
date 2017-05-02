$('#fun-button').click(function(e) { 
e.preventDefault();
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    console.log('Geolocation is not supported by this browser.')
    }

function showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
    console.log(position.coords.latitude, position.coords.longitude)
}

})
