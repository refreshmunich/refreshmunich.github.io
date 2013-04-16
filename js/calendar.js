 // --- Load the next event from google calendar
  $.getJSON('http://www.google.com/calendar/feeds/refreshmunich@googlemail.com/public/full?callback=?', {
    'alt':'json-in-script',
    'orderby':'starttime',
    'max-results':'1',
    'singleevents':'true',
    'sortorder':'ascending',
    'futureevents':'true'
  }, function (data) {
    var nextEvent = data.feed.entry ? data.feed.entry[0] : null;
    nextEvent && renderNextEvent(nextEvent);
  });

  function renderNextEvent(nextEvent) {
    // --- Javascript doesnt know week days and month names so we got to teach it.
    var weekdays         = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months           = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var eventTitle       = nextEvent.title['$t'];
    var startTime        = nextEvent['gd$when'][0].startTime;
    var eventDate        = new Date(parseISO8601(startTime));
    var eventWeekDay     = weekdays[eventDate.getDay()];
    var eventDay         = eventDate.getDate();
    var eventMonth       = months[eventDate.getMonth()];
    var eventYear        = eventDate.getFullYear();
    var eventHours       = eventDate.getHours();
    var eventMinutes     = eventDate.getMinutes();

    // --- We dont want a single zero
    if (eventMinutes === 0)
      eventMinutes = '00';

    // --- Build the time string
    var eventTime        = eventWeekDay + ', ' + eventDay + '. ' + eventMonth + ' ' + eventYear + ', ' + eventHours + ':' + eventMinutes;

    var eventLocation    = nextEvent['gd$where'][0].valueString;
    var eventDescription = nextEvent.content['$t'];

    // --- If there is an address we want a Maps Link
    if (eventDescription) {
      var mapsLink = $('<a>Open in Maps</a>');
      var mapsUrl = 'http://maps.google.com/maps?q=' + encodeURIComponent(eventLocation + ' ' + eventDescription);
      mapsLink.attr({
        target:"_blank",
        href:mapsUrl
      });

      $('#eventMapsLink').append(mapsLink);
    }

    // --- Make breaks in the description
    eventDescription = eventDescription.replace(/\n/gm, '<br>');

    // --- Apply the values in the UI
    $('#eventTitle').html(eventTitle);
    $('#eventTime').html(eventTime);
    $('#eventLocation').html(eventLocation);
    $('#eventDescription').html(eventDescription);

    // --- Finally show the next event box
    $('#next-event').css({
      height:'auto'
    });
  }

