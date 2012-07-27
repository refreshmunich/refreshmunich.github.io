var Photos = {

  init: function() {

    // Flickr settings
    this.setID   = '72157629231564646'; // our photostream
    this.api_key = 'b9ea2bbfbae76e8986f7f480705b3d04';

    this.photos         =  $('#js-photos-container'); // our photos container in the DOM
    this.photosTemplate =  $.trim( $('#js-photos-template').html() );
    this.photosLoading  =  $('#js-photos-loading');
    this.errorMsg       =  $('#js-photos-loading-error');
    this.latestFirst    =  true;
    this.debug          =  true; // true enables console logging

    this.loadPhotos();
  },

  loadPhotos: function() {
    $.getJSON('http://api.flickr.com/services/rest/?jsoncallback=?', {
      method:'flickr.photosets.getPhotos',
      api_key: this.api_key,
      format:'json',
      photoset_id:this.setID,
    }).error(this.loadError)
      .success(this.loadSuccess)
      .complete(this.removeLoader);
  },

  loadSuccess: function(data) {
    var self = Photos;
    if(self.debug) {
      console.log("Successfully loaded JSON from Flickr:");
      console.log(data);
    }

    var photos = data.photoset.photo;
    photos.length && self.renderPhotos(photos); // if we have photos, render them.

  },

  loadError: function(data) {
    var self = Photos;
    if(self.debug) {
      console.log("Error loading JSON from Flickr:");
      console.log(data);
    }

    self.errorMsg.show();
  },

  removeLoader: function() {
    var self = Photos;
    self.photosLoading.remove();
  },

  renderPhotos: function(data) {
    var markup = ''; 
    var length = data.length;

    if (this.latestFirst) {
      for(var i = length-1; i>=0; i--) {
        markup += this.buildHTML(data[i]);
      }
    } else {
      for(var i = 0; i<length; i++) {
        markup += this.buildHTML(data[i]);
      }        
    }

    this.photos.html(markup);
  },

  buildHTML: function(photo) {
    var html = '';

    // figure out Flickr URLs
    var baseUrl  = 'http://farm' + photo.farm + '.staticflickr.com/' 
                 + photo.server + '/' 
                 + photo.id + '_' + photo.secret;
    var thumbUrl = baseUrl + '_t.jpg';
    var bigUrl   = baseUrl + '.jpg';

    // replace in our template
    html += this.photosTemplate.replace( /{{title}}/ig, photo.title)
                 .replace( /{{largeVersion}}/ig, bigUrl )
                 .replace( /{{thumbnail}}/ig, thumbUrl );
    
    return html;
  }  

};

