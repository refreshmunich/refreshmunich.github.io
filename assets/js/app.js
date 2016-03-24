var isIE;

$(document).ready(function() {
  // --- Check if browser is IE
  var check = /MSIE/i;
  var agent = navigator.userAgent;
  isIE = !!check.test(agent);

  observeScrolling();
  MembersList.init();
  Photos.init();
});

// --- If user scrolls the page, do the following things
function observeScrolling() {
  return;
  $(window).scroll(function(event) {
    var scrollValue = $(this).scrollTop();
    var rotate = scrollValue < 120 ? scrollValue * 2 : 0;
    var translateValue = "rotate(" + rotate + "deg) translateZ(0)";

    $('.refresh-icon').css({
      '-webkit-transform': translateValue,
      '-moz-transform': translateValue,
      '-ms-transform': translateValue,
      '-o-transform': translateValue
    });
  });
}

var test = "test";