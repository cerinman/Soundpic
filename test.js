var play = function (event) {
    event.preventDefault();

    var artist = $("#artist").val();
    var song = $("#song").val();

    $("#artist").val("");
    $("#song").val("");

    var uri = "spotify:track:1mB6WKPsJRdkbI8bMPXa2C";

    var newSource = "https://embed.spotify.com/?uri=" + uri; 

    $("#player").attr("src", newSource);
}

$("form").on('submit', play)