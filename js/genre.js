// Need to find a better solution to the hard coded accessToken below
const accessToken = "BQBXYFqNH_140SsPX64WKksWzh_nKHN-PGiHc3Uy2xOoDGfRxh1i-tSNN-RpXdQXlXl9tn2Ip4rIxZBj0oCnxmhUkDec1XSZQYBCHqeXTQlNogf26V_hVriB8ss7OxJYX1jAsQW3kYXRNbR8UM_BE5IC6WG1_0IVzYTsi_R7h9RoQ1DsDd9ge3a7kzuzUs1aJHZFx55yz_xFwU4F"


// Call the fetchSongs function 3 times, passing in the different genre names each time, and saves the Spotify IDs as three separate arrays
function submitGenres(musicGenre1, musicGenre2, musicGenre3) {
    let collection1 = fetchSongs(musicGenre1);
    let collection2 = fetchSongs(musicGenre2);
    let collection3 = fetchSongs(musicGenre3);
    console.log(collection1);
    console.log(collection2);
    console.log(collection3);
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
                }
            );
        });
    return songCollection
}
