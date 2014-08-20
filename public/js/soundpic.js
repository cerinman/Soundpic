var soundPic = function(picRotateDelay){
  this.searchFormElement = $("form")
  this.songSelectionElement = $("#selection")
  this.songInputElement = $("#song")
  this.artworkElement = $("#artwork")
  this.playerElement = $("#player")
  this.artTitle = $("#artTitle")
  this.picRotateDelay = picRotateDelay
}

soundPic.prototype = {

  getSongs: function(song, elementToAppentTo){
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.searchTracks(song).then(function(data){
        
      if (data.tracks.items) {
        elementToAppentTo.empty();

        each(data.tracks.items, function(track){
          var item = "<div><span>" + track.artists[0].name
          item = item + "</span> <a href='#' class='song' data-artistname='" + track.artists[0].name
          item = item + "' data-songname='" + track.name
          item = item + "' data-trackid='" + track.id
          item = item + "' id='" + track.uri 
          item = item + "'>" + track.name + "</a></div>"

          elementToAppentTo.append(item);
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

  parseAndScrape: function(artist, song){

    var that = this

    $.ajax({
      url: '/lyrics',
      type: "GET",
      data: {
        artist: artist,
        song: song
      }
    }).done(function(data){
      lyrics_object    = JSON.parse(data);
      var terms        = lyrics_object["lyrics"];
      var lyrics       = lyricsHelper.parseLyrics(terms)
      that.saveArt(lyrics, song, artist);
    })
  },

  startScrapingArtwork: function(artist, song){
    this.parseAndScrape(artist, song)
  },

  showArtwork: function(artist, song){

    var that = this

    $.ajax({
      url: '/art',
      type: "GET",
      data: {
        artist: artist,
        song: song
      }
    }).done(function(data){
      var img_details = JSON.parse(data);

      var author_details = img_details["deviation_link"] + " by " + img_details["author_link"]
      var image = $(img_details["img_url"])

      if (parseInt(image.attr("width")) > 1280 || parseInt(image.attr("height")) > 800) {

        var width = parseInt(image.attr("width"))
        var height = parseInt(image.attr("height"))

        var ratio = imageHelper.calculateAspectRatioFit(width, height, 1280, 800)
        image.attr("width", ratio.width)
        image.attr("height", ratio.height)
      };
    
      that.artworkElement.empty().append(image);
      that.artTitle.empty().append(author_details);
    })
  },

  setPlayer: function(source){
    var embedurl = "https://embed.spotify.com/?uri=" + source
    this.playerElement.attr("src", embedurl);
    this.songSelectionElement.empty();
  },

  pauseShowingArtworkUntilDownloadStarted: function(artist, song){
    var that = this
    setInterval(function(){
      that.showArtwork(artist, song);
    }, that.picRotateDelay);

    this.startScrapingArtwork(artist, song);
  },

  showLoadingPage: function(){
    this.artworkElement.empty().append("<h1>Loading Player and Images........</h1>");
  },

  songSelection: function(event){
    event.preventDefault();
    if (event.target && event.target.className == "song") {
      this.setPlayer(event.target.id);
      this.showLoadingPage();
      this.pauseShowingArtworkUntilDownloadStarted(event.target.dataset.artistname, event.target.dataset.songname);
    };
  },

  search: function (event) {
    event.preventDefault();
    this.getSongs(this.songInputElement.val(), this.songSelectionElement);
    this.songInputElement.val("");
  },

  bindEvents: function(){
    this.searchFormElement.on('submit', this.search.bind(this))
    this.songSelectionElement.on('click', this.songSelection.bind(this));
  },

  run: function(){
    this.bindEvents();
  }
}