
var GoogleAPI_URL = 'https://www.googleapis.com/youtube/v3/search';
var ApiKey = "AIzaSyCJCzj234zfeYlRs2OvibU0-ajw6fKBz0A";
var state;

function getDataFromApi(searchTerm) {
  var query = {
    part: 'snippet',
    key: ApiKey,
    q: searchTerm,
    maxResults: 6,
  }
  // var success = function(data, status){
  //   console.log(data, status)
  // }

  state = $.getJSON(GoogleAPI_URL, query, renderResults);
  // console.log(state);

 // renderResults();
}


function renderResults(arg1, arg2) {
  console.log(arg1, arg2)
    var arrayLength = state.responseJSON.items.length;

   for (i = 0; i < arrayLength; i = i+1){

    $('#results').append('<div class="result-image"><img src=' + state.responseJSON.items[i].snippet.thumbnails.medium.url + '></div>');             
 }                      
  };


function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var search = $(this).find('.js-query').val();
    $('#results').children('div').remove();
    getDataFromApi(search);

    });

};

$(function(){watchSubmit();});