var Photos = {

  init: function() {
    // Flickr settings
    this.setID   = '72157629231564646'; // our photostream
    this.api_key = 'b9ea2bbfbae76e8986f7f480705b3d04';

    this.photos         =  $('#js-photos');               // our photos container in the DOM
    this.photosLoading  =  $('#js-photos-loading');
    this.errorMsg       =  $('#js-photos-loading-error');
    this.debug          =  true;                        // true enables console logging

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

  renderPhotos: function(photos) {

    // loop through our photos in reverse () order
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
        'href':   bigUrl,
        'target': '_blank',
        'title':  photo.title
      });
      link.append(image);

      this.photos.append(link);
    }
  }

};

