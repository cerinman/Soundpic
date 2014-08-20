var soundPic = function(){
  this.searchFormElement = $("form")
  this.songSelectionElement = $("#selection")
  this.songInputElement = $("#song")
  this.artworkElement = $("#artwork")
  this.playerElement = $("#player")
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
      console.log(lyrics)
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
      that.artworkElement.empty().append(data);
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
    }, 10000);

    this.startScrapingArtwork(artist, song);
  },

  showLoadingPage: function(){
    this.artworkElement.empty().append("<img src='http://fc06.deviantart.net/fs71/i/2013/243/9/4/ctrlpaintvasestudy_by_cerin-d6ki6w3.jpg'>");
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