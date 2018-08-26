var loggedOut = true;

async function logInOrOut(accessToken, status, loginBtn) {
  if (loggedOut) {
    status.textContent = 'Logging in...'
  }
  else {
    status.textContent = 'Logging out...'
  }

  if (await isValidToken(accessToken)) {
      if (loggedOut) {
        await getUserByID(status, url, options)
        loginBtn.textContent = 'Log Out'
      }
      else {
        status.textContent = 'Logged out :('
        loginBtn.textContent = 'Log In'
      }
      loggedOut = !loggedOut

    }
    else {
      status.textContent = 'Invalid access code.'
      loggedOut = true
    }
}

async function getUserByID(status, url, options) {
  var query = `
  {
    Viewer {
      id
    }
  }
  `;
  options.body = JSON.stringify({
    query : query
  })
  
  fetch(url, options)
    .then(function(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    })
  .then(async function(data) {
    await convertIdToName(status, data.data.Viewer.id, url, options)
  })

}

async function convertIdToName(status, id, url, options) {
  console.log(id)
  var query = `
  query ($id: Int) {
    User (id: $id) {
      name
    }
  }
  `;

  var variables = {
    "id" : id
  }

  options.body = JSON.stringify({
    query : query,
    variables : variables
  })

  var t = await fetch(url, options)
    .then(function(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    })
  .then(function(data) {
    status.textContent = 'Welcome ' + data.data.User.name + '!'
    console.log("this is before data: ")
    console.log(data)
    return data
  })

  console.log("this is after data: ")
  console.log(t)
}
