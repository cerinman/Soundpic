var lyricsHelper = {
  wordFilter: ["see", "'cause", "don't", "have", "about", "cause", "got", "we're", "they", "they're", "us", "it", "what", "oh", "all", "is", "did", "with", "to", "too", "the", "from", "this", "that", "then", "the", "by", "be", "should", "would", "could", "nor", "but", "or", "yet", "so", "else", "and", "unless", "less", "if", "in", "both", "either", "neither", "not", "whether", "i", "my", "we", "a", "of", "it's", "me?", "we'll", "i'll", "ass", "bitch", "dick", "fuck", "shit", "they'll"],

  removeWhiteSpace: function(string){
    var newString = string.replace("  ", "")
    return newString
  },

  removeNewLines: function(string){
    var newString = string.replace(/(\r\n|\n|\r)/gm, " ")
    return newString
  },

  splitStringIntoArray: function(string){
    var newArray = string.split(" ")
    newArray.pop()
    return newArray
  },

  removeUnWantedWords: function(wordArray){
    var words = [];

    var that = this

    each(wordArray, function(word){
      if ($.inArray(word.toLowerCase(), that.wordFilter) == -1) {
        words.push(word);
      };
    })

    return words
  },

  parseLyrics: function(string, songTitle){
    var removedNewLines = this.removeNewLines(string);
    var strippedString = this.removeWhiteSpace(removedNewLines);
    var wordArray = this.splitStringIntoArray(strippedString);
    var finalArray = this.removeUnWantedWords(wordArray);
    finalArray.unshift(songTitle);
    return finalArray;
  }
}