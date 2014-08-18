

var getSong = function(artist, song, elementToAppendTo){
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.searchTracks(song).then(function(data){
        
        if (data.tracks.items) {
            elementToAppendTo.empty();

            each(data.tracks.items, function(track){
                var item = "<div><span>" + track.artists[0].name + "</span> <a href='#' class='song' id='" + track.uri + "'>" + track.name + "</a></div>"

                elementToAppendTo.append(item);
            })
        }else{
            alert("No songs found with that name!");
        };

        // if (data.tracks.items) {
        //     each(data.tracks.items, function(song){
        //         if (song.artists[0].name == artist) {
        //             songs.push(song);
        //         };
        //     })

        //     if (songs.length > 0) {
        //         newSource = embedurl + songs[0].uri;
        //         setPlayer(newSource);
        //         getLyrics(artist, song);
        //         getArt();
        //     }else{
        //         newSource = embedurl + data.tracks.items[0].uri;
        //         setPlayer(newSource);
        //         getLyrics(artist, song);
        //         getArt();
        //     };

        // }else{
        //     alert("Song not found!");
        // };
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
        // console.log(data);
    })
}

var getArt = function(){
    $.ajax({
        url: '/art',
        type: "GET"
    }).done(function(data){
        // console.log(data);
    })
}

var setPlayer = function(event){
    if (event.target && event.target.className == "song") {

        var embedurl = "https://embed.spotify.com/?uri=" + event.target.id;

        $("#player").attr("src", embedurl);
        $("#selection").empty();
    };
}

var play = function (event) {
    event.preventDefault();

    var selection = $("#selection");
    var artist = $("#artist").val();
    var song = $("#song").val();

    $("#artist").val("");
    $("#song").val("");

    getSong(artist, song, selection);
}

$("form").on('submit', play)
$("#selection").on('click', setPlayer);