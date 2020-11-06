// Need to find a better solution to the hard coded accessToken below
const accessToken = "BQBNlx0GdYdYplS4zYZBU4PFnxb_mxt1bLU-uQDOq0c0qJOlxmfnXQEwZFM_Q6gowGmmnoZVtFM7nv5o7EzO0ABFxFI_P6DiZJilzFphQDtWKeCD6LxDe0f9tc0x3_vWShN21xRZUFMUoph19wCtObtY6E9YcVMdtD2s-RYdhFYLAjNUxEBb8LZcGGdWXRdpOMAPjzAPC2KAap_K"

// Call the fetchSongs function 3 times, passing in the different genre names each time, and saves the Spotify IDs as three separate arrays
function submitGenres(musicGenre1, musicGenre2, musicGenre3) {
    let collection1 = fetchSongs(musicGenre1);
    let collection2 = fetchSongs(musicGenre2);
    let collection3 = fetchSongs(musicGenre3);
    let collection4 = ['3414rkjkd;as', '89yu32jkfds;al', 'oiur23489hu;das'];
    // console.log(collection1);
    // console.log(collection2);
    // console.log(collection3);
    // console.log(collection4);
    shuffleSelections(collection1, collection2, collection3);
}

// Call the Spotify API, passing in the genre, and limiting the results to ${limitResults}; return an array of Spotify song ID's
function fetchSongs(genreSelection) {
    // limitResults determines how many songs come back for each genre submitted
    let limitResults = '5';
    let songCollection = [];
    fetch(`https://api.spotify.com/v1/recommendations?limit=${limitResults}&seed_genres=${genreSelection}`, {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then((response) => {
            response.json().then(
                (data) => {
                    // Iterate through the object to find individual song ID's
                    for (let i = 0; i < data.tracks.length; i++) {
                        let songID = data.tracks[i].id;
                        songCollection.push(songID);
                        // Optionally, store additional data from each song; NOTE - was not able to find a way to store genre information
                        // let songName = data.tracks[i].name;
                        // let songAlbum = data.tracks[i].album.name;
                        // let songAlbumID = data.tracks[i].album.id;
                        // console.log(`Song ID: ${songID}, Song Name: ${songName}, From Album: ${songAlbum}, Album ID: ${songAlbumID}`)
                    }
                    assembleArray(songCollection);
                });

        });
   return songCollection
}

function assembleArray(songCollection) {
    let thisCollection = songCollection;
    console.log(`This collection is ${thisCollection}`);
    console.log(thisCollection.length);
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

