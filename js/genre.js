// (1) Creates a new playlist on Spotify, and saves its ID in playlistID
// (2) Pulls 5 song recommendations from 3 different genres and randomizes them into shuffledURIs
// (3) 

// Need to find a better solution to the hard coded accessToken below
const accessToken = "BQB8d1sdGvOvh85gVEgEAuKXn2KSx9QlY0sXXpJsi6_pnO_P1XL4ezDiVzxXsahV7t49yf40RTHAUtRROe1c6DcXWKvYfHz91pIMJG8KHr_zpYtlWGcxtCKKpNFcxGyX6MQIBwpYIHP_9MaLNZ2pLucDQqYKriuazf8vIyt9MYNZs0av_2h6RevLknCNxRmCmAw6qa56N19kDt3irsTjIHVj"

// Call the fetchSongs function 3 times, passing in the different genre names each time, and saves the Spotify IDs as three separate arrays
async function submitGenres(musicGenre1, musicGenre2, musicGenre3) {
    let user_id = "ejw773";
    let currentPlaylist = await createPlaylist(user_id, musicGenre1, musicGenre2, musicGenre3);
    let collection1 = await fetchSongs(musicGenre1);
    let collection2 = await fetchSongs(musicGenre2);
    let collection3 = await fetchSongs(musicGenre3);
    let idList1 = await processSongData(collection1);
    let idList2 = await processSongData(collection2);
    let idList3 = await processSongData(collection3);
    let shuffledURIs = shuffleSelections(idList1, idList2, idList3);
    let playlistID = currentPlaylist.id;
    let intoPlaylist = await songsIntoPlaylist(playlistID, shuffledURIs);
}

// Create a new playlist in Spotify
async function createPlaylist(theID, g1, g2, g3) {
    let playlistName = `TuneBuzz: ${g1}-${g2}-${g3}`;
    let playlistDescription = `A random playlist of ${g1}, ${g2}, and ${g3} songs.`;
    let theURL = `https://api.spotify.com/v1/users/${theID}/playlists`;
    let theParams = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
            },
        body:  JSON.stringify({
            'name': playlistName,
            'description': playlistDescription,
            'public': true
        })
    };
    const newPlaylist = await fetch(theURL, theParams)
    .then(response => {
    return response.json()})
    .then(data => data);
    return newPlaylist;
}

// Call the Spotify API, passing in the genre, and limiting the results to ${limitResults}; return an array of Spotify song ID's
async function fetchSongs(genreSelection) {
    let limitResults = '5';
    const songCollection = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limitResults}&seed_genres=${genreSelection}`, {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => {
    return response.json()})
    .then(data => data);
    return songCollection;
}


function shuffleSelections(item1, item2, item3) {
    let theShuffled = [];
    for (let i = 0; i < item1.length; i++) {
        theShuffled.push(item1[i]);
        theShuffled.push(item2[i]);
        theShuffled.push(item3[i]);
    }
    return theShuffled;
}

async function processSongData(songData) {
    console.log(songData);
    let songCollection = [];
    for (let i = 0; i < songData.tracks.length; i++) {
        let songURI = songData.tracks[i].uri;
        songCollection.push(songURI);
    }
    return songCollection;
}


// Create a new playlist in Spotify
async function songsIntoPlaylist(playlistID, shuffledURIs) {
    let theURL = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    let theParams = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
            },
        body:  JSON.stringify({
            "uris": shuffledURIs
        })
    };
    const completedPlaylist = await fetch(theURL, theParams)
    .then(response => {
    return response.json()})
    .then(data => data);
    return completedPlaylist;
}
