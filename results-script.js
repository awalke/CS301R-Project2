function populateResults() {
  $.get('netflix-titles.txt', function(data) {
   alert(data);
}, 'text');
}

populateResults();
