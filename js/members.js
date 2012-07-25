    var membersTemplate = $.trim( $('#js-members-template').html() );

    function buildMembersList(users) {

      console.log(users);
      var html = '',
        length = users.length; // + 1, // plus one because we will add CTA to it below
        join = {
          'name': 'Want to join us?',
          'screen_name': 'refreshmunich',
          'description': 'Get in touch via <a href="http://www.twitter.com/refreshmunich" target="_blank">@twitter</a> and drop in on one of our next Stammtisches for beers and nerdy chatter.',
          'profile_image_url': 'http://twimg0-a.akamaihd.net/profile_images/1866985909/icon200x200_normal.png'
        };

      users.push(join);

      for (var i=0; i<length; i++) {
        html += membersTemplate.replace( /{{handle}}/ig, users[i].screen_name )
                     .replace( /{{name}}/ig, users[i].name )
                     .replace( /{{desc}}/ig, users[i].description )
                     .replace( /{{pic}}/ig, users[i].profile_image_url );
      }

      return html;
    }

        // --- Fire the Twitter API request
    // $.getJSON('https://api.twitter.com/1/lists/members.json?callback=?', {
    //   slug:'members',
    //   owner_screen_name:'refreshmunich',
    // }, function (data) {

    //   members = data.users;
    //   members = members.sort(sortMembers);

    //   $('#js-members').html( buildMembersList(members) );

    //   // --- Remove loading indicator
    //   $('#members .loading').remove();
    
    // });

  function members_list(data) {
    members = data.users;
    members = members.sort(sortMembers);

    $('#js-members').html( buildMembersList(members) );
                      
    $('#js-members-loading').remove();
  }

  var sortMembers = function (a, b, key) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    
    if (nameA < nameB)
      return -1;
    else if (nameA > nameB)
      return 1;

    return 0;
  };
