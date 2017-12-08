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

function getImage(data, i) {
  $.get("http://www.omdbapi.com/?t="+data[i]+"&apikey=59251d51", function(json, status){
        imageURL = json.Poster;
        var id = "#poster" + i;
        
        $(id).css('background-image', 'url('+imageURL+')');
        $(id).css('width', '300px');
        $(id).css('height', '300px');
        $(id).css('overflow', 'hidden');
        $(id).css('background-position', 'center');
        $(id).css('background-repeat', 'no-repeat');
        $(id).css('border-radius', '20px');
        $(id).css('margin', 'auto');
    });
}

function populateTable(data) {
  var imageURL="";
  $("#results-table tr").remove();

  for (i = 0; i < data.length; i++) {
    $("#results-table").append("<tr><td><div id=\"poster"+ i +"\"></div></td></tr><tr><td id=\"stream-title\">" + data[i] + "</td></tr>");

    getImage(data, i);
  }
}

// video-preload-title-label -> title of netflix item
