const express=require('express')
const router=express.Router()
const fetch=require('node-fetch')
const db=require('../models')


router.get('/playlist',(req,res)=>{
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
    res.send(playlistID)
})

// Create a new playlist in Spotify
async function createPlaylist(userID, g1, g2, g3) {
    let playlistName = `TuneBuzz: ${g1}-${g2}-${g3}`;
    let playlistDescription = `A random playlist of ${g1}, ${g2}, and ${g3} songs.`;
    let theURL = `https://api.spotify.com/v1/users/${userID}/playlists`;
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

module.exports=router