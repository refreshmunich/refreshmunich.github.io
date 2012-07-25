
var MembersList = {

  init:function() {
    console.log("initialized");

    // Cache references to our template and DOM elements
    var membersTemplate = $.trim( $('#js-members-template').html() ),
        membersLoading  = $('#js-members-loading'),
        membersList     = $('#js-members');

    this.loadMembers();
  },

  loadMembers: function() {    
    // get members list from Twitter API
    $.getJSON('https://api.twitter.com/1/lists/members.json?callback=?', {
      slug:'members',
      owner_screen_name:'refreshmunich',
    }).error(this.loadError)
      .complete(this.loadSuccess);  

  },

  loadSuccess: function(data){
    console.log("Sucessfully loaded");
    console.log(data);
  },

  loadError: function(data){
    console.log("Error loading data");
    console.log(data);
  },

  buildHTML: function(users) {
    // console.log(users);
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
  },

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

 members_list: function(data) {
  members = data.users;
  members = members.sort(sortMembers);

  membersList.html( buildMembersList(members) );                  
  membersLoading.remove();
}

// var sortMembers = function (a, b, key) {
//   var nameA = a.name.toLowerCase();
//   var nameB = b.name.toLowerCase();
  
//   if (nameA < nameB)
//     return -1;
//   else if (nameA > nameB)
//     return 1;

//   return 0;
// };

};
