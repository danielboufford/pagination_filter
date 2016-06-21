(function(){
  "use strict"

  var SEARCH_TEMPLATE =  '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>',
      NAVIGATION_CONTAINER = '<div class="pagination"><ul></ul></div>';

  var $students = $(".student-item"),
      $pageBody = $(".page");

  init();

  function filterResults(){
    var searchInput = $(".student-search input").val().toLowerCase();
    var matchingStudents = $students.filter(match);

    function matchName(item) {
      var nameOfStudent = $(item).find('.student-details h3')[0].innerHTML;
      return nameOfStudent.indexOf(searchInput) !== -1      
    }

    function matchEmail(item) {
      var emailOfStudent = $(item).find('.email')[0].innerHTML;
      return emailOfStudent.indexOf(searchInput) !== -1   
    }

    function match() {
      return matchName(this) || matchEmail(this);
    }


  }

  function switchPage(){
    //variable that equals link number
    var linkNumber = $(this).html(),
        pageStart = (linkNumber * 10) - 10,
        pageEnd = linkNumber * 10,
        $activeLink = $(this);

    deselectAllPagination();
    selectActivePage();
    swapOutPage($students, $students.slice(pageStart,pageEnd));
  }  

    function deselectAllPagination() {
      var $paginationLinks =  $(".pagination a");
      $paginationLinks.removeClass("active");
    }

    function selectActivePage() {
      $activeLink.addClass("active");
    }
  }

  function swapOutPage(allStudents, studentsToDisplay) {
    allStudents.hide();
    studentsToDisplay.show();
  }
  function removePagination() {
    $pageBody.remove(".pagination");
  }

  function init() {
    addSearch();
    addPagination();
    displayStudents();
    registerEvents();

    function addSearch() {
      $(".page-header").append(SEARCH_TEMPLATE);
    }

    function addPagination() {
      var pagesNeeded = Math.ceil($students.length / 10);

      $pageBody.append(NAVIGATION_CONTAINER);

      for(var i = 0; i < pagesNeeded; i++) {
        // TODO make first link active
        var li = '<li><a href="#">' + (i + 1) + '</a></li>'
        $(".pagination ul").append(li);
      }
    }

    function displayStudents() {
      $students.hide().slice(0,10).show();
    }

    function registerEvents() {
      var $paginationLinks =  $(".pagination a"),
          $searchButton =   $(".student-search button");

      $paginationLinks.click(switchPage);
      $searchButton.click(filterResults);
    }
  }
}())