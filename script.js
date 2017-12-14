var searchStr = "";

function checkClick() {
  searchStr = $('.input').val();
  var visibility = $('.title-div').is(':visible');

  if (searchStr != "" && !visibility) {
    getResults(searchStr);
  }

}

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
  $("#results-table tr").remove();

  combined = {};

  if ($('#netflixCheck').is(":checked")) {
    var requestNetflix = $.ajax({
      type: 'GET',
      url: "http://ec2-54-87-189-232.compute-1.amazonaws.com:8080/netflix?searchString=" + searchStr,
      dataType: "json",
      xhrFields: {
          withCredentials: true
      }});
    requestNetflix.done(function(data){
      for (i in data) {
        combined[data[i]] = "Netflix";
      }
    });



      $.when(requestNetflix)
        .done(function () {
          if ($('#huluCheck').is(":checked")) {
            huluRequest(combined);
          } else {
            populateTable(combined);
          }
        });
  } else if ($('#huluCheck').is(":checked")) {
    huluRequest(combined)
  }
}

function huluRequest(combined) {
  var requestHulu = $.ajax({
    type: 'GET',
    url: "http://ec2-54-87-189-232.compute-1.amazonaws.com:8080/hulu?searchString=" + searchStr,
    dataType: "json",
    xhrFields: {
        withCredentials: true
    }});

    requestHulu.done(function(data){
      h = {};
      for (i in data) {
        h[data[i]] = "Hulu";
      }

      combined = Object.assign({}, combined, h);
        populateTable(combined);
    });
}

function getImage(i, count) {
  $.get("http://www.omdbapi.com/?t="+i+"&apikey=59251d51", function(json, status){
        imageURL = json.Poster;
        var id = "#poster" + count;

        if (typeof imageURL == 'undefined') {
          imageURL = "default.png"
        }

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
  count = 0;

  for (i in data) {
  var value = data[i];
    $("#results-table").append("<tr><td><div id=\"poster"+ count +"\"></div></td></tr><tr><td id=\"stream-title\">" + i + "</td></tr><tr><td></td></tr></tr><tr><td id=\"service\">"+value+"</td></tr>");
    getImage(i, count);
    count += 1;
  }
}
