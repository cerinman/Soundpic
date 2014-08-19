  var CONJUCTIONS = ["oh", "all", "is", "with", "to", "too", "the", "from", "this", "that", "then", "the", "by", "be", "should", "would", "nor", "but", "or", "yet", "so", "else", "and", "unless", "less", "if", "in", "both", "either", "neither", "not", "whether", "I", "my", "we", "a", "of"];


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

var getArt = function(searchTerm, song, artist){
    $.ajax({
        url: '/art',
        type: "GET",
        data: {
            term:   searchTerm,
            song:   song,
            artist: artist
        }
    }).done(function(data){
        $("#artwork").empty().append(data)
    })
}

var parseLyrics = function(lyrics){
    
    lyrics_object = JSON.parse(lyrics);

    terms = lyrics_object["lyrics"];

    terms = terms.replace(/(\r\n|\n|\r)/gm, " ")

    terms = terms.replace("  ", "")

    terms = terms.split(" ")

    terms.unshift(lyrics_object["song"])

    terms.pop();

    each(terms, function(term){
        if ($.inArray(term.toLowerCase(), CONJUCTIONS) == -1) {
            setInterval(getArt(term.toLowerCase(), lyrics_object["song"], lyrics_object["artist"]), 3000000)
        };
    })
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