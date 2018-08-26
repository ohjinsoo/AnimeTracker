const BEGINNING_URL = 26

function extractKissAnime(url) {  
  var seriesName = extractSeriesName(url)
  var episodeNumber = extractEpisode(url, seriesName)

  return {
    seriesName : seriesName,
    episodeNumber : episodeNumber
  }
}

function extractSeriesName(url) {
  var seriesName = ''
  var url = url.substring(BEGINNING_URL)

  for (var i = 0; i < url.length; i++) {
    var char = url.charAt(i)
    if (char == '/')
      break
    seriesName += char
  }

  console.log(seriesName)
  return seriesName
}

function extractEpisode(url, seriesName) {
  var episode = ''
  for (var i = BEGINNING_URL + seriesName.length + 9; i < url.length; i++) {
    var char = url.charAt(i)
    if (isNaN(char)) {
      break
    }

    episode += char
    console.log(episode)
  }
  return parseInt(episode, 10)
}
