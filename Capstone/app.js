var apiKey = "AIzaSyDq628gpNArHHpGBzuFdS5IhpqSm_Un55o"


$('#fun-button').click(function(e) { 
	e.preventDefault();
	if (navigator.geolocation) {
		userLocation = navigator.geolocation.getCurrentPosition(mapLocation, showError);
	} else { 
    //put in call for address if not supported.
    alert('Geolocation is not supported by this browser.')
	}
});


function mapLocation(position) {
	var latlon = position.coords.latitude + "," + position.coords.longitude;

	var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
	+latlon+"&zoom=14&size=400x300&sensor=false&key="+apiKey;
	$(".map").html('<img src="'+img_url+'">')
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



