var Photos = {

  init: function() {
    
  },

  loadJSON: function() {

  },

  loadSuccess: function() {

  },

  loadError: function() {

  },

  buildHTML: function() {

  }

};

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
        'href':   bigUrl,
        'target': '_blank',
        'class':  'fancybox',
        'rel':    'gallery',
        'title':  photo.title
      });
      link.append(image);

      $('#photoContainer').append(link);
    };

    // --- Remove loading indicator
    $('#photos .loading').remove();

    // --- Activate lightbox (fancybox)
    // $('.fancybox').fancybox({
    //   prevEffect:'none',
    //   nextEffect:'none'
    // });
  }

