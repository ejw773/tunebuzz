// const e = require("express");


// Need to find a better solution to the hard coded accessToken below
const accessToken = "BQC_u-lxC3hbet6a3Hi-YGHHCKjS6bbwxFU8wcjqO6Ws5z_jaH64wpa10jJ1GVL4A-468Uon_Qm5luZiPzshlr9KI_u34Yz29W5aZKZ4udu_Wqzd_FkKkp6u2RejTRPS5FZQ6hLt7ZhX82lciKJvwtqjkC8t2l63IVWeN3U2ehltgSI93q9Fq7Y9k9OzueMFDYUYX0hCb0ZNV-cFQQsxWIL_"
const user_id = "ejw773";

// Call the fetchSongs function 3 times, passing in the different genre names each time, and saves the Spotify IDs as three separate arrays
async function submitGenres() {
    let firstDropdown = document.getElementById("genre1");
    let secondDropdown = document.getElementById("genre2");
    let thirdDropdown = document.getElementById("genre3");
    let musicGenre1 = firstDropdown.options[firstDropdown.selectedIndex].text;
    let musicGenre2 = secondDropdown.options[secondDropdown.selectedIndex].text;
    let musicGenre3 = thirdDropdown.options[thirdDropdown.selectedIndex].text;
    console.log(musicGenre1);
    console.log(musicGenre2);
    console.log(musicGenre3);
  
    let currentPlaylist = await createPlaylist(user_id, musicGenre1, musicGenre2, musicGenre3);
    let collection1 = await fetchSongs(musicGenre1);
    let collection2 = await fetchSongs(musicGenre2);
    let collection3 = await fetchSongs(musicGenre3);
    let idList1 = await processSongData(collection1);
    let idList2 = await processSongData(collection2);
    let idList3 = await processSongData(collection3);
    let shuffledURIs = shuffleSelections(idList1, idList2, idList3);
    let playlistID = currentPlaylist.id;
    console.log(typeof playlistID);
    console.log(playlistID);
    let intoPlaylist = await songsIntoPlaylist(playlistID, shuffledURIs);
    let embeddedPlayer = document.getElementById('embedded_player');
    console.log(embeddedPlayer);
    let tempID = "1Kv9bdJzdgZW6KjfFkA9TL";
    let playerHTML = `<iframe class="player" src="https://open.spotify.com/embed/playlist/${playlistID}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    console.log(playerHTML);
    embeddedPlayer.innerHTML = '';
    embeddedPlayer.innerHTML = playerHTML;
}


// Create a new playlist in Spotify
async function createPlaylist(theID, g1, g2, g3) {
    let playlistName = `${g1}-${g2}-${g3}`;
    let playlistDescription = `A random playlist of ${g1}, ${g2}, and ${g3} songs.`;
    let theURL = `https://api.spotify.com/v1/users/${theID}/playlists`;
    let theParams = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            'name': playlistName,
            'description': playlistDescription,
            'public': true
        })
    };
    const newPlaylist = await fetch(theURL, theParams)
        .then(response => {
            return response.json()
        })
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
            return response.json()
        })
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
        body: JSON.stringify({
            "uris": shuffledURIs
        })
    };
    const completedPlaylist = await fetch(theURL, theParams)
        .then(response => {
            return response.json()
        })
        .then(data => data);
    return completedPlaylist;
}
