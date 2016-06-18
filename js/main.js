(function(){
  "use strict"

  var $students = $(".student-item"),
      $studentNames = $(".student-details h3"),
      $studentEmails = $(".email");

  //append search feature, navigation links, and show only students 1-10 

  function addHTML() {

    var searchFeature =  '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';   
    $(".page-header").append(searchFeature);

    var navigationContainer = '<div class="pagination"><ul></ul></div>'
    $(".page").append(navigationContainer);

    students.hide().slice(0,10).show();

    var pagesNeeded = Math.ceil(students.length / 10);
    for(var i = 0; i < pagesNeeded; i++) {
      var li = '<li><a href="#">' + (i + 1) + '</a></li>'
      $(".pagination ul").append(li);
    }
  }
  addHTML();

  //when link is clicked, add "active" classand remove for all other links

  $(".pagination a").click(function(){
    $("a").each(function(){
      $(this).removeClass("active");
    });
  $(this).addClass("active");

  //variable that equals link number
    var linkNumber = $(this).html();

  //display the results corresponding with each link number

    students.hide().slice((linkNumber*10)-10,(linkNumber * 10)).show();

  });

  //search function

  $(".student-search button").click(function(){
    var searchInput = $(".student-search input").val().toLowerCase();;
    students.hide();
    for(i = 0; i < students.length; i++) {

      if(studentArray[i].indexOf(searchInput) !== -1) {
        studentArray[i].show();
      }
    }

  });

}())
