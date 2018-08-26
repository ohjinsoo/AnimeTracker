var video = document.getElementById("my_video_1_html5_api")

function requestTrackAnime(accessToken) {
  var url = document.URL
  if (url.includes("/Anime/") && url.includes("kissanime") && url.includes("Episode")) {
    console.log("valid url, tracking anime.")

    var port = chrome.runtime.connect({ name : "content_script"})
    port.postMessage({
      validUrl : true,
      accessToken: accessToken,
      url : url
    })
    port.onMessage.addListener(function(msg) {
      console.log("received msg: " + JSON.stringify(msg))
      trackVideoTime(msg, port)
    })
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function trackVideoTime(data, port) {
  // Track anime when the video player reaches the half mark of the anime episode. 
  // Multiplied by 60 because duration is in minutes, so convert to seconds.

  var halfDuration = data.duration * 60 / 2
  var currentTime = 0

  console.log("Starting track for " + data.seriesId + ", ep #" + data.episodeNumber)

  while (true) {
    console.log(currentTime)
    // currentTime is in seconds.
    if (video == null)
      currentTime += 60
    else
      currentTime = video.currentTime

    if (currentTime > halfDuration) {
      console.log("reached half point, adding anime to list.")
      port.postMessage({
        accessToken : data.accessToken,
        seriesId : data.seriesId,
        episodeNumber : data.episodeNumber,
        track : true
      })

      // Return because we sent the track request msg to TrackAnime.js; now our job is done.
      return
    }

    // Check every minute.
    await sleep(60000)
  }
}

chrome.storage.sync.get(['accessToken'], function(result) {
  if (result != null && result.accessToken != null) {
    requestTrackAnime(result.accessToken)
  }
  else {
    console.log("no accessToken!")
  }
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.duration != null) {
      console.log("duration found, will track anime when it is " + request.duration / 2 + " minutes in.")
      trackVideoTime(request)
    }
})
