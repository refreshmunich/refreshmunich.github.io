var isIE;

$(document).ready(function () {

  // --- Check if browser is IE
  var check = /MSIE/i;
  var agent = navigator.userAgent;
  isIE = !!check.test(agent);

  // --- Custom navigation (on hash change)
  $(window).bind('hashchange', function() {
    var scrollTop;
    var identifier = window.location.hash.replace('/', '');

    if (identifier === '#top')
      scrollTop = 0;
    else {
      var target       = $(identifier);
      var headerHeight = $('.fixed-header').height();
      scrollTop        = target.offset().top - headerHeight - 30;
    }
    $('html,body').animate({ scrollTop:scrollTop }, 'fast');
  });

  var members = document.getElementById('mlist');
  var html    = '';

  function build_list (users) {
    var html = '';
    for (var i=0, ii=users.length; i<ii; i++) {
      var handle = users[i].screen_name;
      var name = users[i].name;
      var desc = users[i].description;
      var pic = users[i].profile_image_url;
      //url    = users[i].url;

      html += '<li class="l-grid-column-4-1">'
         + '<a href="http://www.twitter.com/' + handle + '" title="Follow ' + name + ' on Twitter">'
         + '<img src="' + "images/avatarMask.png" + '" alt="' + name + '" align="right" width="52" height="52" style="background:url(' + pic + ') 2px 1px;"></a>'
         + '<h3>' + name + '<br/><a href="http://www.twitter.com/"' + handle+ '">@' + handle + '</a>' + '</h3>'
         + '<p>' + desc + '</p>';
      html += '</li>';
    }
    return html;
  }

  var members_list = function (data) {
    members.innerHTML = build_list(data.users);
  };

  var $faq = $('#about');
  $faq.find('h3').click(function(e) {
    var answer  = $(e.target).siblings('.answer');
    var visible = answer.css('display') === 'block';
    var rotate  = visible ? -45 : 0;
    var delay   = visible ? 0 : 200;

    answer.slideToggle();

    setTimeout(function() {
      answer.css({
        '-webkit-transform':'perspective(1000) rotateX(' + rotate + 'deg)'
      });
    }, delay);
  });

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
    var eventDate        = new Date(nextEvent['gd$when'][0].startTime);
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


  // --- Load the photos from Flickr
  var setId = '72157629231564646'

  $.getJSON('http://api.flickr.com/services/rest/?jsoncallback=?', {
    method:'flickr.photosets.getPhotos',
    api_key:'b9ea2bbfbae76e8986f7f480705b3d04',
    format:'json',
    photoset_id:setId,
  }, function (data) {
    var photos = data.photoset.photo;
    photos.length && renderPhotos(photos);
  });

  function renderPhotos(photos) {
    for (var i = photos.length - 1; i >= 0; i--) {
      var photo = photos[i];

      var image = $('<img>');

      var baseUrl = 'http://farm' + photo.farm + 
                     '.staticflickr.com/' + photo.server + 
                     '/' + photo.id + '_' + photo.secret;

      var thumbUrl = baseUrl + '_t.jpg';
      var bigUrl   = baseUrl + '.jpg';

      image.attr({
        src:thumbUrl,
      });

      var link = $('<a></a>');
      link.attr({
        href:bigUrl,
        target:'_blank',
        class:'fancybox',
        rel:'gallery',
        title:photo.title
      });
      link.append(image);

      $('#photoContainer').append(link);
    };

    // --- Remove loading indicator
    $('#photos .loading').remove();

    // --- Activate lightbox (fancybox)
    $('.fancybox').fancybox();
  }




  var members = [];

  // --- Fire the Twitter API request
  $.getJSON('https://api.twitter.com/1/lists/members.json?callback=?', {
    slug:'members',
    owner_screen_name:'refreshmunich',
  }, function (data) {
    members = data.users;
    // --- We want the members sorted alphabetically
    members = members.sort(sortMembers);

    // --- Remove loading indicator
    $('#members .loading').remove();

    // --- Render everything
    $('#mlist').html(build_list(data.users));

    !isIE && initLayover();
  });

  // --- Custom sort function for sorting the members
  var sortMembers = function (a, b, key) {
    // --- Members are sorted by Name. They can be also sorted by
    // --- twitter @handle by changing a.name to a.screen_name
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();

    if (nameA < nameB)
        return -1;
    else if (nameA > nameB)
        return 1;

    return 0;
  };

  // --- We want to display the full twitter bio when mouseovering the cells
  var layoverCell, originCell;

  function initLayover() {
    // --- ALL the member cells
    var cells = $('#mlist').find('li');

    cells.mouseenter(function () {
      // --- If there is already a layover cell, remove it
      layoverCell && removeLayover();

      originCell   = $(this);
      var position = originCell.offset();
      
      // --- Create the layover cell and style it
      layoverCell = $('<div id="layoverCell"></div>').html(originCell.html());
      layoverCell.css({
        top:position.top - 10,
        left:position.left,
      });

      // --- Hide the original cell
      originCell.css({
        opacity:0,
      });

      // --- Animate the shit out of it
      // --- (The timeout is actually a dirty hack)
      setTimeout(function() {
        layoverCell.css({
          top:position.top - 15
        });
      }, 0);

      // --- If we move the mouse out of it, it should hide
      layoverCell.mouseleave(removeLayover);

      $(document.body).append(layoverCell);
    });
  }

  var removeLayover = function () {
    if (!layoverCell)
      return;

    layoverCell.remove();
    layoverCell = null;

    // --- Show the original cell again
    originCell.css({
      opacity:1
    });
  }

  var header = $('.fixed-header');

  // --- 'Scroll Magic' with the refresh logo
  !isIE && $(window).scroll(function(event) {
    var scrollValue    = $(this).scrollTop();
    var rotate         = scrollValue < 400 ? scrollValue / 4 : 0;    
    var translateValue = "rotate(" + rotate + "deg) translateZ(0)";

    $('#bigLogo').css({
      '-webkit-transform':translateValue,
      '-moz-transform':   translateValue,
      '-ms-transform':    translateValue,
      '-o-transform':     translateValue
    });
  });

  // --- Insert current year in copyright
  var year = new Date().getFullYear();
  $('#year').html(year);
});

// --- Lets IE understand Google's date format
function parseISO8601(dateString) {
  return dateString.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$1/$2/$3 $4:$5:$6').split('.')[0]
}