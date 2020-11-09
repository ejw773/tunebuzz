const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const db = require('../models')

//makes sure we see page logged in
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/index.html')
}

router.get('/playlist', ensureAuthenticated, async (req, res) => {
    const musicGenre1 = req.query.musicGenre1
    const musicGenre2 = req.query.musicGenre2
    const musicGenre3 = req.query.musicGenre3
    let currentPlaylist = await createPlaylist(req.user.spotifyID, musicGenre1, musicGenre2, musicGenre3, req.user.spotifyAccessToken);
    let collection1 = await fetchSongs(musicGenre1, req.user.spotifyAccessToken);
    let collection2 = await fetchSongs(musicGenre2, req.user.spotifyAccessToken);
    let collection3 = await fetchSongs(musicGenre3, req.user.spotifyAccessToken);
    let idList1 = await processSongData(collection1);
    let idList2 = await processSongData(collection2);
    let idList3 = await processSongData(collection3);
    let shuffledURIs = shuffleSelections(idList1, idList2, idList3);
    let playlistID = currentPlaylist.id;
    console.log(typeof playlistID);
    console.log(playlistID);
    let intoPlaylist = await songsIntoPlaylist(playlistID, shuffledURIs, req.user.spotifyAccessToken);
    res.send({ id: playlistID })
})
router.get('/genre', ensureAuthenticated, async (req, res) => {
    console.log("heal me");
    let genreList = await fetchGenreList(req.user.spotifyAccessToken)
    res.send(genreList)
})
// Call the Spotify API that returns a list of acceptable genres, for populating the drop-down menu
async function fetchGenreList(accessToken) {
    let theGenres = [];
    return fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then((response) => response.json())
        .then((data) => {
            let theData = data.genres;
            for (let i = 0; i < theData.length; i++) {
                let thisGenre = theData[i];
                theGenres.push(thisGenre);
            }
            return theGenres
        });
}

// Create a new playlist in Spotify
async function createPlaylist(spotifyID, g1, g2, g3, accessToken) {
    let playlistName = `TuneBuzz: ${g1}-${g2}-${g3}`;
    let playlistDescription = `A random playlist of ${g1}, ${g2}, and ${g3} songs.`;
    let theURL = `https://api.spotify.com/v1/users/${spotifyID}/playlists`;
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
async function fetchSongs(genreSelection, accessToken) {
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
async function songsIntoPlaylist(playlistID, shuffledURIs, accessToken) {
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

module.exports = router