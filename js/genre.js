const accessToken = "BQDaAqvZWr15BsZ32yFY8j4R7EZ83aHd8zIIQeigGRKHpXG2OJSvBj7xqLLQxljqMsAchIDBwZ6o7iKPGh0kxBZ6UGm3jKM3wnyQAOSK4uDwiOnDg5N113MUBf08Anamcq2JN0u6"
const musicGenre1 = 'acoustic'
const musicGenre2 = 'classical'
const musicGenre3 = 'salsa'

function fetchData() {
    let collection1 = fetchSongs(musicGenre1);
    console.log(collection1);
    let collection2 = fetchSongs(musicGenre2);
    console.log(collection2);
    let collection3 = fetchSongs(musicGenre3);
    console.log(collection3)
}

function fetchSongs(genreSelection) {
    let songCollection = [];
    fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_genres=${genreSelection}`, {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then((response) => {
            response.json().then(
                (data) => {
                    //console.log(data);
                    for (let i = 0; i < data.tracks.length; i++) {
                        let songID = data.tracks[i].id;
                        let songName = data.tracks[i].name;
                        let songAlbum = data.tracks[i].album.name;
                        let songAlbumID = data.tracks[i].album.id;
                        //console.log(`Song ID: ${songID}, Song Name: ${songName}, From Album: ${songAlbum}, Album ID: ${songAlbumID}`)
                        songCollection.push(songID);
                    }
                    //console.log(songCollection);
                }
            );
        });
    return songCollection
}
