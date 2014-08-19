
var soundPic = function(){
  wordFilter: ["oh", "all", "is", "with", "to", "too", "the", "from", "this", "that", "then", "the", "by", "be", "should", "would", "nor", "but", "or", "yet", "so", "else", "and", "unless", "less", "if", "in", "both", "either", "neither", "not", "whether", "I", "my", "we", "a", "of"],
  searchForm: $("form"),
  songSelection: $("#selection"),
  songInput: $("#song")
}

soundPic.prototype {
  getSongs: function(song, elementToAppendTo){
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.searchTracks(song).then(function(data){
        
      if (data.tracks.items) {
        elementToAppendTo.empty();

        each(data.tracks.items, function(track){
          var item = "<div><span>" + track.artists[0].name
          item = item + "</span> <a href='#' class='song' data-artistname='" + track.artists[0].name
          item = item + "' data-songname='" + track.name
          item = item + "' data-trackid='" + track.id
          item = item + "' id='" + track.uri 
          item = item + "'>" + track.name + "</a></div>"

          elementToAppendTo.append(item);
        })
      }
    })
  },

  saveArt: function(searchTerms, song, artist){
    $.ajax({
      url: '/art',
      type: "POST",
      data: {
        terms:   searchTerms,
        song:   song,
        artist: artist
      }
    })
  },

  parseLyrics: function(lyrics){
    
    lyrics_object = JSON.parse(lyrics);

    var terms = lyrics_object["lyrics"];

    terms = terms.replace(/(\r\n|\n|\r)/gm, " ")

    terms = terms.replace("  ", "")

    terms = terms.split(" ")

    terms.unshift(lyrics_object["song"])

    terms.pop();

    var finalTerms = [];

    each(terms, function(term){
      if ($.inArray(term.toLowerCase(), WORD_FILTER) == -1) {
        finalTerms.push(term);
      };
    })

    saveArt(finalTerms, lyrics_object["song"], lyrics_object["artist"])
  },

  startScrapingArtwork: function(artist, song){
    $.ajax({
      url: '/art',
      type: "GET",
      data: {
        artist: artist,
        song: song
      }
    }).done(function(data){
      $("#artwork").empty().append(data);
    })
  },

  showArtwork: function(artist, song){
    $.ajax({
      url: '/art',
      type: "GET",
      data: {
        artist: artist,
        song: song
      }
    }).done(function(data){
      $("#artwork").empty().append(data);
    })
  },

  setPlayer: function(source){
    var embedurl = "https://embed.spotify.com/?uri=" + source
    $("#player").attr("src", embedurl);
    $("#selection").empty();
  },

  pauseShowingArtworkUntilDownloadStarted: function(artist, song){
    setInterval(function(){
      showArtwork(artist, song);
    }, 10000);

    startScrapingArtwork(artist, song);
  },

  showLoadingPage: function(){
    $("#artwork").empty().append("<img src='http://fc06.deviantart.net/fs71/i/2013/243/9/4/ctrlpaintvasestudy_by_cerin-d6ki6w3.jpg'>");
  },

  songSelection: function(event){
    event.preventDefault();
    if (event.target && event.target.className == "song") {
      setPlayer(event.target.id);
      showLoadingPage();
      pauseShowingArtworkUntilDownloadStarted(event.target.dataset.artistname, event.target.dataset.songname);
    };
  },

  search: function (event) {
    event.preventDefault();
    this.getSongs(this.songInput.val(), this.songSelection);
    this.songInput("");
  },

  bindEvents: function(){
    this.searchForm.on('submit', search)
    this.songSelection.on('click', this.songSelection);
  }
}


