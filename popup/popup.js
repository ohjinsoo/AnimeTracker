window.onload = function () {
  var status = document.getElementById('status')
  var service = document.getElementById('service')
  var loginBtn = document.getElementById('login')

  var list = document.getElementById('list')
  var text = document.getElementById('user_text')
  var dir = document.getElementById('user_direction')
  var body = document.getElementById("body")
  var access_link = document.getElementById("access_link")        

  var loggedIn = false

  list.onchange = function() {
    if (list.value == "AniList") {
      dir.textContent = "Paste your Access Code"
      loginBtn.disabled = false
      body.insertBefore(access_link, dir)
    }
    else if (list.value == "MyAnimeList") {
      dir.textContent = "Log in"
      loginBtn.disabled = true
      body.removeChild(access_link)
    }
  } 

  chrome.storage.sync.get(['loggedIn'], function(result) {
    if (result.loggedIn != null)
      loggedIn = result.loggedIn
    
    if (loggedIn) {
      text.disabled = true
      loginBtn.textContent = "Log Out"
      chrome.storage.sync.get(['statusContent'], function(result) {
        if (result.statusContent != null)
          status.textContent = result.statusContent
      })

      chrome.storage.sync.get(['accessToken'], function(result) {
        if (result.accessToken != null)
          text.value = result.accessToken
      })
    }
    else {
      loginBtn.textContent = "Log In"
      status.textContent = "Logged out."
    }
  })

  loginBtn.onclick = async function () {
    if (list.value == "AniList") {
      loggedIn = await anilistLogin(text, status, loginBtn, loggedIn)
    }
    else if (list.value == "MyAnimeList (currently down)") {

    }
    chrome.storage.sync.set({'loggedIn' : loggedIn});
    chrome.storage.sync.get(['statusContent'], function(result) {
      status.textContent = result.statusContent
    });

    console.log(loggedIn)
    if (loggedIn) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {accessToken: text.value});
      })
    }
  }
}
