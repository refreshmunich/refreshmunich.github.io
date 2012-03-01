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

      html += '<li>'
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
});
