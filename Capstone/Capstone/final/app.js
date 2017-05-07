var map;
var infoWindow;
var service;
var userLoc;
var searchTerm;

var markers = [];

$(document).ready(function () {
	
   var setHeights = function () {
   	var windowHeight = window.innerHeight;
   	$("#sidebar").height(windowHeight);
   	$("#map").height(windowHeight);

   };

   setHeights();
});




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
		styles: [
    {
        "stylers": [
            {
                "hue": "#ff1a00"
            },
            {
                "invert_lightness": true
            },
            {
                "saturation": -100
            },
            {
                "lightness": 33
            },
            {
                "gamma": 1
            }
        ]
    },
    // {
    //     "featureType": "poi.park",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //         {
    //             "color": "#1abc9c"
    //         },
    //         {
    //             "lightness": -10
    //         }
    //     ]
    // },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c5a4c"
            }
        ]
    }
]
	};

	map = new google.maps.Map(document.getElementById('map'),
		mapOptions);

//put in lable for marker
var starIcon = {
	path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: '#1abc9c',
    fillOpacity: 0.8,
    scale: .2,
    strokeColor: '#ffffff',
    strokeWeight: 2
};
var marker = new google.maps.Marker({
	position: userLoc,
	icon: starIcon,
	map: map,
	title: "You are here! Or pretty close anyways..."
});
}


function performSearch() {
	service = new google.maps.places.PlacesService(map);

	var request = {
		location: userLoc,
		//radius: '43452',
		bounds: map.getBounds(),
		keyword: searchTerm,
		//rankby: google.maps.places.RankBy.DISTANCE
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
		appendSideBar(result);
	}
}










function addMarker(place) {
	infoWindow = new google.maps.InfoWindow();

	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		animation: google.maps.Animation.DROP,
		icon: {
			url: 'http://www.googlemapsmarkers.com/v1/1abc9c/',
			anchor: new google.maps.Point(10, 10),
			scaledSize: new google.maps.Size(20, 30)
		},

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


	markers.push(marker);
       //console.log(place)
   }












   function appendSideBar(place) {
   	service.getDetails(place, function (result, status) {
   		if (status !== google.maps.places.PlacesServiceStatus.OK) {
   			console.error(status);

   			return;
   		};


     		//get distance from origin and destination
     		var service = new google.maps.DistanceMatrixService();
     		service.getDistanceMatrix({
     			origins: [userLoc],
     			destinations: [result.formatted_address],
     			travelMode: 'DRIVING',
     			unitSystem: google.maps.UnitSystem.IMPERIAL,
     		}, callback1);

     		function callback1(response, status) {
     			if (status !== 'OK') {
            alert('Error was: ' + status);// body...
        } else {
        	var distance = response.rows[0].elements[0].distance.text 
        }

        //console.log(distance);
        var htmlText = '<div class="col-md-12 man pas bg-fff">'+
        '<p class="text-default pbn mbn name-spot">'+ result.name +'</p>'+
        '<p class="text-primary" style="font-size: 10px;color:#888">'+distance+'</p>'+
        '<p class="text-primary" style="font-size: 10px;color:#888">'+ result.formatted_phone_number +'</p>'+
        '<p class="text-primary" style="font-size: 10px;color:#888">'+ result.formatted_address +'</p>'+
        '</div>';


        $('#sidebar').append(htmlText);

               

    }});

   };














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








 // Sets the map on all markers in the array.
 function setMapOnAll(map) {
 	for (var i = 0; i < markers.length; i++) {
 		markers[i].setMap(map);
 	}
 }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
      	setMapOnAll(null);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
      	clearMarkers();
      	markers = [];
      }








      //listens for search input with enter key '13'
    $('body').keypress(function(e) {
      	var keycode = (e.keyCode ? e.keyCode : e.which);
      	if (keycode == '13') {
      		e.preventDefault();
      		searchTerm = ($('#search-box').val());
      		deleteMarkers();
      		$('.pas').remove();
      		performSearch();



      	}
      });

    $('body').on({mouseenter: function(){
			$(this).addClass('bg-eee').removeClass('bg-fff');
			console.log($)
   			$(this).find('.name-spot').addClass('text-primary').removeClass('text-default');
   				
   				},
   			mouseleave: function(){
   			$(this).addClass('bg-fff').removeClass('bg-eee');
   			console.log($(this))
    		$(this).find('.name-spot').addClass('text-default').removeClass('text-primary');
    		console.log($(this).find('.name-spot'))
   			}}, "div.pas"
			);
   