chrome.runtime.onConnect.addListener(async function(port) {
  if (port.name == "content_script") {
    port.onMessage.addListener(async function(request) {
      var accessToken = request.accessToken
      if (request.validUrl != null && request.validUrl) {
        var animeInfo = extractKissAnime(request.url)
        var id = (await getAnimeIDFromTitle(animeInfo.seriesName)).data.Media.id
        var currentProgress = (await getAnimeProgress(accessToken, id)).data.SaveMediaListEntry.progress
        var episodeNumber = animeInfo.episodeNumber

        // Return because no point in tracking an episode when its behind the current progress.
        if (currentProgress >= episodeNumber)
          return true

        var duration = (await getAnimeDuration(id)).data.Media.duration
        console.log(duration)
        port.postMessage({
          accessToken : accessToken,
          seriesId : id,
          episodeNumber : animeInfo.episodeNumber,
          duration : duration
        })

      }
      else if (request.track != null && request.track) {
        console.log("creating/updating anime entry")
        await createAnimeEntry(accessToken, request.seriesId, request.episodeNumber)
      }
    })
  }
})
