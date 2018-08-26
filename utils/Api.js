async function isValidToken(accessToken) {
  var query = `
  mutation ($mediaId: Int, $status: MediaListStatus) {
    SaveMediaListEntry (mediaId: $mediaId, status: $status) {
        id
        status
    }
  }`

  var variables = {
    "mediaId" : 1
  }

  return await validReq(accessToken, query, variables)
}

async function getCurrentUserID(accessToken) {
  var query = `
  {
    Viewer {
      id
    }
  }`

  return await mutate(accessToken, query)
}

async function getUsernameFromID(id) {
  var query = `
  query ($id: Int) {
    User (id: $id) {
      name
    }
  }`

  var variables = {
    "id" : id
  }

  return await req(query, variables)
}

async function getAnimeIDFromTitle(title) {
  var query = `
  query ($search: String, $type: MediaType) {
    Media (search: $search, type: $type) {
      id
    }
  }`

  var variables = {
    "search" : title,
    "type" : "ANIME"
  }

  return await req(query, variables)
}

async function createAnimeEntry(accessToken, titleId, episodeNumber) {
  var query = `
  mutation ($mediaId: Int, $progress: Int) {
    SaveMediaListEntry (mediaId: $mediaId, progress: $progress) {
      id
    }
  }`

  var variables = {
    "mediaId" : titleId,
    "progress" : episodeNumber
  }

  console.log("Tried to create anime entry for " + titleId + " at Ep. #" + episodeNumber)
  return await mutate(accessToken, query, variables)
}

async function getAnimeProgress(accessToken, titleId) {
  var query = `
  mutation ($mediaId: Int) {
    SaveMediaListEntry (mediaId: $mediaId) {
      progress
    }
  }`

  var variables = {
    "mediaId" : titleId
  }

  return await mutate(accessToken, query, variables)
}

async function getAnimeDuration(titleId) {
  var query = `
  query ($id: Int) {
    Media (id: $id) {
      duration
    }
  }`

  var variables = {
    "id" : titleId
  }

  return await req(query, variables)
}
