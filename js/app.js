$(document).ready(function () {
  var members = document.getElementById('mlist');
  var html = '';

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
         + '<img src="' + pic + '" alt="' + name + '" align="right"></a>'
         + '<h3>' + name + '<br/><a href="http://www.twitter.com/' + handle+ '">@' + handle + '</a>' + '</h3>'
         + '<p>' + desc + '</p>';
      html += '</li>';
    }
    return html;
  }

  var members_list = function (data) {
    members.innerHTML = build_list(data.users);
  };


  var $faq = $('#faq');
  $faq.find('h3').click(function(e) {
    $(e.target).siblings('.answer').slideToggle();
  });

  var members = [];

  // --- Fire the Twitter API request
  $.getJSON('https://api.twitter.com/1/lists/members.json?callback=?', {
    slug:'members',
    owner_screen_name:'refreshmunich',
  }, function (data) {
    members = data.users;
    // --- We want the members sorted alphabetically
    members = members.sort(sortMembers);

    // --- Render everything
    $('#mlist').html(build_list(data.users));

    initLayover();
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

  // --- "Scroll Magic" with the refresh logo
  $(window).scroll(function(event) {
    var scrollValue = $(this).scrollTop();
    var top         = 200 - scrollValue;

    // --- If the logo is in perfect position, stop it
    top = Math.max(top, 0);

    $('#headerLogo').css({
      top:top
    });
  })


});
