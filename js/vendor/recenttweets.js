
	var tweets = document.getElementById("tweets"),
		html = '';

    String.prototype.hashify = function() {
        return this.replace(/#([A-Za-z0-9\/\.]*)/g, function(m) {
            return '<a target="_new" href="http://twitter.com/search?q=' + m.replace('#','') + '">' + m + "</a>";
        });
    };

    String.prototype.atify = function() {
        return this.replace(/@[\w]+/g, function(m) {
            return '<a href="http://www.twitter.com/' + m.replace('@','') + '">' + m + "</a>";
        });
    };

    function parse_date(date_str) {
      // The non-search twitter APIs return inconsistently-formatted dates, which Date.parse
      // cannot handle in IE. We therefore perform the following transformation:
      // "Wed Apr 29 08:53:31 +0000 2009" => "Wed, Apr 29 2009 08:53:31 +0000"
		// From seaofclouds/tweets (c) 2008-2011 Todd Matthews & Steve Purcell 
      return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
    }

	    var url_regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
	
	    function escapeHTML(s) {
	      return s.replace(/</g,"&lt;").replace(/>/g,"^&gt;");
	    }
	

		// From seaofclouds/tweets (c) 2008-2011 Todd Matthews & Steve Purcell 
	    function linkURLs(text, entities) {
	      return text.replace(url_regexp, function(match) {
	        var url = (/^[a-z]+:/i).test(match) ? match : "http://"+match;
	        var text = match;
	        for(var i = 0; i < entities.length; ++i) {
	          var entity = entities[i];
	          if (entity.url == url && entity.expanded_url) {
	            url = entity.expanded_url;
	            text = entity.display_url;
	            break;
	          }
	        }
	        return "<a href=\""+escapeHTML(url)+"\">"+escapeHTML(text)+"</a>";
	      });
	    }
		function relative_time(date) {
		      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
		      var delta = parseInt((relative_to.getTime() - date) / 1000, 10);
		      var r = '';
		      if (delta < 1) {
		        r = 'just now';
		      } else if (delta < 60) {
		        r = delta + ' seconds ago';
		      } else if(delta < 120) {
		        r = 'a minute ago';
		      } else if(delta < (45*60)) {
		        r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
		      } else if(delta < (2*60*60)) {
		        r = 'an hour ago';
		      } else if(delta < (24*60*60)) {
		        r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
		      } else if(delta < (48*60*60)) {
		        r = 'a day ago';
		      } else {
		        r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
		      }
		      return 'about ' + r;
		    }


	function recent_tweets(data) {
		for (i=0; i<data.length; i++) {
			var entities = data[i].entities ? (data[i].entities.urls || []).concat(data[i].entities.media || []) : [];
			var tweet = linkURLs(data[i].text, entities);
				tweet = tweet.atify().hashify();
			var time = relative_time(parse_date(data[i].created_at));
			html += "<li>" + tweet + " <time>" + time + "</time></li>";
		}
		tweets.innerHTML = html;
		document.getElementById("twitterFeed").style.display = 'block';
	}
