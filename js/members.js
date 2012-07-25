
var MembersList = {

  init: function() {

    // Store references to our template and DOM elements
    this.membersTemplate = $.trim( $('#js-members-template').html() ),
    this.membersLoading  = $('#js-members-loading'),
    this.membersList     = $('#js-members');

    this.loadMembers();
  },

  loadMembers: function() {    
    // get members list from Twitter API
    $.getJSON('https://api.twitter.com/1/lists/members.json?callback=?', {
      slug:'members',
      owner_screen_name:'refreshmunich',
    }).error(this.loadError)
      .success(this.loadSuccess)
      .complete(this.removeLoader);  
  },

  loadSuccess: function(data){
    console.log("Sucessfully loaded");

    var self = MembersList;
    self.buildList(data.users);
  },

  loadError: function(data){
    console.log("Error loading data");
    console.log(data);
  },

  removeLoader: function() {
    var self = MembersList;
    self.membersLoading.remove();
  },

  buildList: function(data) {
    var markup = this.buildHTML(data);  // generate our markup
    this.membersList.html(markup);      // add it to the DOM
  },

  buildHTML: function(users) {
    console.log("buildHTML:");
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
      html += this.membersTemplate.replace( /{{handle}}/ig, users[i].screen_name )
                   .replace( /{{name}}/ig, users[i].name )
                   .replace( /{{desc}}/ig, users[i].description )
                   .replace( /{{pic}}/ig, users[i].profile_image_url );
    }

    return html;
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
