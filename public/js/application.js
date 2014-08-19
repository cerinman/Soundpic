var WORD_FILTER = ["oh", "all", "is", "with", "to", "too", "the", "from", "this", "that", "then", "the", "by", "be", "should", "would", "nor", "but", "or", "yet", "so", "else", "and", "unless", "less", "if", "in", "both", "either", "neither", "not", "whether", "I", "my", "we", "a", "of"];


var getSongs = function(song, elementToAppendTo){
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
}

var saveArt = function(searchTerms, song, artist){
  $.ajax({
    url: '/art',
    type: "POST",
    data: {
      terms:   searchTerms,
      song:   song,
      artist: artist
    }
  })
}

var parseLyrics = function(lyrics){
    
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
}

var startScrapingArtwork = function(artist, song){
  $.ajax({
    url: '/lyrics',
    type: "GET",
    data: {
      artist: artist,
      song: song
    }
  }).done(function(data){
    parseLyrics(data);
  })
}

var showArtwork = function(artist, song){
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
}

var setPlayer = function(source){
  var embedurl = "https://embed.spotify.com/?uri=" + source
  $("#player").attr("src", embedurl);
  $("#selection").empty();
}

var pauseShowingArtworkUntilDownloadStarted = function(artist, song){
  setInterval(function(){
    showArtwork(artist, song);
  }, 10000);

  startScrapingArtwork(artist, song);
}

var showLoadingPage = function(){
  $("#artwork").empty().append("<img src='http://fc06.deviantart.net/fs71/i/2013/243/9/4/ctrlpaintvasestudy_by_cerin-d6ki6w3.jpg'>");
}

var songSelection = function(event){
  event.preventDefault();
  if (event.target && event.target.className == "song") {
    setPlayer(event.target.id);
    showLoadingPage();
    pauseShowingArtworkUntilDownloadStarted(event.target.dataset.artistname, event.target.dataset.songname);
  };
}

var search = function (event) {
  event.preventDefault();

  var selection = $("#selection");
  var song = $("#song").val();

  $("#artist").val("");
  $("#song").val("");

  getSongs(song, selection);
}

var bindEvents = function(){
  $("form").on('submit', search)
  $("#selection").on('click', songSelection);
}

bindEvents();