
var MembersList = {

  init: function() {

    // Store references to our template and DOM elements
    this.membersTemplate  =  $.trim( $('#js-members-template').html() );
    this.membersLoading   =  $('#js-members-loading');
    this.membersList      =  $('#js-members');
    this.errorMsg         =  $('#js-members-loading-error');
    this.debug            =  false;    // true enables console logging

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
    var self = MembersList;               // store reference to ourself to use in place of 'this'
    if (self.debug) {                     // because within this scope, 'this' refers to sucess event
      console.log("Sucessfully loaded JSON from Twitter:");
      console.log(data);
    }
    
    members = data.users;
    members = members.sort(self.sortByName);

    self.buildList(members);
  },

  loadError: function(data){
    // TODO - display error message to user
    // or fall back to local JSON

    var self = MembersList;
    if (self.debug) {
      console.log("Error loading data from Twitter:");
      console.log(data);
    }
    self.errorMsg.show();
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
    var html = '',                     // store our markup
        length = users.length;         // how many users do we have?

    for (var i=0; i<length; i++) {     // Now iterate through js-template and replace variables

      html += this.membersTemplate.replace( /{{handle}}/ig, users[i].screen_name )
                   .replace( /{{name}}/ig, users[i].name )
                   .replace( /{{desc}}/ig, users[i].description )
                   .replace( /{{pic}}/ig, users[i].profile_image_url );
    }    
    return html;
  },

  sortByName: function (a, b, key) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();

    if (nameA < nameB)
      return -1;
    else if (nameA > nameB)
      return 1;

    return 0;
  }

};
