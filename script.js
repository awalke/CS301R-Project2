var searchStr = "";

function expand() {
  console.log(searchStr);
  $(".search").toggleClass("close");
  $(".input").toggleClass("square");
  if ($('.search').hasClass('close')) {
    $('input').focus();
  } else {
    $('input').blur();
  }
}

function search(event) {
  searchStr = $('.input').val();
  if (searchStr != "") {
    $(".title-div").hide(1000, 'swing');
    getResults(searchStr);
  } else {
    alert("Please enter a search value.");
  }

  return false;
}

function getResults(searchStr) {
  var request = $.ajax({
    type: 'GET',
    url: "http://ec2-54-87-189-232.compute-1.amazonaws.com:8080/netflix?searchString=" + searchStr,
    dataType: "json",
    xhrFields: {
        withCredentials: true
    }});
request.done(function(data){
    populateTable(data);
});


}

function populateTable(data) {
  for (i = 0; i < data.length; i++) {
    $("#results-table").append("<tr><td>" + data[i] + "</td></tr>");
  }
}

// video-preload-title-label -> title of netflix item
