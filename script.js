// function initMap() {
//   var center = {lat: -20.4660089, lng: -54.6032607};
//   var map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: center});
// }

function initMap() {
  var center = {lat: -20.4660089, lng: -54.6032607};
  
  var map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 13
  });

  var options = {
    componentRestrictions: { country: 'br' }
   };

  var inputStart = document.getElementById('start_point');
  var autocompleteStart = new google.maps.places.Autocomplete(inputStart, options);
  var inputEnd = document.getElementById('end_point');
  var autocompleteEnd = new google.maps.places.Autocomplete(inputEnd, options);
  
  var service = new google.maps.places.PlacesService(map);
  var sessionToken = new google.maps.places.AutocompleteSessionToken();
  var requestStart = {query: inputStart.value, fields: ['formatted_address', 'name', 'geometry']};
  
            const request = {
              fields: ['name', 'formatted_address', 'geometry'],
              placeId: suggestion.place_id,
              sessionToken,
            };

  service.getDetails(requestStart, callbackQueryStart);
  var responseStart;

  function callbackQueryStart(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var type = 'start'
        createMarker(place, type);
      };

      responseStart = place;
      setPoint(place);
    }
  };

  var requestEnd = {query: inputEnd.value, fields: ['formatted_address', 'name', 'geometry']};
  service.getDetails(requestEnd, callbackQueryEnd);
  var responseEnd;

  function callbackQueryEnd(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var type = 'end'

        createMarker(place, type);
      }

      responseEnd = place;
      setPoint(place);
    }

    if (!!document.getElementById('start_point').value && !!document.getElementById('end_point').value) {
      calcRoute(responseStart, responseEnd);
    }
  };


}