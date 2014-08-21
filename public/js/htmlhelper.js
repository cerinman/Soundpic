  var htmlHelper = {
    buildSongList: function(tracks){
      var item = "<div>"
      item = item + "<table class='table table-condensed table-hover'>"
      item = item + "<tr class='info'>"
      item = item + "<td>Artist</td>"
      item = item + "<td>Song Title</td>"
      item = item + "</tr>"

      each(tracks.items, function(track){
        item = item + "<tr>"
        item = item + "<td>"
        item = item + track.artists[0].name
        item = item + "</td>"
        item = item + "<td>"
        item = item + "<a href='#' class='song' data-artistname='" + track.artists[0].name
        item = item + "' data-songname='" + track.name
        item = item + "' data-trackid='" + track.id
        item = item + "' id='" + track.uri 
        item = item + "'>" + track.name + "</a>"
        item = item + "</td>"
        item = item + "<tr>"
      })

      item = item + "</table>"
      item = item + "</div>"

      return item;
    }
  }