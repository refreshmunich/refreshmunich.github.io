var Photos = {

  init: function() {

    // Flickr settings
    this.albumID   = 'm3NQU'; // our album

    this.photos         =  $('#js-photos-container'); // our photos container in the DOM
    this.photosTemplate =  $.trim( $('#js-photos-template').html() );
    this.photosLoading  =  $('#js-photos-loading');
    this.errorMsg       =  $('#js-photos-loading-error');
    this.latestFirst    =  true;
    this.debug          =  false; // true enables console logging

    this.loadPhotos();
  },

  loadPhotos: function() {
    $.getJSON('http://api.imgur.com/2/album/' + this.albumID + '.json')
      .error(this.loadError)
      .success(this.loadSuccess)
      .complete(this.removeLoader);
  },

  loadSuccess: function(data) {
    var self = Photos;
    if(self.debug) {
      console.log("Successfully loaded JSON from Imgur:");
      console.log(data);
    }

    var photos = data.album.images.reverse();
    photos.length && self.renderPhotos(photos); // if we have photos, render them.
  },

  loadError: function(data) {
    var self = Photos;
    if(self.debug) {
      console.log("Error loading JSON from Imgur:");
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
    this.initGallery();
  },

  initGallery: function() {
    $("#js-photos-container .fancybox").fancybox({
      openEffect  : 'none',
      closeEffect : 'none',
      nextEffect: 'elastic',
      prevEffect: 'none',
      maxWidth  : 800,
      maxHeight : 600,
      closeBtn: false,
      padding: 0,
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  },

  buildHTML: function(photo) {
    var html = '';

    // figure out Image Url
    var baseUrl  = 'http://i.imgur.com/';
    var thumbUrl = baseUrl + photo.image.hash + 's.jpg';
    var bigUrl   = baseUrl + photo.image.hash + '.jpg';

    // replace in our template
    html += this.photosTemplate.replace( /{{title}}/ig, '')
                 .replace( /{{largeVersion}}/ig, bigUrl )
                 .replace( /{{thumbnail}}/ig, thumbUrl );

    return html;
  }

};

