var isIE;

$(document).ready(function () {
  // --- Check if browser is IE
  var check = /MSIE/i;
  var agent = navigator.userAgent;
  isIE = !!check.test(agent);

  loadEvents();
  observeScrolling();
});

function loadEvents() {
  $.ajax({
    url:'https://api.github.com/gists/3330905',
    dataType:'jsonp',
    success:function(response) {
      var content = response.data.files['EVENTS.md'].content;
      renderNextEvent(content);
    }
  });
}

function renderNextEvent(content) {
  var events    = content.split(/\n---\n/gi);
  var nextEvent = events[0];
  var lines     = nextEvent.split(/\n/gi);
  var dateText  = lines[0];
  var date      = Date.parse(dateText);
  var dateNow   = +new Date();
  var tolerance = 6 * 60 * 60 * 1000;
  var convert   = new Markdown.Converter().makeHtml;

  var location = lines[4];
  var address  = lines[5] + '\n' + lines[6];
  var adressHtml = convert(address);
  var description = nextEvent.split(lines[6])[1];
  var descriptionHtml = convert(description);

  $('#js-venue').html(location);
  $('#js-address').html(adressHtml);
  $('#js-description').html(descriptionHtml);

  // --- If the current time is the event's start time plus 6 hours, it's 'old'
  if ((dateNow + tolerance) > date) {
    // --- Do not render the next event
    return renderPastEvents(events);
  }
  else {
    // --- Remove the first event
    events.splice(0, 1);
    renderPastEvents(events);
  }

  // --- Month names because JS doesn't know them
  var month = getMonthAbbr(date.getMonth());

  $('#js-day').html(date.getDate());
  $('#js-month').html(month);
  $('#js-time').html(dateText);
  $('#recent-event').removeClass('is-hidden');
}

function renderPastEvents(pastEvents) {
  // --- Do not render past events because it's not finished (TODO)
  return;

  var html = '';

  for (var i = 0; i < pastEvents.length; i++) {
    var pastEvent = pastEvents[i];
    var lines     = pastEvent.split(/\n/gi);

    if (!lines[0])
      lines.splice(0, 1);

    var time     = lines[0];
    var date     = Date.parse(time);
    var type     = lines[2];
    var location = lines[4];

    html += '<li class="past">' +
              '<time class="past-when" datetime="' + date + '">' +
                '<span class="past-month">' + getMonthAbbr(date.getMonth()) + '</span>' +       
                '<span class="past-date">' + date.getDate() + '</span>' +
              '</time>' +
              '<p class="past-type">' + type + '</p>' +
              '<p class="past-location">' + location + '</p>' +
            '</li>';
  }

  $('.past-list').html(html);

  $('.past-events').removeClass('is-hidden'); 
}

function getMonthAbbr(integer) {
  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return months[integer];
}

// --- If user scrolls the page, do the following things
function observeScrolling() {
  $(window).scroll(function(event) {
    var scrollValue  = $(this).scrollTop();
    var rotate     = scrollValue < 120 ? scrollValue * 2 : 0;
    var translateValue = "rotate(" + rotate + "deg) translateZ(0)";

    $('.refresh-icon').css({
      '-webkit-transform':translateValue,
      '-moz-transform':   translateValue,
      '-ms-transform':  translateValue,
      '-o-transform':   translateValue
    });
  });
}

MembersList.init();
Photos.init();