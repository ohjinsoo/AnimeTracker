var url = 'https://graphql.anilist.co'

async function validReq(accessToken, query, variables = {}) {
  var options = {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          query : query,
          variables : variables
      })
  };

  console.log("validReq call: " + JSON.stringify(options))

  var ret = await fetch(url, options)
    .then(async function(response) {
      return response.ok
    })

  return ret
}


async function req(query, variables = {}) {
  var options = {
      method: 'POST',
      headers: {
          'Origin' : 'https://graphql.anilist.co/',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          query : query,
          variables : variables
      })
  };

  console.log("req: " + JSON.stringify(options))

  var ret = await fetch(url, options)
    .then(async function(response) {
      console.log(response)
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    })
  .then(async function(data) {
    console.log(data)
    return data
  })

  return ret;
}

async function mutate(accessToken, query, variables = {}) {
  var options = {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          query : query,
          variables : variables
      })
  };

  console.log("mutate: " + JSON.stringify(options))

  var ret = await fetch(url, options)
    .then(async function(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    })
  .then(async function(data) {
    return data
  })

  return ret;
}
