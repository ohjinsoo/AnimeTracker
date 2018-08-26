async function anilistLogin(access_token, status, loginBtn, loggedIn) {
  var accessToken = access_token.value

  if (!loggedIn) {
    status.textContent = 'Logging in...'
  }
  else {
    status.textContent = 'Logging out...'
  }

  var isValid = await isValidToken(accessToken)
  console.log(isValid)

  if (isValid) {
      if (!loggedIn) {
        await addUserToStatus(accessToken)
        loginBtn.textContent = 'Log Out'
        access_token.disabled = true
        chrome.storage.sync.set({'accessToken' : accessToken});
      }
      else {
        loginBtn.textContent = 'Log In'
        access_token.disabled = false
        access_token.value = ''
        chrome.storage.sync.set({'accessToken' : null});
        chrome.storage.sync.set({'statusContent' : 'Logged out.'});
      }
      loggedIn = !loggedIn

    }
    else {
      loginBtn.textContent = 'Log In'
      access_token.disabled = false
      loggedIn = false
      chrome.storage.sync.set({'statusContent' : 'Invalid access code.'});
    }

    return loggedIn
}

async function addUserToStatus(accessToken) {
  var currentUserID = await getCurrentUserID(accessToken)
  var data = await getUsernameFromID(currentUserID.data.Viewer.id)
  chrome.storage.sync.set({'statusContent' : 'Welcome ' + data.data.User.name + '!'});
}
