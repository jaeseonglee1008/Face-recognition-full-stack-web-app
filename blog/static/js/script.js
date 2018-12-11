// calling Jquery
$(document).ready(function(){
  // add wrappedElement class into img attributes
  $(".gallery-set").addClass("wrappedElement");
  // sorting and display depends on class tag
  $("#show-all").click(function(){
    $(".wrappedElement>.gallery").fadeIn("fast");
    $(".wrappedElement").fadeIn("fast");
  });
  $("#web-app").click(function(){
    $(".wrappedElement>.gallery").hide();
    $(".wrappedElement>.webapp").fadeIn("fast");
  });
  $("#html").click(function(){
    $(".wrappedElement>.gallery").hide();
    $(".wrappedElement>.html").fadeIn("fast");
  });
  $("#css").click(function(){
    $(".wrappedElement>.gallery").hide();
    $(".wrappedElement>.css").fadeIn("fast");
  });
  $("#javascript").click(function(){
    $(".wrappedElement>.gallery").hide();
    $(".wrappedElement>.javascript").fadeIn("fast");
  });
  $("#python").click(function(){
    $(".wrappedElement>.gallery").hide();
    $(".wrappedElement>.python").fadeIn("fast");
  });
  $("#oc").click(function(){
    $(".wrappedElement>.gallery").hide();
    $(".wrappedElement>.oc").fadeIn("fast");
  });
  $("#swift").click(function(){
    $(".wrappedElement>.gallery").hide();
    $(".wrappedElement>.swift").fadeIn("fast");
  });
  $("#java").click(function(){
    $(".wrappedElement>.gallery").hide();
    $(".wrappedElement>.java").fadeIn("fast");
  });
});
// gallery jquery ends

// form button jquery
$(document).ready(function(){
  // contact form animations
  $('#contact').click(function() {
    $('#contactForm').fadeIn("fast");
  });

  // hide if user click out of the form
  $(document).mouseup(function (e) {
    var container = $("#contactForm");
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
      container.fadeOut();
    }
  });
});

// get degree data ajax
window.onload = function(){
  document.getElementById("btn").addEventListener("click",getDegrees);
};
function getDegrees(){
  var degreeRequest = new XMLHttpRequest();
  // the way to get, resource, asynchronous request bool. open->initialized for connection
  degreeRequest.open('get','https://gist.githubusercontent.com/jaeseonglee1008/8587988d21a874475eb8c0a00239a007/raw/46c5ff76fff380cf0579f48bbee7a12440a28845/gistfile1.json',true);

  degreeRequest.onreadystatechange = function(){
    if(degreeRequest.readyState === 4 && degreeRequest.status ===200){
      let degreeData = JSON.parse(degreeRequest.responseText);
      renderHTML(degreeData);
    }//closing readyState check
  };//closing readyState change
  degreeRequest.send();
} //getDegrees func ends

//rending when btn has been clicked
function renderHTML(degreeData){
  //  initialize string with title header. table id is "degrees"
  var htmlString = "<tr><th>School</th><th>Program</th><th>Type</th><th>Year</th></tr>";
  // iterate degreeData list to fetch in order to make table
  for(let i=0; i<degreeData.degrees.length; i++){
    htmlString +=
    "<tr><td>" +
    degreeData.degrees[i].degree.School +
    "</td><td>" +
    degreeData.degrees[i].degree.Program +
    "</td><td>" +
    degreeData.degrees[i].degree.Type +
    "</td><td>" +
    degreeData.degrees[i].degree.Year +
    "</td></tr>";
  }
  // attach htmlString markup
  document.getElementById("degrees").innerHTML = htmlString;
  // remove the button when the btn clicked
  document.getElementById("btn").classList.toggle("empty");
}// renderHTML func ends
