var spotifyApi = new SpotifyWebApi();

var getLyrics = function(artist, song){
    $.ajax({
        url: '/localhost:4567',
        type: "GET"
    }).done(function(data){
        var stuff = JSON.parse(data);
        console.log(stuff.song);
    })
}

var setPlayer = function(source){
    $("#player").attr("src", source);
}

var play = function (event) {
    event.preventDefault();

    var artist = $("#artist").val();
    var song = $("#song").val();

    $("#artist").val("");
    $("#song").val("");

    var embedurl = "https://embed.spotify.com/?uri=";

    var newSource = "";

    spotifyApi.searchTracks(song).then(function(data){
        var songs = [];

        if (data.tracks.items) {
            each(data.tracks.items, function(song){
                if (song.artists[0].name == artist) {
                    songs.push(song);
                };
            })

            if (songs.length > 0) {
                newSource = embedurl + songs[0].uri;
                setPlayer(newSource);
                getLyrics(artist, song);
            }else{
                newSource = embedurl + data.tracks.items[0].uri;
                setPlayer(newSource);
                getLyrics(artist, song);
            };

        }else{
            alert("Song not found!");
        };
    })
}

$("form").on('submit', play)