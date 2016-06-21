  var SEARCH_BAR =  '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>',
      NAVIGATION_CONTAINER = '<div class="pagination"><ul></ul></div>';

  var $pageBody = $(".page"),
      $students = $(".student-item"),
      $paginationLinks,
      $searchButton;


//onload event
function initialize() {
  addSearch();
  addContainer();
  addPagination();
  displayStudents();

  function addSearch() {
    $(".page-header").append(SEARCH_BAR);
    $searchButton = $(".student-search button");
  }

  function addContainer() {
    $pageBody.append(NAVIGATION_CONTAINER);
  }
  function addPagination() {
    var pagesNeeded = Math.ceil($students.length / 10);

    for(var i = 0; i < pagesNeeded; i++) {
      // TODO make first link active
      var li = '<li><a href="#">' + (i + 1) + '</a></li>'
      $(".pagination ul").append(li);
      $paginationLinks = $(".pagination a");
      $paginationLinks.first().addClass("active");
    }
  }

  function displayStudents() {
    $students.hide().slice(0,10).show();
  }

}
initialize();

//a click event
$paginationLinks.click(paginateLinks)

  function paginateLinks(){
  var linkNumber = $(this).html(),
      pageStart = (linkNumber * 10) - 10,
      pageEnd = linkNumber * 10,
      $activeLink = $(this);

//remove active style from all links, add active style to active link
  $paginationLinks.removeClass("active");
  $activeLink.addClass("active");

//display students that correspond with each page
  $students.hide();
  $students.slice(pageStart,pageEnd).show();
}

//search button click event
$searchButton.click(function(){
  var linkNumber = $(this).html(),
      pageStart = (linkNumber * 10) - 10,
      pageEnd = linkNumber * 10,
      $activeLink = $(this);
  //hide all students
  $students.hide();

  //get search input value
  var $searchInput = $(".student-search input").val().toLowerCase();

  //check to see if each item in $students contains the value (true/false). If true, display
  var $matchingStudents = $students.filter(matchName);

  function matchName() {
    var nameOfStudent = $(this).find("h3")[0].innerHTML;
    var emailOfStudent = $(this).find("span")[0].innerHTML;

    if (nameOfStudent.indexOf($searchInput) !== -1 || emailOfStudent.indexOf($searchInput) !== -1) {
      return true;    
    }
  }

  //show matching students
  $matchingStudents.slice(0,10).show();

  //remove all pagination links from DOM
  $paginationLinks.remove();

  //add in correct amount of pagination links
  var pagesNeeded = Math.ceil($matchingStudents.length / 10);

    for(var i = 0; i < pagesNeeded; i++) {
      var li = '<li><a href="#">' + (i + 1) + '</a></li>';

      $(".pagination ul").append(li);

      $paginationLinks = $(".pagination a");
      $paginationLinks.first().addClass("active");
      $paginationLinks.click(function(){
          var linkNumber = $(this).html(),
              pageStart = (linkNumber * 10) - 10,
              pageEnd = linkNumber * 10,
              $activeLink = $(this);

        //remove active style from all links, add active style to active link
          $paginationLinks.removeClass("active");
          $activeLink.addClass("active");

        //display students that correspond with each page
          $matchingStudents.hide();
          $matchingStudents.slice(pageStart,pageEnd).show();
      });

    }
});


