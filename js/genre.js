const accessToken = "BQBswmga4YqXxJQhITjapAZkYNN71S2SUiemUF5go0KWnBXgjT9WubMQ107mQ77YJaWroY-NVXLi5wBg2KFNtuxhQy5tyYu-FRZ4RHYhJQuuYhik7_BBQ-mCJjeC0_yUpRn6lWTQ"
const musicGenre1 = 'acoustic'
const musicGenre2 = 'classical'
const musicGenre3 = 'salsa'

function fetchData() {
    fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_genres=${musicGenre1},${musicGenre2},${musicGenre3}`, {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then((response) => {
                response.json().then(
                    (data) => {
                        console.log(data);
                        for (let i = 0; i < data.tracks.length; i++) {
                            let songID = data.tracks[i].id;
                            let songName = data.tracks[i].name;
                            let songAlbum = data.tracks[i].album.name;
                            let songAlbumID = data.tracks[i].album.id;
                            console.log(`Song ID: ${songID}, Song Name: ${songName}, From Album: ${songAlbum}, Album ID: ${songAlbumID}`)
                        }
                    }
                );
            });
        }