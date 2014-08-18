

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

var getArt = function(searchTerms){
    $.ajax({
        url: '/art',
        type: "GET",
        data: {
            terms: searchTerms
        }
    }).done(function(data){
        each(data, function(img){
            $("#player-wrapper").append(img);
        })

        // $("#player-wrapper").append(data);
    })
}

var parseLyrics = function(lyrics){
    
    getArt(data);
}

var getLyrics = function(artist, song){
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

var setPlayer = function(source){
    var embedurl = "https://embed.spotify.com/?uri=" + source
    $("#player").attr("src", embedurl);
    $("#selection").empty();
}

var delegateSongSelection = function(event){
    if (event.target && event.target.className == "song") {
        setPlayer(event.target.id);
        getLyrics(event.target.dataset.artistname, event.target.dataset.songname);
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

$("form").on('submit', search)
$("#selection").on('click', delegateSongSelection);